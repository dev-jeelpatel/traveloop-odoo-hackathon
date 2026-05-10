import { useEffect, useState } from 'react';
import api from '../lib/api';
import { Search, Star, Clock, DollarSign, MapPin, Filter } from 'lucide-react';

const CATEGORIES = ['ALL','SIGHTSEEING','FOOD','ADVENTURE','CULTURE','SHOPPING','NIGHTLIFE','RELAXATION','TRANSPORT','ACCOMMODATION','OTHER'];
const CAT_COLOR = {
  SIGHTSEEING:'badge-primary', FOOD:'badge-amber', ADVENTURE:'badge-coral',
  CULTURE:'badge-ocean', SHOPPING:'badge-sage', NIGHTLIFE:'badge-primary',
  RELAXATION:'badge-sage', TRANSPORT:'badge-ocean', ACCOMMODATION:'badge-amber', OTHER:'badge-primary',
};

export default function ActivitySearch() {
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('ALL');
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (q) params.append('q', q);
    if (category !== 'ALL') params.append('category', category);
    const t = setTimeout(() => {
      api.get(`/activities?${params}`).then(({ data }) => setActivities(data)).finally(() => setLoading(false));
    }, 400);
    return () => clearTimeout(t);
  }, [q, category]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Activity Search</h1>
        <p className="page-subtitle">Discover things to do at your destination</p>
      </div>

      <div className="glass-card p-5 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text" id="activity-search-input"
            placeholder="Search activities by name…"
            className="input pl-12"
            value={q} onChange={e => setQ(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-white/30 shrink-0" />
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 ${category === cat ? 'bg-primary-600 border-primary-500 text-white' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map(i => <div key={i} className="skeleton h-40" />)}
        </div>
      ) : activities.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <Star className="w-12 h-12 text-white/20 mx-auto mb-3" />
          <p className="text-white/40 font-medium">No activities found</p>
          <p className="text-white/25 text-sm mt-1">Activities are added by cities. Try searching cities first.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activities.map(act => (
            <div key={act.id} className="glass-card-hover p-5 flex flex-col gap-3">
              {act.imageUrl && (
                <img src={act.imageUrl} alt={act.name} className="w-full h-32 object-cover rounded-xl" />
              )}
              <div>
                <span className={`badge ${CAT_COLOR[act.category] || 'badge-primary'} mb-2`}>{act.category}</span>
                <h3 className="font-semibold text-white">{act.name}</h3>
                {act.description && <p className="text-white/50 text-sm mt-1 line-clamp-2">{act.description}</p>}
              </div>
              <div className="flex flex-wrap gap-3 text-xs text-white/40">
                {act.city && (
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{act.city.name}</span>
                )}
                {act.durationMin && (
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{act.durationMin} min</span>
                )}
                {act.costEstimate && (
                  <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />~{Number(act.costEstimate).toLocaleString()}</span>
                )}
              </div>
              {act.externalUrl && (
                <a href={act.externalUrl} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-primary-400 hover:text-primary-300 transition-colors">
                  Learn more →
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
