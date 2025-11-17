from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel, EmailStr
import shutil
import os
from datetime import datetime

# Импорты из наших модулей
from database import get_db, engine, Base
import crud
from gemini_service import gemini_service

# Создание таблиц в БД
Base.metadata.create_all(bind=engine)

# Инициализация FastAPI приложения
app = FastAPI(
    title="DocuMind AI API",
    description="Backend API для AI Document Assistant",
    version="1.0.0"
)

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # В продакшене указать конкретные домены
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ========== PYDANTIC MODELS ==========

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    full_name: Optional[str]
    subscription_tier: str
    created_at: datetime

    class Config:
        from_attributes = True

class ChatCreate(BaseModel):
    title: str = "Новый чат"
    mode: str = "smart"

class MessageCreate(BaseModel):
    content: str
    document_id: Optional[int] = None

class MessageResponse(BaseModel):
    id: int
    role: str
    content: str
    created_at: datetime

    class Config:
        from_attributes = True

# ========== ROOT ENDPOINT ==========

@app.get("/")
def root():
    """Проверка работоспособности API"""
    return {
        "message": "DocuMind AI Backend работает!",
        "version": "1.0.0",
        "status": "online"
    }

@app.get("/health")
def health_check():
    """Health check для мониторинга"""
    return {"status": "healthy", "timestamp": datetime.now()}

# ========== AUTH ENDPOINTS ==========

