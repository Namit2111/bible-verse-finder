from langchain_core.prompts.chat import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough, RunnableParallel
from langchain_groq import ChatGroq
from operator import itemgetter

import os
from dotenv import load_dotenv


load_dotenv(override=True)

from chatbot.qdrantdb import vector_store  # qdrant_search

os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")
# from openai_utils import stream_completion

model = ChatGroq(
    groq_api_key=os.getenv("GROQ_API_KEY"),
    model_name="llama-3.1-70b-versatile",
)

prompt_template = """
Answer the question based on the context, in a concise manner, in markdown and using bullet points where applicable.

Context: {context}
Question: {question}
Answer:
"""

prompt = ChatPromptTemplate.from_template(prompt_template)

retriever = vector_store.as_retriever()


def create_chain():
    chain = {
        "context": retriever.with_config(top_k=4),
        "question": RunnablePassthrough(),
    } | RunnableParallel(
        {
            "response": prompt | model,
            "context": itemgetter("context"),
        }
    )
    return chain


def get_answer_and_docs(question: str):
    chain = create_chain()
    response = chain.invoke(question)
    answer = response["response"].content
    context = response["context"]
    return {"answer": answer, "context": context}


response = get_answer_and_docs("How was Jesus born?")
print(response)
