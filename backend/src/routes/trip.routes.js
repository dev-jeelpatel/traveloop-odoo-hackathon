const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/trip.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.use(authenticate);
router.get('/', ctrl.getTrips);
router.post('/', ctrl.createTrip);
router.get('/:id', ctrl.getTripById);
router.patch('/:id', ctrl.updateTrip);
router.delete('/:id', ctrl.deleteTrip);

module.exports = router;
