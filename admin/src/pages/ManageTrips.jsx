import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Edit2, Trash2, Eye, Star, X, Loader } from "lucide-react";
import api from "../api/axios";

const card = { background:"rgba(255,255,255,0.55)", backdropFilter:"blur(18px)", WebkitBackdropFilter:"blur(18px)", border:"1px solid rgba(255,255,255,0.25)", boxShadow:"0 8px 32px rgba(31,41,55,0.08)", borderRadius:24 };
const STATUS_C = {ACTIVE:"badge-sage",TRENDING:"badge-amber",POPULAR:"badge-teal",PLANNING:"badge-cream",AVAILABLE:"badge-teal",CONFIRMED:"badge-sage"};

export default function ManageTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [form, setForm] = useState({
    title: "", destination: "", basePrice: "", bestSeason: "", status: "PLANNING", 
    startDate: "", endDate: "", coverImage: "", packageType: "ADVENTURE", durationDays: ""
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => { fetchTrips(); }, []);

  const fetchTrips = async () => {
    try {
      const { data } = await api.get("/trips");
      setTrips(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (trip = null) => {
    setFormError("");
    if (trip) {
      setEditingTrip(trip);
      setForm({
        title: trip.title, destination: trip.destination || "", basePrice: trip.basePrice || "",
        bestSeason: trip.bestSeason || "", status: trip.status || "PLANNING",
        startDate: new Date(trip.startDate).toISOString().split('T')[0],
        endDate: new Date(trip.endDate).toISOString().split('T')[0],
        coverImage: trip.coverImage || "", packageType: trip.packageType || "ADVENTURE",
        durationDays: trip.durationDays || ""
      });
    } else {
      setEditingTrip(null);
      const today = new Date().toISOString().split('T')[0];
      const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
      setForm({
        title: "", destination: "", basePrice: "", bestSeason: "Summer", status: "PLANNING",
        startDate: today, endDate: tomorrow, coverImage: "", packageType: "ADVENTURE", durationDays: "2"
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const submitForm = async (e) => {
    e.preventDefault();
    setFormLoading(true); setFormError("");
    try {
      const payload = { ...form };
      if (editingTrip) {
        await api.patch(`/trips/${editingTrip.id}`, payload);
      } else {
        await api.post("/trips", payload);
      }
      await fetchTrips();
      closeModal();
    } catch (err) {
      setFormError(err.response?.data?.error || err.message || "Operation failed");
    } finally {
      setFormLoading(false);
    }
  };

  const deleteTrip = async (id) => {
    if(!window.confirm("Are you sure you want to delete this trip?")) return;
    try {
      await api.delete(`/trips/${id}`);
      setTrips(trips.filter(t => t.id !== id));
    } catch (err) {
      alert("Failed to delete trip");
    }
  };

  const filtered = trips.filter(t => 
    (filter === "All" || t.status === filter) && 
    (t.title.toLowerCase().includes(q.toLowerCase()) || (t.destination && t.destination.toLowerCase().includes(q.toLowerCase())))
  );

  return(
    <div style={{display:"flex",flexDirection:"column",gap:"1.5rem"}}>
      <motion.div initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}} style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem"}}>
        <div><h1 className="page-title">Manage Trips</h1><p className="page-subtitle">{trips.length} trips on platform</p></div>
        <motion.button onClick={()=>openModal()} whileHover={{scale:1.02,y:-1}} className="btn btn-primary"><Plus size={16}/>Add New Trip</motion.button>
      </motion.div>
      <motion.div style={card} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.1}}>
        <div style={{padding:"1.5rem"}}>
          <div style={{display:"flex",gap:"0.75rem",marginBottom:"1.25rem",flexWrap:"wrap"}}>
            <div style={{position:"relative",flex:1,minWidth:200}}>
              <Search size={15} style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",color:"#9CA3AF"}}/>
              <input className="input" placeholder="Search trips or destinations..." style={{paddingLeft:40}} value={q} onChange={e=>setQ(e.target.value)}/>
            </div>
            <select className="input" style={{width:"auto",paddingLeft:"0.75rem"}} value={filter} onChange={e=>setFilter(e.target.value)}>
              {["All","PLANNING","CONFIRMED","AVAILABLE","ONGOING","COMPLETED"].map(s=><option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          
          {loading ? (
            <div style={{textAlign:"center", padding:"3rem"}}><Loader className="spin" size={24} color="#2E7D6B" style={{margin:"0 auto"}}/></div>
          ) : (
            <div className="table-scroll">
              <table className="admin-table">
                <thead><tr><th>Trip</th><th>Destination</th><th>Price</th><th>Season</th><th>Status</th><th>Rating</th><th>Views</th><th>Actions</th></tr></thead>
                <tbody>
                  {filtered.map((t,i)=>(
                    <tr key={t.id}>
                      <td><div style={{display:"flex",alignItems:"center",gap:"0.75rem"}}><div style={{width:36,height:36,borderRadius:12,flexShrink:0}} className={"mesh-"+((i%6)+1)}/><span style={{fontWeight:600}}>{t.title}</span></div></td>
                      <td style={{color:"#6B7280"}}>{t.destination || "-"}</td>
                      <td style={{fontWeight:700,color:"#2E7D6B"}}>{t.basePrice ? `Rs.${t.basePrice}` : "-"}</td>
                      <td><span className="badge badge-cream">{t.bestSeason || "-"}</span></td>
                      <td><span className={"badge "+(STATUS_C[t.status]||"badge-cream")}>{t.status}</span></td>
                      <td><div style={{display:"flex",alignItems:"center",gap:3,fontWeight:700,fontSize:"0.875rem",color:"#F59E0B"}}><Star size={13} style={{fill:"#F59E0B",color:"#F59E0B"}}/>{t.rating || 0}</div></td>
                      <td style={{color:"#6B7280"}}>{(t.views || 0).toLocaleString()}</td>
                      <td>
                        <div style={{display:"flex",gap:4}}>
                          <button onClick={()=>openModal(t)} className="btn-icon"><Edit2 size={13}/></button>
                          <button onClick={()=>deleteTrip(t.id)} className="btn-icon"><Trash2 size={13} color="#EF4444"/></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length===0&&<p style={{textAlign:"center",padding:"3rem",color:"#9CA3AF"}}>No trips found</p>}
            </div>
          )}
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div style={{position:"fixed",inset:0,zIndex:50,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.5)",backdropFilter:"blur(4px)"}} onClick={closeModal}/>
            <motion.div initial={{opacity:0,scale:0.95,y:20}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:0.95,y:20}} style={{background:"#fff",borderRadius:24,padding:"2rem",width:"100%",maxWidth:600,position:"relative",zIndex:51,maxHeight:"90vh",overflowY:"auto"}}>
              <button onClick={closeModal} style={{position:"absolute",top:20,right:20,background:"none",border:"none",cursor:"pointer"}}><X size={20} color="#9CA3AF"/></button>
              <h2 style={{fontFamily:"Poppins,sans-serif",fontSize:"1.25rem",fontWeight:700,marginBottom:"1.5rem"}}>{editingTrip ? "Edit Trip" : "Add New Trip"}</h2>
              
              <form onSubmit={submitForm} style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
                {formError && <div style={{padding:"0.75rem",background:"#FEF2F2",color:"#991B1B",borderRadius:8,fontSize:"0.875rem"}}>{formError}</div>}
                
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"}}>
                  <div style={{gridColumn:"1/-1"}}><label className="input-label">Trip Title *</label><input required className="input" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} /></div>
                  
                  <div><label className="input-label">Destination</label><input className="input" value={form.destination} onChange={e=>setForm({...form,destination:e.target.value})} /></div>
                  <div><label className="input-label">Base Price (Rs)</label><input type="number" className="input" value={form.basePrice} onChange={e=>setForm({...form,basePrice:e.target.value})} /></div>

                  <div><label className="input-label">Package Type</label>
                    <select className="input" value={form.packageType} onChange={e=>setForm({...form,packageType:e.target.value})}>
                      {["LUXURY","BUDGET","ADVENTURE","FAMILY","HONEYMOON","CULTURAL"].map(t=><option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div><label className="input-label">Best Season</label>
                    <select className="input" value={form.bestSeason} onChange={e=>setForm({...form,bestSeason:e.target.value})}>
                      {["Summer","Winter","Monsoon","Spring","All Year"].map(s=><option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div><label className="input-label">Start Date *</label><input required type="date" className="input" value={form.startDate} onChange={e=>setForm({...form,startDate:e.target.value})} /></div>
                  <div><label className="input-label">End Date *</label><input required type="date" className="input" value={form.endDate} onChange={e=>setForm({...form,endDate:e.target.value})} /></div>
                  
                  <div><label className="input-label">Duration (Days)</label><input type="number" className="input" value={form.durationDays} onChange={e=>setForm({...form,durationDays:e.target.value})} /></div>
                  <div><label className="input-label">Status</label>
                    <select className="input" value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
                      {["PLANNING","AVAILABLE","CONFIRMED","ONGOING","COMPLETED","CANCELLED"].map(s=><option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  
                  <div style={{gridColumn:"1/-1"}}><label className="input-label">Cover Image URL</label><input className="input" value={form.coverImage} onChange={e=>setForm({...form,coverImage:e.target.value})} /></div>
                </div>

                <div style={{display:"flex",justifyContent:"flex-end",gap:"0.75rem",marginTop:"1rem"}}>
                  <button type="button" onClick={closeModal} className="btn btn-secondary">Cancel</button>
                  <button type="submit" disabled={formLoading} className="btn btn-primary">{formLoading ? "Saving..." : "Save Trip"}</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}