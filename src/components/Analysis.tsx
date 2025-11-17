import { Search, TrendingUp, FileText, BarChart3 } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

export function Analysis() {
  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 mb-1">Анализ документов</h1>
        <p className="text-gray-500">Глубокий анализ и извлечение информации из документов</p>
      </div>

      {/* Analysis Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-gray-900 mb-2">Поиск по содержимому</h3>
          <p className="text-gray-500 text-sm">Найдите конкретную информацию в документах</p>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="w-12 h-12 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="text-gray-900 mb-2">Анализ трендов</h3>
          <p className="text-gray-500 text-sm">Выявите тенденции в ваших документах</p>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="w-12 h-12 rounded-lg bg-green-50 text-green-600 flex items-center justify-center mb-4">
            <BarChart3 className="w-6 h-6" />
          </div>
          <h3 className="text-gray-900 mb-2">Извлечение данных</h3>
          <p className="text-gray-500 text-sm">Автоматическое извлечение структурированных данных</p>
        </Card>
      </div>

      {/* Recent Analysis */}
      <div>
        <h2 className="text-gray-900 mb-4">Недавние анализы</h2>
        <Card className="p-6">
          <div className="text-center py-12 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Анализов пока нет</p>
            <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
              Начать анализ
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
