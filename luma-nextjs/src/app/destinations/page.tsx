import Link from 'next/link';
import { Compass, MapPin, ArrowRight, Sun, Building2, Palmtree } from 'lucide-react';
import { Metadata } from 'next';
import { DESTINATIONS } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Explore Destinations | Luma Holidays',
  description: 'Browse our curated outbound travel packages from Colombo to Dubai, Malaysia, Singapore, Thailand, and more.',
};

export default function DestinationsOverviewPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      
      {/* 1. HERO SECTION */}
      <div className="relative h-[50vh] min-h-[400px] w-full bg-slate-900 flex flex-col justify-end pb-16 overflow-hidden">
        {/* Hero Image Placeholder */}
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
          <span className="text-[#00b4a9] text-sm font-bold tracking-widest uppercase mb-4 flex items-center justify-center">
            <Compass className="w-5 h-5 mr-2" /> Your Next Chapter
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight drop-shadow-lg mb-4">
            Where to Next?
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Select your preferred core hub below. Every package is fully customizable to fit your exact travel dates and group size.
          </p>
        </div>
      </div>

      {/* 2. QUICK FILTERS / CATEGORY BAR */}
      <div className="bg-white border-b border-slate-200 shadow-sm relative z-30 sticky top-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto py-4 space-x-4 no-scrollbar items-center md:justify-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4 shrink-0">Filter by Vibe:</span>
            
            <button className="flex items-center px-5 py-2.5 bg-slate-900 text-white rounded-full text-sm font-bold shrink-0 transition-transform active:scale-95">
              All Destinations
            </button>
            <button className="flex items-center px-5 py-2.5 bg-slate-50 text-slate-600 border border-slate-200 hover:border-[#00b4a9] hover:text-[#00b4a9] rounded-full text-sm font-bold shrink-0 transition-all">
              <Building2 className="w-4 h-4 mr-2" /> City & Shopping
            </button>
            <button className="flex items-center px-5 py-2.5 bg-slate-50 text-slate-600 border border-slate-200 hover:border-[#00b4a9] hover:text-[#00b4a9] rounded-full text-sm font-bold shrink-0 transition-all">
              <Palmtree className="w-4 h-4 mr-2" /> Beach Tours
            </button>
            <button className="flex items-center px-5 py-2.5 bg-slate-50 text-slate-600 border border-slate-200 hover:border-[#00b4a9] hover:text-[#00b4a9] rounded-full text-sm font-bold shrink-0 transition-all">
              <Sun className="w-4 h-4 mr-2" /> Family & Theme Parks
            </button>
          </div>
        </div>
      </div>

      {/* 3. DESTINATIONS GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DESTINATIONS.map((dest) => (
            <Link 
              href={`/destinations/${dest.id}`} 
              key={dest.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 flex flex-col h-full"
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
                
                {/* Tag */}
                <span className="absolute top-6 left-6 bg-[#00b4a9] text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider z-10 shadow-md">
                  {dest.tag}
                </span>
                
                {/* Image Overlay Title */}
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
                <div className="flex justify-between items-center mb-6 pt-2">
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Starting Price</span>
                    <span className="text-xl font-black text-[#009bd6]">{dest.price}</span>
                  </div>
                </div>
                
                <div className="mt-auto border-t border-slate-100 pt-6">
                  <div className="flex items-center justify-center w-full bg-slate-50 group-hover:bg-[#0062b1] text-slate-600 group-hover:text-white py-3.5 rounded-xl font-bold transition-colors duration-300">
                    Explore Packages <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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