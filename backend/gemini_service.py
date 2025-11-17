import google.generativeai as genai
import os
from typing import Optional, Dict, Any
import json
from dotenv import load_dotenv

# Загрузка переменных окружения
load_dotenv()

class GeminiService:
    def __init__(self):
        """Инициализация сервиса Gemini AI"""
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY не найден в переменных окружения")
        
        genai.configure(api_key=api_key)
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
            {document_text[:5000]}  # Ограничение для избежания превышения лимитов
            
            Ответ предоставь в формате JSON со следующими ключами:
            - summary (резюме)
            - key_topics (список ключевых тем)
            - conclusions (основные выводы)
            - suggestions (предложения)
            """,
            
            "financial": f"""
            Проведи финансовый анализ документа:
            1. Выдели все финансовые показатели
            2. Определи тренды
            3. Выяви риски
            4. Дай рекомендации
            
            Документ:
            {document_text[:5000]}
            
            Ответ в формате JSON с ключами:
            - financial_metrics (финансовые показатели)
            - trends (тренды)
            - risks (риски)
            - recommendations (рекомендации)
            """,
            
            "legal": f"""
            Проведи юридический анализ:
            1. Определи тип договора
            2. Выдели ключевые условия
            3. Найди потенциальные риски
            4. Обрати внимание на важные даты и суммы
            
            Документ:
            {document_text[:5000]}
            
            Ответ в JSON формате с ключами:
            - document_type (тип документа)
            - key_terms (ключевые условия)
            - risks (риски)
            - important_dates (важные даты)
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
            
            try:
                result = json.loads(result_text)
            except json.JSONDecodeError:
                # Если не удалось распарсить JSON, возвращаем текст как есть
                result = {"raw_text": result_text}
            
            return {
                "success": True,
                "analysis": result,
                "analysis_type": analysis_type
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
    ) -> Dict[str, Any]:
        """
        Чат с документом - задать вопрос по содержимому
        
        Args:
            question: Вопрос пользователя
            document_context: Контекст документа
            chat_history: История предыдущих сообщений
        
        Returns:
            Ответ AI
        """
        history_text = ""
        if chat_history:
            for msg in chat_history[-5:]:  # Последние 5 сообщений
                role = "Пользователь" if msg.get("role") == "user" else "AI"
                history_text += f"{role}: {msg.get('content')}\n"
        
        prompt = f"""
        Контекст документа:
        {document_context[:3000]}
        
        История чата:
        {history_text if history_text else "Нет предыдущих сообщений"}
        
        Вопрос пользователя:
        {question}
        
        Ответь на вопрос, основываясь на контексте документа. Если информации недостаточно, так и скажи.
        """
        
        try:
            response = self.model.generate_content(prompt)
            return {
                "success": True,
                "answer": response.text
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    async def generate_summary(self, text: str, max_length: int = 500) -> Dict[str, Any]:
        """
        Генерация краткого резюме документа
        
        Args:
            text: Текст для резюмирования
            max_length: Максимальная длина резюме
        
        Returns:
            Резюме текста
        """
        prompt = f"""
        Создай краткое резюме следующего текста (не более {max_length} символов):
        
        {text[:5000]}
        
        Резюме должно быть информативным и содержать основные идеи.
        """
        
        try:
            response = self.model.generate_content(prompt)
            return {
                "success": True,
                "summary": response.text
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }

# Создание глобального экземпляра сервиса
gemini_service = GeminiService()