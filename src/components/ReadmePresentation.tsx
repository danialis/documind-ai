import { ArrowLeft, Sparkles, Code, Database, Server, Cpu, Lock, Zap, FileText, MessageSquare, BarChart3, Download, Github, ExternalLink } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export function ReadmePresentation() {
  const handleBack = () => {
    window.history.back();
  };

  const features = [
    { icon: MessageSquare, text: 'AI-чат с документами' },
    { icon: BarChart3, text: 'Интеллектуальный анализ' },
    { icon: FileText, text: 'Поддержка PDF, DOCX, изображений' },
    { icon: Sparkles, text: 'Генерация контента' },
    { icon: Zap, text: 'Быстрая обработка' },
    { icon: Lock, text: 'Безопасное хранение' },
  ];

  const components = [
    {
      component: 'Frontend',
      tech: 'React + Vite',
      description: 'UI, формы, отображение данных',
      color: 'gradient-purple',
    },
    {
      component: 'API Server',
      tech: 'FastAPI',
      description: 'Обработка запросов, бизнес-логика',
      color: 'gradient-cyan',
    },
    {
      component: 'AI Integration',
      tech: 'Gemini API',
      description: 'Анализ документов, ответы AI',
      color: 'gradient-pink',
    },
    {
      component: 'Database',
      tech: 'Neon PostgreSQL',
      description: 'Хранение данных пользователей и документов',
      color: 'gradient-green',
    },
    {
      component: 'Task Queue',
      tech: 'Celery + Redis',
      description: 'Асинхронная обработка тяжёлых задач',
      color: 'gradient-purple',
    },
    {
      component: 'File Storage',
      tech: 'S3/Local',
      description: 'Хранение загруженных файлов',
      color: 'gradient-cyan',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-cyan-50 p-8">
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
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl gradient-purple mb-6 glow float">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="gradient-text mb-4 text-5xl">DocuMind AI</h1>
          <p className="text-xl text-gray-600 mb-6">
            Умный AI-ассистент для работы с документами
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge className="bg-purple-100 text-purple-700 px-3 py-1 text-sm">Python</Badge>
            <Badge className="bg-cyan-100 text-cyan-700 px-3 py-1 text-sm">FastAPI</Badge>
            <Badge className="bg-pink-100 text-pink-700 px-3 py-1 text-sm">React</Badge>
            <Badge className="bg-green-100 text-green-700 px-3 py-1 text-sm">Gemini AI</Badge>
            <Badge className="bg-blue-100 text-blue-700 px-3 py-1 text-sm">PostgreSQL</Badge>
            <Badge className="bg-purple-100 text-purple-700 px-3 py-1 text-sm">Neon DB</Badge>
          </div>
        </Card>

        {/* О проекте */}
        <Card className="premium-card p-8 border-0 gradient-border">
          <h2 className="text-gray-900 mb-4">📖 О проекте</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            DocuMind AI - это современное веб-приложение для работы с документами, использующее возможности 
            искусственного интеллекта. Система позволяет загружать документы, анализировать их содержимое, 
            генерировать контент и взаимодействовать с AI-ассистентом через удобный интерфейс.
          </p>
          
          <h3 className="font-semibold text-gray-900 mb-4">Ключевые возможности</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-cyan-50">
                  <div className="w-10 h-10 rounded-lg gradient-purple flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">{feature.text}</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Архитектура системы */}
        <Card className="premium-card p-8 border-0 gradient-border">
          <h2 className="text-gray-900 mb-6">🏗️ Архитектура системы</h2>
          
          {/* Visual Schema */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Frontend */}
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-0 hover-lift">
              <div className="w-12 h-12 rounded-xl gradient-purple flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-purple-900 mb-2">Frontend</h3>
              <p className="text-sm text-purple-700 mb-3">React</p>
              <ul className="text-xs text-purple-600 space-y-1">
                <li>• Веб-интерфейс</li>
                <li>• Redux/Zustand</li>
                <li>• Axios для API</li>
                <li>• React Router</li>
              </ul>
            </Card>

            {/* Backend */}
            <Card className="p-6 bg-gradient-to-br from-cyan-50 to-cyan-100 border-0 hover-lift">
              <div className="w-12 h-12 rounded-xl gradient-cyan flex items-center justify-center mb-4">
                <Server className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-cyan-900 mb-2">Backend</h3>
              <p className="text-sm text-cyan-700 mb-3">FastAPI + Python</p>
              <ul className="text-xs text-cyan-600 space-y-1">
                <li>• REST API endpoints</li>
                <li>• Gemini AI</li>
                <li>• Обработка файлов</li>
                <li>• JWT Auth</li>
              </ul>
            </Card>

            {/* Database */}
            <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-0 hover-lift">
              <div className="w-12 h-12 rounded-xl gradient-green flex items-center justify-center mb-4">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-green-900 mb-2">Database</h3>
              <p className="text-sm text-green-700 mb-3">Neon PostgreSQL</p>
              <ul className="text-xs text-green-600 space-y-1">
                <li>• users</li>
                <li>• documents</li>
                <li>• chats</li>
                <li>• messages</li>
              </ul>
            </Card>

            {/* AI Services */}
            <Card className="p-6 bg-gradient-to-br from-pink-50 to-pink-100 border-0 hover-lift">
              <div className="w-12 h-12 rounded-xl gradient-pink flex items-center justify-center mb-4">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-pink-900 mb-2">AI Services</h3>
              <p className="text-sm text-pink-700 mb-3">External APIs</p>
              <ul className="text-xs text-pink-600 space-y-1">
                <li>• Gemini AI API</li>
                <li>• Telegram Bot</li>
                <li>• File Storage</li>
                <li>• Celery + Redis</li>
              </ul>
            </Card>
          </div>
        </Card>

        {/* Компоненты и их роль */}
        <Card className="premium-card p-8 border-0 gradient-border">
          <h2 className="text-gray-900 mb-6">⚙️ Компоненты и их роль</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Компонент</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Технология</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">За что отвечает</th>
                </tr>
              </thead>
              <tbody>
                {components.map((comp, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${comp.color}`} />
                        <span className="font-semibold text-gray-900">{comp.component}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className="bg-gray-100 text-gray-700 border-0">{comp.tech}</Badge>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{comp.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Установка и запуск */}
        <Card className="premium-card p-8 border-0 gradient-border">
          <h2 className="text-gray-900 mb-6">🚀 Установка и запуск</h2>
          
          <div className="space-y-6">
            {/* Requirements */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Требования</h3>
              <div className="flex gap-3">
                <Badge className="bg-purple-100 text-purple-700 px-4 py-2">Python 3.10+</Badge>
                <Badge className="bg-cyan-100 text-cyan-700 px-4 py-2">Node.js 18+</Badge>
                <Badge className="bg-green-100 text-green-700 px-4 py-2">PostgreSQL</Badge>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg gradient-purple flex items-center justify-center text-white font-bold flex-shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Клонирование репозитория</h4>
                    <code className="block p-3 bg-gray-900 text-green-400 rounded-lg text-sm overflow-x-auto">
                      git clone https://github.com/your-repo/documind-ai.git
                    </code>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg gradient-cyan flex items-center justify-center text-white font-bold flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Установка зависимостей</h4>
                    <code className="block p-3 bg-gray-900 text-green-400 rounded-lg text-sm overflow-x-auto mb-2">
                      # Backend<br />
                      cd backend<br />
                      pip install -r requirements.txt
                    </code>
                    <code className="block p-3 bg-gray-900 text-green-400 rounded-lg text-sm overflow-x-auto">
                      # Frontend<br />
                      cd frontend<br />
                      npm install
                    </code>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg gradient-pink flex items-center justify-center text-white font-bold flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Настройка .env</h4>
                    <code className="block p-3 bg-gray-900 text-green-400 rounded-lg text-sm overflow-x-auto">
                      GEMINI_API_KEY=your_api_key<br />
                      NEON_DATABASE_URL=your_database_url<br />
                      JWT_SECRET=your_secret_key
                    </code>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg gradient-green flex items-center justify-center text-white font-bold flex-shrink-0">
                    4
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Запуск проекта</h4>
                    <code className="block p-3 bg-gray-900 text-green-400 rounded-lg text-sm overflow-x-auto mb-2">
                      # Backend<br />
                      uvicorn main:app --reload
                    </code>
                    <code className="block p-3 bg-gray-900 text-green-400 rounded-lg text-sm overflow-x-auto">
                      # Frontend<br />
                      npm run dev
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Footer Links */}
        <div className="flex justify-center gap-4">
          <Button className="gradient-purple text-white border-0 hover-scale">
            <Github className="w-5 h-5 mr-2" />
            GitHub Repository
          </Button>
          <Button variant="outline" className="border-gray-200 hover:bg-white">
            <Download className="w-5 h-5 mr-2" />
            Download Docs
          </Button>
        </div>
      </div>
    </div>
  );
}
