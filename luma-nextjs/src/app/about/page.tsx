import Link from 'next/link';
import { Globe, Users, ShieldCheck, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Luma Holidays | Premier Travel Agency in Colombo',
  description: 'We are a specialized outbound travel agency in Sri Lanka crafting seamless international experiences.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      {/* Hero Section */}
      <div className="relative py-24 bg-slate-900 flex flex-col items-center justify-center text-center px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900/90"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="text-[#00b4a9] text-xs font-bold tracking-widest uppercase mb-4 block">Our Story</span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Crafting Seamless Journeys <br/>from Colombo to the World.</h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            Luma Holidays was founded on a simple principle: outbound travel for Sri Lankans shouldn't be a logistical nightmare. We handle the visas, the flights, and the local coordination so you can focus on the memories.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-[#e6f5fc] text-[#009bd6] rounded-full flex items-center justify-center mb-6">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Absolute Trust</h3>
            <p className="text-slate-500 text-sm">We provide total transparency on pricing, visa success rates, and hotel quality. No hidden fees, ever.</p>
          </div>
          
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-teal-50 text-[#00b4a9] rounded-full flex items-center justify-center mb-6">
              <Globe className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Global Network</h3>
            <p className="text-slate-500 text-sm">Direct partnerships with destination management companies in Dubai, Malaysia, Thailand, and Singapore.</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center mb-6">
              <Users className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">24/7 Support</h3>
            <p className="text-slate-500 text-sm">Our Colombo team stays on call via WhatsApp while you travel, ensuring immediate assistance in any time zone.</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-4xl mx-auto text-center mt-24 px-4">
        <h2 className="text-3xl font-black text-slate-800 mb-6">Ready to plan your next escape?</h2>
        <Link href="/destinations" className="inline-flex items-center justify-center bg-[#00b4a9] text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-[#009b91] transition-all hover:-translate-y-0.5">
          Explore Our Destinations <ArrowRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
}