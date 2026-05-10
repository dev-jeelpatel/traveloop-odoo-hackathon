import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Edit2, Globe, MapPin } from "lucide-react";
const card = { background:"rgba(255,255,255,0.55)", backdropFilter:"blur(18px)", WebkitBackdropFilter:"blur(18px)", border:"1px solid rgba(255,255,255,0.25)", boxShadow:"0 8px 32px rgba(31,41,55,0.08)", borderRadius:24 };
const CITIES = [
  {id:1,name:"Bali",country:"Indonesia",code:"ID",type:"International",trips:245,img:"https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=200&q=70"},
  {id:2,name:"Goa",country:"India",code:"IN",type:"Domestic",trips:312,img:"https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=200&q=70"},
  {id:3,name:"Paris",country:"France",code:"FR",type:"International",trips:180,img:"https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=200&q=70"},
  {id:4,name:"Tokyo",country:"Japan",code:"JP",type:"International",trips:156,img:"https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=200&q=70"},
  {id:5,name:"Jaipur",country:"India",code:"IN",type:"Domestic",trips:198,img:"https://images.unsplash.com/photo-1599661046289-e31897846e41?w=200&q=70"},
  {id:6,name:"Maldives",country:"Maldives",code:"MV",type:"International",trips:134,img:"https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=200&q=70"},
];
export default function ManageCities() {
  const [q,setQ]=useState("");const [type,setType]=useState("All");
  const filtered=CITIES.filter(c=>(type==="All"||c.type===type)&&c.name.toLowerCase().includes(q.toLowerCase()));
  return(
    <div style={{display:"flex",flexDirection:"column",gap:"1.5rem"}}>
      <motion.div initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}} style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem"}}>
        <div><h1 className="page-title">Popular Cities</h1><p className="page-subtitle">{CITIES.length} cities listed</p></div>
        <motion.button whileHover={{scale:1.02,y:-1}} className="btn btn-primary"><Plus size={16}/>Add City</motion.button>
      </motion.div>
      <div style={{display:"flex",gap:"0.75rem",flexWrap:"wrap"}}>
        <div style={{position:"relative",flex:1,minWidth:200}}>
          <Search size={15} style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",color:"#9CA3AF"}}/>
          <input className="input" placeholder="Search cities..." style={{paddingLeft:40}} value={q} onChange={e=>setQ(e.target.value)}/>
        </div>
        {["All","Domestic","International"].map(t=>(
          <button key={t} onClick={()=>setType(t)} className="btn" style={{background:type===t?"linear-gradient(135deg,#2E7D6B,#3D9B85)":"rgba(255,255,255,0.7)",color:type===t?"#fff":"#6B7280",border:"1px solid rgba(124,154,126,0.2)"}}>
            {t}
          </button>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:"1rem"}}>
        {filtered.map((c,i)=>(
          <motion.div key={c.id} style={card} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.06}} whileHover={{y:-4,boxShadow:"0 16px 48px rgba(46,125,107,0.12)"}}>
            <div style={{height:140,overflow:"hidden",borderRadius:"24px 24px 0 0",position:"relative"}}>
              <img src={c.img} alt={c.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,0.4),transparent)"}}/>
              <div style={{position:"absolute",bottom:10,left:12,right:12,display:"flex",alignItems:"flex-end",justifyContent:"space-between"}}>
                <div><p style={{color:"#fff",fontWeight:800,fontFamily:"Poppins,sans-serif",fontSize:"1.125rem"}}>{c.name}</p><p style={{color:"rgba(255,255,255,0.75)",fontSize:"0.75rem"}}>{c.country}</p></div>
                <span style={{background:"rgba(255,255,255,0.2)",backdropFilter:"blur(8px)",color:"#fff",padding:"0.2rem 0.5rem",borderRadius:20,fontSize:"0.65rem",fontWeight:700,border:"1px solid rgba(255,255,255,0.3)"}}>{c.code}</span>
              </div>
            </div>
            <div style={{padding:"1rem"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div style={{display:"flex",alignItems:"center",gap:6,fontSize:"0.8rem",color:"#6B7280"}}><MapPin size={13} color="#2E7D6B"/>{c.trips} trips</div>
                <span className={"badge "+(c.type==="Domestic"?"badge-cream":"badge-teal")}>{c.type}</span>
              </div>
              <button className="btn btn-secondary" style={{width:"100%",justifyContent:"center",marginTop:"0.75rem",padding:"0.5rem"}}><Edit2 size={13}/>Edit City</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}