@app.post("/api/auth/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(user: UserCreate, db: Session = Depends(get_db)):
    """Регистрация нового пользователя"""
    # Проверка существования пользователя
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(
            status_code=400,
            detail="Email уже зарегистрирован"
        )
    
    # Создание пользователя
    new_user = crud.create_user(
        db=db,
        email=user.email,
        password=user.password,
        full_name=user.full_name
    )
    return new_user

@app.post("/api/auth/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    """Вход пользователя"""
    db_user = crud.authenticate_user(db, email=user.email, password=user.password)
    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Неверный email или пароль"
        )
    
    return {
        "id": db_user.id,
        "email": db_user.email,
        "full_name": db_user.full_name,
        "message": "Успешный вход"
    }

# ========== DOCUMENT ENDPOINTS ==========

@app.post("/api/documents/upload")
async def upload_document(
    file: UploadFile = File(...),
    user_id: int = 1,  # В реальном приложении получать из JWT токена
    db: Session = Depends(get_db)
):
    """Загрузка документа"""
    # Создание папки для загрузок
    upload_dir = "uploads"
    os.makedirs(upload_dir, exist_ok=True)
    
    # Генерация уникального имени файла
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{timestamp}_{file.filename}"
    file_path = os.path.join(upload_dir, unique_filename)
    
    # Сохранение файла
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Ошибка при сохранении файла: {str(e)}"
        )
    
    # Получение размера файла
    file_size = os.path.getsize(file_path)
    
    # Создание записи в БД
    document = crud.create_document(
        db=db,
        user_id=user_id,
        filename=file.filename,
        file_path=file_path,
        file_size=file_size,
        file_type=file_extension,
        mime_type=file.content_type
    )
    
    return {
        "id": document.id,
        "filename": document.filename,
        "file_size": document.file_size,
        "status": document.status,
        "uploaded_at": document.uploaded_at
    }

@app.get("/api/documents")
def get_documents(
    user_id: int = 1,  # Из JWT
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Получение списка документов пользователя"""
    documents = crud.get_user_documents(db, user_id=user_id, skip=skip, limit=limit)
    return documents

@app.get("/api/documents/{document_id}")
def get_document(document_id: int, db: Session = Depends(get_db)):
    """Получение информации о документе"""
    document = crud.get_document_by_id(db, document_id=document_id)
    if not document:
        raise HTTPException(status_code=404, detail="Документ не найден")
    return document

@app.delete("/api/documents/{document_id}")
def delete_document(document_id: int, db: Session = Depends(get_db)):
    """Удаление документа"""
    success = crud.delete_document(db, document_id=document_id)
    if not success:
        raise HTTPException(status_code=404, detail="Документ не найден")
    return {"message": "Документ успешно удалён"}

# ========== CHAT ENDPOINTS ==========

@app.post("/api/chats")
def create_chat(
    chat: ChatCreate,
    user_id: int = 1,  # Из JWT
    db: Session = Depends(get_db)
):
    """Создание нового чата"""
    new_chat = crud.create_chat(
        db=db,
        user_id=user_id,
        title=chat.title,
        mode=chat.mode
    )
    return new_chat

@app.get("/api/chats")
def get_chats(
    user_id: int = 1,  # Из JWT
    db: Session = Depends(get_db)
):
    """Получение списка чатов пользователя"""
    chats = crud.get_user_chats(db, user_id=user_id)
    return chats

@app.get("/api/chats/{chat_id}")
def get_chat(chat_id: int, db: Session = Depends(get_db)):
    """Получение информации о чате"""
    chat = crud.get_chat_by_id(db, chat_id=chat_id)
    if not chat:
        raise HTTPException(status_code=404, detail="Чат не найден")
    return chat

@app.get("/api/chats/{chat_id}/messages", response_model=List[MessageResponse])
def get_messages(chat_id: int, db: Session = Depends(get_db)):
    """Получение сообщений чата"""
    messages = crud.get_chat_messages(db, chat_id=chat_id)
    return messages

@app.post("/api/chats/{chat_id}/messages")
async def send_message(
    chat_id: int,
    message: MessageCreate,
    db: Session = Depends(get_db)
):
    """Отправка сообщения в чат и получение ответа от AI"""
    # Сохранение сообщения пользователя
    user_message = crud.create_message(
        db=db,
        chat_id=chat_id,
        role="user",
        content=message.content,
        document_id=message.document_id
    )
    
    # Получение контекста документа если указан
    document_context = ""
    if message.document_id:
        document = crud.get_document_by_id(db, message.document_id)
        if document:
            # Здесь можно добавить чтение содержимого документа
            document_context = f"Документ: {document.filename}"
    
    # Получение истории чата
    chat_history = crud.get_chat_messages(db, chat_id=chat_id)
    history = [{"role": msg.role, "content": msg.content} for msg in chat_history[-5:]]
    
    # Генерация ответа от AI
    ai_response = await gemini_service.chat_with_document(
        question=message.content,
        document_context=document_context,
        chat_history=history
    )
    
    if not ai_response["success"]:
        raise HTTPException(
            status_code=500,
            detail=f"Ошибка AI: {ai_response.get('error')}"
        )
    
    # Сохранение ответа AI
    ai_message = crud.create_message(
        db=db,
        chat_id=chat_id,
        role="assistant",
        content=ai_response["answer"]
    )
    
    return {
        "user_message": user_message,
        "ai_message": ai_message
    }

@app.delete("/api/chats/{chat_id}")
def delete_chat(chat_id: int, db: Session = Depends(get_db)):
    """Удаление чата"""
    success = crud.delete_chat(db, chat_id=chat_id)
    if not success:
        raise HTTPException(status_code=404, detail="Чат не найден")
    return {"message": "Чат успешно удалён"}

# ========== ANALYSIS ENDPOINTS ==========

@app.post("/api/documents/{document_id}/analyze")
async def analyze_document(
    document_id: int,
    analysis_type: str = "general",
    db: Session = Depends(get_db)
):
    """Анализ документа с помощью AI"""
    # Получение документа
    document = crud.get_document_by_id(db, document_id=document_id)
    if not document:
        raise HTTPException(status_code=404, detail="Документ не найден")
    
    # Чтение содержимого файла (базовая реализация для текстовых файлов)
    try:
        with open(document.file_path, 'r', encoding='utf-8') as f:
            text = f.read()
    except Exception as e:
        # Для PDF и других форматов нужна дополнительная обработка
        text = f"Содержимое документа {document.filename}"
    
    # Анализ через Gemini AI
    result = await gemini_service.analyze_document(text, analysis_type)
    
    if not result["success"]:
        raise HTTPException(
            status_code=500,
            detail=f"Ошибка анализа: {result.get('error')}"
        )
    
    # Сохранение результата
    analysis = crud.create_analysis(
        db=db,
        document_id=document_id,
        analysis_type=analysis_type,
        result=result["analysis"],
        confidence_score=95.0
    )
    
    # Обновление статуса документа
    crud.update_document_status(db, document_id, "processed")
    
    return {
        "analysis_id": analysis.id,
        "document_id": document_id,
        "analysis_type": analysis_type,
        "result": analysis.result,
        "created_at": analysis.created_at
    }

@app.get("/api/documents/{document_id}/analyses")
def get_analyses(document_id: int, db: Session = Depends(get_db)):
    """Получение всех анализов документа"""
    analyses = crud.get_document_analyses(db, document_id=document_id)
    return analyses

# ========== ЗАПУСК ПРИЛОЖЕНИЯ ==========

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)