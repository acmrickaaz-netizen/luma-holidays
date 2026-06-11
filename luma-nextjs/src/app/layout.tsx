import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Luma Holidays | Premier Outbound Travel Agency in Sri Lanka",
  description:
    "Crafting unforgettable outbound journeys from Sri Lanka to the world's most exciting destinations like Malaysia, Singapore, and Dubai.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-slate-50 text-slate-900 flex flex-col min-h-screen`}
      >
        {/* Top Navigation Bar */}
        <Navigation />

        {/* Main Page Content */}
        <main className="flex-grow">{children}</main>

        {/* Global Footer */}
        <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Link
                href="/"
                className="flex flex-col mb-4 cursor-pointer group inline-block"
              >
                <div className="flex items-center space-x-1">
                  <span className="font-extrabold text-3xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#00b4a9] via-[#009bd6] to-[#009bd6]">
                    Luma
                  </span>
                  <span className="font-extrabold text-3xl tracking-tight text-white">
                    Holidays
                  </span>
                </div>

                <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase ml-1 -mt-1 group-hover:text-[#009bd6] transition-colors">
                  travel with love
                </span>
              </Link>

              <p className="text-sm leading-relaxed mb-6 max-w-sm">
                Crafting unforgettable outbound journeys from Sri Lanka to the
                world's most exciting destinations. Let us handle the details
                while you make the memories.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>

              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/"
                    className="hover:text-[#009bd6] transition-colors"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    href="/destinations"
                    className="hover:text-[#009bd6] transition-colors"
                  >
                    Destinations
                  </Link>
                </li>

                <li>
                  <Link
                    href="/contact"
                    className="hover:text-[#009bd6] transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Contact Info</h3>

              <ul className="space-y-3 text-sm">
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-[#00b4a9]" />
                  +94 77 123 4567
                </li>

                <li className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-[#00b4a9]" />
                  hello@lumaholidays.com
                </li>

                <li className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 mt-1 text-[#00b4a9] flex-shrink-0" />
                  123 Galle Road, Colombo 03, Sri Lanka
                </li>
              </ul>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-sm text-center text-slate-500">
            &copy; {new Date().getFullYear()} Luma Holidays. All rights
            reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}