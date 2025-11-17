// src/hooks/useChats.jsx
import { useState, useEffect } from 'react';
import { chatsAPI } from '../services/api';

export function useChats(userId = 1) {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Загрузка списка чатов
  const fetchChats = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await chatsAPI.getAll(userId);
      setChats(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Создание нового чата
  const createChat = async (title = 'Новый чат', mode = 'smart') => {
    setLoading(true);
    setError(null);
    try {
      const newChat = await chatsAPI.create(title, mode, userId);
      await fetchChats();
      setCurrentChat(newChat);
      return newChat;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Загрузка сообщений чата
  const fetchMessages = async (chatId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await chatsAPI.getMessages(chatId);
      setMessages(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Отправка сообщения
  const sendMessage = async (chatId, content, documentId = null) => {
    setLoading(true);
    setError(null);
    try {
      const result = await chatsAPI.sendMessage(chatId, content, documentId);
      await fetchMessages(chatId); // Обновить сообщения
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Удаление чата
  const deleteChat = async (chatId) => {
    setLoading(true);
    setError(null);
    try {
      await chatsAPI.delete(chatId);
      await fetchChats();
      if (currentChat?.id === chatId) {
        setCurrentChat(null);
        setMessages([]);
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Выбрать чат
  const selectChat = async (chat) => {
    setCurrentChat(chat);
    if (chat) {
      await fetchMessages(chat.id);
    } else {
      setMessages([]);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [userId]);

  return {
    chats,
    currentChat,
    messages,
    loading,
    error,
    createChat,
    sendMessage,
    deleteChat,
    selectChat,
    refetch: fetchChats,
  };
}