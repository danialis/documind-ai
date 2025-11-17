import { Image, BarChart3, Sparkles, FileText, Download, ChevronDown } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

export function AIStudio() {
  const tools = [
    {
      icon: Image,
      label: 'AI создаёт обложку',
      gradient: 'gradient-pink',
    },
    {
      icon: BarChart3,
      label: 'Превращайте данные в визуал',
      gradient: 'gradient-cyan',
    },
    {
      icon: Sparkles,
      label: 'Автоматические визуализации',
      gradient: 'gradient-purple',
    },
    {
      icon: FileText,
      label: 'Оформление документов AI',
      gradient: 'bg-gradient-to-br from-orange-400 to-orange-600',
    },
  ];

  const colorPalette = [
    { color: '#000000', name: 'Black' },
    { color: '#6B7280', name: 'Gray' },
    { color: '#3B82F6', name: 'Blue' },
    { color: '#2563EB', name: 'Dark Blue' },
    { color: '#EC4899', name: 'Pink' },
    { color: '#8B5CF6', name: 'Purple' },
    { color: '#06B6D4', name: 'Cyan' },
    { color: '#10B981', name: 'Green' },
    { color: '#047857', name: 'Dark Green' },
    { color: '#F59E0B', name: 'Yellow' },
  ];

  return (
    <div className="p-8 space-y-8 slide-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="gradient-text mb-2 text-5xl">AI Studio</h1>
          <p className="text-gray-600 text-lg">Творческая мастерская с искусственным интеллектом</p>
        </div>
        <Button className="gradient-purple text-white border-0 hover-scale shadow-lg px-6">
          <Download className="w-5 h-5 mr-2" />
          Скачать
        </Button>
      </div>

      {/* Tools Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tools.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <Card
              key={index}
              className="premium-card p-6 border-0 hover-lift cursor-pointer text-center"
            >
              <div className={`w-16 h-16 mx-auto rounded-2xl ${tool.gradient} flex items-center justify-center shadow-lg mb-4`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <p className="font-semibold text-gray-900">{tool.label}</p>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Preview Card */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="premium-card p-8 border-0">
            <h2 className="text-gray-900 mb-6">Предпросмотр</h2>
            
            {/* Preview Area */}
            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex flex-col items-center justify-center p-12 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
                  {[...Array(48)].map((_, i) => (
                    <div key={i} className="border border-gray-400" />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 text-center">
                <div className="w-24 h-24 mx-auto rounded-3xl gradient-pink mb-6 flex items-center justify-center float glow">
                  <Image className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Квартальный отчёт Q3 2024
                </h3>
                <p className="text-gray-500 mb-6">AI сгенерированная обложка</p>
                
                {/* Loading Dots */}
                <div className="flex justify-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-3 h-3 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-3 h-3 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          </Card>

          {/* Style Selector */}
          <Card className="premium-card p-6 border-0 gradient-border">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Стиль оформления
            </label>
            <div className="relative">
              <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white appearance-none cursor-pointer text-gray-900 font-medium">
                <option>Современный</option>
                <option>Минималистичный</option>
                <option>Корпоративный</option>
                <option>Креативный</option>
                <option>Элегантный</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </Card>

          {/* Apply Button */}
          <Button className="w-full h-14 gradient-cyan text-white border-0 hover-scale shadow-lg text-lg">
            <Sparkles className="w-5 h-5 mr-2" />
            Применить стиль
          </Button>
        </div>

        {/* Color Palette */}
        <div className="space-y-6">
          <Card className="premium-card p-6 border-0">
            <h2 className="text-gray-900 mb-6">Цветовая палитра</h2>
            <div className="grid grid-cols-3 gap-3">
              {colorPalette.map((color, index) => (
                <button
                  key={index}
                  className="aspect-square rounded-xl hover:scale-110 hover:shadow-lg transition-all border-2 border-gray-200 hover:border-gray-300"
                  style={{ backgroundColor: color.color }}
                  title={color.name}
                />
              ))}
            </div>
          </Card>

          {/* Quick Settings */}
          <Card className="premium-card p-6 border-0 gradient-border">
            <h3 className="font-semibold text-gray-900 mb-4">Настройки</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Размер
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="70"
                  className="w-full accent-purple-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Контрастность
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="50"
                  className="w-full accent-cyan-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Яркость
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="80"
                  className="w-full accent-pink-600"
                />
              </div>
            </div>
          </Card>

          {/* AI Suggestions */}
          <Card className="premium-card p-6 border-0 bg-gradient-to-br from-purple-50 to-cyan-50">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-gray-900">AI предлагает</h3>
            </div>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-3 bg-white rounded-xl hover:shadow-md transition-all">
                <p className="text-sm font-medium text-gray-900">Добавить градиент</p>
                <p className="text-xs text-gray-600">Сделает дизайн современнее</p>
              </button>
              <button className="w-full text-left px-4 py-3 bg-white rounded-xl hover:shadow-md transition-all">
                <p className="text-sm font-medium text-gray-900">Изменить шрифт</p>
                <p className="text-xs text-gray-600">Более читаемый вариант</p>
              </button>
            </div>
          </Card>
        </div>
      </div>

      {/* Templates Gallery */}
      <Card className="premium-card p-6 border-0">
        <h2 className="text-gray-900 mb-6">Готовые шаблоны</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {['Отчёт', 'Презентация', 'Договор', 'Брошюра', 'Инфографика'].map((template, index) => (
            <div
              key={index}
              className="aspect-[3/4] rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 hover:shadow-lg transition-all cursor-pointer overflow-hidden group"
            >
              <div className="h-full flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-cyan-500/0 group-hover:from-purple-500/20 group-hover:to-cyan-500/20 transition-all" />
                <FileText className="w-12 h-12 text-gray-400 group-hover:text-purple-600 transition-colors relative z-10" />
              </div>
              <div className="p-3 bg-white border-t border-gray-200">
                <p className="text-sm font-semibold text-gray-900 text-center">{template}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
