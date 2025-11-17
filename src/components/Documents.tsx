import { Search, Filter, Grid, List, FileText, Download, Trash2, MoreVertical } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import type { Page } from '../App';

interface DocumentsProps {
  onNavigate: (page: Page) => void;
}

export function Documents({ onNavigate }: DocumentsProps) {
  const documents = [
    { id: '1', name: 'Квартальный отчет Q3 2024.pdf', type: 'PDF', size: '2.4 MB', date: '15 ноя 2024', status: 'Обработан' },
    { id: '2', name: 'Договор с поставщиком.docx', type: 'DOCX', size: '856 KB', date: '14 ноя 2024', status: 'В обработке' },
    { id: '3', name: 'Презентация продукта.pdf', type: 'PDF', size: '5.1 MB', date: '13 ноя 2024', status: 'Обработан' },
    { id: '4', name: 'Финансовый анализ.xlsx', type: 'XLSX', size: '1.2 MB', date: '12 ноя 2024', status: 'Обработан' },
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-1">Мои документы</h1>
          <p className="text-gray-500">Управление всеми загруженными документами</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Grid className="w-4 h-4 mr-2" />
            Сетка
          </Button>
          <Button variant="outline">
            <List className="w-4 h-4 mr-2" />
            Список
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск документов..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Фильтры
        </Button>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {documents.map((doc) => (
          <Card 
            key={doc.id} 
            className="p-4 hover:shadow-lg transition-shadow group cursor-pointer"
            onClick={() => onNavigate('document-analysis')}
          >
            <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-3 flex items-center justify-center relative">
              <FileText className="w-16 h-16 text-gray-400" />
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2">
              <div className="text-gray-900 text-sm truncate">{doc.name}</div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{doc.size}</span>
                <span>{doc.date}</span>
              </div>
              <Badge className={doc.status === 'Обработан' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}>
                {doc.status}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}