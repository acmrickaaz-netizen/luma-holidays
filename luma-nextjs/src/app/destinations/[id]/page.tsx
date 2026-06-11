import { notFound } from 'next/navigation';
import { DESTINATIONS, ITINERARY_MOCK } from '@/lib/data';
import EnquiryForm from '@/components/EnquiryForm';
import { 
  PlaneTakeoff, 
  FileText, 
  Sun, 
  ChevronRight, 
  CheckCircle,
  MapPin,
  Clock,
  ChevronDown,
  Camera
} from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

// 1. TELL VERCEL WHICH PAGES TO BUILD 
export function generateStaticParams() {
  return DESTINATIONS.map((dest) => ({
    id: String(dest.id).toLowerCase(),
  }));
}

// 2. DYNAMIC SEO METADATA 
export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const resolvedParams = await params;
  const safeId = String(resolvedParams.id).toLowerCase();

  const destination = DESTINATIONS.find(d => String(d.id).toLowerCase() === safeId);
  if (!destination) return { title: 'Not Found' };

  return {
    title: `${destination.name} Tour Packages from Sri Lanka | Luma Holidays`,
    description: `Book your ${destination.name} holiday starting from ${destination.price}. Enjoy ${destination.tag} with flights and accommodation included.`,
  };
}

// 3. MAIN COMPONENT
export default async function DestinationLandingPage({ params }: { params: any }) {
  const resolvedParams = await params;
  const safeId = String(resolvedParams.id).toLowerCase();

  const destination = DESTINATIONS.find(d => String(d.id).toLowerCase() === safeId);

  if (!destination) {
    notFound(); 
  }

  // Generate dynamic sub-packages based on the destination name to fill the grid
  const subPackages = [
    {
      title: `${destination.name} Family Getaway`,
      focus: 'Theme Parks, Wildlife & Family Resorts',
      price: destination.price,
      tag: 'Bestseller'
    },
    {
      title: `${destination.name} City & Shopping Escapade`,
      focus: 'Premium Malls, City Tours & Fine Dining',
      price: 'Rs. 245,000',
      tag: 'Luxury'
    },
    {
      title: `${destination.name} Twin City Explorer`,
      focus: 'Multi-City Transit, Border Crossings & Extended Stay',
      price: 'Rs. 310,000',
      tag: 'Extended'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24 lg:pb-0">
      
      {/* 1. ABOVE THE FOLD: Hero Experience */}
      <div className="relative h-[65vh] w-full bg-slate-900 flex flex-col justify-end pb-16">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-slate-800 flex items-center justify-center">
             <span className="text-white/10 font-bold text-4xl tracking-widest uppercase">Cinematic Background</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-900/20"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* SEO Breadcrumb */}
          <nav className="flex text-sm text-slate-300 mb-6 font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2 text-slate-500" />
            <Link href="/destinations" className="hover:text-white transition-colors">Destinations</Link>
            <ChevronRight className="w-4 h-4 mx-2 text-slate-500" />
            <span className="text-[#00b4a9]">{destination.name}</span>
          </nav>

          <span className="bg-[#00b4a9]/20 text-[#00b4a9] px-3 py-1 rounded-full font-bold text-xs uppercase tracking-wider mb-4 inline-block border border-[#00b4a9]/30">
            {destination.tag}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-4 drop-shadow-lg">
            Discover {destination.name}: <br className="hidden md:block"/> The Ultimate Escape.
          </h1>
        </div>
      </div>

      {/* 2. LOGISTICS FACT BAR */}
      <div className="bg-white border-b border-slate-200 shadow-sm relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 py-6">
            <div className="flex items-center justify-center md:justify-start px-4 py-3 md:py-0">
              <PlaneTakeoff className="w-8 h-8 text-[#00b4a9] mr-4 opacity-80" />
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Flight Time</p>
                <p className="text-sm font-bold text-slate-800">Direct from Colombo (~4 Hrs)</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start px-4 py-3 md:py-0">
              <FileText className="w-8 h-8 text-[#009bd6] mr-4 opacity-80" />
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Visa Status</p>
                <p className="text-sm font-bold text-slate-800">E-Visa Handled by Luma</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start px-4 py-3 md:py-0">
              <Sun className="w-8 h-8 text-amber-500 mr-4 opacity-80" />
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Best Time</p>
                <p className="text-sm font-bold text-slate-800">Year-Round Tropical Climate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-12 relative">
          
          {/* Main Content Column */}
          <div className="lg:w-2/3 space-y-16">
            
            {/* 3. PACKAGE GRID (Conversion Zone) */}
            <section>
              <h2 className="text-3xl font-black text-slate-800 mb-2">Tailored {destination.name} Itineraries</h2>
              <p className="text-slate-500 text-sm mb-8">Select the foundation for your trip. Every package is fully customizable to your dates and preferences.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {subPackages.map((pkg, idx) => (
                  <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-200 group flex flex-col">
                    <div className="h-40 bg-slate-200 relative flex items-center justify-center overflow-hidden">
                       <span className="text-slate-400 font-bold text-sm uppercase tracking-widest">{pkg.title}</span>
                       <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                       <span className="absolute bottom-4 left-4 bg-[#00b4a9] text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
                         {pkg.tag}
                       </span>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold text-slate-800 leading-tight mb-2">{pkg.title}</h3>
                      <p className="text-xs text-slate-500 mb-6 flex-grow">{pkg.focus}</p>
                      
                      <div className="border-t border-slate-100 pt-4 mb-4">
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Starting From</span>
                        <span className="text-xl font-black text-[#009bd6]">{pkg.price}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 mt-auto">
                        <Link href="#enquiry-form" className="bg-[#0062b1] text-white text-center py-2.5 rounded-lg font-bold text-xs hover:bg-[#005091] transition-colors">
                          Inquire Now
                        </Link>
                        <a href="#itinerary-accordion" className="bg-slate-100 text-slate-600 text-center py-2.5 rounded-lg font-bold text-xs hover:bg-slate-200 transition-colors">
                          View Itinerary
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. INTERACTIVE ITINERARY ACCORDION */}
            <section id="itinerary-accordion" className="scroll-mt-32">
              <h2 className="text-3xl font-black text-slate-800 mb-8 flex items-center">
                <Clock className="w-8 h-8 text-[#00b4a9] mr-3" /> Sample Daily Flow
              </h2>
              <div className="space-y-4">
                {ITINERARY_MOCK.map((item) => (
                  <details key={item.day} className="group bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 transition-colors">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-[#e6f5fc] text-[#0062b1] flex items-center justify-center font-black text-sm shrink-0 mr-4 border border-[#b3e1f4]">
                          0{item.day}
                        </div>
                        <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>
                      </div>
                      <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform duration-300" />
                    </summary>
                    <div className="p-6 pt-0 text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-2">
                      <p className="mt-4">{item.desc}</p>
                      <ul className="mt-4 space-y-2">
                        <li className="flex items-start"><CheckCircle className="w-4 h-4 text-[#00b4a9] mr-2 mt-0.5 shrink-0"/> Breakfast included at the hotel.</li>
                        <li className="flex items-start"><CheckCircle className="w-4 h-4 text-[#00b4a9] mr-2 mt-0.5 shrink-0"/> Private air-conditioned transfers.</li>
                      </ul>
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* 6. CREATIVE-LED SOCIAL PROOF */}
            <section>
               <h2 className="text-3xl font-black text-slate-800 mb-2 flex items-center">
                <Camera className="w-8 h-8 text-[#009bd6] mr-3" /> Traveler Memories
              </h2>
              <p className="text-slate-500 text-sm mb-8">Authentic moments captured by our clients in {destination.name}.</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((img) => (
                  <div key={img} className="aspect-square bg-slate-200 rounded-2xl overflow-hidden relative group">
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-bold text-xs uppercase tracking-widest group-hover:scale-110 transition-transform duration-500">
                      Photo {img}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* 5. STICKY ENQUIRY ENGINE (Desktop) */}
          <div className="hidden lg:block lg:w-1/3">
            <div className="sticky top-28" id="enquiry-form">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 rounded-t-3xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-[#00b4a9] rounded-full opacity-20 blur-3xl"></div>
                <p className="text-xs text-teal-400 uppercase tracking-widest font-bold mb-1 relative z-10">Secure Your Spot</p>
                <h3 className="text-2xl font-black mb-2 relative z-10">Request a Quote</h3>
                <p className="text-slate-300 text-sm relative z-10">Our {destination.name} experts will get back to you within 24 hours.</p>
              </div>
              <div className="-mt-6 relative z-20">
                <EnquiryForm defaultDestination={destination.name} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. MOBILE STICKY CTA BUTTON (Shows only on small screens) */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-50">
        <Link 
          href="#enquiry-form" 
          className="w-full flex items-center justify-center bg-[#00b4a9] text-white py-4 rounded-xl font-black shadow-lg hover:bg-[#009b91] active:scale-95 transition-all"
        >
          Get a Quote for {destination.name}
        </Link>
      </div>

      {/* Hidden Anchor for Mobile Form Scroll */}
      <div className="lg:hidden block px-4 pb-24" id="enquiry-form">
         <div className="bg-slate-900 text-white p-6 rounded-t-2xl mt-12">
            <h3 className="text-xl font-black mb-1">Request a Quote</h3>
            <p className="text-slate-300 text-xs">Our {destination.name} experts are ready to help.</p>
          </div>
          <div className="-mt-4 relative z-10">
            <EnquiryForm defaultDestination={destination.name} />
          </div>
      </div>
      
    </div>
  );
}