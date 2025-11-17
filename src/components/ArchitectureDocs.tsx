import { ArrowLeft, Database, Server, Check, Code, Shield, Zap, FileText, MessageSquare, User, BarChart3, ExternalLink } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export function ArchitectureDocs() {
  const handleBack = () => {
    window.history.back();
  };

  const tables = [
    {
      name: 'users',
      icon: User,
      color: 'gradient-purple',
      description: 'Хранение пользователей, авторизация',
      schema: `CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);`,
    },
    {
      name: 'documents',
      icon: FileText,
      color: 'gradient-cyan',
      description: 'Метаданные загруженных документов',
      schema: `CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  filename VARCHAR(255) NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT,
  file_type VARCHAR(50),
  status VARCHAR(50) DEFAULT 'uploaded',
  uploaded_at TIMESTAMP DEFAULT NOW()
);`,
    },
    {
      name: 'chats',
      icon: MessageSquare,
      color: 'gradient-pink',
      description: 'Хранение чатов с AI',
      schema: `CREATE TABLE chats (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);`,
    },
    {
      name: 'messages',
      icon: MessageSquare,
      color: 'gradient-green',
      description: 'Сообщения в чатах',
      schema: `CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  chat_id INTEGER REFERENCES chats(id),
  role VARCHAR(20) CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  document_id INTEGER REFERENCES documents(id),
  created_at TIMESTAMP DEFAULT NOW()
);`,
    },
    {
      name: 'analyses',
      icon: BarChart3,
      color: 'gradient-purple',
      description: 'Результаты AI-анализов документов',
      schema: `CREATE TABLE analyses (
  id SERIAL PRIMARY KEY,
  document_id INTEGER REFERENCES documents(id),
  analysis_type VARCHAR(100),
  result JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);`,
    },
  ];

  const advantages = [
    'Serverless архитектура - оплата только за использование',
    'Автоматическое масштабирование под нагрузку',
    'Встроенные бэкапы и восстановление',
    'Поддержка PostgreSQL 15+',
    'Branching для разработки и тестирования',
  ];

  const securityTips = [
    { icon: Shield, text: 'Не храните пароли в открытом виде - используйте хэширование' },
    { icon: Shield, text: 'Используйте переменные окружения для чувствительных данных' },
    { icon: Shield, text: 'Ограничьте доступ к БД по IP-адресам' },
    { icon: Shield, text: 'Регулярно обновляйте пароли и токены доступа' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8 slide-up">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={handleBack}
            variant="outline"
            size="sm"
            className="border-gray-200 hover:bg-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад
          </Button>
        </div>

        {/* Title Card */}
        <Card className="premium-card p-10 border-0 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl gradient-cyan mb-6 glow float">
            <Database className="w-10 h-10 text-white" />
          </div>
          <h1 className="gradient-text mb-4 text-5xl">Database Setup</h1>
          <p className="text-xl text-gray-600">
            Настройка базы данных Neon PostgreSQL для DocuMind AI
          </p>
        </Card>

        {/* Что такое Neon */}
        <Card className="premium-card p-8 border-0 gradient-border">
          <h2 className="text-gray-900 mb-4">💡 Что такое Neon?</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Neon - это современная serverless PostgreSQL платформа, которая предлагает автоматическое 
            масштабирование, моментальное создание копий баз данных (branching) и оплату только за 
            фактическое использование. Идеально подходит для современных веб-приложений.
          </p>
          
          <h3 className="font-semibold text-gray-900 mb-4">Преимущества для проекта</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {advantages.map((advantage, index) => (
              <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-cyan-50 to-blue-50">
                <Check className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{advantage}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Создание базы данных */}
        <Card className="premium-card p-8 border-0 gradient-border">
          <h2 className="text-gray-900 mb-6">🚀 Создание базы данных</h2>
          
          <div className="space-y-4">
            <div className="p-5 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg gradient-purple flex items-center justify-center text-white font-bold flex-shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-purple-900 mb-2">Регистрация на Neon</h4>
                  <p className="text-purple-700 text-sm mb-3">
                    Перейдите на <a href="https://neon.tech" target="_blank" rel="noopener noreferrer" className="underline font-semibold">neon.tech</a> и создайте бесплатный аккаунт
                  </p>
                  <Button size="sm" className="gradient-purple text-white border-0">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Открыть Neon.tech
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-5 bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg gradient-cyan flex items-center justify-center text-white font-bold flex-shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-cyan-900 mb-2">Создайте новый проект</h4>
                  <p className="text-cyan-700 text-sm">
                    В панели управления нажмите "New Project" и введите название "DocuMind AI"
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 bg-gradient-to-r from-pink-50 to-pink-100 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg gradient-pink flex items-center justify-center text-white font-bold flex-shrink-0">
                  3
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-pink-900 mb-2">Скопируйте connection string</h4>
                  <p className="text-pink-700 text-sm mb-3">
                    После создания проекта скопируйте строку подключения
                  </p>
                  <code className="block p-3 bg-gray-900 text-green-400 rounded-lg text-sm overflow-x-auto">
                    postgres://user:password@ep-xxx.neon.tech/dbname?sslmode=require
                  </code>
                </div>
              </div>
            </div>

            <div className="p-5 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg gradient-green flex items-center justify-center text-white font-bold flex-shrink-0">
                  4
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-green-900 mb-2">Добавьте в .env файл</h4>
                  <code className="block p-3 bg-gray-900 text-green-400 rounded-lg text-sm overflow-x-auto">
                    NEON_DATABASE_URL=postgres://user:password@ep-xxx.neon.tech/dbname?sslmode=require
                  </code>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Структура базы данных */}
        <Card className="premium-card p-8 border-0 gradient-border">
          <h2 className="text-gray-900 mb-6">🗄️ Структура базы данных</h2>
          
          <div className="space-y-6">
            {tables.map((table, index) => {
              const Icon = table.icon;
              return (
                <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden hover-lift">
                  {/* Table Header */}
                  <div className={`${table.color} p-5 text-white`}>
                    <div className="flex items-center gap-3">
                      <Icon className="w-6 h-6" />
                      <h3 className="text-xl font-bold">Таблица {table.name.toUpperCase()}</h3>
                    </div>
                    <p className="text-white/90 text-sm mt-2">{table.description}</p>
                  </div>
                  
                  {/* Schema Code */}
                  <div className="p-5 bg-gray-50">
                    <code className="block p-4 bg-gray-900 text-green-400 rounded-lg text-sm overflow-x-auto whitespace-pre">
                      {table.schema}
                    </code>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Подключение из Python */}
        <Card className="premium-card p-8 border-0 gradient-border">
          <h2 className="text-gray-900 mb-6">🐍 Подключение из Python</h2>
          
          <div className="space-y-4">
            <p className="text-gray-600">
              Используйте SQLAlchemy для работы с базой данных:
            </p>
            
            <code className="block p-5 bg-gray-900 text-green-400 rounded-xl text-sm overflow-x-auto whitespace-pre">
{`from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os

# Получаем URL из переменных окружения
DATABASE_URL = os.getenv("NEON_DATABASE_URL")

# Создаём engine
engine = create_engine(DATABASE_URL)

# Создаём фабрику сессий
SessionLocal = sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False
)

# Использование
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()`}
            </code>
          </div>
        </Card>

        {/* Миграции с Alembic */}
        <Card className="premium-card p-8 border-0 gradient-border">
          <h2 className="text-gray-900 mb-6">🔄 Миграции с Alembic</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-purple-50 rounded-xl">
              <h4 className="font-semibold text-purple-900 mb-2">Установка Alembic</h4>
              <code className="block p-3 bg-gray-900 text-green-400 rounded-lg text-sm">
                pip install alembic
              </code>
            </div>

            <div className="p-4 bg-cyan-50 rounded-xl">
              <h4 className="font-semibold text-cyan-900 mb-2">Инициализация</h4>
              <code className="block p-3 bg-gray-900 text-green-400 rounded-lg text-sm">
                alembic init alembic
              </code>
            </div>

            <div className="p-4 bg-pink-50 rounded-xl">
              <h4 className="font-semibold text-pink-900 mb-2">Создание миграции</h4>
              <code className="block p-3 bg-gray-900 text-green-400 rounded-lg text-sm">
                alembic revision --autogenerate -m "Initial migration"
              </code>
            </div>

            <div className="p-4 bg-green-50 rounded-xl">
              <h4 className="font-semibold text-green-900 mb-2">Применение миграций</h4>
              <code className="block p-3 bg-gray-900 text-green-400 rounded-lg text-sm">
                alembic upgrade head
              </code>
            </div>
          </div>
        </Card>

        {/* Безопасность */}
        <Card className="premium-card p-8 border-0 gradient-border bg-gradient-to-r from-red-50 to-orange-50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-gray-900">🔒 Безопасность</h2>
          </div>
          
          <div className="space-y-3">
            {securityTips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-xl">
                  <Icon className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{tip.text}</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Quick Links */}
        <div className="flex justify-center gap-4">
          <Button className="gradient-cyan text-white border-0 hover-scale">
            <ExternalLink className="w-5 h-5 mr-2" />
            Neon Documentation
          </Button>
          <Button className="gradient-purple text-white border-0 hover-scale">
            <Code className="w-5 h-5 mr-2" />
            SQLAlchemy Docs
          </Button>
        </div>
      </div>
    </div>
  );
}
