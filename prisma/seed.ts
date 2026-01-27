import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import path from 'path';
import { config } from 'dotenv';

// Explicitly load .env.local
config({ path: path.resolve(process.cwd(), '.env.local') });

const connectionString = `${process.env.PostgreSQL}`;
const pool = new pg.Pool({ 
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const cruisesData = [
    {
        nameEn: 'The Royal Lotus',
        nameAr: 'The Royal Lotus',
        image: '/deck.png',
        duration: '4 Days / 3 Nights',
        routeEn: 'Luxor to Aswan',
        routeAr: 'Luxor to Aswan',
        rating: 4.9,
        price: 450,
        descriptionEn: 'Experience the Nile in unparalleled luxury aboard The Royal Lotus. This 5-star vessel offers spacious cabins, gourmet dining, and a sun deck with a plunge pool. Explore the ancient wonders of Luxor and Aswan in style. Perfect for a romantic getaway.',
        descriptionAr: 'Experience the Nile in unparalleled luxury aboard The Royal Lotus. This 5-star vessel offers spacious cabins, gourmet dining, and a sun deck with a plunge pool. Explore the ancient wonders of Luxor and Aswan in style. Perfect for a romantic getaway.',
        itinerary: [
            { day: 1, title: 'Arrival in Luxor', desc: 'Check-in and visit Karnak & Luxor Temples.' },
            { day: 2, title: 'West Bank Tour', desc: 'Valley of the Kings, Hatshepsut Temple, sail to Edfu.' },
            { day: 3, title: 'Edfu & Kom Ombo', desc: 'Visit Edfu Temple, sail to Kom Ombo, then Aswan.' },
            { day: 4, title: 'Aswan & Departure', desc: 'Philae Temple, High Dam, and check-out.' },
        ],
        amenities: ['Free Wi-Fi', 'Swimming Pool', 'Spa & Massage', 'Gourmet Restaurant', 'Bar & Lounge'],
        tags: ['Luxury', 'Best Seller', 'Romantic'],
        gallery: [],
        cabinTypes: [],
        deckPlans: [],
        cabinVideos: [],
    },
    {
        nameEn: 'MS Farah',
        nameAr: 'MS Farah',
        image: '/cabin.png',
        duration: '5 Days / 4 Nights',
        routeEn: 'Aswan to Luxor',
        routeAr: 'Aswan to Luxor',
        rating: 4.8,
        price: 600,
        descriptionEn: 'MS Farah offers a unique sailing experience with its modern design and exceptional service. Enjoy cooking classes, telescope stargazing, and ultra-modern cabins. Ideal for couples seeking a romantic adventure.',
        descriptionAr: 'MS Farah offers a unique sailing experience with its modern design and exceptional service. Enjoy cooking classes, telescope stargazing, and ultra-modern cabins. Ideal for couples seeking a romantic adventure.',
        itinerary: [
            { day: 1, title: 'Arrival in Aswan', desc: 'Check-in and visit Philae Temple.' },
            { day: 2, title: 'Kom Ombo & Edfu', desc: 'Sail to Kom Ombo, visit temple, sail to Edfu.' },
            { day: 3, title: 'Luxor West Bank', desc: 'Valley of the Kings and Queens.' },
            { day: 4, title: 'Luxor East Bank', desc: 'Karnak and Luxor Temples.' },
            { day: 5, title: 'Departure', desc: 'Breakfast and check-out.' },
        ],
        amenities: ['Cooking Classes', 'Telescope', 'Sauna', 'Gym', 'Library'],
        tags: ['Premium', 'All Inclusive', 'Romantic'],
        gallery: [],
        cabinTypes: [],
        deckPlans: [],
        cabinVideos: [],
    },
    {
        nameEn: 'Oberoi Philae',
        nameAr: 'Oberoi Philae',
        image: '/hero.png',
        duration: '7 Days / 6 Nights',
        routeEn: 'Cairo to Luxor',
        routeAr: 'Cairo to Luxor',
        rating: 5.0,
        price: 1200,
        descriptionEn: 'The pinnacle of luxury cruising. Oberoi Philae features butler service, private balconies, and curated excursions led by renowned Egyptologists.',
        descriptionAr: 'The pinnacle of luxury cruising. Oberoi Philae features butler service, private balconies, and curated excursions led by renowned Egyptologists.',
        itinerary: [
            { day: 1, title: 'Cairo Arrival', desc: 'Pyramids of Giza and Egyptian Museum.' },
            { day: 2, title: 'Flight to Luxor', desc: 'Board cruise, Karnak Temple.' },
            { day: 3, title: 'West Bank', desc: 'Valley of the Kings, Hatshepsut Temple.' },
            { day: 4, title: 'Edfu Temple', desc: 'Sail to Edfu, temple visit.' },
            { day: 5, title: 'Kom Ombo', desc: 'Temple visit, sail to Aswan.' },
            { day: 6, title: 'Aswan Highlights', desc: 'Philae Temple, High Dam, Abu Simbel option.' },
            { day: 7, title: 'Departure', desc: 'Disembark and transfer.' },
        ],
        amenities: ['Butler Service', 'Private Balconies', 'Fine Dining', 'Spa', 'Egyptologist Guides'],
        tags: ['Ultra Luxury', 'Exclusive'],
        gallery: [],
        cabinTypes: [],
        deckPlans: [],
        cabinVideos: [],
    },
    {
        nameEn: 'Sonesta St. George',
        nameAr: 'Sonesta St. George',
        image: '/deck.png',
        duration: '4 Days / 3 Nights',
        routeEn: 'Luxor to Aswan',
        routeAr: 'Luxor to Aswan',
        rating: 4.7,
        price: 550,
        descriptionEn: 'A modern cruise ship with contemporary amenities and classic Egyptian hospitality. Perfect for families and couples seeking comfort and adventure.',
        descriptionAr: 'A modern cruise ship with contemporary amenities and classic Egyptian hospitality. Perfect for families and couples seeking comfort and adventure.',
        itinerary: [
            { day: 1, title: 'Luxor Embarkation', desc: 'Karnak and Luxor Temples.' },
            { day: 2, title: 'West Bank & Sail', desc: 'Valley of the Kings, sail to Edfu.' },
            { day: 3, title: 'Edfu & Kom Ombo', desc: 'Temple visits, sail to Aswan.' },
            { day: 4, title: 'Aswan & Departure', desc: 'Philae Temple, disembark.' },
        ],
        amenities: ['Pool', 'Fitness Center', 'Sun Deck', 'Restaurant', 'Bar'],
        tags: ['Modern', 'Pool'],
        gallery: [],
        cabinTypes: [],
        deckPlans: [],
        cabinVideos: [],
    },
    {
        nameEn: 'Movenpick Royal Lily',
        nameAr: 'Movenpick Royal Lily',
        image: '/cabin.png',
        duration: '5 Days / 4 Nights',
        routeEn: 'Aswan to Luxor',
        routeAr: 'Aswan to Luxor',
        rating: 4.8,
        price: 700,
        descriptionEn: 'Classic elegance meets modern comfort. Renowned for its gourmet cuisine and attentive service.',
        descriptionAr: 'Classic elegance meets modern comfort. Renowned for its gourmet cuisine and attentive service.',
        itinerary: [
            { day: 1, title: 'Aswan Embarkation', desc: 'High Dam and Philae Temple.' },
            { day: 2, title: 'Kom Ombo & Edfu', desc: 'Temple visits.' },
            { day: 3, title: 'Sail to Luxor', desc: 'Relaxation day onboard.' },
            { day: 4, title: 'Luxor West Bank', desc: 'Valley of the Kings.' },
            { day: 5, title: 'Luxor East & Departure', desc: 'Karnak Temple, disembark.' },
        ],
        amenities: ['Gourmet Dining', 'Pool', 'Spa', 'Lounge', 'Library'],
        tags: ['Classic', 'Gourmet'],
        gallery: [],
        cabinTypes: [],
        deckPlans: [],
        cabinVideos: [],
    },
    {
        nameEn: 'Historia Boutique Hotel',
        nameAr: 'Historia Boutique Hotel',
        image: '/hero.png',
        duration: '8 Days / 7 Nights',
        routeEn: 'Round Trip Luxor',
        routeAr: 'Round Trip Luxor',
        rating: 4.9,
        price: 1500,
        descriptionEn: 'An intimate boutique experience with only 20 cabins. Personalized service and exclusive excursions.',
        descriptionAr: 'An intimate boutique experience with only 20 cabins. Personalized service and exclusive excursions.',
        itinerary: [
            { day: 1, title: 'Luxor Embarkation', desc: 'Welcome dinner.' },
            { day: 2, title: 'Karnak & Luxor', desc: 'Temple visits.' },
            { day: 3, title: 'West Bank', desc: 'Valley of the Kings and Queens.' },
            { day: 4, title: 'Sail to Aswan', desc: 'Edfu and Kom Ombo en route.' },
            { day: 5, title: 'Aswan', desc: 'Philae Temple, Abu Simbel option.' },
            { day: 6, title: 'Return to Luxor', desc: 'Scenic sailing.' },
            { day: 7, title: 'Dendera Temple', desc: 'Day excursion.' },
            { day: 8, title: 'Departure', desc: 'Disembark.' },
        ],
        amenities: ['Boutique Experience', 'Personalized Service', 'Fine Dining', 'Spa', 'Exclusive Tours'],
        tags: ['Boutique', 'Intimate'],
        gallery: [],
        cabinTypes: [],
        deckPlans: [],
        cabinVideos: [],
    },
];

async function main() {
    console.log('Start seeding ...');
    
    // Clear existing cruises
    await prisma.cruise.deleteMany();
    console.log('Cleared existing cruises');

    for (const cruise of cruisesData) {
        const createdCruise = await prisma.cruise.create({
            data: cruise,
        });
        console.log(`Created cruise with id: ${createdCruise.id}`);
    }

    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
