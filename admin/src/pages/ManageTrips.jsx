import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Edit2, Trash2, Eye, Filter, Star, TrendingUp } from "lucide-react";
const card = { background:"rgba(255,255,255,0.55)", backdropFilter:"blur(18px)", WebkitBackdropFilter:"blur(18px)", border:"1px solid rgba(255,255,255,0.25)", boxShadow:"0 8px 32px rgba(31,41,55,0.08)", borderRadius:24 };
const TRIPS = [
  {id:1,title:"Bali Premium",dest:"Indonesia",price:"Rs.75,000",season:"Summer",status:"ACTIVE",rating:4.8,views:1240},
  {id:2,title:"Swiss Alps Luxury",dest:"Switzerland",price:"Rs.2,50,000",season:"Winter",status:"ACTIVE",rating:4.9,views:980},
  {id:3,title:"Goa Beach Escape",dest:"India",price:"Rs.45,000",season:"Winter",status:"TRENDING",rating:4.6,views:2100},
  {id:4,title:"Rajasthan Heritage",dest:"India",price:"Rs.35,000",season:"Winter",status:"ACTIVE",rating:4.7,views:876},
  {id:5,title:"Maldives Honeymoon",dest:"Maldives",price:"Rs.1,80,000",season:"All",status:"POPULAR",rating:4.9,views:3400},
];
const STATUS_C = {ACTIVE:"badge-sage",TRENDING:"badge-amber",POPULAR:"badge-teal"};
export default function ManageTrips() {
  const [q,setQ]=useState("");const [filter,setFilter]=useState("All");
  const filtered=TRIPS.filter(t=>(filter==="All"||t.status===filter)&&(t.title.toLowerCase().includes(q.toLowerCase())||t.dest.toLowerCase().includes(q.toLowerCase())));
  return(
    <div style={{display:"flex",flexDirection:"column",gap:"1.5rem"}}>
      <motion.div initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}} style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem"}}>
        <div><h1 className="page-title">Manage Trips</h1><p className="page-subtitle">{TRIPS.length} trips on platform</p></div>
        <motion.button whileHover={{scale:1.02,y:-1}} className="btn btn-primary"><Plus size={16}/>Add New Trip</motion.button>
      </motion.div>
      <motion.div style={card} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.1}}>
        <div style={{padding:"1.5rem"}}>
          <div style={{display:"flex",gap:"0.75rem",marginBottom:"1.25rem",flexWrap:"wrap"}}>
            <div style={{position:"relative",flex:1,minWidth:200}}>
              <Search size={15} style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",color:"#9CA3AF"}}/>
              <input className="input" placeholder="Search trips or destinations..." style={{paddingLeft:40}} value={q} onChange={e=>setQ(e.target.value)}/>
            </div>
            <select className="input" style={{width:"auto",paddingLeft:"0.75rem"}} value={filter} onChange={e=>setFilter(e.target.value)}>
              {["All","ACTIVE","TRENDING","POPULAR"].map(s=><option key={s}>{s}</option>)}
            </select>
          </div>
          <div style={{overflowX:"auto"}}>
            <table className="admin-table">
              <thead><tr><th>Trip</th><th>Destination</th><th>Price</th><th>Season</th><th>Status</th><th>Rating</th><th>Views</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.map((t,i)=>(
                  <tr key={t.id}>
                    <td><div style={{display:"flex",alignItems:"center",gap:"0.75rem"}}><div style={{width:36,height:36,borderRadius:12,flexShrink:0}} className={"mesh-"+((i%6)+1)}/><span style={{fontWeight:600}}>{t.title}</span></div></td>
                    <td style={{color:"#6B7280"}}>{t.dest}</td>
                    <td style={{fontWeight:700,color:"#2E7D6B"}}>{t.price}</td>
                    <td><span className="badge badge-cream">{t.season}</span></td>
                    <td><span className={"badge "+STATUS_C[t.status]}>{t.status}</span></td>
                    <td><div style={{display:"flex",alignItems:"center",gap:3,fontWeight:700,fontSize:"0.875rem",color:"#F59E0B"}}><Star size={13} style={{fill:"#F59E0B",color:"#F59E0B"}}/>{t.rating}</div></td>
                    <td style={{color:"#6B7280"}}>{t.views.toLocaleString()}</td>
                    <td><div style={{display:"flex",gap:4}}><button className="btn-icon"><Eye size={13}/></button><button className="btn-icon"><Edit2 size={13}/></button><button className="btn-icon"><Trash2 size={13} color="#EF4444"/></button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length===0&&<p style={{textAlign:"center",padding:"3rem",color:"#9CA3AF"}}>No trips found</p>}
          </div>
        </div>
      </motion.div>
    </div>
  );
}