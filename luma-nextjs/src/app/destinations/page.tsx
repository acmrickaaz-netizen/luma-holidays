'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Compass, 
  MapPin, 
  ArrowRight, 
  Sun, 
  Building2, 
  Palmtree, 
  Search,
  Plane,
  Bed,
  Utensils,
  Car
} from 'lucide-react';
import { DESTINATIONS } from '@/lib/data';

export default function DestinationsOverviewPage() {
  const [activeVibe, setActiveVibe] = useState('All Destinations');
  const [searchQuery, setSearchQuery] = useState('');

  // 1. FILTERING & SEARCH LOGIC
  const filteredDestinations = DESTINATIONS.filter((dest) => {
    // Check if the destination matches the search bar text
    const matchesSearch = 
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      dest.tag.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Check if the destination contains the clicked vibe
    const matchesVibe = 
      activeVibe === 'All Destinations' || 
      (dest.vibe && dest.vibe.includes(activeVibe));

    return matchesSearch && matchesVibe;
  });

  // Filter Buttons Configuration
  const filterButtons = [
    { name: 'All Destinations', icon: null },
    { name: 'City & Shopping', icon: Building2 },
    { name: 'Beach Tours', icon: Palmtree },
    { name: 'Family & Theme Parks', icon: Sun },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      
      {/* HERO SECTION */}
      <div className="relative h-[45vh] min-h-[350px] w-full bg-slate-900 flex flex-col justify-end pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-slate-800 flex flex-col items-center justify-center">
          <span className="text-white/20 font-bold text-3xl md:text-4xl tracking-widest uppercase mb-4 text-center px-4 relative z-10">
            Destinations Hub Hero
          </span>
          <span className="text-white/30 font-mono text-xl tracking-widest bg-white/5 px-4 py-1.5 rounded-md relative z-10">
            1920 x 800 px
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent z-10"></div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight drop-shadow-lg mb-4">
            Where to Next?
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-md">
            Select your preferred core hub below. Every package is fully customizable to fit your exact travel dates and group size.
          </p>
        </div>
      </div>

      {/* SEARCH ENGINE BAR */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-7 relative z-40 mb-8">
        <div className="bg-white rounded-2xl shadow-xl p-2 border border-slate-100 flex items-center">
          <div className="pl-4 pr-2 text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <input 
            type="text"
            placeholder="Search destinations (e.g., Dubai, Beach Tours...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-3 px-2 bg-transparent border-none focus:outline-none text-slate-800 font-medium placeholder:text-slate-400"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="pr-4 text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-wider"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* QUICK FILTERS / CATEGORY BAR */}
      <div className="bg-white border-y border-slate-200 shadow-sm relative z-30 sticky top-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto py-4 space-x-4 no-scrollbar items-center md:justify-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2 shrink-0">Filter by Vibe:</span>
            
            {filterButtons.map((btn) => {
              const Icon = btn.icon;
              const isActive = activeVibe === btn.name;
              
              return (
                <button 
                  key={btn.name}
                  onClick={() => setActiveVibe(btn.name)}
                  className={`flex items-center px-5 py-2.5 rounded-full text-sm font-bold shrink-0 transition-all duration-200 ${
                    isActive 
                      ? 'bg-slate-900 text-white shadow-md' 
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:border-[#00b4a9] hover:text-[#00b4a9]'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4 mr-2" />} {btn.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* DESTINATIONS GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        
        {/* Empty State / No Results */}
        {filteredDestinations.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 border-dashed">
            <Compass className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">No destinations found.</h3>
            <p className="text-slate-500 text-sm">Try adjusting your search or clearing the active filters.</p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveVibe('All Destinations'); }}
              className="mt-6 bg-[#00b4a9] text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-[#009b91]"
            >
              Reset Filters
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((dest) => (
            <Link 
              href={`/destinations/${dest.id}`} 
              key={dest.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 flex flex-col h-full animate-in fade-in zoom-in-95"
            >
              {/* Card Image Placeholder */}
              <div className="h-64 bg-slate-200 relative flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 w-full h-full bg-slate-800 flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-700">
                  <span className="text-white/60 text-lg font-bold mb-2 uppercase tracking-widest text-center px-4">
                    {dest.name} Card
                  </span>
                  <span className="text-white/40 font-mono text-[10px] tracking-widest bg-white/10 px-2 py-1 rounded">
                    800 x 600 px
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                
                <span className="absolute top-6 left-6 bg-[#00b4a9] text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider z-10 shadow-md">
                  {dest.tag}
                </span>
                
                <div className="absolute bottom-6 left-6 right-6 z-10 flex items-end justify-between">
                  <div>
                    <h2 className="text-2xl font-black text-white drop-shadow-md">{dest.name}</h2>
                    <p className="text-slate-300 text-xs font-medium flex items-center mt-1">
                      <MapPin className="w-3 h-3 mr-1" /> Core Hub
                    </p>
                  </div>
                </div>
              </div>

{/* Card Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-end mb-6 pt-2">
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Starting Price</span>
                    <span className="text-xl font-black text-[#009bd6]">{dest.price}</span>
                  </div>
                  
                  {/* INCLUSION ICONS (The circled area) */}
                  {dest.includes && (
                    <div className="flex space-x-1.5">
                      {dest.includes.includes('flight') && (
                        <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-[#00b4a9] hover:bg-teal-50 transition-colors" title="Flights Included">
                          <Plane className="w-3.5 h-3.5" />
                        </div>
                      )}
                      {dest.includes.includes('hotel') && (
                        <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-[#00b4a9] hover:bg-teal-50 transition-colors" title="Hotel Included">
                          <Bed className="w-3.5 h-3.5" />
                        </div>
                      )}
                      {dest.includes.includes('meals') && (
                        <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-[#00b4a9] hover:bg-teal-50 transition-colors" title="Meals Included">
                          <Utensils className="w-3.5 h-3.5" />
                        </div>
                      )}
                      {dest.includes.includes('transfer') && (
                        <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-[#00b4a9] hover:bg-teal-50 transition-colors" title="Transfers Included">
                          <Car className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="mt-auto border-t border-slate-100 pt-6">
                  <div className="flex items-center justify-center w-full bg-slate-50 group-hover:bg-[#0062b1] text-slate-600 group-hover:text-white py-3.5 rounded-xl font-bold transition-colors duration-300">
                    View Deals <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}