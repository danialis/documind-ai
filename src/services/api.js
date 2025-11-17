// src/services/api.js

const API_BASE_URL = 'http://127.0.0.1:8000';

// Utility function для обработки fetch запросов
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'API request failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// ========== AUTH API ==========

export const authAPI = {
  // Регистрация пользователя
  register: async (email, password, fullName) => {
    return fetchAPI('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        full_name: fullName,
      }),
    });
  },

  // Вход пользователя
  login: async (email, password) => {
    return fetchAPI('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    });
  },
};

// ========== DOCUMENTS API ==========

export const documentsAPI = {
  // Загрузка документа
  upload: async (file, userId = 1) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/api/documents/upload?user_id=${userId}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Upload failed');
    }

    return response.json();
  },

  // Получить список документов
  getAll: async (userId = 1, skip = 0, limit = 100) => {
    return fetchAPI(`/api/documents?user_id=${userId}&skip=${skip}&limit=${limit}`);
  },

  // Получить конкретный документ
  getById: async (documentId) => {
    return fetchAPI(`/api/documents/${documentId}`);
  },

  // Удалить документ
  delete: async (documentId) => {
    return fetchAPI(`/api/documents/${documentId}`, {
      method: 'DELETE',
    });
  },

  // Анализ документа
  analyze: async (documentId, analysisType = 'general') => {
    return fetchAPI(`/api/documents/${documentId}/analyze?analysis_type=${analysisType}`, {
      method: 'POST',
    });
  },

  // Получить все анализы документа
  getAnalyses: async (documentId) => {
    return fetchAPI(`/api/documents/${documentId}/analyses`);
  },
};

// ========== CHATS API ==========

export const chatsAPI = {
  // Создать новый чат
  create: async (title = 'Новый чат', mode = 'smart', userId = 1) => {
    return fetchAPI('/api/chats', {
      method: 'POST',
      body: JSON.stringify({
        title,
        mode,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  // Получить все чаты пользователя
  getAll: async (userId = 1) => {
    return fetchAPI(`/api/chats?user_id=${userId}`);
  },

  // Получить конкретный чат
  getById: async (chatId) => {
    return fetchAPI(`/api/chats/${chatId}`);
  },

  // Получить сообщения чата
  getMessages: async (chatId) => {
    return fetchAPI(`/api/chats/${chatId}/messages`);
  },

  // Отправить сообщение
  sendMessage: async (chatId, content, documentId = null) => {
    return fetchAPI(`/api/chats/${chatId}/messages`, {
      method: 'POST',
      body: JSON.stringify({
        content,
        document_id: documentId,
      }),
    });
  },

  // Удалить чат
  delete: async (chatId) => {
    return fetchAPI(`/api/chats/${chatId}`, {
      method: 'DELETE',
    });
  },
};

// ========== HEALTH CHECK ==========

export const healthAPI = {
  check: async () => {
    return fetchAPI('/health');
  },
};

export default {
  auth: authAPI,
  documents: documentsAPI,
  chats: chatsAPI,
  health: healthAPI,
};