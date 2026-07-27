# RAG Explained Simply

RAG (Retrieval-Augmented Generation) is how you give an LLM access to *your* documents without retraining it.

## The problem it solves

LLMs are trained on data up to a cutoff date and know nothing about *your* codebase, *your* company, or *your* medical knowledge base. You could fine-tune — but that's expensive and the model still can't cite sources.

RAG solves this in four steps.

## The pipeline

**1. Chunk** — Split your documents into small pieces (~500 tokens). Smaller = more precise retrieval.

**2. Embed** — Convert each chunk into a vector (a list of numbers that captures meaning). Store in a vector database like ChromaDB.

**3. Retrieve** — When a user asks a question, embed the question, find the closest chunks by cosine similarity.

**4. Generate** — Pass the retrieved chunks as context to the LLM: `"Answer based on this context: {chunks}"`.

## What I used in Lumi

```python
# Ingest
loader = DirectoryLoader("knowledge-base/", glob="**/*.md")
splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
docs = splitter.split_documents(loader.load())
vectorstore = Chroma.from_documents(docs, OpenAIEmbeddings())

# Retrieve + generate
retriever = vectorstore.as_retriever(search_kwargs={"k": 3})
chain = RetrievalQA.from_chain_type(llm=ChatOpenAI(), retriever=retriever)
```

That's it. The hard part is writing good knowledge base documents — not the code.
