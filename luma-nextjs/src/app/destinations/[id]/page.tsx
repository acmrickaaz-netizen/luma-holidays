import { notFound } from 'next/navigation';
import { DESTINATIONS, ITINERARY_MOCK } from '@/lib/data';
import EnquiryForm from '@/components/EnquiryForm';
import { Calendar, PlaneTakeoff, MapPin, Users, CheckCircle, X, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

// 1. TELL VERCEL WHICH PAGES TO BUILD (Lowercase safety)
export function generateStaticParams() {
  return DESTINATIONS.map((dest) => ({
    id: String(dest.id).toLowerCase(),
  }));
}

// 2. DYNAMIC SEO METADATA (Async params safety)
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

// 3. MAIN COMPONENT (Async params + lowercase safety)
export default async function PackageDetail({ params }: { params: any }) {
  const resolvedParams = await params;
  const safeId = String(resolvedParams.id).toLowerCase();

  const destination = DESTINATIONS.find(d => String(d.id).toLowerCase() === safeId);

  if (!destination) {
    notFound(); 
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Header */}
      <div className="relative h-[400px] w-full bg-slate-800">
        <div className="w-full h-full bg-slate-300 flex items-center justify-center">
           <span className="text-slate-500 font-bold text-3xl tracking-widest">1920 x 1080</span>
        </div>

        <div className="absolute inset-0 bg-slate-900/50"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <Link href="/destinations" className="text-white/80 hover:text-white mb-4 text-sm font-medium flex items-center transition-colors inline-flex">
              <ChevronRight className="h-4 w-4 rotate-180 mr-1"/> Back to Destinations
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{destination.name} Explorer</h1>
            <p className="text-xl text-[#00b4a9] font-medium">{destination.tag}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Package Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="p-4 bg-slate-50 rounded-lg text-center border border-slate-100">
                  <Calendar className="h-6 w-6 mx-auto text-[#009bd6] mb-2"/>
                  <span className="block text-xs font-bold text-slate-800">Duration</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg text-center border border-slate-100">
                  <PlaneTakeoff className="h-6 w-6 mx-auto text-[#009bd6] mb-2"/>
                  <span className="block text-xs font-bold text-slate-800">Flights</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg text-center border border-slate-100">
                  <MapPin className="h-6 w-6 mx-auto text-[#009bd6] mb-2"/>
                  <span className="block text-xs font-bold text-slate-800">Location</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg text-center border border-slate-100">
                  <Users className="h-6 w-6 mx-auto text-[#009bd6] mb-2"/>
                  <span className="block text-xs font-bold text-slate-800">Group Size</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Daily Itinerary</h3>
              <div className="space-y-6">
                {ITINERARY_MOCK.map((item) => (
                  <div key={item.day} className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-8 h-8 rounded-full bg-[#e6f5fc] text-[#0062b1] flex items-center justify-center font-bold text-sm shrink-0">{item.day}</div>
                      {item.day !== ITINERARY_MOCK.length && <div className="w-0.5 h-full bg-[#b3e1f4] mt-2"></div>}
                    </div>
                    <div className="pb-4">
                      <h4 className="text-lg font-bold text-slate-800">Day {item.day}: {item.title}</h4>
                      <p className="text-slate-600 mt-1 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <div className="bg-slate-900 text-white p-6 rounded-t-2xl">
                <p className="text-sm text-slate-400 uppercase tracking-wider font-semibold">Starting Price</p>
                <p className="text-3xl font-bold text-[#00b4a9]">{destination.price}</p>
              </div>
              <div className="-mt-4 relative z-10">
                <EnquiryForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}