import { useState } from 'react';
import { FileText, Download, FileSpreadsheet, Languages, GitCompare, Share2, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Sparkles, CheckCircle, DollarSign, Calendar, Mail, Phone } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function DocumentAnalysis() {
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 12;

  const keyPoints = [
    { icon: CheckCircle, text: 'Выручка выросла на 15% по сравнению с предыдущим кварталом', color: 'text-green-600' },
    { icon: DollarSign, text: 'EBITDA составила $1.1M с маржинальностью 26%', color: 'text-blue-600' },
    { icon: CheckCircle, text: 'Успешное привлечение 847 новых клиентов', color: 'text-green-600' },
    { icon: Calendar, text: 'Запланировано расширение на азиатский рынок в Q4', color: 'text-purple-600' },
    { icon: CheckCircle, text: 'Сокращение дебиторской задолженности на 12%', color: 'text-green-600' },
  ];

  const extractedData = [
    { type: 'Финансы', label: 'Выручка Q3', value: '$4.2M', change: '+15%' },
    { type: 'Финансы', label: 'Чистая прибыль', value: '$890K', change: '+22%' },
    { type: 'Финансы', label: 'Операционные расходы', value: '$2.1M', change: '+8%' },
    { type: 'Дата', label: 'Отчётный период', value: '01.07.2024 - 30.09.2024', change: '' },
    { type: 'Контакт', label: 'Финансовый директор', value: 'Иванова М.А.', change: '' },
    { type: 'Email', label: 'Контактный email', value: 'cfo@company.com', change: '' },
  ];

  const qaItems = [
    { question: 'Какова основная причина роста выручки?', answer: 'Рост выручки на 15% обусловлен привлечением 847 новых клиентов и увеличением среднего чека на 8% за счёт внедрения премиум-тарифов.' },
    { question: 'Есть ли риски в операционных расходах?', answer: 'Операционные расходы выросли на 8%, что немного превышает плановый показатель. Основной рост связан с маркетинговыми кампаниями и наймом новых сотрудников.' },
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Document Preview - Left Panel */}
      <div className="w-[40%] bg-gray-100 border-r border-gray-200 flex flex-col">
        {/* Preview Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setZoom(Math.max(50, zoom - 10))}>
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-sm text-gray-700 min-w-[60px] text-center">{zoom}%</span>
            <Button variant="ghost" size="sm" onClick={() => setZoom(Math.min(200, zoom + 10))}>
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm text-gray-700">
              {currentPage} / {totalPages}
            </span>
            <Button variant="ghost" size="sm" onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-auto p-8 flex items-start justify-center">
          <div 
            className="bg-white shadow-2xl" 
            style={{ 
              width: `${(595 * zoom) / 100}px`,
              minHeight: `${(842 * zoom) / 100}px`,
            }}
          >
            <div className="p-12 space-y-6">
              <div className="text-center border-b pb-6">
                <h2 className="text-2xl mb-2">Квартальный отчёт</h2>
                <p className="text-gray-600">Q3 2024</p>
                <p className="text-gray-500 text-sm mt-2">01 июля - 30 сентября 2024</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2">Финансовые показатели</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Выручка:</span>
                      <span>$4,200,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Чистая прибыль:</span>
                      <span>$890,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">EBITDA:</span>
                      <span>$1,100,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Операционные расходы:</span>
                      <span>$2,100,000</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2">Ключевые достижения</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li>Рост выручки на 15%</li>
                    <li>847 новых клиентов</li>
                    <li>Улучшение маржинальности</li>
                    <li>Запуск премиум-тарифов</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Panel - Right Side */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Document Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-gray-900 mb-2">Квартальный отчет Q3 2024.pdf</h1>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>15 ноября 2024</span>
                <span>•</span>
                <span>2.4 MB</span>
                <span>•</span>
                <Badge className="bg-green-100 text-green-700">Обработан</Badge>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              PDF
            </Button>
            <Button variant="outline" size="sm">
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Excel
            </Button>
            <Button variant="outline" size="sm">
              <Languages className="w-4 h-4 mr-2" />
              Перевести
            </Button>
            <Button variant="outline" size="sm">
              <GitCompare className="w-4 h-4 mr-2" />
              Сравнить
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Поделиться
            </Button>
          </div>
        </div>

        {/* Tabs Content */}
        <div className="flex-1 overflow-y-auto">
          <Tabs defaultValue="summary" className="p-6">
            <TabsList className="mb-6">
              <TabsTrigger value="summary">Резюме</TabsTrigger>
              <TabsTrigger value="keypoints">Ключевые точки</TabsTrigger>
              <TabsTrigger value="data">Извлечённые данные</TabsTrigger>
              <TabsTrigger value="qa">Вопросы-ответы</TabsTrigger>
            </TabsList>

            {/* Summary Tab */}
            <TabsContent value="summary" className="space-y-6">
              <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-blue-900 mb-1">AI-сгенерированное резюме</div>
                  <p className="text-blue-800 text-sm">Документ проанализирован с использованием Gemini AI</p>
                </div>
              </div>

              <Card className="p-6">
                <h3 className="text-gray-900 mb-4">Краткое содержание</h3>
                <div className="prose prose-sm max-w-none space-y-4 text-gray-700">
                  <p>
                    Квартальный отчёт за третий квартал 2024 года демонстрирует значительный рост ключевых финансовых показателей компании. Выручка достигла $4.2 миллиона, что на 15% выше результатов предыдущего квартала. Чистая прибыль выросла на 22% до $890 тысяч, что свидетельствует об улучшении операционной эффективности.
                  </p>
                  <p>
                    Особо следует отметить успешное привлечение 847 новых клиентов и увеличение среднего чека на 8% благодаря внедрению премиум-тарифов. EBITDA составила $1.1 миллион с маржинальностью 26%, что превышает целевые показатели на 3 процентных пункта.
                  </p>
                  <p>
                    Операционные расходы выросли на 8% до $2.1 миллиона, что связано с увеличением маркетингового бюджета и расширением команды. Компания планирует выход на азиатский рынок в четвёртом квартале, что потребует дополнительных инвестиций в локализацию и маркетинг.
                  </p>
                </div>
              </Card>
            </TabsContent>

            {/* Key Points Tab */}
            <TabsContent value="keypoints" className="space-y-4">
              <h3 className="text-gray-900">Ключевые моменты документа</h3>
              {keyPoints.map((point, index) => {
                const Icon = point.icon;
                return (
                  <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 ${point.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <p className="text-gray-700 pt-1">{point.text}</p>
                    </div>
                  </Card>
                );
              })}
            </TabsContent>

            {/* Extracted Data Tab */}
            <TabsContent value="data" className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900">Извлечённые данные</h3>
                <Button variant="outline" size="sm">
                  <FileSpreadsheet className="w-4 h-4 mr-2" />
                  Экспорт в Excel
                </Button>
              </div>
              <Card>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Тип</th>
                        <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Поле</th>
                        <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Значение</th>
                        <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Изменение</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {extractedData.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="outline">{item.type}</Badge>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">{item.label}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{item.value}</td>
                          <td className="px-6 py-4 text-sm">
                            {item.change && (
                              <span className={item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                                {item.change}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>

            {/* Q&A Tab */}
            <TabsContent value="qa" className="space-y-6">
              <div className="space-y-4">
                {qaItems.map((item, index) => (
                  <Card key={index} className="p-6">
                    <div className="mb-4">
                      <div className="flex items-start gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                          Q
                        </div>
                        <p className="text-gray-900">{item.question}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 pl-8">
                      <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                        A
                      </div>
                      <p className="text-gray-700 text-sm">{item.answer}</p>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Ask Question */}
              <Card className="p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Задайте вопрос по документу..."
                    className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Спросить
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
