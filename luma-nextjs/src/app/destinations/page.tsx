import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import EnquiryForm from '@/components/EnquiryForm';
import { DESTINATIONS } from '@/lib/data';

export default function Home() {
  const beachDest = DESTINATIONS.find((d) => d.id === 'mv');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* PLACEHOLDER: 1920 x 1080 */}
          <div className="w-full h-full bg-slate-300 flex items-center justify-center">
            <span className="text-slate-500 font-bold text-3xl tracking-widest">1920 x 1080</span>
          </div>
          <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg">
                Discover the World,<br/> One Trip at a Time.
              </h1>
              <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-2xl mx-auto lg:mx-0 drop-shadow-md">
                From the vibrant streets of Bangkok to the luxurious sands of Dubai. Let Luma Holidays craft your perfect getaway.
              </p>
              <Link href="/destinations" className="inline-flex bg-white text-[#0062b1] px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-100 transition-colors shadow-xl items-center justify-center">
                Explore Packages <ChevronRight className="ml-2 h-5 w-5"/>
              </Link>
            </div>
            <div className="hidden lg:block"><EnquiryForm /></div>
          </div>
        </div>
      </section>

      {/* Featured Beach Category */}
      {beachDest && (
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Trending Now: Beach Tours</h2>
            <Link href={`/destinations/${beachDest.id}`} className="block relative rounded-3xl overflow-hidden shadow-2xl group">
              <div className="relative h-[400px] w-full bg-slate-200 flex items-center justify-center">
                <span className="text-slate-400 font-bold text-2xl tracking-widest">1200 x 800</span>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 p-8 md:p-12 pointer-events-none">
                <span className="bg-[#00b4a9] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">Bestseller</span>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{beachDest.name} Premium Escapes</h3>
                <p className="text-slate-200 mb-6 max-w-xl">Starting from {beachDest.price}. Flights, transfers, and luxury accommodations included.</p>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-12">Popular Destinations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {DESTINATIONS.slice(0, 3).map((dest) => (
              <Link key={dest.id} href={`/destinations/${dest.id}`} className="group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 bg-white block">
                <div className="relative h-64 bg-slate-200 flex items-center justify-center">
                  <span className="text-slate-400 font-bold text-xl tracking-widest">800 x 600</span>
                </div>
                <div className="p-6">
                  <p className="text-[#00b4a9] text-sm font-semibold mb-1">{dest.tag}</p>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">{dest.name} Packages</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}