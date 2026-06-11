'use client';
import { useState } from 'react';

export default function EnquiryForm() {
  const [error, setError] = useState('');

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
      <h3 className="text-2xl font-bold text-slate-800 mb-2">Plan Your Trip</h3>
      <p className="text-sm text-slate-500 mb-6">Our travel experts will contact you within 24 hours.</p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
          {error}
        </div>
      )}

      <form className="space-y-4">
        <input 
          type="text" 
          placeholder="Your Name" 
          className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00b4a9]"
        />
        <input 
          type="email" 
          placeholder="Email Address" 
          className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00b4a9]"
        />
        <button 
          type="submit" 
          className="w-full bg-[#00b4a9] text-white py-4 rounded-xl font-bold hover:bg-[#009b91] transition-colors"
        >
          Send Enquiry
        </button>
      </form>
    </div>
  );
}