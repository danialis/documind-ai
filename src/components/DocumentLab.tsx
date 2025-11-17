import { Beaker, Merge, GitBranch, FileType, Presentation, Sparkles, Zap, FileText } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

export function DocumentLab() {
  const experiments = [
    {
      id: 'merge',
      name: 'Merge Documents',
      icon: Merge,
      description: 'Объедините несколько документов в один с AI-резюме',
      color: 'from-cyan-500 to-blue-500',
      status: 'ready',
    },
    {
      id: 'evolution',
      name: 'Document Evolution',
      icon: GitBranch,
      description: 'Посмотрите, как документ изменялся со временем',
      color: 'from-purple-500 to-pink-500',
      status: 'processing',
      progress: 67,
    },
    {
      id: 'templates',
      name: 'Smart Templates',
      icon: FileType,
      description: 'AI-генератор шаблонов на основе ваших документов',
      color: 'from-green-500 to-emerald-500',
      status: 'ready',
    },
    {
      id: 'presentation',
      name: 'Document to Presentation',
      icon: Presentation,
      description: 'Превратите документ в презентацию одним кликом',
      color: 'from-orange-500 to-red-500',
      status: 'ready',
    },
  ];

  const recentExperiments = [
    { name: 'Merged 3 quarterly reports', time: '2 hours ago', success: true },
    { name: 'Created template from contracts', time: '5 hours ago', success: true },
    { name: 'Generated presentation from report', time: '1 day ago', success: true },
    { name: 'Tracked document changes', time: '2 days ago', success: false },
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 via-cyan-500 to-purple-500 mb-4 float-animation glow-pulse">
          <Beaker className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-white mb-2 neon-text">Document Lab</h1>
        <p className="text-gray-400">Экспериментальная лаборатория для работы с документами</p>
        <Badge className="mt-4 bg-gradient-to-r from-green-500 to-cyan-500 text-white">
          <Sparkles className="w-3 h-3 mr-1" />
          AI-powered experiments
        </Badge>
      </div>

      {/* Experiment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {experiments.map((exp) => {
          const Icon = exp.icon;
          return (
            <Card key={exp.id} className="glass-strong p-6 border border-white/10 hover-lift">
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${exp.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white mb-1">{exp.name}</h3>
                  <p className="text-gray-400 text-sm">{exp.description}</p>
                </div>
              </div>

              {exp.status === 'processing' ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Обработка...</span>
                    <span className="text-cyan-400">{exp.progress}%</span>
                  </div>
                  <Progress value={exp.progress} className="h-2" />
                </div>
              ) : (
                <Button className={`w-full bg-gradient-to-r ${exp.color} hover:opacity-90 text-white border-0`}>
                  <Zap className="w-4 h-4 mr-2" />
                  Запустить эксперимент
                </Button>
              )}
            </Card>
          );
        })}
      </div>

      {/* Merge Documents Section */}
      <Card className="glass-strong p-6 border border-white/10">
        <div className="flex items-center gap-2 mb-6">
          <Merge className="w-5 h-5 text-cyan-400" />
          <h2 className="text-white">Объединение документов</h2>
        </div>
        <div className="space-y-4">
          {/* Document Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass p-4 rounded-lg border border-white/10 cursor-pointer hover:border-cyan-500/50 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  <span className="text-white text-sm">Документ {i}</span>
                </div>
                <p className="text-gray-400 text-xs">Квартальный отчёт Q{i} 2024</p>
              </div>
            ))}
          </div>

          {/* Merge Options */}
          <div className="glass p-4 rounded-lg border border-white/10">
            <h4 className="text-white mb-3 text-sm">Параметры объединения</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-white/20" defaultChecked />
                <span className="text-gray-300 text-sm">Создать AI-резюме</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-white/20" defaultChecked />
                <span className="text-gray-300 text-sm">Сохранить структуру документов</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-white/20" />
                <span className="text-gray-300 text-sm">Добавить оглавление</span>
              </label>
            </div>
          </div>

          <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0">
            <Merge className="w-4 h-4 mr-2" />
            Объединить документы
          </Button>
        </div>
      </Card>

      {/* Document Evolution Viewer */}
      <Card className="glass-strong p-6 border border-white/10">
        <div className="flex items-center gap-2 mb-6">
          <GitBranch className="w-5 h-5 text-purple-400" />
          <h2 className="text-white">История изменений документа</h2>
        </div>
        <div className="relative">
          {/* Timeline */}
          <div className="flex items-center justify-between mb-6">
            {[1, 2, 3, 4, 5].map((version) => (
              <div key={version} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white mb-2 cursor-pointer hover:scale-110 transition-transform">
                  v{version}
                </div>
                <span className="text-gray-400 text-xs">15.11.24</span>
              </div>
            ))}
          </div>
          <div className="absolute top-6 left-6 right-6 h-0.5 bg-white/10" />
        </div>

        {/* Changes Summary */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="glass p-4 rounded-lg border border-green-500/30">
            <div className="text-green-400 text-2xl mb-1">+23</div>
            <div className="text-gray-400 text-xs">Добавлений</div>
          </div>
          <div className="glass p-4 rounded-lg border border-red-500/30">
            <div className="text-red-400 text-2xl mb-1">-12</div>
            <div className="text-gray-400 text-xs">Удалений</div>
          </div>
          <div className="glass p-4 rounded-lg border border-orange-500/30">
            <div className="text-orange-400 text-2xl mb-1">8</div>
            <div className="text-gray-400 text-xs">Изменений</div>
          </div>
        </div>
      </Card>

      {/* Recent Experiments */}
      <Card className="glass-strong p-6 border border-white/10">
        <h2 className="text-white mb-4">Недавние эксперименты</h2>
        <div className="space-y-3">
          {recentExperiments.map((exp, index) => (
            <div key={index} className="flex items-center justify-between glass p-3 rounded-lg border border-white/10">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${exp.success ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-white text-sm">{exp.name}</span>
              </div>
              <span className="text-gray-400 text-xs">{exp.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
