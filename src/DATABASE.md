# Настройка базы данных Neon PostgreSQL

Полное руководство по настройке базы данных для DocuMind AI

---

## 📋 Содержание

1. [Регистрация и создание проекта](#1-регистрация-и-создание-проекта)
2. [Структура базы данных](#2-структура-базы-данных)
3. [Подключение через SQLAlchemy](#3-подключение-через-sqlalchemy)
4. [Миграции с Alembic](#4-миграции-с-alembic)
5. [Интеграция Gemini AI](#5-интеграция-gemini-ai)
6. [Замена mock данных на реальные](#6-замена-mock-данных-на-реальные)

---

## 1. Регистрация и создание проекта

### Шаг 1.1: Регистрация на Neon

1. Перейдите на [neon.tech](https://neon.tech)
2. Нажмите "Sign Up" и создайте аккаунт через GitHub, Google или email
3. Подтвердите email (если регистрировались через email)

### Шаг 1.2: Создание проекта

1. В панели управления нажмите **"New Project"**
2. Введите название проекта: `DocuMind AI`
3. Выберите регион (ближайший к вашим пользователям)
4. Нажмите **"Create Project"**

### Шаг 1.3: Получение Connection String

После создания проекта вы увидите connection string:

```
postgres://username:password@ep-xxxxx.region.aws.neon.tech/dbname?sslmode=require
```

**Важно:** Скопируйте и сохраните эту строку в безопасном месте!

### Шаг 1.4: Настройка переменных окружения

Создайте файл `.env` в корне проекта:

```env
# Database
NEON_DATABASE_URL=postgres://username:password@ep-xxxxx.region.aws.neon.tech/dbname?sslmode=require

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# App Settings
APP_NAME=DocuMind AI
DEBUG=True
```

---

## 2. Структура базы данных

### Таблица USERS

Хранение информации о пользователях и авторизация.

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    avatar_url TEXT,
    subscription_tier VARCHAR(50) DEFAULT 'free',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Индексы для оптимизации
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);
```

### Таблица DOCUMENTS

Метаданные загруженных документов.

```sql
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    filename VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    file_size BIGINT,
    file_type VARCHAR(50),
    status VARCHAR(50) DEFAULT 'uploaded',
    mime_type VARCHAR(100),
    uploaded_at TIMESTAMP DEFAULT NOW(),
    processed_at TIMESTAMP,
    metadata JSONB
);

-- Индексы
CREATE INDEX idx_documents_user_id ON documents(user_id);
CREATE INDEX idx_documents_status ON documents(status);
CREATE INDEX idx_documents_uploaded_at ON documents(uploaded_at);
CREATE INDEX idx_documents_metadata ON documents USING GIN(metadata);
```

### Таблица CHATS

Хранение чатов с AI.

```sql
CREATE TABLE chats (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255),
    mode VARCHAR(20) DEFAULT 'smart' CHECK (mode IN ('fast', 'smart', 'creative')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Индексы
CREATE INDEX idx_chats_user_id ON chats(user_id);
CREATE INDEX idx_chats_created_at ON chats(created_at);
```

### Таблица MESSAGES

Сообщения в чатах.

```sql
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    chat_id INTEGER REFERENCES chats(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    document_id INTEGER REFERENCES documents(id) ON DELETE SET NULL,
    tokens_used INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Индексы
CREATE INDEX idx_messages_chat_id ON messages(chat_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);
```

### Таблица ANALYSES

Результаты AI-анализов документов.

```sql
CREATE TABLE analyses (
    id SERIAL PRIMARY KEY,
    document_id INTEGER REFERENCES documents(id) ON DELETE CASCADE,
    analysis_type VARCHAR(100) NOT NULL,
    result JSONB NOT NULL,
    confidence_score DECIMAL(5,2),
    processing_time_ms INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Индексы
CREATE INDEX idx_analyses_document_id ON analyses(document_id);
CREATE INDEX idx_analyses_type ON analyses(analysis_type);
CREATE INDEX idx_analyses_result ON analyses USING GIN(result);
```

---

## 3. Подключение через SQLAlchemy

### Установка зависимостей

```bash
pip install sqlalchemy psycopg2-binary python-dotenv
```

### Создание database.py

```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# Загрузка переменных окружения
load_dotenv()

# Получение URL базы данных
DATABASE_URL = os.getenv("NEON_DATABASE_URL")

# Создание engine
engine = create_engine(
    DATABASE_URL,
    pool_size=10,
    max_overflow=20,
    pool_pre_ping=True,  # Проверка соединения перед использованием
    echo=True  # Логирование SQL запросов (отключить в production)
)

# Создание фабрики сессий
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Базовый класс для моделей
Base = declarative_base()

# Dependency для FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

### Создание моделей (models.py)

```python
from sqlalchemy import Column, Integer, String, Text, BigInteger, TIMESTAMP, ForeignKey, Numeric, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    full_name = Column(String(255))
    avatar_url = Column(Text)
    subscription_tier = Column(String(50), default='free')
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())
    
    # Relationships
    documents = relationship("Document", back_populates="user", cascade="all, delete-orphan")
    chats = relationship("Chat", back_populates="user", cascade="all, delete-orphan")

class Document(Base):
    __tablename__ = "documents"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    filename = Column(String(255), nullable=False)
    file_path = Column(Text, nullable=False)
    file_size = Column(BigInteger)
    file_type = Column(String(50))
    status = Column(String(50), default='uploaded')
    mime_type = Column(String(100))
    uploaded_at = Column(TIMESTAMP, server_default=func.now())
    processed_at = Column(TIMESTAMP)
    metadata = Column(JSON)
    
    # Relationships
    user = relationship("User", back_populates="documents")
    analyses = relationship("Analysis", back_populates="document", cascade="all, delete-orphan")

class Chat(Base):
    __tablename__ = "chats"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255))
    mode = Column(String(20), default='smart')
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="chats")
    messages = relationship("Message", back_populates="chat", cascade="all, delete-orphan")

class Message(Base):
    __tablename__ = "messages"
    
    id = Column(Integer, primary_key=True, index=True)
    chat_id = Column(Integer, ForeignKey("chats.id", ondelete="CASCADE"), nullable=False)
    role = Column(String(20), nullable=False)
    content = Column(Text, nullable=False)
    document_id = Column(Integer, ForeignKey("documents.id", ondelete="SET NULL"))
    tokens_used = Column(Integer)
    created_at = Column(TIMESTAMP, server_default=func.now())
    
    # Relationships
    chat = relationship("Chat", back_populates="messages")

class Analysis(Base):
    __tablename__ = "analyses"
    
    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, ForeignKey("documents.id", ondelete="CASCADE"), nullable=False)
    analysis_type = Column(String(100), nullable=False)
    result = Column(JSON, nullable=False)
    confidence_score = Column(Numeric(5, 2))
    processing_time_ms = Column(Integer)
    created_at = Column(TIMESTAMP, server_default=func.now())
    
    # Relationships
    document = relationship("Document", back_populates="analyses")
```

---

## 4. Миграции с Alembic

### Установка Alembic

```bash
pip install alembic
```

### Инициализация Alembic

```bash
alembic init alembic
```

### Настройка alembic.ini

Откройте `alembic.ini` и замените строку `sqlalchemy.url`:

```ini
# sqlalchemy.url = driver://user:pass@localhost/dbname
# Закомментируйте строку выше и используйте env.py для загрузки URL
```

### Настройка alembic/env.py

```python
from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context
import os
from dotenv import load_dotenv

# Загрузка моделей
from database import Base
from models import User, Document, Chat, Message, Analysis

# Загрузка переменных окружения
load_dotenv()

# this is the Alembic Config object
config = context.config

# Установка database URL из переменной окружения
config.set_main_option("sqlalchemy.url", os.getenv("NEON_DATABASE_URL"))

# Interpret the config file for Python logging
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = Base.metadata

def run_migrations_offline() -> None:
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online() -> None:
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection, target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
```

### Создание миграции

```bash
# Создание автоматической миграции на основе моделей
alembic revision --autogenerate -m "Initial migration"

# Применение миграций
alembic upgrade head

# Откат последней миграции
alembic downgrade -1

# Просмотр истории миграций
alembic history
```

---

## 5. Интеграция Gemini AI

### Получение API ключа

1. Перейдите на [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Войдите в аккаунт Google
3. Нажмите **"Get API Key"** → **"Create API Key"**
4. Скопируйте ключ и добавьте в `.env`:

```env
GEMINI_API_KEY=AIzaSy...your_key_here
```

### Установка библиотеки

```bash
pip install google-generativeai
```

### Создание gemini_service.py

```python
import google.generativeai as genai
import os
from typing import Optional, Dict, Any
import json

class GeminiService:
    def __init__(self):
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        self.model = genai.GenerativeModel('gemini-pro')
    
    async def analyze_document(
        self, 
        document_text: str, 
        analysis_type: str = "general"
    ) -> Dict[str, Any]:
        """
        Анализ документа с помощью Gemini AI
        
        Args:
            document_text: Текст документа
            analysis_type: Тип анализа (general, financial, legal, etc.)
        
        Returns:
            Словарь с результатами анализа
        """
        prompts = {
            "general": f"""
            Проанализируй следующий документ и предоставь:
            1. Краткое резюме (3-5 предложений)
            2. Ключевые темы
            3. Основные выводы
            4. Предложения по улучшению
            
            Документ:
            {document_text}
            
            Ответ предоставь в формате JSON.
            """,
            
            "financial": f"""
            Проведи финансовый анализ документа:
            1. Выдели все финансовые показатели
            2. Определи тренды
            3. Выяви риски
            4. Дай рекомендации
            
            Документ:
            {document_text}
            
            Ответ в формате JSON.
            """,
            
            "legal": f"""
            Проведи юридический анализ:
            1. Определи тип договора
            2. Выдели ключевые условия
            3. Найди потенциальные риски
            4. Обрати внимание на важные даты и суммы
            
            Документ:
            {document_text}
            
            Ответ в JSON формате.
            """
        }
        
        prompt = prompts.get(analysis_type, prompts["general"])
        
        try:
            response = self.model.generate_content(prompt)
            
            # Попытка парсинга JSON из ответа
            result_text = response.text
            
            # Очистка markdown форматирования если есть
            if "```json" in result_text:
                result_text = result_text.split("```json")[1].split("```")[0].strip()
            elif "```" in result_text:
                result_text = result_text.split("```")[1].split("```")[0].strip()
            
            result = json.loads(result_text)
            
            return {
                "success": True,
                "analysis": result,
                "tokens_used": response.usage_metadata.total_token_count if hasattr(response, 'usage_metadata') else None
            }
            
        except json.JSONDecodeError:
            # Если не удалось распарсить JSON, возвращаем текст как есть
            return {
                "success": True,
                "analysis": {"raw_text": response.text},
                "tokens_used": None
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    async def chat_with_document(
        self, 
        question: str, 
        document_context: str,
        chat_history: Optional[list] = None
    ) -> str:
        """
        Чат с документом - задать вопрос по содержимому
        """
        prompt = f"""
        Контекст документа:
        {document_context}
        
        История чата:
        {chat_history if chat_history else "Нет предыдущих сообщений"}
        
        Вопрос пользователя:
        {question}
        
        Ответь на вопрос, основываясь на контексте документа.
        """
        
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            return f"Ошибка при обработке запроса: {str(e)}"
    
    async def generate_summary(self, text: str, max_length: int = 500) -> str:
        """
        Генерация краткого резюме документа
        """
        prompt = f"""
        Создай краткое резюме следующего текста (не более {max_length} символов):
        
        {text}
        """
        
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            return f"Ошибка: {str(e)}"

# Создание глобального экземпляра
gemini_service = GeminiService()
```

### Пример использования в FastAPI

```python
from fastapi import FastAPI, Depends, UploadFile, File
from sqlalchemy.orm import Session
from database import get_db
from models import Document, Analysis
from gemini_service import gemini_service
import PyPDF2
from io import BytesIO

app = FastAPI()

@app.post("/api/documents/analyze/{document_id}")
async def analyze_document(
    document_id: int,
    analysis_type: str = "general",
    db: Session = Depends(get_db)
):
    # Получение документа из БД
    document = db.query(Document).filter(Document.id == document_id).first()
    
    if not document:
        return {"error": "Document not found"}
    
    # Чтение файла (пример для PDF)
    with open(document.file_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()
    
    # Анализ через Gemini
    result = await gemini_service.analyze_document(text, analysis_type)
    
    if result["success"]:
        # Сохранение результата в БД
        analysis = Analysis(
            document_id=document_id,
            analysis_type=analysis_type,
            result=result["analysis"],
            confidence_score=95.0  # Можно вычислять динамически
        )
        db.add(analysis)
        db.commit()
        
        return {"success": True, "analysis": result["analysis"]}
    else:
        return {"success": False, "error": result["error"]}
```

---

## 6. Замена mock данных на реальные

### CRUD операции (crud.py)

```python
from sqlalchemy.orm import Session
from models import User, Document, Chat, Message, Analysis
from passlib.context import CryptContext
from typing import Optional, List

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
    file_type: str
) -> Document:
    """Создание записи о документе"""
    document = Document(
        user_id=user_id,
        filename=filename,
        file_path=file_path,
        file_size=file_size,
        file_type=file_type,
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

def update_document_status(db: Session, document_id: int, status: str) -> Document:
    """Обновление статуса документа"""
    document = db.query(Document).filter(Document.id == document_id).first()
    if document:
        document.status = status
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

def create_message(
    db: Session,
    chat_id: int,
    role: str,
    content: str,
    document_id: Optional[int] = None
) -> Message:
    """Создание сообщения в чате"""
    message = Message(
        chat_id=chat_id,
        role=role,
        content=content,
        document_id=document_id
    )
    db.add(message)
    
    # Обновление времени чата
    chat = db.query(Chat).filter(Chat.id == chat_id).first()
    if chat:
        from sqlalchemy import func
        chat.updated_at = func.now()
    
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
    confidence_score: float = None
) -> Analysis:
    """Создание записи об анализе"""
    analysis = Analysis(
        document_id=document_id,
        analysis_type=analysis_type,
        result=result,
        confidence_score=confidence_score
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
```

### Пример FastAPI endpoints (main.py)

```python
from fastapi import FastAPI, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from database import get_db
import crud
from pydantic import BaseModel
import shutil
import os

app = FastAPI(title="DocuMind AI API")

# Pydantic модели для запросов
class UserCreate(BaseModel):
    email: str
    password: str
    full_name: str

class UserLogin(BaseModel):
    email: str
    password: str

# ===== AUTH ENDPOINTS =====

@app.post("/api/auth/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = crud.create_user(
        db=db,
        email=user.email,
        password=user.password,
        full_name=user.full_name
    )
    return {"id": new_user.id, "email": new_user.email}

@app.post("/api/auth/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = crud.authenticate_user(db, email=user.email, password=user.password)
    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    return {
        "id": db_user.id,
        "email": db_user.email,
        "full_name": db_user.full_name
    }

# ===== DOCUMENT ENDPOINTS =====

@app.post("/api/documents/upload")
async def upload_document(
    file: UploadFile = File(...),
    user_id: int = 1,  # В реальном приложении получать из JWT токена
    db: Session = Depends(get_db)
):
    # Сохранение файла
    upload_dir = "uploads"
    os.makedirs(upload_dir, exist_ok=True)
    file_path = os.path.join(upload_dir, file.filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    file_size = os.path.getsize(file_path)
    
    # Создание записи в БД
    document = crud.create_document(
        db=db,
        user_id=user_id,
        filename=file.filename,
        file_path=file_path,
        file_size=file_size,
        file_type=file.content_type
    )
    
    return {
        "id": document.id,
        "filename": document.filename,
        "status": document.status
    }

@app.get("/api/documents")
def get_documents(
    user_id: int = 1,  # Из JWT
    db: Session = Depends(get_db)
):
    documents = crud.get_user_documents(db, user_id=user_id)
    return documents

# ===== CHAT ENDPOINTS =====

@app.post("/api/chats")
def create_chat(
    title: str = "Новый чат",
    user_id: int = 1,  # Из JWT
    db: Session = Depends(get_db)
):
    chat = crud.create_chat(db, user_id=user_id, title=title)
    return chat

@app.get("/api/chats/{chat_id}/messages")
def get_messages(chat_id: int, db: Session = Depends(get_db)):
    messages = crud.get_chat_messages(db, chat_id=chat_id)
    return messages

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

---

## 🎯 Следующие шаги

1. ✅ Настройте базу данных Neon
2. ✅ Создайте таблицы через миграции
3. ✅ Получите API ключ Gemini
4. ✅ Реализуйте CRUD операции
5. ✅ Протестируйте endpoints
6. 🚀 Деплой на production!

---

## 📚 Полезные ссылки

- [Neon Documentation](https://neon.tech/docs/introduction)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [Alembic Tutorial](https://alembic.sqlalchemy.org/en/latest/tutorial.html)
- [Gemini AI Documentation](https://ai.google.dev/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)

---

**Автор:** DocuMind AI Team  
**Дата:** Ноябрь 2024  
**Версия:** 1.0.0
