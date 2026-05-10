import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../lib/api';
import { Map, PlusCircle, Globe, Clock, ArrowRight, TrendingUp, Users, Star, MapPin } from 'lucide-react';
import { format } from 'date-fns';

const MESHES = ['trip-card-mesh-1','trip-card-mesh-2','trip-card-mesh-3','trip-card-mesh-4','trip-card-mesh-5','trip-card-mesh-6'];
const STATUS_BADGE = {
  PLANNING: 'badge-teal', CONFIRMED: 'badge-sage', ONGOING: 'badge-amber',
  COMPLETED: 'badge-sage', CANCELLED: 'badge-red',
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
    { label: 'Total Trips', value: trips.length, icon: Map, bg: '#0F766E', shadow: 'rgba(15,118,110,0.25)' },
    { label: 'Upcoming', value: upcoming.length, icon: Clock, bg: '#0369A1', shadow: 'rgba(3,105,161,0.2)' },
    { label: 'Completed', value: trips.filter(t => t.status === 'COMPLETED').length, icon: Star, bg: '#5F8D52', shadow: 'rgba(95,141,82,0.2)' },
  ];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero greeting */}
      <div className="relative overflow-hidden rounded-3xl p-8 text-white"
        style={{ background: 'linear-gradient(135deg, #0F766E 0%, #14B8A6 60%, #99F6E4 100%)' }}>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='20' cy='20' r='1.5'/%3E%3C/g%3E%3C/svg%3E\")"
        }} />
        <div className="relative">
          <p className="text-teal-100 text-sm font-medium">{greeting} 👋</p>
          <h1 className="text-3xl md:text-4xl font-bold font-display mt-1 text-white">
            {user?.name?.split(' ')[0]}, ready to explore?
          </h1>
          <p className="text-teal-100 mt-2 max-w-lg">
            {trips.length === 0
              ? 'Create your first trip and start building your perfect itinerary.'
              : `You have ${trips.length} trip${trips.length !== 1 ? 's' : ''} planned. Keep exploring the world!`}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/trips/new" className="inline-flex items-center gap-2 bg-white text-teal-700 font-semibold px-5 py-2.5 rounded-2xl hover:bg-teal-50 transition-colors shadow-lg">
              <PlusCircle className="w-4 h-4" /> New Trip
            </Link>
            <Link to="/community" className="inline-flex items-center gap-2 bg-white/20 text-white border border-white/30 font-semibold px-5 py-2.5 rounded-2xl hover:bg-white/30 transition-colors backdrop-blur-sm">
              <Globe className="w-4 h-4" /> Explore Community
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map(({ label, value, icon: Icon, bg, shadow }) => (
          <div key={label} className="card p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: bg, boxShadow: `0 6px 20px ${shadow}` }}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold font-display text-ink-900">{value}</p>
              <p className="text-xs text-ink-300 font-medium">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent trips */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title mb-0">Recent Trips</h2>
          <Link to="/trips" className="btn-ghost text-sm gap-1 text-teal-600">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1,2,3,4].map(i => <div key={i} className="skeleton h-48" />)}
          </div>
        ) : recent.length === 0 ? (
          <div className="card p-12 text-center">
            <Map className="w-12 h-12 text-ink-100 mx-auto mb-3" />
            <p className="text-ink-500 font-medium">No trips yet</p>
            <p className="text-ink-300 text-sm mt-1">Create your first trip to get started</p>
            <Link to="/trips/new" className="btn-primary mt-4 inline-flex">
              <PlusCircle className="w-4 h-4" /> Create Trip
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recent.map((trip, idx) => (
              <Link key={trip.id} to={`/trips/${trip.id}`} className="card-hover overflow-hidden block group">
                <div className={`h-28 ${MESHES[idx % MESHES.length]} relative flex items-end p-4`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className={`${STATUS_BADGE[trip.status]} relative`}>{trip.status}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-ink-900 group-hover:text-teal-700 transition-colors">{trip.title}</h3>
                  <p className="text-ink-300 text-sm mt-1">
                    {format(new Date(trip.startDate), 'MMM d')} – {format(new Date(trip.endDate), 'MMM d, yyyy')}
                  </p>
                  {trip.stops?.length > 0 && (
                    <p className="text-ink-300 text-xs mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
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
        <h2 className="section-title">Explore</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { to: '/cities',     icon: Globe,      label: 'Search Cities',   bg: '#EFF6FF', color: '#0369A1', border: '#BFDBFE' },
            { to: '/activities', icon: TrendingUp,  label: 'Find Activities', bg: '#F0FDF4', color: '#16A34A', border: '#BBF7D0' },
            { to: '/community',  icon: Users,       label: 'Community',       bg: '#F0FDFA', color: '#0F766E', border: '#99F6E4' },
            { to: '/trips/new',  icon: PlusCircle,  label: 'Plan a Trip',     bg: '#FFF7ED', color: '#D97706', border: '#FED7AA' },
          ].map(({ to, icon: Icon, label, bg, color, border }) => (
            <Link key={to} to={to}
              className="rounded-3xl p-5 text-center group transition-all duration-300 hover:-translate-y-1 hover:shadow-card-md block border"
              style={{ background: bg, borderColor: border }}>
              <Icon className="w-6 h-6 mx-auto mb-2 transition-transform group-hover:scale-110" style={{ color }} />
              <p className="text-sm font-semibold font-display" style={{ color }}>{label}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
