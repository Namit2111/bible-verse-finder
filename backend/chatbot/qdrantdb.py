import os
import fitz  # PyMuPDF for reading PDFs
from langchain_community.vectorstores import Qdrant
from qdrant_client import QdrantClient, models
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings

from dotenv import load_dotenv

load_dotenv(override=True)

qdrant_api_key = os.getenv("QDRANT_API_KEY")
qdrant_url = os.getenv("QDRANT_URL")
collection_name = "BibleCollection"
os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")


client = QdrantClient(url=qdrant_url, api_key=qdrant_api_key)

vector_store = Qdrant(
    client=client,
    collection_name=collection_name,
    embeddings=GoogleGenerativeAIEmbeddings(model="models/embedding-001"),
)

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000, chunk_overlap=20, length_function=len
)


def create_collection(collection_name):
    client.create_collection(
        collection_name=collection_name,
        vectors_config=models.VectorParams(size=768, distance=models.Distance.COSINE),
    )
    print(f"Collection {collection_name} created successfully")


def read_pdf(file_path: str):
    """Extract text from a PDF file using PyMuPDF."""
    doc = fitz.open(file_path)
    text = ""
    for page in doc:
        text += page.get_text()
    return text


def upload_pdfs_to_collection(folder_path: str):
    if not client.collection_exists(collection_name=collection_name):
        create_collection(collection_name)

    # Iterate through all PDFs in the folder
    for filename in os.listdir(folder_path):
        if filename.endswith(".pdf"):
            file_path = os.path.join(folder_path, filename)
            print(f"Processing file: {filename}")

            text = read_pdf(file_path)
            print(f"Extracted text from {filename}")

            # Split the text into chunks
            docs = text_splitter.create_documents([text])
            print(f"Text split into {len(docs)} documents for {filename}")

            # for doc in docs:
            # doc.metadata = {"source_file": filename} #Slows the process!

            # Add the documents to the vector store
            vector_store.add_documents(docs)
            print(f"Successfully uploaded {len(docs)} documents from {filename}")

    return f"Uploaded documents from folder: {folder_path}"


# Example usage:
# folder_path = "Bible-pdfs"
# upload_pdfs_to_collection(folder_path)
