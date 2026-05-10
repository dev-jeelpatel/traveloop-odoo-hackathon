import { useEffect, useState } from 'react';
import api from '../lib/api';
import { Search, MapPin, Globe2, Loader2 } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function CitySearch() {
  const [q, setQ] = useState('');
  const [cities, setCities] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (q.length < 2) { setCities([]); return; }
    setLoading(true);
    const t = setTimeout(() => {
      api.get(`/cities?q=${q}`).then(({ data }) => setCities(data)).finally(() => setLoading(false));
    }, 400);
    return () => clearTimeout(t);
  }, [q]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">City Search</h1>
        <p className="page-subtitle">Discover destinations around the world</p>
      </div>

      <div className="card p-5">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-100" />
          {loading && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-100 animate-spin" />}
          <input
            type="text" id="city-search-input"
            placeholder="Search for a city — Paris, Goa, Tokyo, New York…"
            className="input pl-12 py-4 text-base"
            value={q} onChange={e => setQ(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* City list */}
        <div className="space-y-3">
          {cities.length === 0 && q.length >= 2 && !loading && (
            <div className="card p-10 text-center">
              <Globe2 className="w-10 h-10 text-ink-900/20 mx-auto mb-2" />
              <p className="text-ink-300">No cities found for "{q}"</p>
              <p className="text-ink-900/25 text-sm mt-1">Try a different spelling or broader term</p>
            </div>
          )}
          {cities.length === 0 && q.length < 2 && (
            <div className="card p-10 text-center">
              <Globe2 className="w-10 h-10 text-ink-900/20 mx-auto mb-2" />
              <p className="text-ink-300">Type at least 2 characters to search</p>
            </div>
          )}
          {cities.map(city => (
            <button key={city.id} onClick={() => setSelected(city)}
              className={`w-full text-left card p-4 transition-all duration-200 hover:bg-white/8 hover:border-teal-500/50 ${selected?.id === city.id ? 'border-teal-500/70 bg-teal-600/10' : ''}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600/30 to-ocean-500/30 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-teal-600" />
                </div>
                <div>
                  <p className="font-semibold text-ink-900">{city.name}</p>
                  <p className="text-sm text-ink-300">{city.country} · {city.countryCode}</p>
                </div>
                {city.timezone && <span className="ml-auto badge badge-teal text-xs">{city.timezone}</span>}
              </div>
              {city.description && (
                <p className="text-ink-300 text-sm mt-2 ml-13 line-clamp-2">{city.description}</p>
              )}
            </button>
          ))}
        </div>

        {/* Map */}
        <div className="h-[400px] card overflow-hidden sticky top-4">
          {selected ? (
            <MapContainer
              center={[Number(selected.latitude), Number(selected.longitude)]}
              zoom={10} style={{ height: '100%', width: '100%' }} key={selected.id}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[Number(selected.latitude), Number(selected.longitude)]}>
                <Popup><strong>{selected.name}</strong><br />{selected.country}</Popup>
              </Marker>
            </MapContainer>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-ink-100">
              <MapPin className="w-10 h-10 mb-2" />
              <p>Select a city to view on map</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
