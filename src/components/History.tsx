import { Clock, MessageSquare, FileText, Search, Calendar, Tag, Grid, List, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useState } from 'react';

export function History() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const historyItems = [
    {
      id: '1',
      type: 'chat',
      title: 'Анализ квартального отчета',
      description: 'AI-чат • 15 сообщений',
      time: '2 часа назад',
      date: '17 ноя 2024',
      icon: MessageSquare,
      color: 'bg-blue-50 text-blue-600',
      tags: ['Финансы', 'Анализ'],
    },
    {
      id: '2',
      type: 'document',
      title: 'Квартальный отчет Q3 2024.pdf',
      description: 'Загрузка документа • 2.4 MB',
      time: '2 часа назад',
      date: '17 ноя 2024',
      icon: FileText,
      color: 'bg-green-50 text-green-600',
      tags: ['PDF', 'Финансы'],
    },
    {
      id: '3',
      type: 'analysis',
      title: 'Проверка договора',
      description: 'Анализ документа • Найдено 23 изменения',
      time: '4 часа назад',
      date: '17 ноя 2024',
      icon: Search,
      color: 'bg-purple-50 text-purple-600',
      tags: ['Договор', 'Сравнение'],
    },
    {
      id: '4',
      type: 'chat',
      title: 'Извлечение контактов',
      description: 'AI-чат • 8 сообщений',
      time: '6 часов назад',
      date: '17 ноя 2024',
      icon: MessageSquare,
      color: 'bg-blue-50 text-blue-600',
      tags: ['Данные'],
    },
    {
      id: '5',
      type: 'document',
      title: 'Презентация продукта.pdf',
      description: 'Загрузка документа • 5.1 MB',
      time: '1 день назад',
      date: '16 ноя 2024',
      icon: FileText,
      color: 'bg-green-50 text-green-600',
      tags: ['PDF', 'Презентация'],
    },
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-1">История активности</h1>
          <p className="text-gray-500">Все ваши действия в системе</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button 
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-[300px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Семантический поиск по истории..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Badge className="absolute right-3 top-1/2 -translate-y-1/2 bg-purple-100 text-purple-700 text-xs">
            AI поиск
          </Badge>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
              <option>Все даты</option>
              <option>Сегодня</option>
              <option>Вчера</option>
              <option>Последние 7 дней</option>
              <option>Последний месяц</option>
            </select>
          </div>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
              <option>Все типы</option>
              <option>Чаты</option>
              <option>Документы</option>
              <option>Анализ</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'list' ? (
        <Card className="divide-y divide-gray-100">
          {historyItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex gap-4">
                  <div className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-gray-900 mb-1">{item.title}</div>
                        <p className="text-gray-500 text-sm">{item.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-400">{item.time}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>{item.date}</span>
                      </div>
                      <div className="flex gap-1">
                        {item.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {historyItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-gray-900 mb-2 truncate">{item.title}</div>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">{item.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{item.time}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Показано {historyItems.length} из 48 записей
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          >
            <ChevronLeft className="w-4 h-4" />
            Назад
          </Button>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className="w-8"
              >
                {page}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          >
            Вперёд
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}