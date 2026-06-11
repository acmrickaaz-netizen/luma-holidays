import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import EnquiryForm from '@/components/EnquiryForm';
import { DESTINATIONS } from '@/lib/data';

export default function Home() {
  const beachDest = DESTINATIONS.find((d) => d.id === 'mv');

  return (
    <div className="min-h-screen">
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-slate-300">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6">Discover the World</h1>
              <Link href="/destinations" className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold">
                Explore Packages
              </Link>
            </div>
            <div className="hidden lg:block">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}