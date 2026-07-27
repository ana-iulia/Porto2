from pydantic import BaseModel
from typing import Optional

class InterviewRequest(BaseModel):
    role: str          # recruiter | collaborator | developer
    detail: str        # their follow-up answer
    freeform: bool = False

class ChatResponse(BaseModel):
    answer: str
    sources: list[str] = []
