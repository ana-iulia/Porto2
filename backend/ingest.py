"""
Run once to embed the knowledge base into ChromaDB.
Usage: python ingest.py
"""
from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings
from dotenv import load_dotenv
import os

load_dotenv()

KNOWLEDGE_BASE_PATH = "knowledge-base"
CHROMA_PATH = "chroma_db"


def ingest():
    loader = DirectoryLoader(
        KNOWLEDGE_BASE_PATH,
        glob="**/*.md",
        loader_cls=TextLoader,
        loader_kwargs={"encoding": "utf-8"},
    )
    docs = loader.load()
    print(f"Loaded {len(docs)} documents")

    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    chunks = splitter.split_documents(docs)
    print(f"Split into {len(chunks)} chunks")

    vectorstore = Chroma.from_documents(
        documents=chunks,
        embedding=OpenAIEmbeddings(),
        persist_directory=CHROMA_PATH,
    )
    print(f"Ingested into ChromaDB at '{CHROMA_PATH}'")


if __name__ == "__main__":
    ingest()
