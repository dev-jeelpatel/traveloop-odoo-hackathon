/**
 * Prisma seed script — run with:  npx prisma db seed
 * Or manually:  node prisma/seed.js
 *
 * Adds sample cities, activities, users, and trips so the app is immediately usable.
 */
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

const cities = [
  { name: 'New Delhi', country: 'India', countryCode: 'IND', latitude: 28.6139, longitude: 77.2090, timezone: 'Asia/Kolkata', description: 'Capital of India, home to Mughal monuments and vibrant street food.' },
  { name: 'Mumbai', country: 'India', countryCode: 'IND', latitude: 19.0760, longitude: 72.8777, timezone: 'Asia/Kolkata', description: 'India\'s financial capital and the city of dreams.' },
  { name: 'Goa', country: 'India', countryCode: 'IND', latitude: 15.2993, longitude: 74.1240, timezone: 'Asia/Kolkata', description: 'India\'s beach paradise — sun, sand, and Portuguese heritage.' },
  { name: 'Jaipur', country: 'India', countryCode: 'IND', latitude: 26.9124, longitude: 75.7873, timezone: 'Asia/Kolkata', description: 'The Pink City, famous for its palaces and forts.' },
  { name: 'Agra', country: 'India', countryCode: 'IND', latitude: 27.1767, longitude: 78.0081, timezone: 'Asia/Kolkata', description: 'Home to the Taj Mahal, one of the Seven Wonders of the World.' },
  { name: 'Paris', country: 'France', countryCode: 'FRA', latitude: 48.8566, longitude: 2.3522, timezone: 'Europe/Paris', description: 'The city of love, lights, and world-class art.' },
  { name: 'Tokyo', country: 'Japan', countryCode: 'JPN', latitude: 35.6762, longitude: 139.6503, timezone: 'Asia/Tokyo', description: 'Where ancient tradition meets cutting-edge technology.' },
  { name: 'Bali', country: 'Indonesia', countryCode: 'IDN', latitude: -8.3405, longitude: 115.0920, timezone: 'Asia/Makassar', description: 'Island of the Gods — temples, rice terraces, and surf.' },
  { name: 'Dubai', country: 'UAE', countryCode: 'ARE', latitude: 25.2048, longitude: 55.2708, timezone: 'Asia/Dubai', description: 'Ultra-modern desert metropolis with record-breaking architecture.' },
  { name: 'Singapore', country: 'Singapore', countryCode: 'SGP', latitude: 1.3521, longitude: 103.8198, timezone: 'Asia/Singapore', description: 'A sparkling city-state of gardens, food, and finance.' },
];

