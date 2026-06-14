'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Plane, Tag, DollarSign, FileText, CheckCircle, PlusCircle, Loader2 } from 'lucide-react';

export default function AdminDashboard() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    destinationId: 'dxb',
    title: '',
    focus: '',
    price: '',
    tag: 'Bestseller'
  });

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowSuccess(false);

    try {
      // 1. Connect to Firestore and add the document to the "packages" collection
      await addDoc(collection(db, 'packages'), {
        destinationId: formData.destinationId,
        title: formData.title,
        focus: formData.focus,
        price: formData.price,
        tag: formData.tag,
        status: 'active',
        createdAt: new Date()
      });
      
      // 2. Show success state and clear the text inputs
      setShowSuccess(true);
      setFormData({ ...formData, title: '', focus: '', price: '' });
      
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
      
    } catch (error) {
      console.error("Error adding package: ", error);
      alert("Failed to publish package. Check console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Dashboard Header */}
        <div className="bg-slate-900 rounded-3xl p-8 text-white mb-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-[#00b4a9] rounded-full opacity-20 blur-3xl"></div>
          <h1 className="text-3xl font-black mb-2 relative z-10">Luma Command Center</h1>
          <p className="text-slate-400 text-sm relative z-10">Deploy new travel packages directly to the live database.</p>
        </div>

        {/* Add Package Form */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center mb-8 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center mr-4">
              <PlusCircle className="w-5 h-5 text-[#00b4a9]" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Create New Package</h2>
          </div>

          <form onSubmit={handlePublish} className="space-y-6">
            
            {/* Target Destination */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Target Hub</label>
              <div className="relative">
                <Plane className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <select 
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 focus:outline-none focus:border-[#00b4a9] focus:ring-1 focus:ring-[#00b4a9] appearance-none"
                  value={formData.destinationId}
                  onChange={(e) => setFormData({...formData, destinationId: e.target.value})}
                >
                  <option value="dxb">Dubai, UAE</option>
                  <option value="my">Malaysia</option>
                  <option value="sg">Singapore</option>
                  <option value="th">Thailand</option>
                  <option value="cn">China</option>
                  <option value="mv">Maldives</option>
                  <option value="vn">Vietnam</option>
                </select>
              </div>
            </div>

            {/* Package Title */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Package Title</label>
              <div className="relative">
                <FileText className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <input 
                  type="text"
                  required
                  placeholder="e.g. Dubai Family Getaway"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#00b4a9] focus:ring-1 focus:ring-[#00b4a9]"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>
            </div>

            {/* Package Focus / Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Key Highlights / Focus</label>
              <div className="relative">
                <FileText className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <input 
                  type="text"
                  required
                  placeholder="e.g. Theme Parks, Wildlife & Resorts"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#00b4a9] focus:ring-1 focus:ring-[#00b4a9]"
                  value={formData.focus}
                  onChange={(e) => setFormData({...formData, focus: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Starting Price</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Rs. 245,000"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#00b4a9] focus:ring-1 focus:ring-[#00b4a9]"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                  />
                </div>
              </div>

              {/* Tag */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Marketing Tag</label>
                <div className="relative">
                  <Tag className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                  <select 
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 focus:outline-none focus:border-[#00b4a9] focus:ring-1 focus:ring-[#00b4a9] appearance-none"
                    value={formData.tag}
                    onChange={(e) => setFormData({...formData, tag: e.target.value})}
                  >
                    <option value="Bestseller">Bestseller</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Extended">Extended</option>
                    <option value="Trending">Trending</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-slate-100 mt-8 flex items-center justify-between">
              {showSuccess ? (
                <div className="flex items-center text-[#00b4a9] font-bold text-sm animate-in fade-in slide-in-from-left-4 duration-300">
                  <CheckCircle className="w-5 h-5 mr-2" /> Live in Database!
                </div>
              ) : (
                <div></div> // Spacer
              )}
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-gradient-to-r from-[#00b4a9] to-[#009bd6] text-white px-8 py-3.5 rounded-xl font-black shadow-lg hover:brightness-110 transition-all flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Publishing...</>
                ) : (
                  'Deploy Package to Live Site'
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}