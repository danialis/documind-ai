import { useState } from 'react';
import { Sparkles, Mail, Lock, Github, Chrome } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Checkbox } from './ui/checkbox';
import type { Page } from '../App';
import { toast } from 'sonner@2.0.3';

interface LoginProps {
  onNavigate: (page: Page) => void;
  onLogin: () => void;
}

export function Login({ onNavigate, onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Добро пожаловать в DocuMind AI!');
    onLogin();
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-cyan-50 to-pink-50 p-4 relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />

      <Card className="w-full max-w-[450px] p-10 shadow-2xl border-0 scale-in relative z-10 bg-white/90 backdrop-blur-sm">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl gradient-purple mb-4 glow float">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="gradient-text mb-2 text-4xl">DocuMind AI</h1>
          <p className="text-gray-600">Войдите в свой аккаунт</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-purple-500" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white"
                placeholder="alex@company.com"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Пароль
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-purple-500" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer">
              <Checkbox
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                className="mr-2"
              />
              <span className="text-sm text-gray-600">Запомнить меня</span>
            </label>
            <button type="button" className="text-sm gradient-text font-semibold hover:opacity-80">
              Забыли пароль?
            </button>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full h-12 gradient-purple text-white border-0 hover-scale shadow-lg text-base"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Войти
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">или войти через</span>
          </div>
        </div>

        {/* OAuth Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            className="h-12 border-gray-200 hover:bg-gray-50 transition-all"
          >
            <Github className="w-5 h-5 mr-2" />
            GitHub
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-12 border-gray-200 hover:bg-gray-50 transition-all"
          >
            <Chrome className="w-5 h-5 mr-2" />
            Google
          </Button>
        </div>

        {/* Register Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Нет аккаунта?{' '}
          <button
            type="button"
            onClick={() => onNavigate('register')}
            className="gradient-text font-semibold hover:opacity-80"
          >
            Зарегистрироваться
          </button>
        </p>

        {/* Demo Links */}
        <div className="mt-6 pt-6 border-t border-gray-100 text-center space-y-2">
          <p className="text-xs text-gray-500">Документация</p>
          <div className="flex justify-center gap-4 text-sm">
            <button
              type="button"
              onClick={() => onNavigate('readme')}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              README
            </button>
            <span className="text-gray-300">•</span>
            <button
              type="button"
              onClick={() => onNavigate('architecture')}
              className="text-cyan-600 hover:text-cyan-700 font-medium"
            >
              Database Setup
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
