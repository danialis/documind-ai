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
    doc_metadata = Column(JSON)  # <-- исправленное имя
    user = relationship("User", back_populates="documents")
    analyses = relationship("Analysis", back_populates="document", cascade="all, delete-orphan")
    messages = relationship("Message", back_populates="document")

class Chat(Base):
    __tablename__ = "chats"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255))
    mode = Column(String(20), default='smart')
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())
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
    chat = relationship("Chat", back_populates="messages")
    document = relationship("Document", back_populates="messages")

class Analysis(Base):
    __tablename__ = "analyses"
    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, ForeignKey("documents.id", ondelete="CASCADE"), nullable=False)
    analysis_type = Column(String(100), nullable=False)
    result = Column(JSON, nullable=False)
    confidence_score = Column(Numeric(5, 2))
    processing_time_ms = Column(Integer)
    created_at = Column(TIMESTAMP, server_default=func.now())
    document = relationship("Document", back_populates="analyses")
