import { Search, Bell, Settings, Sun, Moon } from 'lucide-react';
import { Badge } from './ui/badge';
import type { Page } from '../App';

interface HeaderProps {
  isDarkMode?: boolean;
  onNavigate: (page: Page) => void;
  onToggleDarkMode?: () => void;
}

export function Header({ isDarkMode, onNavigate, onToggleDarkMode }: HeaderProps) {
  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-500" />
          <input
            type="text"
            placeholder="Поиск документов, чатов..."
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white transition-all"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        {onToggleDarkMode && (
          <button
            onClick={onToggleDarkMode}
            className="p-3 rounded-xl hover:bg-gradient-to-br hover:from-purple-500 hover:to-cyan-500 text-gray-600 hover:text-white transition-all group"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            ) : (
              <Moon className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-300" />
            )}
          </button>
        )}

        {/* Notifications */}
        <button className="relative p-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">
          <Bell className="w-5 h-5" />
          <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 gradient-pink text-white text-xs border-2 border-white">
            3
          </Badge>
        </button>

        {/* Settings */}
        <button 
          onClick={() => onNavigate('settings')}
          className="p-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}