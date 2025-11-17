import { FileText, MessageSquare, HardDrive, Clock, TrendingUp, Sparkles, Zap, Target, Trophy, Star, Rocket, Brain, Upload, Search, BarChart3 } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import type { Page } from '../App';

interface DashboardProps {
  onNavigate: (page: Page) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const stats = [
    {
      label: 'Всего документов',
      value: '1,247',
      trend: '+12.5%',
      isPositive: true,
      icon: FileText,
      gradient: 'gradient-purple',
    },
    {
      label: 'AI запросов',
      value: '8,943',
      trend: '+18.2%',
      isPositive: true,
      icon: Brain,
      gradient: 'gradient-cyan',
    },
    {
      label: 'Использовано места',
      value: '45.2 GB',
      trend: '+5.4%',
      isPositive: true,
      icon: HardDrive,
      gradient: 'gradient-green',
    },
    {
      label: 'Время с AI',
      value: '127ч',
      trend: '+23.1%',
      isPositive: true,
      icon: Clock,
      gradient: 'gradient-pink',
    },
  ];

  const quickActions = [
    { 
      label: 'Загрузить документ', 
      icon: Upload, 
      page: 'upload' as Page, 
      gradient: 'gradient-purple',
      description: 'Начните с загрузки файла'
    },
    { 
      label: 'Открыть AI-чат', 
      icon: MessageSquare, 
      page: 'chat' as Page, 
      gradient: 'gradient-cyan',
      description: 'Задайте вопрос AI'
    },
    { 
      label: 'Анализировать', 
      icon: Search, 
      page: 'analysis' as Page, 
      gradient: 'gradient-pink',
      description: 'Глубокий анализ документов'
    },
  ];

  const recentDocuments = [
    { 
      name: 'Квартальный отчёт Q3 2024', 
      size: '2.4 MB', 
      date: '15 ноя 2024',
      status: 'Проанализирован',
      statusColor: 'bg-green-100 text-green-700'
    },
    { 
      name: 'Договор с поставщиком', 
      size: '890 KB', 
      date: '14 ноя 2024',
      status: 'В обработке',
      statusColor: 'bg-blue-100 text-blue-700'
    },
    { 
      name: 'Презентация продукта', 
      size: '5.1 MB', 
      date: '13 ноя 2024',
      status: 'Новый',
      statusColor: 'bg-purple-100 text-purple-700'
    },
  ];

  const activity = [
    { 
      type: 'chat',
      text: 'AI-чат: Анализ квартального отчёта',
      time: '2 часа назад',
      icon: MessageSquare,
      color: 'text-purple-600',
    },
    { 
      type: 'document',
      text: 'Загружен: Договор с поставщиком',
      time: '5 часов назад',
      icon: FileText,
      color: 'text-cyan-600',
    },
    { 
      type: 'analysis',
      text: 'Завершён: Сравнение документов',
      time: '1 день назад',
      icon: BarChart3,
      color: 'text-pink-600',
    },
  ];

  const achievements = [
    { name: 'Мастер анализа', icon: Trophy, unlocked: true },
    { name: 'AI Эксперт', icon: Star, unlocked: true },
    { name: 'Генератор Pro', icon: Rocket, unlocked: false },
  ];

  return (
    <div className="p-8 space-y-8 slide-up">
      {/* Welcome Section */}
      <div className="relative overflow-hidden">
        <Card className="premium-card p-8 border-0 bg-gradient-to-r from-purple-50 to-cyan-50">
          <div className="flex items-center justify-between relative z-10">
            <div>
              <h1 className="gradient-text mb-2">
                Добро пожаловать, Александр! 👋
              </h1>
              <p className="text-gray-600 mb-6">
                AI готов помочь вам с документами. Что будем делать сегодня?
              </p>
              {/* Quick Actions Buttons */}
              <div className="flex gap-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={index}
                      onClick={() => onNavigate(action.page)}
                      className={`${action.gradient} text-white border-0 hover-scale shadow-lg px-6`}
                    >
                      <Icon className="w-5 h-5 mr-2" />
                      {action.label}
                    </Button>
                  );
                })}
              </div>
            </div>
            {/* AI Avatar */}
            <div className="hidden lg:block">
              <div className="w-32 h-32 rounded-3xl gradient-purple flex items-center justify-center float glow">
                <Brain className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="premium-card p-6 border-0 hover-lift"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl ${stat.gradient} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <Badge className={`${stat.isPositive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'} border-0`}>
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {stat.trend}
                </Badge>
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Documents */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900">Недавние документы</h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onNavigate('documents')}
              className="border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              Все документы
            </Button>
          </div>
          <div className="grid gap-4">
            {recentDocuments.map((doc, index) => (
              <Card key={index} className="premium-card p-5 border-0 hover-lift gradient-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-xl gradient-purple flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{doc.name}</h3>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span>{doc.size}</span>
                        <span>•</span>
                        <span>{doc.date}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={`${doc.statusColor} border-0 px-3 py-1`}>
                    {doc.status}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div>
          <h2 className="text-gray-900 mb-4">Активность</h2>
          <div className="space-y-4">
            {activity.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="premium-card p-4 border-0">
                  <div className="flex gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center flex-shrink-0 ${item.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm mb-1">{item.text}</div>
                      <div className="text-xs text-gray-500">{item.time}</div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* AI Recommendations & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Recommendations */}
        <Card className="premium-card p-6 border-0">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <h2 className="text-gray-900">AI рекомендует</h2>
          </div>
          <div className="space-y-3">
            <button 
              onClick={() => onNavigate('ai-playground')}
              className="w-full text-left p-4 rounded-xl bg-gradient-to-r from-purple-50 to-cyan-50 hover:from-purple-100 hover:to-cyan-100 transition-all"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-purple-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Попробуйте AI Playground</h3>
                  <p className="text-sm text-gray-600">Новая экспериментальная функция</p>
                </div>
                <Badge className="ml-auto gradient-pink text-white border-0">New</Badge>
              </div>
            </button>
            <button 
              onClick={() => onNavigate('ai-studio')}
              className="w-full text-left p-4 rounded-xl bg-gradient-to-r from-pink-50 to-orange-50 hover:from-pink-100 hover:to-orange-100 transition-all"
            >
              <div className="flex items-center gap-3">
                <Zap className="w-8 h-8 text-pink-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Создайте инфографику</h3>
                  <p className="text-sm text-gray-600">Превратите данные в визуал</p>
                </div>
              </div>
            </button>
          </div>
        </Card>

        {/* Achievements */}
        <Card className="premium-card p-6 border-0">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <h2 className="text-gray-900">Достижения</h2>
          </div>
          <div className="space-y-3">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-4 rounded-xl ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-r from-yellow-50 to-orange-50' 
                      : 'bg-gray-50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl ${
                    achievement.unlocked ? 'gradient-purple' : 'bg-gray-300'
                  } flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className={`font-semibold ${achievement.unlocked ? 'text-gray-900' : 'text-gray-400'}`}>
                      {achievement.name}
                    </div>
                  </div>
                  {achievement.unlocked && (
                    <Badge className="gradient-green text-white border-0">✓</Badge>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
