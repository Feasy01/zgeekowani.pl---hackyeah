from fastapi import FastAPI, Request, Response
from pydantic import BaseModel
import uuid

from langchain_core.messages import HumanMessage

from llm_stuff import get_rag_chain

app = FastAPI()

rag_chain = get_rag_chain()

chat_histories = {}

class ChatMessage(BaseModel):
    message: str

def generate_session_id():
    return str(uuid.uuid4())

@app.middleware("http")
async def add_session_id(request: Request, call_next):
    print("Middleware")
    session_id = request.cookies.get("session_id")
    if not session_id:
        session_id = generate_session_id()
        response = Response()
        print(session_id)
        response = await call_next(request)
        response.set_cookie(key="session_id", value=session_id)
        return response
    else:
        response = await call_next(request)
        return response

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/chat")
async def chat(message: ChatMessage, request: Request):
    session_id = request.cookies.get("session_id")
    print(session_id)

    human_message = message.message

    if session_id not in chat_histories:
        chat_histories[session_id] = []
    
    ai_message = rag_chain.invoke({"input": human_message, "chat_history": chat_histories[session_id]})
    chat_histories[session_id].extend([HumanMessage(content=human_message), ai_message["answer"]])

    return {"answer": ai_message["answer"]}
