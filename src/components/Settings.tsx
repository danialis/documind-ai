import { User, Bell, Shield, CreditCard, Globe, Moon, Sun, LogOut, Key, Smartphone } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';

interface SettingsProps {
  isDarkMode: boolean;
  onToggleDarkMode: (enabled: boolean) => void;
  onLogout: () => void;
}

export function Settings({ isDarkMode, onToggleDarkMode, onLogout }: SettingsProps) {
  const sessions = [
    { device: 'MacBook Pro', location: 'Москва, Россия', lastActive: 'Сейчас', isCurrent: true },
    { device: 'iPhone 13', location: 'Москва, Россия', lastActive: '2 часа назад', isCurrent: false },
    { device: 'Windows PC', location: 'Санкт-Петербург, Россия', lastActive: '1 день назад', isCurrent: false },
  ];

  return (
    <div className={`p-8 ${isDarkMode ? 'bg-gray-900' : ''}`}>
      {/* Header */}
      <div className="mb-6">
        <h1 className={`mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Настройки</h1>
        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Управление вашим аккаунтом и предпочтениями</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Профиль</TabsTrigger>
          <TabsTrigger value="preferences">Предпочтения</TabsTrigger>
          <TabsTrigger value="integrations">Интеграции</TabsTrigger>
          <TabsTrigger value="notifications">Уведомления</TabsTrigger>
          <TabsTrigger value="security">Безопасность</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className={isDarkMode ? 'text-white' : 'text-gray-900'}>Личная информация</h2>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Обновите свой профиль</p>
              </div>
            </div>
            
            {/* Avatar Upload */}
            <div className="mb-6 flex items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-xl">
                  АП
                </AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" size="sm" className="mb-2">Загрузить фото</Button>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>JPG, PNG. Макс. 2MB</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Имя</label>
                <input
                  type="text"
                  defaultValue="Александр Петров"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                <input
                  type="email"
                  defaultValue="alex@company.com"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Сохранить изменения
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
            <div className="space-y-6">
              {/* Theme */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isDarkMode ? <Moon className="w-5 h-5 text-purple-600" /> : <Sun className="w-5 h-5 text-amber-600" />}
                  <div>
                    <div className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Тёмная тема</div>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Переключение между светлой и тёмной темой</p>
                  </div>
                </div>
                <Switch checked={isDarkMode} onCheckedChange={onToggleDarkMode} />
              </div>

              {/* Language */}
              <div>
                <label className={`block text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Язык интерфейса</label>
                <select className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <option>Русский</option>
                  <option>English</option>
                  <option>Español</option>
                  <option>Deutsch</option>
                </select>
              </div>

              {/* Timezone */}
              <div>
                <label className={`block text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Часовой пояс</label>
                <select className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <option>Europe/Moscow (GMT+3)</option>
                  <option>Europe/London (GMT+0)</option>
                  <option>America/New_York (GMT-5)</option>
                  <option>Asia/Tokyo (GMT+9)</option>
                </select>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-6">
          <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
            <div className="space-y-6">
              {/* Google Drive */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M7.71 3.5L1.15 15l3.42 5.92L11.13 9.42 7.71 3.5z"/>
                      <path fill="#34A853" d="M20.29 3.5L11.13 9.42 7.71 3.5h12.58z"/>
                      <path fill="#FBBC04" d="M11.13 9.42l-6.56 11.5h13.12L20.29 3.5z"/>
                    </svg>
                  </div>
                  <div>
                    <div className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Google Drive</div>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Синхронизация документов</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Подключить</Button>
              </div>

              {/* Telegram Bot */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="#0088cc" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.053 5.56-5.023c.242-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                    </svg>
                  </div>
                  <div>
                    <div className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Telegram бот</div>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Управление через Telegram</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Настроить</Button>
              </div>

              {/* API Keys */}
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Key className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>API ключи</div>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Для интеграции со сторонними сервисами</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Управление ключами</Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Email уведомления</div>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Получать уведомления на email</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Push уведомления</div>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Уведомления в браузере</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Завершение обработки</div>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Уведомлять о завершении анализа</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Новые функции</div>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Информация о новых возможностях</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Маркетинговые рассылки</div>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Новости и спецпредложения</p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Key className="w-4 h-4 mr-2" />
                Изменить пароль
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Smartphone className="w-4 h-4 mr-2" />
                Двухфакторная аутентификация
              </Button>
            </div>
          </Card>

          {/* Active Sessions */}
          <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
            <h3 className={`mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Активные сессии</h3>
            <div className="space-y-4">
              {sessions.map((session, index) => (
                <div key={index} className={`flex items-center justify-between p-4 border rounded-lg ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <div>
                    <div className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {session.device}
                      {session.isCurrent && <span className="ml-2 text-xs text-green-600">(Текущая)</span>}
                    </div>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {session.location} • {session.lastActive}
                    </p>
                  </div>
                  {!session.isCurrent && (
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      Завершить
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Logout */}
          <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
            <Button 
              variant="outline" 
              className="w-full justify-start text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
              onClick={onLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Выйти из аккаунта
            </Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}