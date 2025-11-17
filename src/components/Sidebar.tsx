import { Home, FolderOpen, MessageSquare, Search, Clock, Settings, Sparkles, TrendingUp, Beaker, Palette, Trophy } from 'lucide-react';
import type { Page } from '../App';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isDarkMode?: boolean;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const mainItems = [
    { id: 'dashboard' as Page, label: 'Главная', icon: Home },
    { id: 'documents' as Page, label: 'Документы', icon: FolderOpen },
    { id: 'chat' as Page, label: 'AI-чат', icon: MessageSquare },
  ];

  const aiFeatures = [
    { id: 'ai-playground' as Page, label: 'AI Playground', icon: Sparkles, badge: 'New' },
    { id: 'ai-insights' as Page, label: 'AI Insights', icon: TrendingUp },
    { id: 'document-lab' as Page, label: 'Document Lab', icon: Beaker },
    { id: 'ai-studio' as Page, label: 'AI Studio', icon: Palette },
  ];

  const otherItems = [
    { id: 'analysis' as Page, label: 'Анализ', icon: Search },
    { id: 'history' as Page, label: 'История', icon: Clock },
    { id: 'settings' as Page, label: 'Настройки', icon: Settings },
  ];

  return (
    <aside className="w-[280px] bg-white border-r border-gray-200 flex flex-col shadow-lg">
      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-purple flex items-center justify-center glow">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">DocuMind AI</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        {/* Main Items */}
        <ul className="space-y-1 mb-6">
          {mainItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                    ${isActive 
                      ? 'gradient-purple text-white shadow-lg' 
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* AI Features Section */}
        <div className="mb-6">
          <div className="px-4 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              AI Features
            </span>
          </div>
          <ul className="space-y-1">
            {aiFeatures.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                      ${isActive 
                        ? 'gradient-cyan text-white shadow-lg' 
                        : 'text-gray-700 hover:bg-gray-50'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="flex-1 text-left font-medium">{item.label}</span>
                    {item.badge && !isActive && (
                      <Badge className="gradient-pink text-white text-xs px-2">
                        {item.badge}
                      </Badge>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Other Items */}
        <ul className="space-y-1">
          {otherItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                    ${isActive 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile with Level */}
      <div className="p-4 border-t border-gray-100">
        <div className="premium-card p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full gradient-purple flex items-center justify-center text-white font-bold relative">
              АП
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full gradient-pink flex items-center justify-center text-[10px] font-bold text-white border-2 border-white">
                5
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="truncate font-semibold text-gray-900">Александр Петров</div>
              <div className="text-xs text-gray-500">Level 5 • Pro User</div>
            </div>
            <Trophy className="w-5 h-5 text-yellow-500" />
          </div>
          {/* Progress bar */}
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>XP</span>
              <span>2,450 / 3,000</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full gradient-purple progress-bar" style={{ width: '82%' }} />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
