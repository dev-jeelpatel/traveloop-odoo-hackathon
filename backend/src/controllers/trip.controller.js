const prisma = require('../lib/prisma');

// GET /api/trips  — list user's trips
exports.getTrips = async (req, res) => {
  try {
    const trips = await prisma.trip.findMany({
      where: { userId: req.user.id },
      include: { stops: { include: { city: true } }, budget: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(trips);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// GET /api/trips/:id
exports.getTripById = async (req, res) => {
  try {
    const trip = await prisma.trip.findFirst({
      where: { id: req.params.id, userId: req.user.id },
      include: {
        stops: {
          include: { city: true, stopActivities: { include: { activity: true } } },
          orderBy: { order: 'asc' },
        },
        budget: true,
        expenses: true,
        checklists: { include: { items: { orderBy: { order: 'asc' } } } },
        notes: true,
      },
    });
    if (!trip) return res.status(404).json({ error: 'Trip not found' });
    res.json(trip);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// POST /api/trips
exports.createTrip = async (req, res) => {
  try {
    const { title, description, startDate, endDate, coverImage, isPublic } = req.body;
    if (!title || !startDate || !endDate)
      return res.status(400).json({ error: 'title, startDate, endDate required' });

    const trip = await prisma.trip.create({
      data: {
        userId: req.user.id,
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        coverImage,
        isPublic: !!isPublic,
      },
    });
    res.status(201).json(trip);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// PATCH /api/trips/:id
exports.updateTrip = async (req, res) => {
  try {
    const { title, description, startDate, endDate, coverImage, isPublic, status } = req.body;
    const trip = await prisma.trip.findFirst({ where: { id: req.params.id, userId: req.user.id } });
    if (!trip) return res.status(404).json({ error: 'Trip not found' });

    const updated = await prisma.trip.update({
      where: { id: req.params.id },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(startDate && { startDate: new Date(startDate) }),
        ...(endDate && { endDate: new Date(endDate) }),
        ...(coverImage !== undefined && { coverImage }),
        ...(isPublic !== undefined && { isPublic: !!isPublic }),
        ...(status && { status }),
      },
    });
    res.json(updated);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// DELETE /api/trips/:id
exports.deleteTrip = async (req, res) => {
  try {
    const trip = await prisma.trip.findFirst({ where: { id: req.params.id, userId: req.user.id } });
    if (!trip) return res.status(404).json({ error: 'Trip not found' });
    await prisma.trip.delete({ where: { id: req.params.id } });
    res.json({ message: 'Trip deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};
