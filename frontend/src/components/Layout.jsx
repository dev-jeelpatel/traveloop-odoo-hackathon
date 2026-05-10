import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  LayoutDashboard, Map, PlusCircle, Globe, Search, Users,
  User, LogOut, Compass, Menu, X
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/trips', icon: Map, label: 'My Trips' },
  { to: '/trips/new', icon: PlusCircle, label: 'New Trip' },
  { to: '/cities', icon: Globe, label: 'City Search' },
  { to: '/activities', icon: Search, label: 'Activities' },
  { to: '/community', icon: Users, label: 'Community' },
];

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/login'); };

  const Sidebar = ({ mobile = false }) => (
    <aside className={`flex flex-col h-full bg-dark-800/80 backdrop-blur-2xl border-r border-white/5 ${mobile ? 'w-72' : 'w-64'}`}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-white/5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-ocean-500 flex items-center justify-center shadow-lg shadow-primary-500/30">
          <Compass className="w-5 h-5 text-white" />
        </div>
        <div>
          <span className="text-lg font-bold font-display bg-gradient-to-r from-primary-300 to-ocean-300 bg-clip-text text-transparent">
            Traveloop
          </span>
          <p className="text-[10px] text-white/30 -mt-0.5">Your smart travel planner</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/trips/new'}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''}`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <Icon className="w-4.5 h-4.5 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="px-3 pb-4 border-t border-white/5 pt-4 space-y-1">
        <NavLink
          to="/profile"
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          onClick={() => setSidebarOpen(false)}
        >
          <User className="w-4.5 h-4.5" />
          Profile
        </NavLink>
        <button onClick={handleLogout} className="sidebar-link w-full text-coral-400 hover:bg-coral-500/10 hover:text-coral-300">
          <LogOut className="w-4.5 h-4.5" />
          Sign Out
        </button>

        {/* User chip */}
        <div className="flex items-center gap-3 px-4 py-3 mt-2 glass-card">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-ocean-500 flex items-center justify-center text-xs font-bold">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.name}</p>
            <p className="text-[11px] text-white/40 truncate">{user?.email}</p>
          </div>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden md:flex flex-col h-full shrink-0">
        <Sidebar />
      </div>

      {/* Mobile overlay sidebar */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="flex flex-col h-full"><Sidebar mobile /></div>
          <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile header */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-dark-800/80 backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-ocean-500 flex items-center justify-center">
              <Compass className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold font-display bg-gradient-to-r from-primary-300 to-ocean-300 bg-clip-text text-transparent">
              Traveloop
            </span>
          </div>
          <button onClick={() => setSidebarOpen(true)} className="btn-icon">
            <Menu className="w-5 h-5" />
          </button>
        </header>

        {/* Page */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
