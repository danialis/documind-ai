import { useState } from 'react';
import { FileText, Download, AlertCircle, Plus, Minus, Edit3 } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function DocumentCompare() {
  const [leftDoc] = useState('Договор_версия_1.pdf');
  const [rightDoc] = useState('Договор_версия_2.pdf');

  const differences = {
    additions: 8,
    deletions: 12,
    changes: 3,
    total: 23,
  };

  const comparisonSections = [
    {
      title: 'Раздел 1. Общие положения',
      leftContent: 'Настоящий договор регулирует отношения между Заказчиком и Исполнителем по оказанию услуг разработки программного обеспечения.',
      rightContent: 'Настоящий договор регулирует отношения между Заказчиком и Исполнителем по оказанию услуг разработки программного обеспечения и технической поддержки.',
      type: 'change' as const,
    },
    {
      title: 'Раздел 2. Стоимость услуг',
      leftContent: 'Стоимость услуг составляет 500 000 рублей.',
      rightContent: 'Стоимость услуг составляет 650 000 рублей.',
      type: 'change' as const,
    },
    {
      title: 'Раздел 3. Сроки выполнения',
      leftContent: '',
      rightContent: 'Исполнитель обязуется выполнить работы в течение 90 календарных дней с момента подписания договора.',
      type: 'addition' as const,
    },
    {
      title: 'Раздел 4. Порядок оплаты',
      leftContent: 'Оплата производится единовременно в течение 10 рабочих дней после подписания договора.',
      rightContent: '',
      type: 'deletion' as const,
    },
    {
      title: 'Раздел 5. Ответственность сторон',
      leftContent: 'За нарушение условий договора стороны несут ответственность в соответствии с законодательством РФ.',
      rightContent: 'За нарушение условий договора стороны несут ответственность в соответствии с законодательством РФ.',
      type: 'unchanged' as const,
    },
  ];

  const aiInsights = [
    'Увеличена стоимость услуг на 30% (с 500 000 до 650 000 рублей)',
    'Добавлен раздел о сроках выполнения работ (90 дней)',
    'Удалён раздел о единовременной оплате',
    'Расширен предмет договора - добавлена техническая поддержка',
    'Условия ответственности остались без изменений',
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 mb-1">Сравнение документов</h1>
        <p className="text-gray-500">Анализ различий между версиями документов</p>
      </div>

      {/* Summary Card */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-gray-900">Сводка различий</h2>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Экспорт отчёта
          </Button>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm text-gray-700">Добавлено: {differences.additions}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-sm text-gray-700">Удалено: {differences.deletions}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="text-sm text-gray-700">Изменено: {differences.changes}</span>
          </div>
          <div className="ml-auto">
            <Badge className="bg-blue-100 text-blue-700">
              Всего изменений: {differences.total}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Document Selectors */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-gray-500">Исходный документ</span>
          </div>
          <select className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>{leftDoc}</option>
            <option>Другой документ 1</option>
            <option>Другой документ 2</option>
          </select>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-5 h-5 text-purple-600" />
            <span className="text-sm text-gray-500">Сравниваемый документ</span>
          </div>
          <select className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>{rightDoc}</option>
            <option>Другой документ 1</option>
            <option>Другой документ 2</option>
          </select>
        </Card>
      </div>

      {/* Side by Side Comparison */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left Document */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className="bg-blue-50 text-blue-700">Версия 1</Badge>
          </div>
          <Card className="p-6 space-y-6">
            {comparisonSections.map((section, index) => (
              <div key={index}>
                <h3 className="text-sm text-gray-900 mb-3">{section.title}</h3>
                {section.leftContent ? (
                  <div className={`p-3 rounded-lg text-sm ${
                    section.type === 'deletion' 
                      ? 'bg-red-50 text-red-900 line-through' 
                      : section.type === 'change'
                      ? 'bg-yellow-50 text-yellow-900'
                      : 'bg-gray-50 text-gray-700'
                  }`}>
                    {section.leftContent}
                  </div>
                ) : (
                  <div className="p-3 rounded-lg text-sm bg-gray-50 text-gray-400 italic">
                    Раздел отсутствует
                  </div>
                )}
              </div>
            ))}
          </Card>
        </div>

        {/* Right Document */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className="bg-purple-50 text-purple-700">Версия 2</Badge>
          </div>
          <Card className="p-6 space-y-6">
            {comparisonSections.map((section, index) => (
              <div key={index}>
                <h3 className="text-sm text-gray-900 mb-3">{section.title}</h3>
                {section.rightContent ? (
                  <div className={`p-3 rounded-lg text-sm ${
                    section.type === 'addition' 
                      ? 'bg-green-50 text-green-900' 
                      : section.type === 'change'
                      ? 'bg-yellow-50 text-yellow-900'
                      : 'bg-gray-50 text-gray-700'
                  }`}>
                    {section.rightContent}
                  </div>
                ) : (
                  <div className="p-3 rounded-lg text-sm bg-gray-50 text-gray-400 italic">
                    Раздел отсутствует
                  </div>
                )}
              </div>
            ))}
          </Card>
        </div>
      </div>

      {/* AI Insights */}
      <Card className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-gray-900 mb-1">AI-анализ различий</h2>
            <p className="text-gray-500 text-sm">Ключевые изменения, выявленные искусственным интеллектом</p>
          </div>
        </div>
        <div className="space-y-3 ml-13">
          {aiInsights.map((insight, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                {index + 1}
              </div>
              <p className="text-gray-700 text-sm">{insight}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Legend */}
      <Card className="p-4">
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Plus className="w-4 h-4 text-green-600" />
            <span className="text-gray-700">Добавление</span>
          </div>
          <div className="flex items-center gap-2">
            <Minus className="w-4 h-4 text-red-600" />
            <span className="text-gray-700">Удаление</span>
          </div>
          <div className="flex items-center gap-2">
            <Edit3 className="w-4 h-4 text-yellow-600" />
            <span className="text-gray-700">Изменение</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
