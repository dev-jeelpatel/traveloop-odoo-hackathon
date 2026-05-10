import { useEffect, useState } from "react";
import api from "../lib/api";
import { Search, Activity, Clock, MapPin, Loader2, Tag } from "lucide-react";

const CATEGORIES = ["ALL","SIGHTSEEING","FOOD","ADVENTURE","CULTURE","SHOPPING","NIGHTLIFE","RELAXATION","TRANSPORT","OTHER"];
const CAT_COLORS = { SIGHTSEEING:"#0369A1",FOOD:"#D97706",ADVENTURE:"#DC2626",CULTURE:"#7C3AED",SHOPPING:"#DB2777",NIGHTLIFE:"#1D4ED8",RELAXATION:"#059669",TRANSPORT:"#374151",OTHER:"#2E7D6B" };

export default function ActivitySearch() {
  const [q,           setQ]          = useState("");
  const [activities,  setActivities] = useState([]);
  const [loading,     setLoading]    = useState(true);
  const [category,    setCategory]   = useState("ALL");

  const load = (search="", cat="ALL") => {
    setLoading(true);
    const params = new URLSearchParams({ limit:60 });
    if (search.length >= 2) params.set("q", search);
    if (cat !== "ALL")      params.set("category", cat);
    api.get(`/public/activities?${params}`)
      .then(({ data }) => setActivities(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  useEffect(() => {
    const t = setTimeout(() => load(q, category), 400);
    return () => clearTimeout(t);
  }, [q, category]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Activities</h1>
        <p className="page-subtitle">Discover things to do across all destinations</p>
      </div>

      <div className="card p-5 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-100"/>
          {loading && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-100 animate-spin"/>}
          <input type="text" placeholder="Search activities…"
            className="input pl-12 py-3 text-base"
            value={q} onChange={e => setQ(e.target.value)}/>
        </div>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              className="text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-200"
              style={{
                background: category===cat?(CAT_COLORS[cat]||"#2E7D6B"):"rgba(255,255,255,0.7)",
                color: category===cat?"#fff":(CAT_COLORS[cat]||"#6B7280"),
                borderColor: category===cat?"transparent":"rgba(124,154,126,0.25)",
              }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map(i => <div key={i} className="skeleton h-32 rounded-2xl"/>)}
        </div>
      ) : activities.length === 0 ? (
        <div className="card p-12 text-center">
          <Activity className="w-12 h-12 text-[#D1D5DB] mx-auto mb-3"/>
          <p className="text-[#6B7280] font-semibold">No activities found</p>
          <p className="text-[#9CA3AF] text-sm mt-1">Try a different search or category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activities.map(act => (
            <div key={act.id} className="card p-5 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                  style={{background:CAT_COLORS[act.category]||"#2E7D6B"}}>
                  {act.category}
                </span>
                {act.costEstimate > 0 && (
                  <span className="text-sm font-bold text-[#2E7D6B]">₹{act.costEstimate.toLocaleString("en-IN")}</span>
                )}
              </div>
              <h3 className="font-bold text-[#1F2937] mb-1">{act.name}</h3>
              {act.description && <p className="text-sm text-[#6B7280] line-clamp-2 mb-3">{act.description}</p>}
              <div className="flex items-center gap-4 text-xs text-[#9CA3AF]">
                {act.city && <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-[#2E7D6B]"/>{act.city.name}, {act.city.country}</span>}
                {act.durationMin > 0 && <span className="flex items-center gap-1"><Clock className="w-3 h-3"/>{act.durationMin >= 60 ? `${Math.floor(act.durationMin/60)}h ${act.durationMin%60>0?act.durationMin%60+"m":""}` : `${act.durationMin}m`}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}