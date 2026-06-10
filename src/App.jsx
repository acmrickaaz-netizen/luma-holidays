import React, { useState, useEffect } from 'react';
import { 
  MapPin, Calendar, Users, Phone, Mail, 
  CheckCircle, ChevronRight, Menu, X, PlaneTakeoff, ShieldCheck, Star, Heart
} from 'lucide-react';

// --- FIREBASE INITIALIZATION & IMPORTS ---
import { initializeApp } from 'firebase/app';
import { 
  getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged 
} from 'firebase/auth';
import { 
  getFirestore, collection, addDoc, serverTimestamp 
} from 'firebase/firestore';

// --- REAL FIREBASE CONFIGURATION ---
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// We no longer need the preview appId, so we will use a generic one for your collection path
const appId = "luma-production";

// --- MOCK DATA FOR DESTINATIONS & PACKAGES ---
const DESTINATIONS = [
  { id: 'my', name: 'Malaysia', image: 'https://images.unsplash.com/photo-1596422846543-74c6e913a48e?auto=format&fit=crop&w=800&q=80', tag: 'City & Theme Parks', price: 'LKR 125,000' },
  { id: 'sg', name: 'Singapore', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80', tag: 'Luxury & Future', price: 'LKR 185,000' },
  { id: 'cn', name: 'China', image: 'https://images.unsplash.com/photo-1508804185872-d7bad808fc52?auto=format&fit=crop&w=800&q=80', tag: 'Heritage & Culture', price: 'LKR 210,000' },
  { id: 'th', name: 'Thailand (Bangkok)', image: 'https://images.unsplash.com/photo-1583491470860-681b9e1598ce?auto=format&fit=crop&w=800&q=80', tag: 'Shopping & Street Food', price: 'LKR 95,000' },
  { id: 'ae', name: 'Dubai', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80', tag: 'Desert & Skyscrapers', price: 'LKR 190,000' },
  { id: 'mv', name: 'Beach Tours (Maldives)', image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80', tag: 'Tropical Escape', price: 'LKR 250,000' },
];

const ITINERARY_MOCK = [
  { day: 1, title: 'Arrival & Welcome', desc: 'Transfer from airport to hotel. Evening at leisure.' },
  { day: 2, title: 'City Explorer Tour', desc: 'Guided tour covering major landmarks and cultural hotspots.' },
  { day: 3, title: 'Adventure & Shopping', desc: 'Free day for local shopping or optional adventure activities.' },
  { day: 4, title: 'Departure', desc: 'Checkout and transfer to the airport.' },
];

// --- CORE REUSABLE COMPONENTS ---

const Navigation = ({ currentView, navigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Home', view: 'home' },
    { name: 'Destinations', view: 'destinations' },
    { name: 'Contact Us', view: 'contact' }
  ];

  const handleNav = (view) => {
    navigate(view);
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 top-0 transition-all duration-300 bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Updated Logo mimicking the image */}
          <div className="flex-shrink-0 flex flex-col justify-center cursor-pointer" onClick={() => handleNav('home')}>
            <div className="flex items-center space-x-1">
              <span className="font-extrabold text-3xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#00b4a9] via-[#009bd6] to-[#009bd6]">
                Luma
              </span>
              <span className="font-extrabold text-3xl tracking-tight text-[#0062b1]">
                Holidays
              </span>
            </div>
            <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase ml-1 -mt-1">travel with love</span>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            {links.map((link) => (
              <button 
                key={link.view}
                onClick={() => handleNav(link.view)}
                className={`text-sm font-semibold transition-colors ${currentView === link.view ? 'text-[#009bd6]' : 'text-slate-600 hover:text-[#00b4a9]'}`}
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => handleNav('contact')}
              className="bg-gradient-to-r from-[#009bd6] to-[#0062b1] text-white px-6 py-2.5 rounded-full font-medium hover:from-[#00b4a9] hover:to-[#009bd6] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Inquire Now
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full pb-4 shadow-lg">
          <div className="px-4 pt-2 space-y-1">
            {links.map((link) => (
              <button 
                key={link.view}
                onClick={() => handleNav(link.view)}
                className="block w-full text-left px-3 py-3 text-base font-medium text-slate-700 hover:bg-[#e6f5fc] hover:text-[#009bd6] rounded-md"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = ({ navigate }) => (
  <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="col-span-1 md:col-span-2">
        <div className="flex flex-col mb-4 cursor-pointer" onClick={() => navigate('home')}>
            <div className="flex items-center space-x-1">
              <span className="font-extrabold text-3xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#00b4a9] to-[#009bd6]">
                Luma
              </span>
              <span className="font-extrabold text-3xl tracking-tight text-white">
                Holidays
              </span>
            </div>
            <span className="text-xs font-bold text-slate-500 tracking-widest uppercase ml-1">travel with love</span>
        </div>
        <p className="text-sm leading-relaxed mb-6 max-w-sm">
          Crafting unforgettable outbound journeys from Sri Lanka to the world's most exciting destinations. Let us handle the details while you make the memories.
        </p>
      </div>
      <div>
        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
        <ul className="space-y-2 text-sm">
          <li><button onClick={() => navigate('home')} className="hover:text-[#009bd6]">Home</button></li>
          <li><button onClick={() => navigate('destinations')} className="hover:text-[#009bd6]">Destinations</button></li>
          <li><button onClick={() => navigate('contact')} className="hover:text-[#009bd6]">Contact Us</button></li>
        </ul>
      </div>
      <div>
        <h3 className="text-white font-semibold mb-4">Contact Info</h3>
        <ul className="space-y-3 text-sm">
          <li className="flex items-center"><Phone className="h-4 w-4 mr-2 text-[#009bd6]"/> +94 77 123 4567</li>
          <li className="flex items-center"><Mail className="h-4 w-4 mr-2 text-[#009bd6]"/> hello@lumaholidays.com</li>
          <li className="flex items-start"><MapPin className="h-4 w-4 mr-2 mt-1 text-[#009bd6] flex-shrink-0"/> 123 Galle Road, Colombo 03, Sri Lanka</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-sm text-center text-slate-500">
      &copy; {new Date().getFullYear()} Luma Holidays. All rights reserved.
    </div>
  </footer>
);

// --- FIREBASE ENQUIRY ENGINE ---

const EnquiryForm = ({ user, defaultDestination = 'General Inquiry', onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    travelDate: '',
    travelers: '2 Travelers',
    destination: defaultDestination
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!user) {
      setError("Authentication initializing. Please try again in a moment.");
      setLoading(false);
      return;
    }

    try {
      const leadData = {
        ...formData,
        userId: user.uid,
        status: 'new',
        createdAt: serverTimestamp(),
      };

      const leadsRef = collection(db, 'artifacts', appId, 'public', 'data', 'leads');
      await addDoc(leadsRef, leadData);
      
      onSuccess();
    } catch (err) {
      console.error("Error submitting lead: ", err);
      setError("Something went wrong while sending your inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00b4a9] via-[#009bd6] to-[#0062b1]"></div>
      
      <h3 className="text-2xl font-bold text-slate-800 mb-2">Plan Your Trip</h3>
      <p className="text-sm text-slate-500 mb-6">Fill this out and our travel experts will contact you within 24 hours.</p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <input type="hidden" name="destination" value={formData.destination} />

        {defaultDestination !== 'General Inquiry' && (
           <div className="p-3 bg-[#e6f5fc] border border-[#b3e1f4] rounded-lg flex items-center text-[#0062b1] text-sm mb-4">
             <MapPin className="h-4 w-4 mr-2" />
             Inquiring about: <strong>{defaultDestination}</strong>
           </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
          <input required type="text" name="fullName" value={formData.fullName} onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#009bd6] transition-colors text-slate-800" placeholder="John Doe" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address *</label>
            <input required type="email" name="email" value={formData.email} onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#009bd6] transition-colors text-slate-800" placeholder="john@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">WhatsApp Number *</label>
            <input required type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#009bd6] transition-colors text-slate-800" placeholder="+94 77 XXX XXXX" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center"><Calendar className="h-4 w-4 mr-1 text-slate-400"/> Expected Travel Date</label>
            <select name="travelDate" value={formData.travelDate} onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#009bd6] transition-colors text-slate-800">
              <option value="" disabled>Select timeline</option>
              <option value="Next 1 Month">Next 1 Month</option>
              <option value="In 3 Months">In 3 Months</option>
              <option value="In 6 Months">In 6 Months</option>
              <option value="Undecided">Undecided</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center"><Users className="h-4 w-4 mr-1 text-slate-400"/> Number of Travelers</label>
            <select name="travelers" value={formData.travelers} onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#009bd6] transition-colors text-slate-800">
              <option value="1 Traveler">1 Traveler (Solo)</option>
              <option value="2 Travelers">2 Travelers (Couple)</option>
              <option value="3-5 Travelers">3-5 Travelers (Family)</option>
              <option value="6+ Travelers">6+ Travelers (Group)</option>
            </select>
          </div>
        </div>

        <button 
          disabled={loading}
          type="submit" 
          className={`w-full mt-4 py-4 rounded-lg font-bold text-lg text-white transition-all shadow-lg ${loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-[#009bd6] to-[#0062b1] hover:from-[#00b4a9] hover:to-[#009bd6] hover:shadow-xl hover:-translate-y-0.5'}`}
        >
          {loading ? 'Sending Inquiry...' : 'Get Free Quote'}
        </button>
        <p className="text-xs text-center text-slate-500 mt-3 flex items-center justify-center">
          <ShieldCheck className="h-4 w-4 mr-1"/> Your information is secure and private.
        </p>
      </div>
    </form>
  );
};

// --- VIEWS / PAGES ---

const HomePage = ({ navigate, user }) => (
  <div className="min-h-screen animate-fadeIn">
    {/* Hero Section */}
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=1920&q=80" alt="Travel Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <span className="inline-block py-1 px-3 rounded-full bg-[#009bd6]/20 text-[#66cbf0] font-semibold text-sm mb-6 border border-[#009bd6]/30 backdrop-blur-sm">
              Sri Lanka's Premier Outbound Agency
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg">
              Discover the World,<br/> One Trip at a Time.
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-2xl mx-auto lg:mx-0 drop-shadow-md">
              From the vibrant streets of Bangkok to the luxurious sands of Dubai. Let Luma Holidays craft your perfect getaway.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button onClick={() => navigate('destinations')} className="bg-white text-[#0062b1] px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-100 transition-colors shadow-xl flex items-center justify-center">
                Explore Packages <ChevronRight className="ml-2 h-5 w-5"/>
              </button>
            </div>
          </div>
          
          <div className="hidden lg:block">
            {/* Quick Enquiry Floating Form */}
            <EnquiryForm user={user} onSuccess={() => navigate('thank-you')} />
          </div>
        </div>
      </div>
    </section>

    {/* Featured Categories: Beach Tours Highlight */}
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Trending Now: Beach Tours</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Escape the city and unwind on pristine sands. Our exclusive beach packages are tailored for maximum relaxation.</p>
        </div>
        
        <div className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer" onClick={() => navigate('package', DESTINATIONS.find(d => d.id === 'mv'))}>
          <img src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80" alt="Beach Destinations" className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 md:p-12">
            <span className="bg-[#00b4a9] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block shadow-md">Bestseller</span>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">Maldives Premium Escapes</h3>
            <p className="text-slate-200 mb-6 max-w-xl">All-inclusive water villa experiences starting from {DESTINATIONS.find(d => d.id === 'mv').price}. Flights, transfers, and luxury accommodations included.</p>
            <button className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-2 rounded-full font-medium hover:bg-white hover:text-[#0062b1] transition-colors">
              View Package Details
            </button>
          </div>
        </div>
      </div>
    </section>

    {/* Core Destinations Grid */}
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Popular Destinations</h2>
            <p className="text-slate-600">Curated experiences from Sri Lanka to the globe.</p>
          </div>
          <button onClick={() => navigate('destinations')} className="text-[#009bd6] font-medium hover:text-[#0062b1] hidden sm:flex items-center">
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {DESTINATIONS.slice(0, 5).map((dest) => (
            <div key={dest.id} className="group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 bg-white cursor-pointer" onClick={() => navigate('package', dest)}>
              <div className="relative h-64 overflow-hidden">
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-slate-800 shadow-sm">
                  {dest.price}
                </div>
              </div>
              <div className="p-6">
                <p className="text-[#00b4a9] text-sm font-semibold mb-1">{dest.tag}</p>
                <h3 className="text-xl font-bold text-slate-800 mb-4">{dest.name} Packages</h3>
                <div className="flex items-center text-slate-500 text-sm border-t border-slate-100 pt-4">
                  <Calendar className="h-4 w-4 mr-1"/> 4 Days / 3 Nights
                  <span className="mx-2">•</span>
                  <PlaneTakeoff className="h-4 w-4 mr-1"/> Flights Incl.
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Social Proof */}
    <section className="py-20 bg-gradient-to-br from-[#0062b1] to-[#009bd6] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-12">Trusted by Thousands of Travelers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/20">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />)}
              </div>
              <p className="italic text-[#e6f5fc] mb-6">"Our family trip to Singapore was flawless. Luma Holidays handled everything from visas to hotel bookings perfectly. Highly recommended!"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const DestinationsPage = ({ navigate }) => (
  <div className="pt-32 pb-20 min-h-screen bg-slate-50 animate-fadeIn">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">All Destinations</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">Explore our wide range of tailored packages. Click on any destination to view detailed itineraries and request a free quote.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {DESTINATIONS.map((dest) => (
          <div key={dest.id} className="group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all border border-slate-100 bg-white cursor-pointer" onClick={() => navigate('package', dest)}>
            <div className="relative h-72 overflow-hidden">
              <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-[#66cbf0] text-sm font-semibold mb-1">{dest.tag}</p>
                <h3 className="text-2xl font-bold text-white mb-2">{dest.name}</h3>
                <p className="text-white/80 text-sm font-medium">Starting from {dest.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const PackageDetailPage = ({ destination, navigate, user }) => {
  if (!destination) return null;

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50 animate-fadeIn">
      {/* Hero Header */}
      <div className="w-full h-[40vh] relative mb-12">
        <img src={destination.image} alt={destination.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-slate-900/50"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <button onClick={() => navigate('destinations')} className="text-white/80 hover:text-white mb-4 text-sm font-medium flex items-center transition-colors">
              <ChevronRight className="h-4 w-4 rotate-180 mr-1"/> Back to Destinations
            </button>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{destination.name} Explorer</h1>
            <p className="text-xl text-[#66cbf0] font-medium">{destination.tag}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Content: Itinerary & Details */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Package Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="p-4 bg-slate-50 rounded-lg text-center border border-slate-100">
                  <Calendar className="h-6 w-6 mx-auto text-[#009bd6] mb-2"/>
                  <span className="block text-sm font-bold text-slate-800">Duration</span>
                  <span className="block text-xs text-slate-500">4 Days / 3 Nights</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg text-center border border-slate-100">
                  <PlaneTakeoff className="h-6 w-6 mx-auto text-[#009bd6] mb-2"/>
                  <span className="block text-sm font-bold text-slate-800">Flights</span>
                  <span className="block text-xs text-slate-500">Included</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg text-center border border-slate-100">
                  <MapPin className="h-6 w-6 mx-auto text-[#009bd6] mb-2"/>
                  <span className="block text-sm font-bold text-slate-800">Location</span>
                  <span className="block text-xs text-slate-500">{destination.name}</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg text-center border border-slate-100">
                  <Users className="h-6 w-6 mx-auto text-[#009bd6] mb-2"/>
                  <span className="block text-sm font-bold text-slate-800">Group Size</span>
                  <span className="block text-xs text-slate-500">Flexible</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Daily Itinerary</h3>
              <div className="space-y-6">
                {ITINERARY_MOCK.map((item) => (
                  <div key={item.day} className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-8 h-8 rounded-full bg-[#e6f5fc] text-[#0062b1] flex items-center justify-center font-bold text-sm shrink-0 border border-[#b3e1f4]">
                        {item.day}
                      </div>
                      {item.day !== ITINERARY_MOCK.length && <div className="w-0.5 h-full bg-[#b3e1f4] mt-2"></div>}
                    </div>
                    <div className="pb-4">
                      <h4 className="text-lg font-bold text-slate-800">Day {item.day}: {item.title}</h4>
                      <p className="text-slate-600 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-[#00b4a9]"/> Inclusions</h3>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start"><span className="text-[#00b4a9] mr-2">✓</span> Return Air Tickets</li>
                    <li className="flex items-start"><span className="text-[#00b4a9] mr-2">✓</span> 3 Nights Accommodation</li>
                    <li className="flex items-start"><span className="text-[#00b4a9] mr-2">✓</span> Daily Breakfast</li>
                    <li className="flex items-start"><span className="text-[#00b4a9] mr-2">✓</span> Airport Transfers</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center"><X className="h-5 w-5 mr-2 text-red-400"/> Exclusions</h3>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start"><span className="text-red-400 mr-2">✗</span> Visa Fees</li>
                    <li className="flex items-start"><span className="text-red-400 mr-2">✗</span> Travel Insurance</li>
                    <li className="flex items-start"><span className="text-red-400 mr-2">✗</span> Personal Expenses</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar: Sticky Enquiry Form */}
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <div className="bg-slate-900 text-white p-6 rounded-t-2xl">
                <p className="text-sm text-slate-400 uppercase tracking-wider font-semibold">Starting Price</p>
                <p className="text-3xl font-bold text-[#66cbf0]">{destination.price} <span className="text-sm font-normal text-slate-400">/ person</span></p>
              </div>
              <div className="-mt-4 relative z-10">
                <EnquiryForm 
                  user={user} 
                  defaultDestination={destination.name} 
                  onSuccess={() => navigate('thank-you')} 
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const ContactPage = ({ user, navigate }) => (
  <div className="pt-32 pb-20 min-h-screen bg-slate-50 animate-fadeIn">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">Contact Us</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">Have a custom trip in mind? Or just want to say hello? Drop us a message.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-12 bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100">
        
        {/* Contact Details Side */}
        <div className="md:w-5/12 bg-slate-900 text-white p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#009bd6] rounded-full opacity-20 blur-3xl"></div>
          
          <h2 className="text-3xl font-bold mb-8 relative z-10">Get in touch</h2>
          <div className="space-y-8 relative z-10">
            <div className="flex items-start">
              <MapPin className="h-6 w-6 text-[#009bd6] mr-4 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-lg">Office Address</h4>
                <p className="text-slate-400 mt-1">123 Galle Road,<br/>Colombo 03,<br/>Sri Lanka</p>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="h-6 w-6 text-[#00b4a9] mr-4 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-lg">Phone Number</h4>
                <p className="text-slate-400 mt-1">+94 77 123 4567<br/>+94 11 234 5678</p>
              </div>
            </div>
            <div className="flex items-start">
              <Mail className="h-6 w-6 text-[#00b4a9] mr-4 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-lg">Email Address</h4>
                <p className="text-slate-400 mt-1">hello@lumaholidays.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="md:w-7/12 p-8 md:p-12 bg-white flex items-center">
          <div className="w-full">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Send an Inquiry</h2>
            <EnquiryForm user={user} onSuccess={() => navigate('thank-you')} />
          </div>
        </div>
        
      </div>
    </div>
  </div>
);

const ThankYouPage = ({ navigate }) => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 pt-20 animate-fadeIn">
    <div className="max-w-lg w-full bg-white p-10 rounded-3xl shadow-xl border border-slate-100 text-center">
      <div className="w-20 h-20 bg-[#e6f5fc] rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="h-10 w-10 text-[#009bd6]" />
      </div>
      <h1 className="text-3xl font-extrabold text-slate-800 mb-4">Thank You!</h1>
      <p className="text-slate-600 mb-8 leading-relaxed">
        Your inquiry has been successfully submitted. One of our dedicated travel experts will review your request and get back to you via WhatsApp or Email within 24 hours.
      </p>
      <button 
        onClick={() => navigate('home')}
        className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold hover:bg-slate-800 transition-colors shadow-md"
      >
        Back to Home
      </button>
    </div>
  </div>
);


// --- MAIN APP CONTAINER ---

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (err) {
        console.error("Firebase Auth Error:", err);
      }
    };
    initAuth();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const navigate = (view, data = null) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (view === 'package' && data) {
      setSelectedDestination(data);
    }
    setCurrentView(view);
  };

  const renderView = () => {
    switch(currentView) {
      case 'home': return <HomePage navigate={navigate} user={user} />;
      case 'destinations': return <DestinationsPage navigate={navigate} />;
      case 'package': return <PackageDetailPage destination={selectedDestination} navigate={navigate} user={user} />;
      case 'contact': return <ContactPage navigate={navigate} user={user} />;
      case 'thank-you': return <ThankYouPage navigate={navigate} />;
      default: return <HomePage navigate={navigate} user={user} />;
    }
  };

  return (
    <div className="font-sans text-slate-900 bg-slate-50 min-h-screen flex flex-col">
      <Navigation currentView={currentView} navigate={navigate} />
      <main className="flex-grow">
        {renderView()}
      </main>
      {currentView !== 'thank-you' && <Footer navigate={navigate} />}
      
      <style dangerouslySetInnerHTML={{__html: `
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}