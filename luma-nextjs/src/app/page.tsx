'use client';

import { useState } from 'react';
import InquireModal from '@/components/InquireModal';
import Link from 'next/link';
import { 
  ChevronRight, 
  MapPin, 
  Calendar, 
  FileText, 
  PhoneCall, 
  ShieldCheck, 
  Star, 
  ArrowRight,
  MessageCircle
} from 'lucide-react';

export default function Home() {
  const [quickForm, setQuickForm] = useState({
    destination: '',
    month: ''
  });

  const featuredPackages = [
    {
      id: 'th-pkg',
      title: '5-Day Bangkok & Pattaya Experience',
      tag: 'Bestseller',
      price: 'Rs. 185,000',
      highlights: 'Includes Flights, 4-Star Hotel, & Safari World Tour',
      imageText: 'Bangkok / Pattaya'
    },
    {
      id: 'dxb-pkg',
      title: '6-Day Premium Dubai Escape',
      tag: 'Luxury',
      price: 'Rs. 295,000',
      highlights: 'Flights, 5-Star Stay, Desert Safari & Burj Khalifa Tickets',
      imageText: 'Dubai Skyline'
    },
    {
      id: 'sg-my-pkg',
      title: '7-Day Singapore & Malaysia Twin Hub',
      tag: 'Family Favorite',
      price: 'Rs. 340,000',
      highlights: 'Cross-border Transfers, Universal Studios & City Tours',
      imageText: 'Singapore / KL'
    }
  ];

  const reviews = [
    {
      name: 'Nimal Silva',
      role: 'Family Trip to Malaysia',
      rating: 5,
      text: 'Amazing coordination! Luma Holidays handled our Malaysian visas seamlessly and the 24/7 WhatsApp support while we were in KL gave us massive peace of mind.'
    },
    {
      name: 'Priyanka Perera',
      role: 'Honeymoon in Thailand',
      rating: 5,
      text: 'Booked the Beach Tours package for Phuket. The 4-star resort selection was flawless. Will absolutely choose Web Orbit / Luma for our next getaway!'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* 1. THE GLOBAL HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-white/20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex flex-col cursor-pointer group">
            <div className="flex items-center space-x-1">
              <span className="font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#00b4a9] to-[#009bd6]">Luma</span>
              <span className="font-extrabold text-2xl tracking-tight text-slate-800">Holidays</span>
            </div>
            <span className="text-[9px] font-bold text-slate-400 tracking-widest uppercase ml-0.5 -mt-1 group-hover:text-[#009bd6] transition-colors">travel with love</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8 font-medium text-sm text-slate-600">
            <Link href="/destinations" className="hover:text-[#00b4a9] transition-colors">Destinations</Link>
            <Link href="/about" className="hover:text-[#00b4a9] transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-[#00b4a9] transition-colors">Contact</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link 
              href="https://wa.me/94771234567" 
              target="_blank"
              className="inline-flex items-center bg-[#25D366] text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-md hover:bg-[#20ba5a] transition-all"
            >
              <MessageCircle className="w-4 h-4 mr-2 fill-white" /> Get a Quote
            </Link>
          </div>
        </div>
      </header>

      {/* 2. THE HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-20 pb-24 overflow-hidden">
        {/* Placeholder: Hero Video/Image */}
        <div className="absolute inset-0 z-0 bg-slate-900 flex flex-col items-center justify-center">
          <span className="text-white/20 font-bold text-3xl md:text-5xl tracking-widest uppercase mb-4 text-center px-4 relative z-10">
            Home Page Hero Media
          </span>
          <span className="text-white/30 font-mono text-xl tracking-widest bg-white/5 px-4 py-1.5 rounded-md relative z-10">
            1920 x 1080 px
          </span>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-900/60 to-slate-50 z-20"></div>
        </div>

        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 text-center lg:text-left">
            <span className="bg-[#00b4a9]/20 text-[#00b4a9] px-4 py-1.5 rounded-full font-semibold text-xs uppercase tracking-wider mb-4 inline-block backdrop-blur-sm border border-[#00b4a9]/30">
              Premier Colombo Outbound Agency
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 drop-shadow-md">
              Seamless Escapes from <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00b4a9] to-[#009bd6]">Colombo</span> to the World.
            </h1>
            <p className="text-md sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Skip the visa headaches and logistically complex tracking. Let Luma Holidays orchestrate custom group, family, or solo trips flawlessly.
            </p>
          </div>

          <div className="lg:col-span-5 w-full max-w-md mx-auto">
            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/50 relative">
              <h3 className="text-xl font-bold text-slate-800 mb-1">Start Planning</h3>
              <p className="text-xs text-slate-500 mb-6">Takes less than 60 seconds to initiate your trip build.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Where to?</label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                    <select 
                      className="w-full pl-10 pr-4 py-3 bg-white/60 border border-slate-200 rounded-xl font-medium text-sm focus:outline-none focus:border-[#00b4a9] appearance-none"
                      value={quickForm.destination}
                      onChange={(e) => setQuickForm({...quickForm, destination: e.target.value})}
                    >
                      <option value="">Select Target Core Hub</option>
                      <option value="dubai">Dubai, UAE</option>
                      <option value="malaysia">Malaysia</option>
                      <option value="singapore">Singapore</option>
                      <option value="thailand">Thailand</option>
                      <option value="china">China</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Travel Month</label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                    <select 
                      className="w-full pl-10 pr-4 py-3 bg-white/60 border border-slate-200 rounded-xl font-medium text-sm focus:outline-none focus:border-[#00b4a9] appearance-none"
                      value={quickForm.month}
                      onChange={(e) => setQuickForm({...quickForm, month: e.target.value})}
                    >
                      <option value="">Select Preferred Timeline</option>
                      <option value="immediate">Next 1-2 Months</option>
                      <option value="mid">In 3-6 Months</option>
                      <option value="festive">Holiday Season / Later</option>
                    </select>
                  </div>
                </div>

                <Link 
                  href={`/contact?dest=${quickForm.destination}&month=${quickForm.month}`}
                  className="w-full inline-flex bg-gradient-to-r from-[#00b4a9] to-[#009bd6] text-white py-3.5 rounded-xl font-bold text-center items-center justify-center shadow-lg hover:brightness-105 transition-all mt-2"
                >
                  Start Planning Now <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DESTINATION & CATEGORY GRID */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800 mb-4">Explore Core Asian & Gulf Hubs</h2>
          <p className="text-slate-500 text-sm sm:text-base">We optimize specific routes natively out of Bandaranaike International Airport for streamlined transits and priority bookings.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[220px]">
          
          {/* Dubai */}
          <Link href="/destinations/dxb" className="md:col-span-8 md:row-span-2 group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 block bg-slate-900">
            <div className="w-full h-full bg-slate-800 flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-700 opacity-80">
              <span className="text-white/60 text-xl font-bold mb-2">Dubai Featured Grid</span>
              <span className="text-white/40 font-mono text-[11px] tracking-widest bg-white/5 px-2 py-1 rounded">800 x 800 px</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <span className="bg-[#009bd6] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">Gulf Elite</span>
              <h3 className="text-2xl font-black text-white">Dubai Hub Packages</h3>
            </div>
          </Link>

          {/* Malaysia */}
          <Link href="/destinations/my" className="md:col-span-4 group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 block bg-slate-900">
            <div className="w-full h-full bg-slate-800 flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-700 opacity-80">
              <span className="text-white/60 text-sm font-bold mb-1">Malaysia Grid</span>
              <span className="text-white/40 font-mono text-[10px] tracking-widest bg-white/5 px-2 py-0.5 rounded">600 x 400 px</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-lg font-bold text-white">Malaysia Explorer</h3>
            </div>
          </Link>

          {/* Singapore */}
          <Link href="/destinations/sg" className="md:col-span-4 group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 block bg-slate-900">
            <div className="w-full h-full bg-slate-800 flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-700 opacity-80">
              <span className="text-white/60 text-sm font-bold mb-1">Singapore Grid</span>
              <span className="text-white/40 font-mono text-[10px] tracking-widest bg-white/5 px-2 py-0.5 rounded">600 x 400 px</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-lg font-bold text-white">Singapore Modernity</h3>
            </div>
          </Link>

          {/* Highlighted Thematic Category */}
          <Link href="/destinations?cat=beach" className="md:col-span-6 group relative rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-teal-500/20 block bg-slate-900">
            <div className="w-full h-full bg-teal-900/40 flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-700 opacity-80">
              <span className="text-teal-400/80 text-sm font-bold mb-1">Beach Categories Grid</span>
              <span className="text-teal-400/50 font-mono text-[10px] tracking-widest bg-teal-900/30 px-2 py-0.5 rounded">800 x 400 px</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-teal-950 via-slate-950/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 w-full flex items-end justify-between">
              <div>
                <span className="text-[#00b4a9] text-xs font-bold tracking-wider uppercase block mb-1">Highly Trending</span>
                <h3 className="text-xl font-black text-white">Leisure Beach Categories</h3>
                <p className="text-xs text-slate-300 mt-1 max-w-xs">Perfect coastal escapes crafted inside Thailand and Malaysia resorts.</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center backdrop-blur-md group-hover:bg-[#00b4a9] group-hover:text-white transition-colors">
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>
          </Link>

          {/* Thailand */}
          <Link href="/destinations/th" className="md:col-span-3 group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 block bg-slate-900">
            <div className="w-full h-full bg-slate-800 flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-700 opacity-80">
              <span className="text-white/60 text-sm font-bold mb-1 text-center">Thailand Grid</span>
              <span className="text-white/40 font-mono text-[10px] tracking-widest bg-white/5 px-2 py-0.5 rounded">600 x 400 px</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-md font-bold text-white">Thailand Hub</h3>
            </div>
          </Link>

          {/* China */}
          <Link href="/destinations/cn" className="md:col-span-3 group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 block bg-slate-900">
            <div className="w-full h-full bg-slate-800 flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-700 opacity-80">
              <span className="text-white/60 text-sm font-bold mb-1 text-center">China Grid</span>
              <span className="text-white/40 font-mono text-[10px] tracking-widest bg-white/5 px-2 py-0.5 rounded">600 x 400 px</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-md font-bold text-white">China Logistics</h3>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. FEATURED TOUR PACKAGES */}
      <section className="py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <h2 className="text-3xl font-black text-slate-800 mb-2">Best-Converting Itineraries</h2>
              <p className="text-slate-500 text-sm">Top selections chosen continuously by outbound travelers from Colombo.</p>
            </div>
            <Link href="/destinations" className="text-sm font-bold text-[#0062b1] hover:text-[#005091] inline-flex items-center mt-4 md:mt-0 group">
              View All Tailored Packages <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPackages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-200/60 flex flex-col h-full group hover:shadow-xl transition-all">
                {/* Package Thumbnail Grid Overlay */}
                <div className="h-52 bg-slate-200 relative flex flex-col items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 w-full h-full bg-slate-800 flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    <span className="text-white/60 text-sm font-bold mb-2 uppercase tracking-widest text-center px-4">{pkg.imageText} Thumbnail</span>
                    <span className="text-white/40 font-mono text-[10px] tracking-widest bg-white/10 px-2 py-1 rounded">600 x 400 px</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                  <span className="absolute top-4 left-4 bg-slate-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider z-10">
                    {pkg.tag}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-extrabold text-slate-800 mb-2 leading-snug line-clamp-2">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-slate-500 mb-6 flex-grow">{pkg.highlights}</p>
                  
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <div>
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Starting Rate</span>
                      <span className="text-xl font-black text-[#00b4a9]">{pkg.price}</span>
                    </div>
<InquireModal 
  destination={pkg.title}
  className="bg-[#0062b1] text-white px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-[#005091] transition-colors shadow-sm"
/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. THE "WHY LUMA?" TRUST BLOCK */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-[40px] p-8 md:p-16 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 -mr-24 -mt-24 w-80 h-80 bg-[#009bd6] rounded-full opacity-10 blur-3xl"></div>
          
          <div className="max-w-3xl mb-16">
            <span className="text-[#00b4a9] text-xs font-bold tracking-widest uppercase block mb-2">Absolute Protection</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Why Hundreds of Families & Corporate Teams Trust Luma Holidays</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
            <div className="flex flex-col">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-[#00b4a9] mb-6">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Full Visa Assistance</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                We manage the massive heavy lifting required for Sri Lankan passport profiles to ensure high success ratios in Dubai, Thailand, or China.
              </p>
            </div>

            <div className="flex flex-col">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-[#009bd6] mb-6">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">24/7 Active WhatsApp Support</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                You never feel alone while abroad. Our central team remains fully available dynamically on messaging coordinates during flights, transfers, or hotel checks.
              </p>
            </div>

            <div className="flex flex-col">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-teal-400 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">End-to-End Logistics Expertise</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                From solo configurations to high-volume corporate transport clusters, everything is streamlined perfectly to matching expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SOCIAL PROOF */}
      <section className="py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-slate-800 mb-3">Real Stories from Verified Travelers</h2>
            <p className="text-slate-500 text-sm">Authentic user loops captured organically post-trip across Colombo channels.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((rev, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/50 flex flex-col">
                <div className="flex items-center space-x-1 text-amber-500 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm italic leading-relaxed mb-6 flex-grow">
                  "{rev.text}"
                </p>
                <div className="flex items-center space-x-3 pt-4 border-t border-slate-50">
                  <div className="w-10 h-10 rounded-full bg-[#009bd6] text-white font-bold flex items-center justify-center text-xs">
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800">{rev.name}</h4>
                    <span className="text-[11px] text-slate-400 font-medium block">{rev.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}