const activities = {
  'New Delhi': [
    { name: 'Taj Mahal Day Trip', category: 'SIGHTSEEING', durationMin: 480, costEstimate: 500, description: 'Day trip to Agra to see the Taj Mahal.' },
    { name: 'Red Fort', category: 'CULTURE', durationMin: 120, costEstimate: 50, description: 'UNESCO heritage Mughal fort in Old Delhi.' },
    { name: 'Qutub Minar', category: 'SIGHTSEEING', durationMin: 90, costEstimate: 40, description: 'Tallest minaret in India, 12th century.' },
    { name: 'Street Food Tour Old Delhi', category: 'FOOD', durationMin: 180, costEstimate: 300, description: 'Parathas, chaat, and jalebi in Chandni Chowk.' },
    { name: 'India Gate', category: 'SIGHTSEEING', durationMin: 60, costEstimate: 0, description: 'War memorial and popular evening hangout.' },
  ],
  'Mumbai': [
    { name: 'Gateway of India', category: 'SIGHTSEEING', durationMin: 60, costEstimate: 0 },
    { name: 'Elephanta Caves', category: 'CULTURE', durationMin: 240, costEstimate: 200 },
    { name: 'Juhu Beach Sunset', category: 'RELAXATION', durationMin: 90, costEstimate: 0 },
    { name: 'Dharavi Slum Tour', category: 'CULTURE', durationMin: 180, costEstimate: 400 },
    { name: 'Bollywood Studio Tour', category: 'CULTURE', durationMin: 240, costEstimate: 800 },
  ],
  'Goa': [
    { name: 'Baga Beach', category: 'RELAXATION', durationMin: 240, costEstimate: 0 },
    { name: 'Water Sports Calangute', category: 'ADVENTURE', durationMin: 180, costEstimate: 1500 },
    { name: 'Old Goa Churches', category: 'CULTURE', durationMin: 120, costEstimate: 0 },
    { name: 'Spice Plantation Tour', category: 'CULTURE', durationMin: 180, costEstimate: 600 },
    { name: 'Dudhsagar Waterfall', category: 'ADVENTURE', durationMin: 360, costEstimate: 1000 },
    { name: 'Night Market Arpora', category: 'SHOPPING', durationMin: 180, costEstimate: 0 },
  ],
  'Jaipur': [
    { name: 'Amber Fort', category: 'SIGHTSEEING', durationMin: 180, costEstimate: 200 },
    { name: 'City Palace', category: 'CULTURE', durationMin: 120, costEstimate: 200 },
    { name: 'Hawa Mahal', category: 'SIGHTSEEING', durationMin: 60, costEstimate: 50 },
    { name: 'Jantar Mantar', category: 'CULTURE', durationMin: 90, costEstimate: 50 },
    { name: 'Johri Bazaar Shopping', category: 'SHOPPING', durationMin: 150, costEstimate: 0 },
  ],
  'Agra': [
    { name: 'Taj Mahal at Sunrise', category: 'SIGHTSEEING', durationMin: 120, costEstimate: 1300 },
    { name: 'Agra Fort', category: 'CULTURE', durationMin: 120, costEstimate: 650 },
    { name: 'Fatehpur Sikri', category: 'SIGHTSEEING', durationMin: 180, costEstimate: 600 },
    { name: 'Mehtab Bagh Sunset View', category: 'SIGHTSEEING', durationMin: 90, costEstimate: 200 },
  ],
  'Paris': [
    { name: 'Eiffel Tower', category: 'SIGHTSEEING', durationMin: 120, costEstimate: 30 },
    { name: 'Louvre Museum', category: 'CULTURE', durationMin: 240, costEstimate: 20 },
    { name: 'Seine River Cruise', category: 'SIGHTSEEING', durationMin: 90, costEstimate: 15 },
    { name: 'Montmartre Walk', category: 'CULTURE', durationMin: 120, costEstimate: 0 },
    { name: 'Palace of Versailles', category: 'SIGHTSEEING', durationMin: 360, costEstimate: 25 },
  ],
  'Tokyo': [
    { name: 'Senso-ji Temple', category: 'CULTURE', durationMin: 90, costEstimate: 0 },
    { name: 'Shibuya Crossing', category: 'SIGHTSEEING', durationMin: 60, costEstimate: 0 },
    { name: 'Tokyo Skytree', category: 'SIGHTSEEING', durationMin: 120, costEstimate: 3000 },
    { name: 'Tsukiji Outer Market', category: 'FOOD', durationMin: 120, costEstimate: 2000 },
    { name: 'Akihabara Electronics District', category: 'SHOPPING', durationMin: 180, costEstimate: 0 },
  ],
  'Bali': [
    { name: 'Uluwatu Temple Sunset', category: 'CULTURE', durationMin: 120, costEstimate: 50000 },
    { name: 'Ubud Monkey Forest', category: 'SIGHTSEEING', durationMin: 120, costEstimate: 80000 },
    { name: 'Rice Terrace Tegallalang', category: 'SIGHTSEEING', durationMin: 90, costEstimate: 15000 },
    { name: 'Surfing Kuta Beach', category: 'ADVENTURE', durationMin: 180, costEstimate: 200000 },
    { name: 'Bali Cooking Class', category: 'FOOD', durationMin: 240, costEstimate: 350000 },
  ],
  'Dubai': [
    { name: 'Burj Khalifa At the Top', category: 'SIGHTSEEING', durationMin: 120, costEstimate: 200 },
    { name: 'Dubai Desert Safari', category: 'ADVENTURE', durationMin: 360, costEstimate: 300 },
    { name: 'Dubai Mall & Fountain Show', category: 'SHOPPING', durationMin: 180, costEstimate: 0 },
    { name: 'Old Dubai Souk Tour', category: 'CULTURE', durationMin: 150, costEstimate: 0 },
    { name: 'Palm Jumeirah Monorail', category: 'SIGHTSEEING', durationMin: 60, costEstimate: 25 },
  ],
  'Singapore': [
    { name: 'Gardens by the Bay', category: 'SIGHTSEEING', durationMin: 180, costEstimate: 30 },
    { name: 'Marina Bay Sands SkyPark', category: 'SIGHTSEEING', durationMin: 120, costEstimate: 26 },
    { name: 'Sentosa Island', category: 'ADVENTURE', durationMin: 360, costEstimate: 80 },
    { name: 'Hawker Centre Food Tour', category: 'FOOD', durationMin: 120, costEstimate: 20 },
    { name: 'Universal Studios Singapore', category: 'ADVENTURE', durationMin: 480, costEstimate: 82 },
  ],
};

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Create Users
  const passwordHash = await bcrypt.hash('password123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@traveloop.com' },
    update: {},
    create: {
      name: 'Traveloop Admin',
      email: 'admin@traveloop.com',
      passwordHash,
      role: 'ADMIN',
      isEmailVerified: true
    }
  });
  console.log('✅ Admin user created: admin@traveloop.com (pwd: password123)');

  const user = await prisma.user.upsert({
    where: { email: 'user@traveloop.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'user@traveloop.com',
      passwordHash,
      role: 'USER',
      isEmailVerified: true
    }
  });
  console.log('✅ Regular user created: user@traveloop.com (pwd: password123)');

  // 2. Create Cities & Activities
  for (const cityData of cities) {
    const city = await prisma.city.upsert({
      where: { name_country: { name: cityData.name, country: cityData.country } },
      update: {},
      create: cityData,
    });
    console.log(`✅ City: ${city.name}`);

    const cityActivities = activities[city.name] || [];
    for (const act of cityActivities) {
      const dataToCreate = { ...act, cityId: city.id, costEstimate: parseFloat(act.costEstimate) || 0 };
      await prisma.activity.upsert({
        where: { id: `${city.id}-${act.name}`.slice(0, 36) },
        update: {},
        create: dataToCreate,
      }).catch(async () => {
        await prisma.activity.create({ data: dataToCreate }).catch(() => null);
      });
    }
    console.log(`   ↳ ${cityActivities.length} activities added`);
  }

  // 3. Create Admin Trips (Packages)
  const packages = [
    {
      title: 'Bali Premium Escape', destination: 'Bali', durationDays: 7,
      packageType: 'LUXURY', basePrice: 75000, bestSeason: 'Summer',
      coverImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
      rating: 4.8, views: 1240, popularity: 95, isTrending: true, isPublic: true, status: 'AVAILABLE',
      startDate: new Date(), endDate: new Date(Date.now() + 7 * 86400000)
    },
    {
      title: 'Swiss Alps Adventure', destination: 'Switzerland', durationDays: 10,
      packageType: 'ADVENTURE', basePrice: 250000, bestSeason: 'Winter',
      coverImage: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
      rating: 4.9, views: 980, popularity: 88, isTrending: false, isPublic: true, status: 'AVAILABLE',
      startDate: new Date(), endDate: new Date(Date.now() + 10 * 86400000)
    },
    {
      title: 'Goa Weekend Getaway', destination: 'Goa', durationDays: 4,
      packageType: 'BUDGET', basePrice: 45000, bestSeason: 'Winter',
      coverImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80',
      rating: 4.6, views: 2100, popularity: 99, isTrending: true, isPublic: true, status: 'AVAILABLE',
      startDate: new Date(), endDate: new Date(Date.now() + 4 * 86400000)
    },
    {
      title: 'Rajasthan Heritage Tour', destination: 'Jaipur', durationDays: 6,
      packageType: 'CULTURAL', basePrice: 35000, bestSeason: 'Winter',
      coverImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80',
      rating: 4.7, views: 876, popularity: 85, isTrending: false, isPublic: true, status: 'AVAILABLE',
      startDate: new Date(), endDate: new Date(Date.now() + 6 * 86400000)
    },
    {
      title: 'Paris Romantic Honeymoon', destination: 'Paris', durationDays: 5,
      packageType: 'HONEYMOON', basePrice: 150000, bestSeason: 'Spring',
      coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
      rating: 4.9, views: 3400, popularity: 97, isTrending: true, isPublic: true, status: 'AVAILABLE',
      startDate: new Date(), endDate: new Date(Date.now() + 5 * 86400000)
    }
  ];

  for (const pkg of packages) {
    await prisma.trip.create({
      data: { ...pkg, userId: admin.id }
    });
  }
  console.log(`✅ ${packages.length} Admin Trip Packages created`);

  // 4. Create User Trips (Personal Trips)
  const userTrips = [
    {
      title: 'My Dream Tokyo Trip', destination: 'Tokyo', durationDays: 14,
      packageType: 'CULTURAL', basePrice: null, bestSeason: 'Spring',
      coverImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
      rating: 0, views: 12, popularity: 5, isTrending: false, isPublic: false, status: 'PLANNING',
      startDate: new Date(Date.now() + 30 * 86400000), endDate: new Date(Date.now() + 44 * 86400000)
    },
    {
      title: 'Dubai Business + Leisure', destination: 'Dubai', durationDays: 5,
      packageType: 'LUXURY', basePrice: null, bestSeason: 'Winter',
      coverImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
      rating: 0, views: 0, popularity: 0, isTrending: false, isPublic: false, status: 'CONFIRMED',
      startDate: new Date(Date.now() + 10 * 86400000), endDate: new Date(Date.now() + 15 * 86400000)
    },
    {
      title: 'Past Trip: Singapore', destination: 'Singapore', durationDays: 6,
      packageType: 'FAMILY', basePrice: null, bestSeason: 'Summer',
      coverImage: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80',
      rating: 5.0, views: 45, popularity: 10, isTrending: false, isPublic: true, status: 'COMPLETED',
      startDate: new Date(Date.now() - 60 * 86400000), endDate: new Date(Date.now() - 54 * 86400000)
    }
  ];

  for (const trip of userTrips) {
    await prisma.trip.create({
      data: { ...trip, userId: user.id }
    });
  }
  console.log(`✅ ${userTrips.length} Regular User Trips created`);

  console.log('\n🎉 Seed complete!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
