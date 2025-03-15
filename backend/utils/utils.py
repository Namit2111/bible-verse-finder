import json
import numpy as np
from sentence_transformers import SentenceTransformer
from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance, PointStruct

# Qdrant Configuration (for Docker)
QDRANT_HOST = "localhost"  # Or the IP address of your Docker host
QDRANT_PORT = 6333  # Default Qdrant port
COLLECTION_NAME = "bible_verses"


def initialize_qdrant_client():
    """Initializes and returns a Qdrant client."""
    client = QdrantClient(host=QDRANT_HOST, port=QDRANT_PORT)
    return client


def create_collection(client, collection_name, vector_size):
    """Creates a Qdrant collection if it doesn't exist."""
    try:
        client.get_collection(collection_name)  # Check if exists
        print(f"Collection '{collection_name}' already exists.")
    except Exception as e:
        print(f"Collection '{collection_name}' not found, creating...")
        client.create_collection(
            collection_name=collection_name,
            vectors_config=VectorParams(size=vector_size, distance=Distance.COSINE),
        )


def load_bible_data(filepath="utils/bible.json"):
    """Loads Bible data from a JSON file and filters verses."""
    with open(filepath, 'r') as f:
        bible_data = json.load(f)

    filtered_verses = [verse for verse in bible_data['verses'] if verse['book_name'] in ('John', 'Psalms', 'Romans', 'Ephesians', 'Philippians')]

    return filtered_verses


def embed_and_store_data(client, collection_name, verses, model):
    """Embeds verses and stores them in Qdrant."""
    embeddings = model.encode([verse['text'] for verse in verses], convert_to_tensor=False)  # Convert to numpy arrays
    points = []
    for i, verse in enumerate(verses):
        points.append(
            PointStruct(
                id=i,  # Use a unique identifier for each verse
                vector=embeddings[i].tolist(),  # Qdrant needs lists or numpy arrays.
                payload={
                    "verse": verse['text'],
                    "book_name": verse['book_name'],
                    "chapter": verse['chapter'],
                    "verse_number": verse['verse'],
                },
            )
        )

    client.upsert(collection_name=collection_name, points=points, wait=True) #wait=True makes sure that everyting is uploadeds


def get_similar_verses(client, collection_name, user_input, model, top_k=20):
    """Searches Qdrant for similar verses."""
    user_input_embedding = model.encode(user_input, convert_to_tensor=False).tolist() #convert to a list

    search_result = client.search(
        collection_name=collection_name,
        query_vector=user_input_embedding,
        limit=top_k,
        with_payload=True,  # Retrieve the verse data
        #score_threshold=0.5 #optional threshold
    )

    results = []
    for hit in search_result:
        results.append({
            'verse': hit.payload['verse'],
            'book_name': hit.payload['book_name'],
            'chapter': hit.payload['chapter'],
            'verse_number': hit.payload['verse_number'],
            'similarity': hit.score  # Qdrant returns similarity score
        })

    return results


def initialize_and_load():
    """
    Initializes the Qdrant client, creates the collection, loads data,
    embeds verses, and stores them in Qdrant.
    """
    client = initialize_qdrant_client()
    model = SentenceTransformer('all-MiniLM-L6-v2')  # Load model once
    vector_size = model.gret_sentence_embedding_dimension()

    create_collection(client, COLLECTION_NAME, vector_size)
    verses = load_bible_data()
    embed_and_store_data(client, COLLECTION_NAME, verses, model)
    print("Qdrant setup complete.")

if __name__ == '__main__':
    # initialize_and_load() # Only run this once to populate the database!!! NEVER RUN AGAIN UNLESS UPDATING THE DATA
    pass # Keep it empty to avoid accidental execution