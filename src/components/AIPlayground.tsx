import { useState } from 'react';
import { Sparkles, Search, Wand2, Smile, Lightbulb, Zap, Brain, Target } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function AIPlayground() {
  const [activeMode, setActiveMode] = useState('search');

  const modes = [
    {
      id: 'search',
      name: 'Умный поиск',
      icon: Search,
      description: 'AI ищет ответы во всех ваших документах',
      color: 'from-cyan-500 to-blue-500',
      placeholder: 'Какая сумма контракта с компанией X?',
    },
    {
      id: 'generate',
      name: 'Генератор контента',
      icon: Wand2,
      description: 'AI создаёт текст или документ по описанию',
      color: 'from-purple-500 to-pink-500',
      placeholder: 'Создай письмо-отказ клиенту в вежливой форме...',
    },
    {
      id: 'sentiment',
      name: 'Анализатор тональности',
      icon: Smile,
      description: 'AI определяет эмоциональный тон текста',
      color: 'from-green-500 to-emerald-500',
      placeholder: 'Вставьте текст для анализа тональности...',
    },
    {
      id: 'predict',
      name: 'Предсказатель',
      icon: Brain,
      description: 'AI прогнозирует тренды на основе данных',
      color: 'from-orange-500 to-red-500',
      placeholder: 'На основе данных за 6 месяцев спрогнозируй...',
    },
    {
      id: 'creative',
      name: 'Креативный режим',
      icon: Lightbulb,
      description: 'AI предлагает неожиданные идеи',
      color: 'from-pink-500 to-purple-500',
      placeholder: 'Предложи креативные способы улучшить...',
    },
  ];

  const currentMode = modes.find(m => m.id === activeMode) || modes[0];
  const Icon = currentMode.icon;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 mb-4 float-animation glow-pulse">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-white mb-2 neon-text">AI Playground</h1>
        <p className="text-gray-400">Экспериментальная зона для тестирования AI-возможностей</p>
        <Badge className="mt-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white">
          Beta • Новые функции
        </Badge>
      </div>

      {/* Mode Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {modes.map((mode) => {
          const ModeIcon = mode.icon;
          const isActive = activeMode === mode.id;
          return (
            <Card
              key={mode.id}
              onClick={() => setActiveMode(mode.id)}
              className={`
                p-6 cursor-pointer transition-all duration-300 hover-lift border-2
                ${isActive 
                  ? 'glass-strong border-cyan-500/50 shadow-lg shadow-cyan-500/20' 
                  : 'glass border-white/10 hover:border-white/20'
                }
              `}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${mode.color} flex items-center justify-center mb-4 ${isActive ? 'glow-pulse' : ''}`}>
                <ModeIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white mb-2 text-sm">{mode.name}</h3>
              <p className="text-gray-400 text-xs line-clamp-2">{mode.description}</p>
              {isActive && (
                <Badge className="mt-3 bg-cyan-500/20 text-cyan-400 text-xs">
                  Активен
                </Badge>
              )}
            </Card>
          );
        })}
      </div>

      {/* Main Playground Area */}
      <Card className="glass-strong p-8 border border-white/10">
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${currentMode.color} flex items-center justify-center`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-white mb-1">{currentMode.name}</h2>
            <p className="text-gray-400 text-sm">{currentMode.description}</p>
          </div>
        </div>

        {/* Input Area */}
        <div className="space-y-4">
          <div className="relative">
            <textarea
              placeholder={currentMode.placeholder}
              className="w-full h-40 px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
            />
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <Badge className="bg-purple-500/20 text-purple-400 text-xs">
                <Zap className="w-3 h-3 mr-1" />
                AI-powered
              </Badge>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0">
              <Sparkles className="w-4 h-4 mr-2" />
              Запустить AI
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
              Очистить
            </Button>
          </div>
        </div>

        {/* Results Area */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-cyan-400" />
            <span className="text-white">Результаты AI</span>
          </div>
          <Card className="glass p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white sparkle" />
              </div>
              <span className="text-gray-400 text-sm">AI обрабатывает ваш запрос...</span>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-white/5 rounded-lg shimmer" />
              <div className="h-4 bg-white/5 rounded-lg shimmer" style={{ animationDelay: '0.2s' }} />
              <div className="h-4 bg-white/5 rounded-lg shimmer w-3/4" style={{ animationDelay: '0.4s' }} />
            </div>
          </Card>
        </div>
      </Card>

      {/* Quick Examples */}
      <div>
        <h3 className="text-white mb-4">Быстрые примеры</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            'Найди все упоминания цен в документах',
            'Создай summary всех контрактов',
            'Какое настроение в отзывах клиентов?',
            'Спрогнозируй продажи на следующий квартал',
            'Предложи идеи для презентации',
            'Сравни условия в двух договорах'
          ].map((example, index) => (
            <Button
              key={index}
              variant="outline"
              className="justify-start text-left border-white/10 text-gray-300 hover:bg-white/5 hover:text-white hover:border-cyan-500/50"
            >
              <Lightbulb className="w-4 h-4 mr-2 text-cyan-400" />
              <span className="truncate">{example}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
