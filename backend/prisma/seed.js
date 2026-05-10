/**
 * Prisma seed script — run with:  npx prisma db seed
 * Or manually:  node prisma/seed.js
 *
 * Adds sample cities + activities so the app is immediately usable.
 */
const { PrismaClient } = require('@prisma/client');
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

  for (const cityData of cities) {
    const city = await prisma.city.upsert({
      where: { name_country: { name: cityData.name, country: cityData.country } },
      update: {},
      create: cityData,
    });
    console.log(`✅ City: ${city.name}`);

    const cityActivities = activities[city.name] || [];
    for (const act of cityActivities) {
      await prisma.activity.upsert({
        where: { id: `${city.id}-${act.name}`.slice(0, 36) },
        update: {},
        create: { ...act, cityId: city.id, costEstimate: act.costEstimate?.toString() },
      }).catch(async () => {
        // If upsert by generated ID fails, just create
        await prisma.activity.create({
          data: { ...act, cityId: city.id, costEstimate: act.costEstimate?.toString() },
        }).catch(() => null);
      });
    }
    console.log(`   ↳ ${cityActivities.length} activities added`);
  }

  console.log('\n🎉 Seed complete!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
