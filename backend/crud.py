from sqlalchemy.orm import Session
from models import User, Document, Chat, Message, Analysis
from passlib.context import CryptContext
from typing import Optional, List
from datetime import datetime

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ========== USER CRUD ==========

def create_user(db: Session, email: str, password: str, full_name: str) -> User:
    """Создание нового пользователя"""
    password_hash = pwd_context.hash(password)
    user = User(
        email=email,
        password_hash=password_hash,
        full_name=full_name
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def get_user_by_email(db: Session, email: str) -> Optional[User]:
    """Получение пользователя по email"""
    return db.query(User).filter(User.email == email).first()

def get_user_by_id(db: Session, user_id: int) -> Optional[User]:
    """Получение пользователя по ID"""
    return db.query(User).filter(User.id == user_id).first()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Проверка пароля"""
    return pwd_context.verify(plain_password, hashed_password)

def authenticate_user(db: Session, email: str, password: str) -> Optional[User]:
    """Аутентификация пользователя"""
    user = get_user_by_email(db, email)
    if not user or not verify_password(password, user.password_hash):
        return None
    return user

# ========== DOCUMENT CRUD ==========

def create_document(
    db: Session,
    user_id: int,
    filename: str,
    file_path: str,
    file_size: int,
    file_type: str,
    mime_type: str = None
) -> Document:
    """Создание записи о документе"""
    document = Document(
        user_id=user_id,
        filename=filename,
        file_path=file_path,
        file_size=file_size,
        file_type=file_type,
        mime_type=mime_type,
        status='uploaded'
    )
    db.add(document)
    db.commit()
    db.refresh(document)
    return document

def get_user_documents(db: Session, user_id: int, skip: int = 0, limit: int = 100) -> List[Document]:
    """Получение документов пользователя"""
    return db.query(Document)\
        .filter(Document.user_id == user_id)\
        .order_by(Document.uploaded_at.desc())\
        .offset(skip)\
        .limit(limit)\
        .all()

def get_document_by_id(db: Session, document_id: int) -> Optional[Document]:
    """Получение документа по ID"""
    return db.query(Document).filter(Document.id == document_id).first()

def update_document_status(db: Session, document_id: int, status: str) -> Optional[Document]:
    """Обновление статуса документа"""
    document = db.query(Document).filter(Document.id == document_id).first()
    if document:
        document.status = status
        if status == 'processed':
            document.processed_at = datetime.now()
        db.commit()
        db.refresh(document)
    return document

def delete_document(db: Session, document_id: int) -> bool:
    """Удаление документа"""
    document = db.query(Document).filter(Document.id == document_id).first()
    if document:
        db.delete(document)
        db.commit()
        return True
    return False

# ========== CHAT CRUD ==========

def create_chat(db: Session, user_id: int, title: str = "Новый чат", mode: str = "smart") -> Chat:
    """Создание нового чата"""
    chat = Chat(user_id=user_id, title=title, mode=mode)
    db.add(chat)
    db.commit()
    db.refresh(chat)
    return chat

def get_user_chats(db: Session, user_id: int) -> List[Chat]:
    """Получение чатов пользователя"""
    return db.query(Chat)\
        .filter(Chat.user_id == user_id)\
        .order_by(Chat.updated_at.desc())\
        .all()

def get_chat_by_id(db: Session, chat_id: int) -> Optional[Chat]:
    """Получение чата по ID"""
    return db.query(Chat).filter(Chat.id == chat_id).first()

def update_chat_title(db: Session, chat_id: int, title: str) -> Optional[Chat]:
    """Обновление названия чата"""
    chat = db.query(Chat).filter(Chat.id == chat_id).first()
    if chat:
        chat.title = title
        chat.updated_at = datetime.now()
        db.commit()
        db.refresh(chat)
    return chat

def delete_chat(db: Session, chat_id: int) -> bool:
    """Удаление чата"""
    chat = db.query(Chat).filter(Chat.id == chat_id).first()
    if chat:
        db.delete(chat)
        db.commit()
        return True
    return False

# ========== MESSAGE CRUD ==========

def create_message(
    db: Session,
    chat_id: int,
    role: str,
    content: str,
    document_id: Optional[int] = None,
    tokens_used: Optional[int] = None
) -> Message:
    """Создание сообщения в чате"""
    message = Message(
        chat_id=chat_id,
        role=role,
        content=content,
        document_id=document_id,
        tokens_used=tokens_used
    )
    db.add(message)
    
    # Обновление времени чата
    chat = db.query(Chat).filter(Chat.id == chat_id).first()
    if chat:
        chat.updated_at = datetime.now()
    
    db.commit()
    db.refresh(message)
    return message

def get_chat_messages(db: Session, chat_id: int) -> List[Message]:
    """Получение сообщений чата"""
    return db.query(Message)\
        .filter(Message.chat_id == chat_id)\
        .order_by(Message.created_at.asc())\
        .all()

# ========== ANALYSIS CRUD ==========

def create_analysis(
    db: Session,
    document_id: int,
    analysis_type: str,
    result: dict,
    confidence_score: float = None,
    processing_time_ms: int = None
) -> Analysis:
    """Создание записи об анализе"""
    analysis = Analysis(
        document_id=document_id,
        analysis_type=analysis_type,
        result=result,
        confidence_score=confidence_score,
        processing_time_ms=processing_time_ms
    )
    db.add(analysis)
    db.commit()
    db.refresh(analysis)
    return analysis

def get_document_analyses(db: Session, document_id: int) -> List[Analysis]:
    """Получение всех анализов документа"""
    return db.query(Analysis)\
        .filter(Analysis.document_id == document_id)\
        .order_by(Analysis.created_at.desc())\
        .all()

def get_analysis_by_id(db: Session, analysis_id: int) -> Optional[Analysis]:
    """Получение анализа по ID"""
    return db.query(Analysis).filter(Analysis.id == analysis_id).first()