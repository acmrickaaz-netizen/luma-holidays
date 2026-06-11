export const ITINERARY_MOCK = [
  { day: 1, title: 'Arrival & Welcome', desc: 'Airport pickup and transfer to your premium accommodation.' },
  { day: 2, title: 'Guided City Highlights', desc: 'Full day exploring top attractions with a local expert.' },
  { day: 3, title: 'Leisure & Departure', desc: 'Free time for shopping before your scheduled airport transfer.' }
];

const generatePackages = (destName: string, basePrice: string) => [
  {
    id: 'family-getaway',
    title: `${destName} Family Getaway`,
    focus: 'Theme Parks, Wildlife & Family Resorts',
    price: basePrice,
    tag: 'Bestseller'
  },
  {
    id: 'city-escapade',
    title: `${destName} City & Shopping Escapade`,
    focus: 'Premium Malls, City Tours & Fine Dining',
    price: 'Rs. 245,000',
    tag: 'Luxury'
  },
  {
    id: 'twin-explorer',
    title: `${destName} Twin City Explorer`,
    focus: 'Multi-City Transit, Border Crossings & Extended Stay',
    price: 'Rs. 310,000',
    tag: 'Extended'
  }
];

export const DESTINATIONS = [
  { 
    id: 'dxb', 
    name: 'Dubai', 
    tag: 'Gulf Elite', 
    price: 'Rs. 295,000',
    vibe: ['City & Shopping', 'Family & Theme Parks'],
    includes: ['flight', 'hotel', 'meals', 'transfer'],
    packages: generatePackages('Dubai', 'Rs. 295,000'),
    essentialInfo: {
      currency: 'UAE Dirham (AED)',
      climate: '25°C to 40°C',
      bestSeason: 'Nov - March',
      languages: 'Arabic, English',
      tips: [
        'ATMs are widely available in all malls and hotels.',
        'Credit cards are accepted universally.',
        'The legal drinking age in licensed venues is 21.',
        'Dress modestly when visiting public cultural sites.'
      ]
    },
    itinerary: [
      { day: 1, title: 'Arrival & Marina Walk', desc: 'Arrive from Colombo. Transfer to your 4-star hotel and enjoy a relaxed evening walk along the Dubai Marina.' },
      { day: 2, title: 'City Tour & Burj Khalifa', desc: 'Guided tour of Old Dubai, the Gold Souk, and afternoon tickets to the Burj Khalifa observation deck.' },
      { day: 3, title: 'Premium Desert Safari', desc: 'Afternoon dune bashing in 4x4 Land Cruisers, followed by a VIP BBQ dinner and live entertainment at a desert camp.' },
      { day: 4, title: 'Shopping & Departure', desc: 'Morning free for shopping at Dubai Mall before your private airport transfer for the flight home.' }
    ]
  },
  { 
    id: 'my', 
    name: 'Malaysia', 
    tag: 'Explorer', 
    price: 'Rs. 185,000',
    vibe: ['City & Shopping', 'Beach Tours', 'Family & Theme Parks'],
    includes: ['flight', 'hotel', 'transfer'],
    packages: generatePackages('Malaysia', 'Rs. 185,000'),
    essentialInfo: {
      currency: 'Malaysian Ringgit',
      climate: '27°C to 32°C',
      bestSeason: 'March - October',
      languages: 'Malay, English',
      tips: [
        'ATMs are widely available throughout Malaysia.',
        'Credit cards are commonly accepted in cities.',
        'Grab is the best transport app to download.',
        'Malaysians are known for their warm hospitality.'
      ]
    },
    itinerary: [
      { day: 1, title: 'Kuala Lumpur Arrival', desc: 'Meet and greet at KUL airport. Transfer to city-center hotel and evening free at leisure.' },
      { day: 2, title: 'Genting Highlands & Batu Caves', desc: 'Full day excursion to Genting via cable car, with a photography stop at the iconic Batu Caves.' },
      { day: 3, title: 'Sunway Lagoon Theme Park', desc: 'Full day access to all 6 parks at Sunway Lagoon, perfect for family entertainment.' },
      { day: 4, title: 'City Highlights & Departure', desc: 'Half-day KL city tour including Petronas Twin Towers photo stop before airport transfer.' }
    ]
  },
  { 
    id: 'sg', 
    name: 'Singapore', 
    tag: 'Modernity', 
    price: 'Rs. 245,000',
    vibe: ['City & Shopping', 'Family & Theme Parks'],
    includes: ['flight', 'hotel', 'transfer'],
    packages: generatePackages('Singapore', 'Rs. 245,000'),
    essentialInfo: {
      currency: 'Singapore Dollar',
      climate: '26°C to 31°C',
      bestSeason: 'Feb - April',
      languages: 'English, Mandarin',
      tips: [
        'Tap water is completely safe to drink.',
        'The MRT subway is the fastest way to get around.',
        'Chewing gum is strictly prohibited.',
        'Credit cards and contactless payments are everywhere.'
      ]
    },
    itinerary: [
      { day: 1, title: 'Changi Arrival & Jewel', desc: 'Experience the stunning Jewel Changi waterfall upon arrival before checking into your hotel.' },
      { day: 2, title: 'Universal Studios Singapore', desc: 'Full day pass to Sentosa Island and Universal Studios for world-class rides and attractions.' },
      { day: 3, title: 'Gardens by the Bay', desc: 'Evening access to the Cloud Forest, Flower Dome, and the spectacular Supertree Grove light show.' },
      { day: 4, title: 'Orchard Road & Departure', desc: 'Morning shopping at Orchard Road prior to your flight back to Colombo.' }
    ]
  },
  { 
    id: 'th', 
    name: 'Thailand', 
    tag: 'Hub', 
    price: 'Rs. 175,000',
    vibe: ['City & Shopping', 'Beach Tours'],
    includes: ['flight', 'hotel', 'transfer', 'meals'],
    packages: generatePackages('Thailand', 'Rs. 175,000'),
    essentialInfo: {
      currency: 'Thai Baht (THB)',
      climate: '28°C to 35°C',
      bestSeason: 'Nov - Early April',
      languages: 'Thai, English',
      tips: [
        'Always carry some cash for street food and markets.',
        'Tuk-tuks are fun but negotiate the price first.',
        'Dress with shoulders covered when entering temples.',
        'The legal drinking age is 20.'
      ]
    },
    itinerary: [
      { day: 1, title: 'Bangkok Arrival', desc: 'Seamless airport pickup and transfer to your central Bangkok hotel. Evening free to explore local night markets.' },
      { day: 2, title: 'Safari World & Marine Park', desc: 'Full day family-friendly excursion with buffet lunch and live wildlife shows.' },
      { day: 3, title: 'Pattaya Coastal Transfer', desc: 'Transfer to the coastal city of Pattaya. Afternoon free for beach leisure or water sports.' },
      { day: 4, title: 'Coral Island Tour', desc: 'Speedboat trip to Coral Island (Koh Larn) with an authentic Thai seafood lunch.' },
      { day: 5, title: 'Return Transit', desc: 'Private transfer directly from Pattaya to BKK airport for your departure.' }
    ]
  },
  { 
    id: 'cn', 
    name: 'China', 
    tag: 'Logistics', 
    price: 'Rs. 310,000',
    vibe: ['City & Shopping'],
    includes: ['flight', 'hotel', 'transfer'],
    packages: generatePackages('China', 'Rs. 310,000'),
    essentialInfo: {
      currency: 'Chinese Yuan (CNY)',
      climate: 'Varies Widely',
      bestSeason: 'Sept - Nov',
      languages: 'Mandarin',
      tips: [
        'Download WeChat or Alipay before you arrive.',
        'Cash is rarely used; digital payment is king.',
        'High-speed rail is the best way between cities.',
        'A VPN is required to access Google/WhatsApp.'
      ]
    },
    itinerary: [
      { day: 1, title: 'Beijing Touchdown', desc: 'Arrival in Beijing. Fast-tracked hotel check-in and evening welcome dinner.' },
      { day: 2, title: 'The Great Wall', desc: 'Guided excursion to the Mutianyu section of the Great Wall, including cable car access.' },
      { day: 3, title: 'Forbidden City & High-Speed Rail', desc: 'Morning tour of the Forbidden City, followed by a bullet train experience to Shanghai.' },
      { day: 4, title: 'Shanghai The Bund', desc: 'Explore the historic Bund and enjoy a panoramic cruise on the Huangpu River.' },
      { day: 5, title: 'Departure', desc: 'Airport transfer via the Maglev train for your flight out of Shanghai.' }
    ]
  }
];