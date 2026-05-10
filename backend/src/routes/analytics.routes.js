const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/analytics.controller');
const { authenticate, requireAdmin } = require('../middleware/auth.middleware');

router.get('/dashboard', authenticate, requireAdmin, ctrl.getDashboardAnalytics);

module.exports = router;
