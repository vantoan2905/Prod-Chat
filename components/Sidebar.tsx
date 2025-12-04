import React from 'react';
import { 
  LayoutDashboard, 
  Files, 
  MessageSquare, 
  Library, 
  Settings, 
  Sparkles,
  LogOut,
  User as UserIcon
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { User } from '../types';

interface SidebarProps {
  user: User | null;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ user, onLogout }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-gray-200 text-gray-900 font-semibold' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900';
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Tổng quan', path: '/' },
    { icon: Files, label: 'Tài liệu', path: '/documents' },
    { icon: MessageSquare, label: 'Chat AI', path: '/chat' },
    { icon: Library, label: 'Thư viện mẫu', path: '/library' },
  ];

  const settingItems = [
    { icon: Settings, label: 'Cài đặt', path: '/settings' },
    { icon: Sparkles, label: 'Cấu hình AI', path: '/ai-config' },
  ];

  if (!user) return null;

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white font-bold">D</div>
            <span className="text-xl font-bold text-gray-800 tracking-tight">DocuMind</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-6 overflow-y-auto">
        <div>
          <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Menu</p>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${isActive(item.path)}`}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Hệ thống</p>
          <ul className="space-y-1">
            {settingItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${isActive(item.path)}`}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                <UserIcon size={16} />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
        </div>
        <button 
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
        >
            <LogOut size={16} />
            Đăng xuất
        </button>
      </div>
    </aside>
  );
};