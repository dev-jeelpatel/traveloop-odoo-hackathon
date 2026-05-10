const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const tripRoutes = require('./routes/trip.routes');
const stopRoutes = require('./routes/stop.routes');
const activityRoutes = require('./routes/activity.routes');
const budgetRoutes = require('./routes/budget.routes');
const expenseRoutes = require('./routes/expense.routes');
const checklistRoutes = require('./routes/checklist.routes');
const noteRoutes = require('./routes/note.routes');
const communityRoutes = require('./routes/community.routes');
const cityRoutes = require('./routes/city.routes');
const userRoutes = require('./routes/user.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const publicRoutes   = require('./routes/public.routes');

const app = express();

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }));

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/stops', stopRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/checklists', checklistRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/users', userRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/public',   publicRoutes);

// ── 404 handler ───────────────────────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

// ── Global error handler ──────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

module.exports = app;
