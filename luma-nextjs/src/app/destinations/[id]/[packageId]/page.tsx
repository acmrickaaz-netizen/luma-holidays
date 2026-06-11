import { notFound } from 'next/navigation';
import { DESTINATIONS, ITINERARY_MOCK } from '@/lib/data';
import InquireModal from '@/components/InquireModal';
import { ChevronRight, Clock, CheckCircle, MapPin } from 'lucide-react';
import Link from 'next/link';

export default async function PackageDetailsPage({ params }: { params: any }) {
  const resolvedParams = await params;
  const { id, packageId } = resolvedParams;

  const destination = DESTINATIONS.find(d => d.id === id.toLowerCase());
  if (!destination) notFound();

  const pkg = destination.packages.find(p => p.id === packageId.toLowerCase());
  if (!pkg) notFound();

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      
      {/* HERO SECTION */}
      <div className="relative h-[55vh] w-full bg-slate-900 flex flex-col justify-end pb-16">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-slate-800 flex flex-col items-center justify-center">
             <span className="text-white/20 font-bold text-2xl md:text-4xl tracking-widest uppercase mb-3 text-center px-4">
               {pkg.title} Hero
             </span>
             <span className="text-white/30 font-mono text-xl tracking-widest bg-white/5 px-4 py-1 rounded-md">
               1920 x 800 px
             </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-900/20"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <nav className="flex text-sm text-slate-300 mb-6 font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2 text-slate-500" />
            <Link href={`/destinations/${destination.id}`} className="hover:text-white transition-colors">{destination.name}</Link>
            <ChevronRight className="w-4 h-4 mx-2 text-slate-500" />
            <span className="text-[#00b4a9]">{pkg.title}</span>
          </nav>

          <span className="bg-[#00b4a9]/20 text-[#00b4a9] px-3 py-1 rounded-full font-bold text-xs uppercase tracking-wider mb-4 inline-block border border-[#00b4a9]/30">
            {pkg.tag}
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4 drop-shadow-lg">
            {pkg.title}
          </h1>
          <p className="text-xl text-slate-300 flex items-center">
            <MapPin className="w-5 h-5 mr-2" /> {destination.name} — Starting at {pkg.price}
          </p>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          
          <div className="lg:w-2/3">
            <h2 className="text-3xl font-black text-slate-800 mb-4">Package Overview</h2>
            <p className="text-slate-600 mb-12 text-lg leading-relaxed">{pkg.focus}. This itinerary is designed to give you the perfect balance of organized tours and free leisure time.</p>
            
            <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center">
              <Clock className="w-6 h-6 text-[#00b4a9] mr-3" /> Detailed Itinerary
            </h2>
            <div className="space-y-4 mb-12">
              {(destination.itinerary || ITINERARY_MOCK).map((item) => (
                <div key={item.day} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#e6f5fc] text-[#0062b1] flex items-center justify-center font-black text-sm shrink-0 mr-4 border border-[#b3e1f4]">
                      0{item.day}
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed ml-14">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SIDEBAR CTA */}
          <div className="lg:w-1/3">
            <div className="sticky top-28 bg-white rounded-3xl p-8 border border-slate-200 shadow-xl">
              <h3 className="text-2xl font-black text-slate-800 mb-2">Ready to Book?</h3>
              <p className="text-slate-500 text-sm mb-6">Lock in this pricing for your travel dates. Our Colombo agents respond within 30 minutes.</p>
              
              <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Package Estimate</p>
                <p className="text-3xl font-black text-[#009bd6]">{pkg.price}</p>
              </div>

              <InquireModal 
                destination={pkg.title}
                className="w-full flex items-center justify-center bg-[#00b4a9] text-white py-4 rounded-xl font-black shadow-lg hover:bg-[#009b91] transition-all"
                buttonText="Request Custom Quote"
              />
              
              <ul className="mt-6 space-y-3">
                <li className="flex items-start text-xs font-bold text-slate-600"><CheckCircle className="w-4 h-4 text-[#00b4a9] mr-2 shrink-0"/> E-Visa Assistance Included</li>
                <li className="flex items-start text-xs font-bold text-slate-600"><CheckCircle className="w-4 h-4 text-[#00b4a9] mr-2 shrink-0"/> 24/7 WhatsApp Support on trip</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}