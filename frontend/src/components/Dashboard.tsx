import { useState } from 'react';
import { User } from '../App';
import { Button } from './ui/button';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Upload, 
  History, 
  Settings, 
  LogOut,
  Sparkles
} from 'lucide-react';
import DashboardHome from './DashboardHome';
import AskSaral from './AskSaral';
import AddData from './AddData';
import HistoryPage from './HistoryPage';
import SettingsPage from './SettingsPage';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

type MenuItem = 'dashboard' | 'ask-saral' | 'add-data' | 'history' | 'settings';

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeMenu, setActiveMenu] = useState<MenuItem>(user.role === 'officer' ? 'dashboard' : 'ask-saral');

  const menuItems = user.role === 'officer' 
    ? [
        { id: 'dashboard' as MenuItem, label: 'Dashboard', icon: LayoutDashboard },
        { id: 'ask-saral' as MenuItem, label: 'Ask SARAL', icon: MessageSquare },
        { id: 'add-data' as MenuItem, label: 'Add Data', icon: Upload },
        { id: 'history' as MenuItem, label: 'History', icon: History },
        { id: 'settings' as MenuItem, label: 'Settings', icon: Settings },
      ]
    : [
        { id: 'ask-saral' as MenuItem, label: 'Ask SARAL', icon: MessageSquare },
      ];

  return (
    <div className="flex h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      {/* Sidebar */}
      <div className="relative w-72 bg-white/5 backdrop-blur-2xl border-r border-white/10 flex flex-col z-10">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-pink-600 rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative w-11 h-11 bg-gradient-to-br from-white/10 to-pink-600 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
            </div>
            <div>
              <div className="text-lg">SARAL.ai</div>
              <div className="text-xs text-slate-400">{user.role === 'officer' ? 'Officer Portal' : 'User Portal'}</div>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-white/10 to-pink-600 rounded-full flex items-center justify-center text-sm">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <div className="truncate text-sm">{user.name}</div>
              <div className="text-xs text-slate-500 truncate">{user.email}</div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeMenu === item.id
                  ? 'bg-gradient-to-r from-white/10 to-pink-600 text-white shadow-lg shadow-pink-500/25'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="flex-1 text-left text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <Button
            onClick={onLogout}
            variant="ghost"
            className="w-full justify-start text-slate-400 hover:text-white hover:bg-white/5 text-sm"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative flex-1 overflow-auto">
        {activeMenu === 'dashboard' && <DashboardHome />}
        {activeMenu === 'ask-saral' && <AskSaral />}
        {activeMenu === 'add-data' && <AddData />}
        {activeMenu === 'history' && <HistoryPage />}
        {activeMenu === 'settings' && <SettingsPage user={user} />}
      </div>
    </div>
  );
}
