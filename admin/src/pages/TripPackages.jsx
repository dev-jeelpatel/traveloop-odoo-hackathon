import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Star, Edit2, Trash2, Tag } from "lucide-react";
const card = { background:"rgba(255,255,255,0.55)", backdropFilter:"blur(18px)", WebkitBackdropFilter:"blur(18px)", border:"1px solid rgba(255,255,255,0.25)", boxShadow:"0 8px 32px rgba(31,41,55,0.08)", borderRadius:24 };
const PACKAGES = [
  {id:1,name:"Bali Premium",duration:"8D/7N",price:"Rs.75,000",tag:"Best Seller",season:"Summer",rating:4.8,img:"https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=70",highlights:["Private villa","Infinity pool","Cooking class"]},
  {id:2,name:"Swiss Alps Luxury",duration:"10D/9N",price:"Rs.2,50,000",tag:"Premium",season:"Winter",rating:4.9,img:"https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&q=70",highlights:["Skiing","Cable car","Luxury hotel"]},
  {id:3,name:"Goa Beach Escape",duration:"5D/4N",price:"Rs.45,000",tag:"Popular",season:"Winter",rating:4.6,img:"https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&q=70",highlights:["Beach resort","Water sports","Cruise"]},
  {id:4,name:"Rajasthan Heritage",duration:"7D/6N",price:"Rs.35,000",tag:"Cultural",season:"Winter",rating:4.7,img:"https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&q=70",highlights:["Fort visits","Camel safari","Folk dance"]},
  {id:5,name:"Maldives Honeymoon",duration:"6D/5N",price:"Rs.1,80,000",tag:"Luxury",season:"All Year",rating:4.9,img:"https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&q=70",highlights:["Overwater villa","Snorkeling","Private beach"]},
  {id:6,name:"Kerala Backwaters",duration:"4D/3N",price:"Rs.28,000",tag:"Nature",season:"Monsoon",rating:4.5,img:"https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&q=70",highlights:["Houseboat stay","Ayurveda spa","Elephant ride"]},
];
const TAG_C = {"Best Seller":"badge-teal","Premium":"badge-amber","Popular":"badge-sage","Cultural":"badge-cream","Luxury":"badge-amber","Nature":"badge-cream"};
export default function TripPackages() {
  const [sort,setSort]=useState("rating");
  const sorted=[...PACKAGES].sort((a,b)=>sort==="rating"?b.rating-a.rating:a.name.localeCompare(b.name));
  return(
    <div style={{display:"flex",flexDirection:"column",gap:"1.5rem"}}>
      <motion.div initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}} style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem"}}>
        <div><h1 className="page-title">Trip Packages</h1><p className="page-subtitle">Curated packages with seasonal pricing</p></div>
        <div style={{display:"flex",gap:"0.75rem",alignItems:"center",flexWrap:"wrap"}}>
          <select className="input" style={{width:"auto"}} value={sort} onChange={e=>setSort(e.target.value)}>
            <option value="rating">Sort by Rating</option><option value="name">Sort by Name</option>
          </select>
          <motion.button whileHover={{scale:1.02,y:-1}} className="btn btn-primary"><Plus size={16}/>New Package</motion.button>
        </div>
      </motion.div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:"1.25rem"}}>
        {sorted.map((p,i)=>(
          <motion.div key={p.id} style={card} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.07}} whileHover={{y:-5,boxShadow:"0 20px 50px rgba(46,125,107,0.14)"}}>
            <div style={{position:"relative",height:200,overflow:"hidden",borderRadius:"24px 24px 0 0"}}>
              <img src={p.img} alt={p.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,0.55),transparent)"}}/>
              <div style={{position:"absolute",top:12,left:12,right:12,display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <span className={"badge "+TAG_C[p.tag]}>{p.tag}</span>
                <div style={{display:"flex",alignItems:"center",gap:4,background:"rgba(0,0,0,0.35)",backdropFilter:"blur(8px)",padding:"0.2rem 0.6rem",borderRadius:20,color:"#FBBF24",fontSize:"0.8rem",fontWeight:700}}>
                  <Star size={12} style={{fill:"#FBBF24",color:"#FBBF24"}}/>{p.rating}
                </div>
              </div>
              <div style={{position:"absolute",bottom:12,left:12,right:12}}>
                <p style={{color:"#fff",fontWeight:800,fontFamily:"Poppins,sans-serif",fontSize:"1.125rem"}}>{p.name}</p>
                <p style={{color:"rgba(255,255,255,0.7)",fontSize:"0.8rem"}}>{p.duration} · {p.season}</p>
              </div>
            </div>
            <div style={{padding:"1.25rem"}}>
              <div style={{display:"flex",flexWrap:"wrap",gap:"0.375rem",marginBottom:"0.875rem"}}>
                {p.highlights.map(h=><span key={h} style={{fontSize:"0.7rem",padding:"0.2rem 0.6rem",borderRadius:20,background:"rgba(124,154,126,0.1)",color:"#2E7D6B",border:"1px solid rgba(124,154,126,0.2)"}}>{h}</span>)}
              </div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <p style={{fontSize:"1.375rem",fontWeight:800,fontFamily:"Poppins,sans-serif",color:"#2E7D6B"}}>{p.price}</p>
                <div style={{display:"flex",gap:4}}>
                  <button className="btn-icon"><Edit2 size={13}/></button>
                  <button className="btn-icon"><Trash2 size={13} color="#EF4444"/></button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}