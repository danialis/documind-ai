import { useState } from 'react';
import { Send, Mic, Plus, Copy, ThumbsUp, ThumbsDown, Sparkles, Zap, Brain, BarChart3, Paperclip } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface Message {
  id: string;
  type: 'user' | 'ai';
  text: string;
  time: string;
  document?: string;
  hasChart?: boolean;
}

export function AIChat() {
  const [aiMode, setAiMode] = useState<'fast' | 'smart' | 'creative'>('smart');
  const [isListening, setIsListening] = useState(false);

  const messages: Message[] = [
    {
      id: '1',
      type: 'ai',
      text: 'Здравствуйте! Я AI-ассистент DocuMind. Чем могу помочь вам сегодня?',
      time: '10:15',
    },
    {
      id: '2',
      type: 'user',
      text: 'Привет! Я загрузил квартальный отчёт. Можешь проанализировать ключевые финансовые показатели?',
      time: '10:20',
      document: 'Квартальный отчёт Q3 2024.pdf',
    },
    {
      id: '3',
      type: 'ai',
      text: 'Конечно! Я проанализировал ваш квартальный отчёт Q3 2024. Вот ключевые показатели:\n\n📊 Финансовые показатели:\n• Выручка: $4.2M (+15% к предыдущему кварталу)\n• Чистая прибыль: $890K (+22%)\n• EBITDA: $1.1M (+18%)\n\n✅ Положительные тренды:\n• Рост выручки за счёт новых клиентов\n• Улучшение маржинальности\n• Сокращение дебиторской задолженности',
      time: '10:22',
      hasChart: true,
    },
  ];

  const suggestedQuestions = [
    'Какая сумма контракта?',
    'Найди упоминания рисков',
    'Создай краткое резюме',
    'Сравни с прошлым периодом',
  ];

  const aiModes = [
    { id: 'fast', label: 'Быстрый', icon: Zap, color: 'gradient-cyan' },
    { id: 'smart', label: 'Умный', icon: Brain, color: 'gradient-purple' },
    { id: 'creative', label: 'Креативный', icon: Sparkles, color: 'gradient-pink' },
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl gradient-purple flex items-center justify-center float">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-gray-900 text-lg">AI Assistant</h2>
                <Badge className="bg-green-50 text-green-700 border-0 text-xs">
                  ● Online
                </Badge>
              </div>
            </div>
            <Button className="gradient-purple text-white border-0 hover-scale">
              <Plus className="w-5 h-5 mr-2" />
              Новый чат
            </Button>
          </div>

          {/* AI Mode Selector */}
          <div className="flex gap-2">
            {aiModes.map((mode) => {
              const Icon = mode.icon;
              const isActive = aiMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => setAiMode(mode.id as any)}
                  className={`
                    flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all font-medium
                    ${isActive 
                      ? `${mode.color} text-white shadow-lg` 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{mode.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${message.type === 'user' ? 'flex-row-reverse' : ''} slide-up`}
            >
              {/* Avatar */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                message.type === 'ai' 
                  ? 'gradient-purple' 
                  : 'gradient-cyan'
              }`}>
                {message.type === 'ai' ? (
                  <Sparkles className="w-5 h-5 text-white" />
                ) : (
                  <span className="text-white font-bold text-sm">АП</span>
                )}
              </div>

              {/* Message Content */}
              <div className={`flex-1 max-w-3xl ${message.type === 'user' ? 'text-right' : ''}`}>
                {message.document && (
                  <Card className="premium-card p-3 border-0 mb-2 inline-flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg gradient-cyan flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-900 text-sm font-medium">{message.document}</span>
                  </Card>
                )}

                <Card className={`premium-card p-5 border-0 ${
                  message.type === 'user' ? 'inline-block text-left gradient-cyan' : 'bg-white'
                }`}>
                  <p className={`whitespace-pre-wrap leading-relaxed ${
                    message.type === 'user' ? 'text-white' : 'text-gray-700'
                  }`}>{message.text}</p>
                  
                  {message.hasChart && (
                    <Card className="mt-5 p-5 bg-gradient-to-br from-purple-50 to-cyan-50 border-0">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-semibold text-gray-900">Визуализация данных</span>
                        <BarChart3 className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="h-40 flex items-end gap-3">
                        {[65, 80, 75, 90, 70].map((height, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-2">
                            <div 
                              className="w-full gradient-purple rounded-t-lg transition-all hover:opacity-80 cursor-pointer"
                              style={{ height: `${height}%` }}
                            />
                            <span className="text-xs text-gray-600 font-medium">Q{i + 1}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}
                </Card>

                <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                  <span>{message.time}</span>
                  {message.type === 'ai' && (
                    <div className="flex gap-2">
                      <button className="hover:text-purple-600 transition-colors">
                        <ThumbsUp className="w-3.5 h-3.5" />
                      </button>
                      <button className="hover:text-purple-600 transition-colors">
                        <ThumbsDown className="w-3.5 h-3.5" />
                      </button>
                      <button className="hover:text-purple-600 transition-colors">
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* AI Typing Indicator */}
          <div className="flex gap-4 slide-up">
            <div className="w-10 h-10 rounded-xl gradient-purple flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <Card className="premium-card p-5 border-0">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2.5 h-2.5 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </Card>
          </div>
        </div>

        {/* Suggested Questions */}
        <div className="px-8 pb-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                className="premium-card px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 whitespace-nowrap border-0 hover-scale"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-6 shadow-lg">
          <Card className="premium-card p-4 border-0 shadow-xl">
            <div className="flex gap-3">
              <button className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
                <Paperclip className="w-5 h-5 text-gray-600" />
              </button>
              <input
                type="text"
                placeholder="Задайте вопрос AI..."
                className="flex-1 px-4 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none"
              />
              <button
                className={`p-3 rounded-xl transition-all ${
                  isListening 
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 glow' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                onClick={() => setIsListening(!isListening)}
              >
                <Mic className={`w-5 h-5 ${isListening ? 'text-white' : 'text-gray-600'}`} />
              </button>
              <Button className="gradient-purple text-white border-0 px-8">
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
              <span>Нажмите Enter для отправки</span>
              <Badge className="bg-purple-50 text-purple-700 border-0">
                <Sparkles className="w-3 h-3 mr-1" />
                Режим: {aiModes.find(m => m.id === aiMode)?.label}
              </Badge>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
