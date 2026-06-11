import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Metadata } from 'next';

// SEO trick: We don't want Google indexing our thank you page!
export const metadata: Metadata = {
  title: "Thank You | Luma Holidays",
  robots: { index: false, follow: false }
};

export default function ThankYou() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center bg-white p-12 rounded-3xl shadow-xl border border-slate-100 max-w-lg">
        <CheckCircle className="w-20 h-20 text-[#00b4a9] mx-auto mb-6" />
        <h1 className="text-4xl font-extrabold text-slate-800 mb-4">Thank You!</h1>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Your inquiry has been successfully submitted. One of our dedicated travel experts will review your request and get back to you via WhatsApp or Email within 24 hours.
        </p>
        <Link href="/" className="inline-block bg-[#0062b1] text-white px-8 py-3 rounded-full font-bold hover:bg-[#005091] transition-colors">
          Back to Home
        </Link>
      </div>
    </div>
  );
}