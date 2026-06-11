"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X, PlaneTakeoff } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Contact Us', path: '/contact' }
  ];

  return (
    <nav className="fixed w-full z-50 top-0 transition-all duration-300 bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo with Brand Colors */}
<Link href="/" className="flex items-center cursor-pointer group transition-opacity hover:opacity-90">
  <Image 
    src="/logo.png" 
    alt="Luma Holidays Logo" 
    width={300} 
    height={75} 
    className="object-contain w-auto h-14 md:h-16" 
    priority 
  />
</Link>
          
          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 items-center">
            {links.map((link) => (
              <Link 
                key={link.path} 
                href={link.path}
                className={`text-sm font-semibold transition-colors ${pathname === link.path ? 'text-[#009bd6]' : 'text-slate-600 hover:text-[#00b4a9]'}`}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/contact"
              className="bg-gradient-to-r from-[#009bd6] to-[#0062b1] text-white px-6 py-2.5 rounded-full font-medium hover:from-[#00b4a9] hover:to-[#009bd6] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Inquire Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full pb-4 shadow-lg">
          <div className="px-4 pt-2 space-y-1">
            {links.map((link) => (
              <Link 
                key={link.path} 
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`block w-full text-left px-3 py-3 text-base font-medium rounded-md transition-colors ${pathname === link.path ? 'bg-[#e6f5fc] text-[#009bd6]' : 'text-slate-700 hover:bg-slate-50 hover:text-[#00b4a9]'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}