import { useState } from "react"; import { motion } from "framer-motion"; const GLASS = { background:"rgba(255,255,255,0.55)", backdropFilter:"blur(18px)", WebkitBackdropFilter:"blur(18px)", border:"1px solid rgba(255,255,255,0.25)", boxShadow:"0 8px 32px rgba(31,41,55,0.08)" };
import { Save } from "lucide-react";
export default function AdminSettings() {
  return (
    <motion.div className="space-y-6" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}>
      <div><h1 className="page-title">Settings</h1><p className="page-subtitle">Platform configuration and admin preferences</p></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {[{title:"Platform Settings",fields:[{label:"Site Name",val:"Traveloop"},{label:"Support Email",val:"support@traveloop.dev"},{label:"Default Currency",val:"INR"}]},{title:"Email Configuration",fields:[{label:"SMTP Host",val:"smtp.gmail.com"},{label:"From Email",val:"noreply@traveloop.dev"},{label:"Email Footer",val:"Traveloop © 2024"}]}].map(sec=><div key={sec.title} className="rounded-3xl p-6" style={GLASS}><h3 className="font-bold font-display mb-5" style={{color:"#1F2937"}}>{sec.title}</h3><div className="space-y-4">{sec.fields.map(f=><div key={f.label}><label className="input-label">{f.label}</label><input className="input" defaultValue={f.val}/></div>)}</div><button className="btn-primary mt-5"><Save className="w-4 h-4"/>Save Changes</button></div>)}
      </div>
    </motion.div>
  );
}