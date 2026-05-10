import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye, UserX, Download, Users, UserCheck, Shield, User } from "lucide-react";
const card = { background:"rgba(255,255,255,0.55)", backdropFilter:"blur(18px)", WebkitBackdropFilter:"blur(18px)", border:"1px solid rgba(255,255,255,0.25)", boxShadow:"0 8px 32px rgba(31,41,55,0.08)", borderRadius:24 };
const USERS=[
  {id:1,name:"Areen Sharma",email:"areen@gmail.com",role:"USER",trips:5,joined:"Jan 15, 2024",status:"active",city:"Mumbai"},
  {id:2,name:"Jeel Patel",email:"jeel@traveloop.dev",role:"ADMIN",trips:12,joined:"Jan 1, 2024",status:"active",city:"Ahmedabad"},
  {id:3,name:"Priya Mehta",email:"priya@example.com",role:"USER",trips:3,joined:"Feb 20, 2024",status:"active",city:"Delhi"},
  {id:4,name:"Rahul Kumar",email:"rahul@example.com",role:"USER",trips:0,joined:"Mar 5, 2024",status:"banned",city:"Pune"},
  {id:5,name:"Sneha Joshi",email:"sneha@example.com",role:"USER",trips:8,joined:"Apr 10, 2024",status:"active",city:"Bangalore"},
];
const STATS=[{label:"Total Users",value:USERS.length,icon:Users,color:"#2E7D6B"},{label:"Active",value:USERS.filter(u=>u.status==="active").length,icon:UserCheck,color:"#22C55E"},{label:"Admins",value:USERS.filter(u=>u.role==="ADMIN").length,icon:Shield,color:"#7C3AED"},{label:"Banned",value:USERS.filter(u=>u.status==="banned").length,icon:UserX,color:"#EF4444"}];
export default function ManageUsers() {
  const [q,setQ]=useState("");const [roleF,setRoleF]=useState("All");
  const filtered=USERS.filter(u=>(roleF==="All"||u.role===roleF)&&(u.name.toLowerCase().includes(q.toLowerCase())||u.email.toLowerCase().includes(q.toLowerCase())));
  return(
    <div style={{display:"flex",flexDirection:"column",gap:"1.5rem"}}>
      <motion.div initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}} style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem"}}>
        <div><h1 className="page-title">User Management</h1><p className="page-subtitle">{USERS.length} registered users</p></div>
        <motion.button whileHover={{scale:1.02,y:-1}} className="btn btn-secondary"><Download size={15}/>Export CSV</motion.button>
      </motion.div>
      <div className="rg-4">
        {STATS.map((s,i)=>(
          <motion.div key={s.label} style={{...card,padding:"1.25rem"}} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:i*0.07}}>
            <div style={{display:"flex",alignItems:"center",gap:"0.75rem"}}><div style={{width:36,height:36,borderRadius:12,background:s.color+"18",display:"flex",alignItems:"center",justifyContent:"center"}}><s.icon size={17} color={s.color}/></div><div><p style={{fontSize:"1.5rem",fontWeight:800,fontFamily:"Poppins,sans-serif",color:"#1F2937"}}>{s.value}</p><p style={{fontSize:"0.75rem",color:"#6B7280"}}>{s.label}</p></div></div>
          </motion.div>
        ))}
      </div>
      <motion.div style={card} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2}}>
        <div style={{padding:"1.5rem"}}>
          <div style={{display:"flex",gap:"0.75rem",marginBottom:"1.25rem",flexWrap:"wrap"}}>
            <div style={{position:"relative",flex:1,minWidth:200}}><Search size={15} style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",color:"#9CA3AF"}}/><input className="input" placeholder="Search users..." style={{paddingLeft:40}} value={q} onChange={e=>setQ(e.target.value)}/></div>
            <select className="input" style={{width:"auto"}} value={roleF} onChange={e=>setRoleF(e.target.value)}><option>All</option><option>USER</option><option>ADMIN</option></select>
          </div>
          <div className="table-scroll">
            <table className="admin-table">
              <thead><tr><th>User</th><th>Email</th><th>Role</th><th>Trips</th><th>City</th><th>Joined</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.map(u=>(
                  <tr key={u.id}>
                    <td><div style={{display:"flex",alignItems:"center",gap:"0.75rem"}}><div style={{width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,#2E7D6B,#3D9B85)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:"0.875rem",flexShrink:0}}>{u.name[0]}</div><span style={{fontWeight:600,color:"#1F2937"}}>{u.name}</span></div></td>
                    <td style={{color:"#6B7280",fontSize:"0.8rem"}}>{u.email}</td>
                    <td><span className={"badge "+(u.role==="ADMIN"?"badge-teal":"badge-cream")}>{u.role}</span></td>
                    <td style={{fontWeight:700,color:"#1F2937"}}>{u.trips}</td>
                    <td style={{color:"#6B7280"}}>{u.city}</td>
                    <td style={{color:"#9CA3AF",fontSize:"0.8rem"}}>{u.joined}</td>
                    <td><span className={"badge "+(u.status==="banned"?"badge-red":"badge-sage")}>{u.status}</span></td>
                    <td><div style={{display:"flex",gap:4}}><button className="btn-icon" title="View"><Eye size={13}/></button><button className="btn-icon" title="Ban"><UserX size={13} color="#EF4444"/></button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}