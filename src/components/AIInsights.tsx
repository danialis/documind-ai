import { TrendingUp, FileText, Users, Clock, Plus, Lightbulb, Sparkles, BarChart3, FileCheck, Presentation } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export function AIInsights() {
  const stats = [
    {
      value: '1,247',
      label: 'Проанализировано документов',
      icon: FileText,
      gradient: 'gradient-green',
      change: '+12.5%',
    },
    {
      value: '89%',
      label: 'Точность анализа',
      icon: BarChart3,
      gradient: 'bg-gradient-to-br from-orange-400 to-orange-600',
      change: '+5.2%',
    },
    {
      value: '4.2 часа',
      label: 'Экономия времени',
      icon: Clock,
      gradient: 'bg-gradient-to-br from-blue-400 to-blue-600',
      change: '+18%',
    },
  ];

  const categories = [
    { name: 'Финансы', count: 342, color: 'bg-blue-100 text-blue-700' },
    { name: 'Контракты', count: 198, color: 'bg-pink-100 text-pink-700' },
    { name: 'Отчёты', count: 287, color: 'bg-green-100 text-green-700' },
    { name: 'Презентации', count: 156, color: 'bg-orange-100 text-orange-700' },
    { name: 'Юридические', count: 89, color: 'bg-purple-100 text-purple-700' },
    { name: 'Маркетинг', count: 175, color: 'bg-cyan-100 text-cyan-700' },
  ];

  const timeline = [
    {
      date: '15 ноября',
      time: '14:30',
      text: 'Проанализирован финансовый отчёт',
      type: 'document',
      color: 'bg-blue-100 text-blue-700',
    },
    {
      date: '15 ноября',
      time: '12:15',
      text: 'Обработан новый контракт',
      type: 'contract',
      color: 'bg-pink-100 text-pink-700',
    },
    {
      date: '14 ноября',
      time: '16:45',
      text: 'Создана презентация продукта',
      type: 'presentation',
      color: 'bg-purple-100 text-purple-700',
    },
    {
      date: '14 ноября',
      time: '10:20',
      text: 'Анализ юридической документации',
      type: 'document',
      color: 'bg-green-100 text-green-700',
    },
  ];

  const recommendations = [
    {
      icon: Lightbulb,
      text: 'Рекомендую обновить финансовые прогнозы на основе последних данных',
      priority: 'high',
    },
    {
      icon: Sparkles,
      text: 'Обнаружены дубликаты в категории "Контракты" - предлагаю объединить',
      priority: 'medium',
    },
    {
      icon: TrendingUp,
      text: 'Замечен рост документов типа "Презентации" - создать шаблон?',
      priority: 'low',
    },
  ];

  return (
    <div className="p-8 space-y-8 slide-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="gradient-text mb-2 text-5xl">AI Insights</h1>
          <p className="text-gray-600 text-lg">Интеллектуальная аналитика ваших документов</p>
        </div>
        <Button className="gradient-cyan text-white border-0 hover-scale shadow-lg px-6">
          <Plus className="w-5 h-5 mr-2" />
          Новый отчёт
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="premium-card p-6 border-0 hover-lift">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl ${stat.gradient} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <Badge className="bg-green-50 text-green-700 border-0">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {stat.change}
                </Badge>
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Categories Card */}
        <div className="lg:col-span-2">
          <Card className="premium-card p-6 border-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-gray-900">Категории документов</h2>
              <Badge className="bg-purple-100 text-purple-700 border-0 px-3 py-1">
                <Sparkles className="w-3 h-3 mr-1" />
                AI-анализ
              </Badge>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`
                    ${category.color} px-5 py-3 rounded-full font-medium transition-all
                    hover:scale-105 hover:shadow-lg
                  `}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            {/* Chart Visualization */}
            <div className="mt-8 p-6 bg-gradient-to-br from-purple-50 to-cyan-50 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-4">Распределение по категориям</h3>
              <div className="space-y-3">
                {categories.slice(0, 4).map((category, index) => {
                  const percentage = (category.count / 1247) * 100;
                  return (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-700 font-medium">{category.name}</span>
                        <span className="text-gray-600">{category.count}</span>
                      </div>
                      <div className="h-3 bg-white rounded-full overflow-hidden">
                        <div
                          className="h-full gradient-purple transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>

        {/* Timeline Card */}
        <Card className="premium-card p-6 border-0">
          <h2 className="text-gray-900 mb-6">Последние события</h2>
          <div className="space-y-6">
            {timeline.map((event, index) => (
              <div key={index} className="relative">
                {index !== timeline.length - 1 && (
                  <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-gray-200" />
                )}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-cyan-100 flex items-center justify-center flex-shrink-0 relative z-10">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gray-500 font-medium">{event.date}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{event.time}</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{event.text}</p>
                    <Badge className={`${event.color} border-0 text-xs px-2`}>
                      {event.type}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card className="premium-card p-6 border-0 gradient-border">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl gradient-purple flex items-center justify-center">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-gray-900">AI Рекомендации</h2>
            <p className="text-sm text-gray-600">На основе анализа ваших данных</p>
          </div>
        </div>
        <div className="space-y-4">
          {recommendations.map((rec, index) => {
            const Icon = rec.icon;
            const priorityColors = {
              high: 'bg-red-50 border-l-4 border-red-500',
              medium: 'bg-yellow-50 border-l-4 border-yellow-500',
              low: 'bg-blue-50 border-l-4 border-blue-500',
            };
            return (
              <div
                key={index}
                className={`p-4 rounded-xl ${priorityColors[rec.priority as keyof typeof priorityColors]} hover:shadow-md transition-all`}
              >
                <div className="flex items-start gap-3">
                  <Icon className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 flex-1">{rec.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Document Analysis Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="premium-card p-6 border-0 hover-lift">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl gradient-cyan flex items-center justify-center">
              <FileCheck className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900">Самые активные категории</h3>
          </div>
          <div className="space-y-3">
            {categories.slice(0, 3).map((cat, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">{cat.name}</span>
                <span className="text-2xl font-bold text-gray-900">{cat.count}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="premium-card p-6 border-0 hover-lift">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl gradient-pink flex items-center justify-center">
              <Presentation className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900">Тренды последних 7 дней</h3>
          </div>
          <div className="h-32 flex items-end gap-2">
            {[45, 62, 58, 73, 68, 81, 75].map((height, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full gradient-pink rounded-t-lg transition-all hover:opacity-80 cursor-pointer"
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs text-gray-500 font-medium">
                  {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'][index]}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
