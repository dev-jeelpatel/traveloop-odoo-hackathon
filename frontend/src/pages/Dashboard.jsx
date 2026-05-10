import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../lib/api';
import { Map, PlusCircle, Globe, Clock, ArrowRight, TrendingUp, Users, Star } from 'lucide-react';
import { format } from 'date-fns';

const MESHES = ['trip-card-mesh-1','trip-card-mesh-2','trip-card-mesh-3','trip-card-mesh-4','trip-card-mesh-5','trip-card-mesh-6'];

const STATUS_BADGE = {
  PLANNING: 'badge-primary',
  CONFIRMED: 'badge-ocean',
  ONGOING: 'badge-amber',
  COMPLETED: 'badge-sage',
  CANCELLED: 'badge-coral',
};

export default function Dashboard() {
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/trips').then(({ data }) => setTrips(data)).finally(() => setLoading(false));
  }, []);

  const upcoming = trips.filter(t => new Date(t.startDate) > new Date()).slice(0, 3);
  const recent = trips.slice(0, 4);
  const stats = [
    { label: 'Total Trips', value: trips.length, icon: Map, color: 'from-primary-500 to-primary-600' },
    { label: 'Upcoming', value: upcoming.length, icon: Clock, color: 'from-ocean-500 to-ocean-600' },
    { label: 'Completed', value: trips.filter(t => t.status === 'COMPLETED').length, icon: Star, color: 'from-sage-500 to-sage-600' },
  ];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero greeting */}
      <div className="relative overflow-hidden glass-card p-8 bg-gradient-to-r from-primary-600/20 to-ocean-500/10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNi02aDZ2LTZoLTZ2NnptLTYgMGg2di02aC02djZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        <div className="relative">
          <p className="text-white/50 text-sm font-medium">{greeting} 👋</p>
          <h1 className="text-3xl md:text-4xl font-bold font-display mt-1">
            {user?.name?.split(' ')[0]}, ready to explore?
          </h1>
          <p className="text-white/60 mt-2 max-w-lg">
            {trips.length === 0
              ? 'Create your first trip and start building your perfect itinerary.'
              : `You have ${trips.length} trip${trips.length !== 1 ? 's' : ''} planned. Keep exploring the world!`}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/trips/new" className="btn-primary">
              <PlusCircle className="w-4 h-4" />
              New Trip
            </Link>
            <Link to="/community" className="btn-secondary">
              <Globe className="w-4 h-4" />
              Explore Community
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="glass-card p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shrink-0 shadow-lg`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold font-display text-white">{value}</p>
              <p className="text-xs text-white/50 font-medium">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent trips */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title mb-0">Recent Trips</h2>
          <Link to="/trips" className="btn-ghost text-sm gap-1">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1,2,3,4].map(i => <div key={i} className="skeleton h-48" />)}
          </div>
        ) : recent.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <Map className="w-12 h-12 text-white/20 mx-auto mb-3" />
            <p className="text-white/40 font-medium">No trips yet</p>
            <p className="text-white/30 text-sm mt-1">Create your first trip to get started</p>
            <Link to="/trips/new" className="btn-primary mt-4 inline-flex">
              <PlusCircle className="w-4 h-4" /> Create Trip
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recent.map((trip, idx) => (
              <Link key={trip.id} to={`/trips/${trip.id}`} className="group glass-card-hover overflow-hidden block">
                <div className={`h-28 ${MESHES[idx % MESHES.length]} relative flex items-end p-4`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="relative">
                    <span className={`${STATUS_BADGE[trip.status]} badge`}>{trip.status}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white group-hover:text-primary-300 transition-colors">{trip.title}</h3>
                  <p className="text-white/40 text-sm mt-1">
                    {format(new Date(trip.startDate), 'MMM d')} – {format(new Date(trip.endDate), 'MMM d, yyyy')}
                  </p>
                  {trip.stops?.length > 0 && (
                    <p className="text-white/30 text-xs mt-1">
                      {trip.stops.map(s => s.city?.name).filter(Boolean).join(' → ')}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="section-title">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { to: '/cities', icon: Globe, label: 'Search Cities', color: 'from-ocean-500/20 to-ocean-600/10' },
            { to: '/activities', icon: TrendingUp, label: 'Find Activities', color: 'from-sage-500/20 to-sage-600/10' },
            { to: '/community', icon: Users, label: 'Community', color: 'from-coral-500/20 to-coral-600/10' },
            { to: '/trips/new', icon: PlusCircle, label: 'Plan a Trip', color: 'from-primary-500/20 to-primary-600/10' },
          ].map(({ to, icon: Icon, label, color }) => (
            <Link key={to} to={to}
              className={`glass-card bg-gradient-to-br ${color} p-5 text-center group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl block`}>
              <Icon className="w-6 h-6 text-white/70 group-hover:text-white mx-auto mb-2 transition-colors" />
              <p className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">{label}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
