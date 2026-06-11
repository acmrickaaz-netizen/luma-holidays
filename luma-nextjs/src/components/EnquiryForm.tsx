'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Users, User, Mail, Phone, ArrowRight, Loader2, CheckCircle } from 'lucide-react';

export default function EnquiryForm({ destination = "your selected destination" }: { destination?: string }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    travelWindow: '',
    groupSize: '',
    fullName: '',
    email: '',
    whatsapp: ''
  });

  const travelWindows = ['Next 1-2 Months', 'In 3-6 Months', 'Later this year'];
  const groupSizes = ['Solo', 'Couple', 'Family (3-4)', 'Group (5+)'];

  const handleNext = () => {
    if (formData.travelWindow && formData.groupSize) {
      setStep(2);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API/Firebase call delay for realistic UX
    setTimeout(() => {
      // Redirect to thank you page, passing the user's name via URL
      router.push(`/thank-you?name=${encodeURIComponent(formData.fullName)}`);
    }, 1500);
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-6 md:p-8 border border-white/50 relative overflow-hidden transition-all duration-500">
      
      {/* Dynamic Header */}
      <div className="mb-8">
        <h3 className="text-2xl font-black text-slate-800 mb-1">Let's build your dream escape.</h3>
        <p className="text-sm font-medium text-slate-500">Customized itineraries for <span className="text-[#00b4a9] font-bold capitalize">{destination}</span>.</p>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center mb-8 space-x-2">
        <div className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${step >= 1 ? 'bg-[#00b4a9]' : 'bg-slate-200'}`}></div>
        <div className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${step >= 2 ? 'bg-[#00b4a9]' : 'bg-slate-200'}`}></div>
      </div>

      <form onSubmit={handleSubmit}>
        
        {/* STEP 1: THE VISION */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            {/* Travel Window Pills */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-[#00b4a9]" /> When are you planning to travel?
              </label>
              <div className="flex flex-wrap gap-2">
                {travelWindows.map((window) => (
                  <button
                    key={window}
                    type="button"
                    onClick={() => setFormData({ ...formData, travelWindow: window })}
                    className={`px-4 py-2.5 rounded-full text-sm font-bold transition-all duration-200 border ${
                      formData.travelWindow === window 
                        ? 'bg-[#00b4a9] text-white border-[#00b4a9] shadow-md' 
                        : 'bg-white/50 text-slate-600 border-slate-200 hover:border-[#00b4a9]/50'
                    }`}
                  >
                    {window}
                  </button>
                ))}
              </div>
            </div>

            {/* Group Size Pills */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center">
                <Users className="w-4 h-4 mr-2 text-[#00b4a9]" /> How many travelers?
              </label>
              <div className="flex flex-wrap gap-2">
                {groupSizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setFormData({ ...formData, groupSize: size })}
                    className={`px-4 py-2.5 rounded-full text-sm font-bold transition-all duration-200 border ${
                      formData.groupSize === size 
                        ? 'bg-[#00b4a9] text-white border-[#00b4a9] shadow-md' 
                        : 'bg-white/50 text-slate-600 border-slate-200 hover:border-[#00b4a9]/50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleNext}
              disabled={!formData.travelWindow || !formData.groupSize}
              className="w-full mt-6 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold transition-all flex items-center justify-center shadow-md hover:shadow-lg"
            >
              Continue to Details <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        )}

        {/* STEP 2: THE DETAILS */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="relative">
              <User className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400" />
              <input
                type="text"
                required
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full pl-11 pr-4 py-3.5 bg-white/60 border border-slate-200 rounded-xl font-medium text-sm focus:outline-none focus:border-[#00b4a9] focus:ring-1 focus:ring-[#00b4a9] transition-all"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400" />
              <input
                type="email"
                required
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-11 pr-4 py-3.5 bg-white/60 border border-slate-200 rounded-xl font-medium text-sm focus:outline-none focus:border-[#00b4a9] focus:ring-1 focus:ring-[#00b4a9] transition-all"
              />
            </div>

            <div>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400" />
                <input
                  type="tel"
                  required
                  placeholder="WhatsApp Number"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full pl-11 pr-4 py-3.5 bg-white/60 border border-slate-200 rounded-xl font-medium text-sm focus:outline-none focus:border-[#00b4a9] focus:ring-1 focus:ring-[#00b4a9] transition-all"
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-2 ml-1 flex items-center font-medium">
                <CheckCircle className="w-3 h-3 mr-1 text-teal-500" /> 
                No spam. We will only use this to send your custom PDF itinerary.
              </p>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-3.5 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#00b4a9] hover:bg-[#009b91] text-white py-3.5 rounded-xl font-bold transition-all flex items-center justify-center shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Securing your routes...
                  </>
                ) : (
                  'Submit Enquiry'
                )}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}