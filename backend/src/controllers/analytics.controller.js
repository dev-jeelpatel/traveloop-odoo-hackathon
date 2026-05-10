const prisma = require('../lib/prisma');

exports.getDashboardAnalytics = async (req, res) => {
  try {
    const totalUsers = await prisma.user.count();
    const activeTrips = await prisma.trip.count({
      where: { status: { in: ['ACTIVE', 'ONGOING', 'AVAILABLE'] } }
    });
    const citiesListed = await prisma.city.count();
    const activitiesCount = await prisma.activity.count();

    const rawRecentTrips = await prisma.trip.findMany({
      take: 4,
      orderBy: { createdAt: 'desc' },
      include: { user: true }
    });

    const recentTrips = rawRecentTrips.map(t => ({
      title: t.title,
      user: t.user?.name || 'Unknown',
      status: t.status,
      date: t.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }));

    res.json({
      stats: {
        totalUsers,
        activeTrips,
        citiesListed,
        activitiesCount
      },
      recentTrips
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
