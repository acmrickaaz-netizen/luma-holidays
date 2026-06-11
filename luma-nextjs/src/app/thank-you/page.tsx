'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { CheckCircle, Home, MessageCircle } from 'lucide-react';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || 'Traveler';
  const firstName = name.split(' ')[0]; // Grab just the first name for a friendlier tone

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-lg w-full rounded-[40px] shadow-2xl p-10 md:p-14 text-center relative overflow-hidden border border-slate-100">
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-20 w-40 h-40 bg-[#00b4a9] rounded-full opacity-10 blur-3xl"></div>
        
        <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          <CheckCircle className="w-10 h-10" />
        </div>

        <h1 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">
          Thanks, {firstName}!
        </h1>
        
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-8 text-left">
          <p className="text-slate-600 leading-relaxed font-medium">
            Rickaaz from Luma Holidays is currently checking flight availability from Colombo based on your preferences.
          </p>
          <div className="flex items-center mt-4 text-[#00b4a9] font-bold text-sm bg-teal-50 px-4 py-3 rounded-xl">
            <MessageCircle className="w-5 h-5 mr-3 fill-current" />
            Expect your custom quote on WhatsApp within 30 minutes.
          </div>
        </div>

        <Link 
          href="/" 
          className="inline-flex items-center justify-center bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-md hover:shadow-lg w-full"
        >
          <Home className="w-4 h-4 mr-2" /> Return to Homepage
        </Link>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><div className="w-10 h-10 border-4 border-[#00b4a9] border-t-transparent rounded-full animate-spin"></div></div>}>
      <ThankYouContent />
    </Suspense>
  );
}