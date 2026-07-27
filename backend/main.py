import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from dotenv import load_dotenv

from domain.models import InterviewRequest, ChatResponse
from services.rag_service import query

load_dotenv()

app = FastAPI(title="Portfolio AI API")

allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_methods=["POST"],
    allow_headers=["*"],
)

FRONTEND_DIST = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "frontend", "dist")


@app.post("/api/interview", response_model=ChatResponse)
async def interview(req: InterviewRequest):
    """
    Interview mode: visitor provides role + detail,
    AI returns a tailored fit summary from RAG.
    """
    if req.freeform:
        question = req.detail
    else:
        role_labels = {
            "recruiter": "recruiter hiring for",
            "collaborator": "collaborator working on",
            "developer": "developer looking to",
        }
        label = role_labels.get(req.role, req.role)
        question = f"I am a {label}: {req.detail}. Is Ana a good fit? What's relevant about her background?"

    try:
        result = query(question, freeform=req.freeform)
        return ChatResponse(answer=result["answer"], sources=result["sources"])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/health")
async def health():
    return {"status": "ok"}

# Serve frontend static files (must be after all API routes)
if os.path.isdir(FRONTEND_DIST):
    app.mount("/assets", StaticFiles(directory=os.path.join(FRONTEND_DIST, "assets")), name="assets")

    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        file_path = os.path.join(FRONTEND_DIST, full_path)
        if os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse(os.path.join(FRONTEND_DIST, "index.html"))
