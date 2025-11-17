import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { DocumentUpload } from './components/DocumentUpload';
import { AIChat } from './components/AIChat';
import { Documents } from './components/Documents';
import { Analysis } from './components/Analysis';
import { History } from './components/History';
import { Settings } from './components/Settings';
import { DocumentAnalysis } from './components/DocumentAnalysis';
import { DocumentCompare } from './components/DocumentCompare';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { ReadmePresentation } from './components/ReadmePresentation';
import { ArchitectureDocs } from './components/ArchitectureDocs';
import { AIPlayground } from './components/AIPlayground';
import { AIInsights } from './components/AIInsights';
import { DocumentLab } from './components/DocumentLab';
import { AIStudio } from './components/AIStudio';
import { Toaster } from './components/ui/sonner';

export type Page = 'dashboard' | 'documents' | 'chat' | 'analysis' | 'history' | 'settings' | 'upload' | 'document-analysis' | 'document-compare' | 'login' | 'register' | 'readme' | 'architecture' | 'ai-playground' | 'ai-insights' | 'document-lab' | 'ai-studio';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const renderPage = () => {
    // Auth pages
    if (!isAuthenticated) {
      if (currentPage === 'register') {
        return <Register onNavigate={setCurrentPage} onLogin={() => setIsAuthenticated(true)} />;
      }
      return <Login onNavigate={setCurrentPage} onLogin={() => setIsAuthenticated(true)} />;
    }

    // Main pages
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'upload':
        return <DocumentUpload />;
      case 'chat':
        return <AIChat />;
      case 'documents':
        return <Documents onNavigate={setCurrentPage} />;
      case 'analysis':
        return <Analysis />;
      case 'document-analysis':
        return <DocumentAnalysis />;
      case 'document-compare':
        return <DocumentCompare />;
      case 'history':
        return <History />;
      case 'ai-playground':
        return <AIPlayground />;
      case 'ai-insights':
        return <AIInsights />;
      case 'document-lab':
        return <DocumentLab />;
      case 'ai-studio':
        return <AIStudio />;
      case 'settings':
        return <Settings isDarkMode={isDarkMode} onToggleDarkMode={setIsDarkMode} onLogout={() => { setIsAuthenticated(false); setCurrentPage('login'); }} />;
      case 'readme':
        return <ReadmePresentation />;
      case 'architecture':
        return <ArchitectureDocs />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="flex h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-50">
        {isAuthenticated && currentPage !== 'readme' && currentPage !== 'architecture' && (
          <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} isDarkMode={isDarkMode} />
        )}
        <div className="flex-1 flex flex-col overflow-hidden">
          {isAuthenticated && currentPage !== 'readme' && currentPage !== 'architecture' && (
            <Header isDarkMode={isDarkMode} onNavigate={setCurrentPage} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
          )}
          <main className="flex-1 overflow-y-auto">
            {renderPage()}
          </main>
        </div>
      </div>
      <Toaster />
    </div>
  );
}