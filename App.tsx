import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Documents from './pages/Documents';
import Chat from './pages/Chat';
import { Settings } from './pages/Settings';
import { User } from './types';

// Mock user constant since login is removed
const DEFAULT_USER: User = {
  id: 'demo-user',
  name: 'Admin User',
  email: 'admin@documind.ai',
};

const App: React.FC = () => {
  const user = DEFAULT_USER;

  return (
    <HashRouter>
      <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
        <Sidebar user={user} onLogout={() => {}} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto h-screen">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/settings" element={<Settings user={user} />} />
            <Route path="/ai-config" element={<Settings user={user} />} />
            <Route path="/library" element={<div className="p-8 text-center text-gray-500">Thư viện mẫu đang phát triển...</div>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;