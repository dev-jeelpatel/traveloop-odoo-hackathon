# Traveloop 🌍

> A free, full-stack travel planning app built with React + Node.js + MySQL + Prisma.

## Tech Stack
| Layer | Tech |
|---|---|
| Frontend | React + Vite + Tailwind CSS v3 |
| Backend | Node.js + Express |
| ORM | Prisma |
| Database | MySQL (XAMPP local / Railway.app cloud) |
| Auth | JWT + bcrypt |
| Maps | Leaflet.js + OpenStreetMap |
| Charts | Recharts |
| Email | Nodemailer + Gmail SMTP |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MySQL running locally (XAMPP recommended) or a free cloud DB (Railway.app)

### 1. Clone & setup

```bash
git clone https://github.com/your-username/traveloop-odoo-hackathon.git
cd traveloop-odoo-hackathon
```

### 2. Backend setup

```bash
cd backend
npm install

# Copy and edit .env
cp .env.example .env
# Edit DATABASE_URL, JWT_SECRET, EMAIL_FROM, EMAIL_PASSWORD

# Push schema to MySQL
npx prisma db push

# Generate Prisma client
npx prisma generate

# Start dev server
npm run dev
# → http://localhost:5000
```

### 3. Frontend setup

```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

---

## 📱 Screens

1. **Login / Signup** — JWT auth with email verification
2. **Dashboard** — Personalized greeting + stats + recent trips
3. **My Trips** — Filterable trip list with status badges
4. **Create Trip** — Title, description, dates, public toggle
5. **Trip Detail** — Overview, route, quick nav to sub-pages
6. **Itinerary Builder** — Add city stops, attach activities, view on map
7. **Budget** — Allocation by category, pie chart, expense tracker
8. **Packing Checklist** — Multiple lists, checkboxes with progress bars
9. **Trip Notes/Journal** — Rich text notes with timestamps
10. **City Search** — Debounced search + Leaflet map preview
11. **Activity Search** — Category filter + activity cards
12. **Community** — Public itinerary gallery, copy trips
13. **Public Itinerary** — Shareable view with map
14. **Profile/Settings** — Edit name, change password, verification badge

---

## 🗄 Database schema

All 12 tables defined in `backend/prisma/schema.prisma`:
`users` · `trips` · `cities` · `stops` · `activities` · `stop_activities` · `budgets` · `expenses` · `checklists` · `checklist_items` · `notes` · `community_shares` · `trip_copies`

---

## 🌐 Deployment (Free)

| Service | What |
|---|---|
| **Vercel** | Frontend — `cd frontend && npx vercel` |
| **Render.com** | Backend — connect GitHub repo |
| **Railway.app** | MySQL database (free tier) |

Set `VITE_API_URL` in Vercel to your Render backend URL.