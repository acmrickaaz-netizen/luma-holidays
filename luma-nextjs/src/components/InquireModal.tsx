'use client';

import { useState, useEffect } from 'react';
import EnquiryForm from '@/components/EnquiryForm';
import { X } from 'lucide-react';

interface InquireModalProps {
  destination?: string;
  buttonText?: string;
  className?: string;
}

export default function InquireModal({ destination, buttonText = "Inquire Now", className }: InquireModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent background scrolling when the modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <>
      <button 
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }} 
        className={className}
      >
        {buttonText}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Dark blurred background */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          ></div>
          
          {/* White Modal Window */}
          <div className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsOpen(false)} 
              className="absolute top-6 right-6 z-50 w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
            
            {/* The Form Content */}
            <div className="max-h-[90vh] overflow-y-auto">
              <EnquiryForm destination={destination} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}