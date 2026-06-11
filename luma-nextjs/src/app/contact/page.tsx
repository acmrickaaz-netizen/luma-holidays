import EnquiryForm from '@/components/EnquiryForm';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact Luma Holidays | Plan Your Custom Tour Today",
  description: "Get in touch with our travel experts in Colombo, Sri Lanka to plan your perfect outbound holiday.",
};

export default function Contact() {
  return (
    <div className="min-h-screen py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Contact Us</h1>
          <p className="text-lg text-slate-600">Have a custom trip in mind? Or just want to say hello? Drop us a message.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100">
          {/* Contact Details Side */}
          <div className="md:w-5/12 bg-slate-900 text-white p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#009bd6] rounded-full opacity-20 blur-3xl"></div>
            
            <h2 className="text-3xl font-bold mb-8 relative z-10">Get in touch</h2>
            <div className="space-y-8 relative z-10">
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-[#009bd6] mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg">Office Address</h4>
                  <p className="text-slate-400 mt-1">123 Galle Road,<br/>Colombo 03,<br/>Sri Lanka</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-[#00b4a9] mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg">Phone Number</h4>
                  <p className="text-slate-400 mt-1">+94 77 123 4567<br/>+94 11 234 5678</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-[#00b4a9] mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg">Email Address</h4>
                  <p className="text-slate-400 mt-1">hello@lumaholidays.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="md:w-7/12 p-8 md:p-12 bg-white flex items-center">
            <div className="w-full">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}