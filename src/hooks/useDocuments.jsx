// src/hooks/useDocuments.jsx
import { useState, useEffect } from 'react';
import { documentsAPI } from '../services/api';

export function useDocuments(userId = 1) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Загрузка списка документов
  const fetchDocuments = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await documentsAPI.getAll(userId);
      setDocuments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Загрузка документа
  const uploadDocument = async (file) => {
    setLoading(true);
    setError(null);
    try {
      const result = await documentsAPI.upload(file, userId);
      await fetchDocuments(); // Обновить список
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Удаление документа
  const deleteDocument = async (documentId) => {
    setLoading(true);
    setError(null);
    try {
      await documentsAPI.delete(documentId);
      await fetchDocuments(); // Обновить список
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Анализ документа
  const analyzeDocument = async (documentId, analysisType = 'general') => {
    setLoading(true);
    setError(null);
    try {
      const result = await documentsAPI.analyze(documentId, analysisType);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [userId]);

  return {
    documents,
    loading,
    error,
    uploadDocument,
    deleteDocument,
    analyzeDocument,
    refetch: fetchDocuments,
  };
}