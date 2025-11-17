import os
from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context
from dotenv import load_dotenv

# Загрузить переменные окружения
load_dotenv()

# Импорт моделей и Base для Alembic
from database import Base
from models import User, Document, Chat, Message, Analysis

# Эта строка инициализирует Alembic Config
config = context.config

# Передаём строку подключения из .env в конфиг Alembic
config.set_main_option("sqlalchemy.url", os.getenv("NEON_DATABASE_URL"))

# Логгирование
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Поддержка автогенерации миграций на основе metadata
target_metadata = Base.metadata

def run_migrations_offline() -> None:
    """Запуск миграций в режиме 'offline'."""
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
    """Запуск миграций в режиме 'online'."""
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
