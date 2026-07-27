from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate

CHROMA_PATH = "chroma_db"

SYSTEM_PROMPT = PromptTemplate(
    input_variables=["context", "question"],
    template="""You are Ana's portfolio assistant. Answer ONLY based on the context below.
Be specific, honest, and concise. If something is not in the context, say so directly.
Always write in first person as if you are Ana.

Context:
{context}

Question: {question}

Answer:"""
)

INTERVIEW_PROMPT = PromptTemplate(
    input_variables=["context", "question"],
    template="""You are Ana's portfolio assistant conducting a tailored interview.
Based on the visitor's role and interest, provide a personalised summary of Ana's fit.
Be honest — mention both strengths AND any gaps. Keep it to 3-4 paragraphs.
Use the context below as the ONLY source of facts.

Context:
{context}

Visitor info: {question}

Tailored response:"""
)


def get_rag_chain(freeform: bool = False):
    vectorstore = Chroma(
        persist_directory=CHROMA_PATH,
        embedding_function=OpenAIEmbeddings(),
    )
    retriever = vectorstore.as_retriever(search_kwargs={"k": 4})
    llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.3)
    prompt = SYSTEM_PROMPT if freeform else INTERVIEW_PROMPT
    return RetrievalQA.from_chain_type(
        llm=llm,
        retriever=retriever,
        chain_type="stuff",
        return_source_documents=True,
        chain_type_kwargs={"prompt": prompt},
    )


def query(question: str, freeform: bool = False) -> dict:
    chain = get_rag_chain(freeform=freeform)
    result = chain.invoke({"query": question})
    sources = list({
        doc.metadata.get("source", "").split("/")[-1]
        for doc in result.get("source_documents", [])
    })
    return {"answer": result["result"], "sources": sources}
