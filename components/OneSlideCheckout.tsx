import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, CreditCard, MapPin, Package, ShieldCheck } from 'lucide-react';
import { Product } from '../types';

interface OneSlideCheckoutProps {
  cart: Product[];
  onBack: () => void;
  onComplete: () => void;
}

export const OneSlideCheckout: React.FC<OneSlideCheckoutProps> = ({ cart, onBack, onComplete }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const handleNext = () => {
    if (step < 3) setStep(prev => (prev + 1) as any);
    else handlePayment();
  };

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      onComplete();
    }, 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto h-[80vh] flex flex-col md:flex-row gap-6 p-4">
      {/* Left: Summary (Sticky) */}
      <div className="w-full md:w-1/3 space-y-4">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Package className="text-cyan-400" /> Order Summary
          </h2>
          <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar">
            {cart.map((item, idx) => (
              <div key={idx} className="flex gap-3 items-center">
                <img src={item.images[0]} className="w-12 h-12 rounded-lg object-cover" alt={item.name} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-300 truncate">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.price.toLocaleString()} BDT</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="flex justify-between text-gray-400 mb-2">
              <span>Subtotal</span>
              <span>{total.toLocaleString()} BDT</span>
            </div>
            <div className="flex justify-between text-cyan-400 font-bold text-lg">
              <span>Total</span>
              <span>{total.toLocaleString()} BDT</span>
            </div>
          </div>
        </div>
        <button onClick={onBack} className="text-gray-400 hover:text-white text-sm w-full text-center">
          Back to Shopping
        </button>
      </div>

      {/* Right: Progressive Steps */}
      <div className="flex-1 bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl relative overflow-hidden flex flex-col">
        
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 h-1 bg-cyan-500 transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }}></div>

        <div className="flex-1 p-8 overflow-y-auto">
          {/* Step 1: Identity & Address */}
          <div className={`transition-opacity duration-500 ${step === 1 ? 'opacity-100 block' : 'opacity-30 hidden'}`}>
             <h3 className="text-2xl font-bold text-white mb-6">Where should we drop it?</h3>
             <div className="space-y-4">
               <div className="grid grid-cols-2 gap-4">
                 <input type="text" placeholder="First Name" className="bg-white/5 border border-white/10 p-3 rounded-lg text-white focus:border-cyan-500 outline-none" />
                 <input type="text" placeholder="Last Name" className="bg-white/5 border border-white/10 p-3 rounded-lg text-white focus:border-cyan-500 outline-none" />
               </div>
               <input type="text" placeholder="Phone Number (+880)" className="w-full bg-white/5 border border-white/10 p-3 rounded-lg text-white focus:border-cyan-500 outline-none" />
               <div className="relative">
                 <MapPin className="absolute left-3 top-3.5 text-gray-500 w-5 h-5" />
                 <input type="text" placeholder="Delivery Address (Dhaka, ...)" className="w-full bg-white/5 border border-white/10 p-3 pl-10 rounded-lg text-white focus:border-cyan-500 outline-none" />
               </div>
             </div>
          </div>

          {/* Step 2: Delivery Method */}
          <div className={`transition-opacity duration-500 ${step === 2 ? 'opacity-100 block' : 'opacity-30 hidden'}`}>
            <h3 className="text-2xl font-bold text-white mb-6">How fast do you need it?</h3>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 border border-cyan-500/50 bg-cyan-900/10 rounded-xl cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-cyan-500 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-white font-medium">Flash Delivery</p>
                    <p className="text-sm text-gray-400">Within 4 hours (Dhaka Only)</p>
                  </div>
                </div>
                <span className="text-cyan-400 font-bold">120 BDT</span>
              </label>
               <label className="flex items-center justify-between p-4 border border-white/10 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-500"></div>
                  <div>
                    <p className="text-white font-medium">Standard Delivery</p>
                    <p className="text-sm text-gray-400">2-3 Days</p>
                  </div>
                </div>
                <span className="text-gray-400 font-bold">60 BDT</span>
              </label>
            </div>
            
            <div className="mt-8 p-4 bg-green-900/20 border border-green-500/30 rounded-lg flex items-start gap-3">
               <ShieldCheck className="text-green-400 w-5 h-5 mt-0.5" />
               <div>
                 <p className="text-green-300 font-medium">Carbon Neutral Order</p>
                 <p className="text-green-400/60 text-xs">We offset the carbon footprint of this delivery.</p>
               </div>
            </div>
          </div>

          {/* Step 3: Payment */}
          <div className={`transition-opacity duration-500 ${step === 3 ? 'opacity-100 block' : 'opacity-30 hidden'}`}>
            <h3 className="text-2xl font-bold text-white mb-6">Secure Payment</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button className="p-4 border border-pink-500/50 bg-pink-900/10 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-pink-900/20 transition-colors">
                <span className="font-bold text-pink-500 text-lg">bKash</span>
                <span className="text-xs text-pink-300">Instant</span>
              </button>
              <button className="p-4 border border-orange-500/50 bg-orange-900/10 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-orange-900/20 transition-colors">
                <span className="font-bold text-orange-500 text-lg">Nagad</span>
                <span className="text-xs text-orange-300">Instant</span>
              </button>
              <button className="p-4 border border-white/10 bg-white/5 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition-colors">
                <CreditCard className="text-white" />
                <span className="text-xs text-gray-300">Card</span>
              </button>
               <button className="p-4 border border-white/10 bg-white/5 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition-colors">
                <span className="text-white font-bold">COD</span>
                <span className="text-xs text-gray-300">Cash on Delivery</span>
              </button>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="p-6 border-t border-white/10 bg-black/40 backdrop-blur-md flex justify-end">
           <button 
            onClick={handleNext}
            disabled={isProcessing}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform disabled:opacity-50"
           >
             {isProcessing ? 'Processing...' : step === 3 ? 'Pay & Order' : 'Next Step'}
             {!isProcessing && step !== 3 && <ArrowRight className="w-5 h-5" />}
             {step === 3 && !isProcessing && <Check className="w-5 h-5" />}
           </button>
        </div>
      </div>
    </div>
  );
};
