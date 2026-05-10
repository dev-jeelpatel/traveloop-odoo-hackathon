import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  LayoutDashboard, Map, PlusCircle, Globe, Search, Users,
  User, LogOut, Compass, Menu, X
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/trips',     icon: Map,             label: 'My Trips' },
  { to: '/trips/new', icon: PlusCircle,      label: 'New Trip' },
  { to: '/cities',    icon: Globe,           label: 'City Search' },
  { to: '/activities',icon: Search,          label: 'Activities' },
  { to: '/community', icon: Users,           label: 'Community' },
];

const SidebarContent = ({ user, handleLogout, setSidebarOpen }) => (
  <aside className="flex flex-col h-full bg-white border-r border-cream-300 w-64">
    {/* Logo */}
    <div className="flex items-center gap-3 px-6 py-5 border-b border-cream-200">
      <div
        className="w-9 h-9 rounded-2xl flex items-center justify-center shadow-teal"
        style={{ background: 'linear-gradient(135deg, #0F766E, #14B8A6)' }}
      >
        <Compass className="w-5 h-5 text-white" />
      </div>
      <div>
        <span className="text-lg font-bold font-display text-teal-700">Traveloop</span>
        <p className="text-[10px] text-ink-300 -mt-0.5 font-sans">Your smart travel planner</p>
      </div>
    </div>

    {/* Nav */}
    <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
      {navItems.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/trips/new'}
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          onClick={() => setSidebarOpen(false)}
        >
          <Icon className="w-4 h-4 shrink-0" />
          {label}
        </NavLink>
      ))}
    </nav>

    {/* Bottom: Profile + logout */}
    <div className="px-3 pb-4 border-t border-cream-200 pt-3 space-y-1">
      <NavLink
        to="/profile"
        className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        onClick={() => setSidebarOpen(false)}
      >
        <User className="w-4 h-4" /> Profile
      </NavLink>
      <button
        onClick={handleLogout}
        className="sidebar-link w-full text-red-500 hover:bg-red-50 hover:text-red-600"
      >
        <LogOut className="w-4 h-4" /> Sign Out
      </button>

      {/* User chip */}
      <div className="flex items-center gap-3 px-4 py-3 mt-2 bg-cream-100 rounded-2xl border border-cream-200">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
          style={{ background: 'linear-gradient(135deg, #0F766E, #14B8A6)' }}
        >
          {user?.name?.[0]?.toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-ink-900 truncate">{user?.name}</p>
          <p className="text-[11px] text-ink-300 truncate">{user?.email}</p>
        </div>
      </div>
    </div>
  </aside>
);

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="flex h-screen overflow-hidden bg-cream-100">
      {/* Desktop sidebar */}
      <div className="hidden md:flex flex-col h-full shrink-0">
        <SidebarContent user={user} handleLogout={handleLogout} setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Mobile overlay sidebar */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="flex flex-col h-full">
            <SidebarContent user={user} handleLogout={handleLogout} setSidebarOpen={setSidebarOpen} />
          </div>
          <div
            className="flex-1 bg-ink-900/30 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile header */}
        <header className="md:hidden navbar flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #0F766E, #14B8A6)' }}
            >
              <Compass className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold font-display text-teal-700">Traveloop</span>
          </div>
          <button onClick={() => setSidebarOpen(true)} className="btn-icon">
            <Menu className="w-5 h-5" />
          </button>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
