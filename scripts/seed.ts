import mongoose from 'mongoose';
import Cruise from '../models/Cruise';

const MONGODB_URI = 'mongodb+srv://jb_user:OxjeVUXfFhQ5Ej3v@cluster0.tj05sva.mongodb.net/';

const cruisesData = [
    {
        name: 'The Royal Lotus',
        image: '/deck.png',
        duration: '4 Days / 3 Nights',
        route: 'Luxor to Aswan',
        rating: 4.9,
        price: 450,
        description: 'Experience the Nile in unparalleled luxury aboard The Royal Lotus. This 5-star vessel offers spacious cabins, gourmet dining, and a sun deck with a plunge pool. Explore the ancient wonders of Luxor and Aswan in style.',
        itinerary: [
            { day: 1, title: 'Arrival in Luxor', desc: 'Check-in and visit Karnak & Luxor Temples.' },
            { day: 2, title: 'West Bank Tour', desc: 'Valley of the Kings, Hatshepsut Temple, sail to Edfu.' },
            { day: 3, title: 'Edfu & Kom Ombo', desc: 'Visit Edfu Temple, sail to Kom Ombo, then Aswan.' },
            { day: 4, title: 'Aswan & Departure', desc: 'Philae Temple, High Dam, and check-out.' },
        ],
        amenities: ['Free Wi-Fi', 'Swimming Pool', 'Spa & Massage', 'Gourmet Restaurant', 'Bar & Lounge'],
        tags: ['Luxury', 'Best Seller'],
    },
    {
        name: 'MS Farah',
        image: '/cabin.png',
        duration: '5 Days / 4 Nights',
        route: 'Aswan to Luxor',
        rating: 4.8,
        price: 600,
        description: 'MS Farah offers a unique sailing experience with its modern design and exceptional service. Enjoy cooking classes, telescope stargazing, and ultra-modern cabins.',
        itinerary: [
            { day: 1, title: 'Arrival in Aswan', desc: 'Check-in and visit Philae Temple.' },
            { day: 2, title: 'Kom Ombo & Edfu', desc: 'Sail to Kom Ombo, visit temple, sail to Edfu.' },
            { day: 3, title: 'Luxor West Bank', desc: 'Valley of the Kings and Queens.' },
            { day: 4, title: 'Luxor East Bank', desc: 'Karnak and Luxor Temples.' },
            { day: 5, title: 'Departure', desc: 'Breakfast and check-out.' },
        ],
        amenities: ['Cooking Classes', 'Telescope', 'Sauna', 'Gym', 'Library'],
        tags: ['Premium', 'All Inclusive'],
    },
    {
        name: 'Oberoi Philae',
        image: '/hero.png',
        duration: '7 Days / 6 Nights',
        route: 'Cairo to Luxor',
        rating: 5.0,
        price: 1200,
        description: 'The pinnacle of luxury cruising. Oberoi Philae features butler service, private balconies, and curated excursions led by renowned Egyptologists.',
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
    },
    {
        name: 'Sonesta St. George',
        image: '/deck.png',
        duration: '4 Days / 3 Nights',
        route: 'Luxor to Aswan',
        rating: 4.7,
        price: 550,
        description: 'A modern cruise ship with contemporary amenities and classic Egyptian hospitality. Perfect for families and couples seeking comfort and adventure.',
        itinerary: [
            { day: 1, title: 'Luxor Embarkation', desc: 'Karnak and Luxor Temples.' },
            { day: 2, title: 'West Bank & Sail', desc: 'Valley of the Kings, sail to Edfu.' },
            { day: 3, title: 'Edfu & Kom Ombo', desc: 'Temple visits, sail to Aswan.' },
            { day: 4, title: 'Aswan & Departure', desc: 'Philae Temple, disembark.' },
        ],
        amenities: ['Pool', 'Fitness Center', 'Sun Deck', 'Restaurant', 'Bar'],
        tags: ['Modern', 'Pool'],
    },
    {
        name: 'Movenpick Royal Lily',
        image: '/cabin.png',
        duration: '5 Days / 4 Nights',
        route: 'Aswan to Luxor',
        rating: 4.8,
        price: 700,
        description: 'Classic elegance meets modern comfort. Renowned for its gourmet cuisine and attentive service.',
        itinerary: [
            { day: 1, title: 'Aswan Embarkation', desc: 'High Dam and Philae Temple.' },
            { day: 2, title: 'Kom Ombo & Edfu', desc: 'Temple visits.' },
            { day: 3, title: 'Sail to Luxor', desc: 'Relaxation day onboard.' },
            { day: 4, title: 'Luxor West Bank', desc: 'Valley of the Kings.' },
            { day: 5, title: 'Luxor East & Departure', desc: 'Karnak Temple, disembark.' },
        ],
        amenities: ['Gourmet Dining', 'Pool', 'Spa', 'Lounge', 'Library'],
        tags: ['Classic', 'Gourmet'],
    },
    {
        name: 'Historia Boutique Hotel',
        image: '/hero.png',
        duration: '8 Days / 7 Nights',
        route: 'Round Trip Luxor',
        rating: 4.9,
        price: 1500,
        description: 'An intimate boutique experience with only 20 cabins. Personalized service and exclusive excursions.',
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
    },
];

async function seedDatabase() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing cruises
        await Cruise.deleteMany({});
        console.log('Cleared existing cruises');

        // Insert new cruises
        await Cruise.insertMany(cruisesData);
        console.log('Seeded cruises successfully');

        await mongoose.connection.close();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
