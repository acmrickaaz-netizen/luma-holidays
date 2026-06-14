import { notFound } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { DESTINATIONS, ITINERARY_MOCK } from '@/lib/data';
import Link from 'next/link';
import { ChevronRight, Clock, CheckCircle, Calendar, DollarSign, PlaneTakeoff } from 'lucide-react';
import InquireModal from '@/components/InquireModal';

export default async function PackageDetailPage({ params }: { params: any }) {
  const resolvedParams = await params;
  const safeDestId = String(resolvedParams.id).toLowerCase();
  const safePkgId = String(resolvedParams.packageId); // Firebase IDs are case-sensitive strings

  // 1. Try to fetch the specific package from Firebase
  let packageDetails: any = null;
  
  try {
    const docRef = doc(db, 'packages', safePkgId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      packageDetails = { id: docSnap.id, ...docSnap.data() };
    }
  } catch (error) {
    console.error("Error fetching package from Firebase:", error);
  }

  // 2. Fallback to static data if not found in Firebase (keeps old packages working)
  const staticDestination = DESTINATIONS.find(d => String(d.id).toLowerCase() === safeDestId);
  
  if (!packageDetails && staticDestination) {
    packageDetails = staticDestination.packages.find((p: any) => String(p.id) === safePkgId);
  }

  // 3. If it doesn't exist in Firebase OR static data, trigger 404
  if (!packageDetails) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      
      {/* Hero Section */}
      <div className="bg-slate-900 pt-28 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('/placeholder-bg.jpg')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent z-10"></div>
        
        <div className="max-w-4xl mx-auto relative z-20">
          <nav className="flex text-sm text-slate-400 mb-6 font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2 text-slate-600" />
            <Link href="/destinations" className="hover:text-white transition-colors">Destinations</Link>
            <ChevronRight className="w-4 h-4 mx-2 text-slate-600" />
            <Link href={`/destinations/${safeDestId}`} className="hover:text-white transition-colors capitalize">{safeDestId}</Link>
            <ChevronRight className="w-4 h-4 mx-2 text-slate-600" />
            <span className="text-[#00b4a9] truncate max-w-[200px]">{packageDetails.title}</span>
          </nav>

          <span className="bg-[#00b4a9]/20 text-[#00b4a9] px-3 py-1 rounded-full font-bold text-xs uppercase tracking-wider mb-4 inline-block border border-[#00b4a9]/30">
            {packageDetails.tag || 'Featured'}
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            {packageDetails.title}
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl">
            {packageDetails.focus}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-30">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex items-center space-x-6">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Starting Price</p>
              <p className="text-3xl font-black text-[#009bd6]">{packageDetails.price}</p>
            </div>
            <div className="h-12 w-px bg-slate-100 hidden md:block"></div>
            <div className="hidden md:block">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
              <p className="text-sm font-bold text-slate-800 flex items-center">
                <CheckCircle className="w-4 h-4 text-[#00b4a9] mr-1.5" /> Open for Booking
              </p>
            </div>
          </div>
          
          <InquireModal 
            destination={packageDetails.title}
            buttonText="Request this Itinerary"
            className="w-full md:w-auto bg-[#00b4a9] text-white px-8 py-4 rounded-xl font-black shadow-lg hover:bg-[#009b91] transition-all"
          />
        </div>

        {/* Itinerary Section */}
        <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center">
          <PlaneTakeoff className="w-6 h-6 text-[#00b4a9] mr-3" /> Sample Daily Itinerary
        </h2>
        
        <div className="space-y-4">
          {/* Note: In the future, you can save specific itineraries to the Firebase package doc. For now, it uses the global mock data to show the layout */}
          {ITINERARY_MOCK.map((item) => (
            <div key={item.day} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-teal-50 text-[#00b4a9] flex items-center justify-center font-black shrink-0 border border-teal-100 mb-2">
                  0{item.day}
                </div>
                <div className="w-px h-full bg-slate-100"></div>
              </div>
              <div className="pb-4">
                <h3 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}