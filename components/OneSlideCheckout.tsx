import React, { useState } from 'react';
import { 
  ArrowLeft, Check, CreditCard, MapPin, Truck, 
  ShieldCheck, Smartphone, User, Mail, Home, 
  ChevronRight, ShoppingBag, Gift, ArrowRight,
  Banknote, Info, Lock
} from 'lucide-react';
import { CartItem } from '../types';

interface OneSlideCheckoutProps {
  cart: CartItem[];
  onBack: () => void;
  onComplete: () => void;
}

export const OneSlideCheckout: React.FC<OneSlideCheckoutProps> = ({ cart, onBack, onComplete }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    saveInfo: true,
    note: ''
  });

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bkash' | 'nagad' | 'cod'>('bkash');

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shippingCost = shippingMethod === 'express' ? 120 : 60;
  const finalShippingCost = subtotal > 5000 ? 0 : shippingCost; 
  const tax = Math.round(subtotal * 0.05); // 5% Estimated Tax
  const total = subtotal + finalShippingCost + tax;

  const handleNext = () => {
    if (step < 3) setStep(prev => (prev + 1) as any);
    else handlePayment();
  };

  const handleBackStep = () => {
    if (step > 1) setStep(prev => (prev - 1) as any);
    else onBack();
  };

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate API Processing
    setTimeout(() => {
      setIsProcessing(false);
      onComplete();
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Helper Components
  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-10">
       {[
         { num: 1, label: 'Information' },
         { num: 2, label: 'Shipping' },
         { num: 3, label: 'Payment' }
       ].map((s, idx) => (
         <div key={s.num} className="flex items-center">
            <div className={`flex flex-col items-center gap-2 relative z-10 ${step >= s.num ? 'text-cyan-600 dark:text-cyan-400' : 'text-gray-400'}`}>
               <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${step >= s.num ? 'border-cyan-600 bg-cyan-600 text-white shadow-lg shadow-cyan-500/30' : 'border-gray-300 bg-gray-50 dark:bg-gray-800'}`}>
                  {step > s.num ? <Check className="w-5 h-5" /> : s.num}
               </div>
               <span className="text-xs font-bold uppercase tracking-wider hidden md:block">{s.label}</span>
            </div>
            {idx < 2 && (
               <div className={`w-12 md:w-24 h-0.5 mx-2 md:mx-4 -mt-6 transition-all duration-500 ${step > s.num ? 'bg-cyan-600' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
            )}
         </div>
       ))}
    </div>
  );

  const InputField = ({ label, name, type = 'text', placeholder, width = 'full', icon: Icon }: any) => (
    <div className={`${width === 'half' ? 'col-span-1' : 'col-span-2'} space-y-1.5`}>
      <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide ml-1">{label}</label>
      <div className="relative group">
        {Icon && <Icon className="absolute left-3 top-3 w-4 h-4 text-gray-400 group-focus-within:text-cyan-600 transition-colors" />}
        <input 
          type={type}
          name={name}
          value={(formData as any)[name]}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl py-3 ${Icon ? 'pl-10' : 'pl-4'} pr-4 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 transition-all text-gray-900 dark:text-white placeholder-gray-400`}
        />
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in min-h-screen bg-gray-50 dark:bg-black pb-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="py-6 flex items-center justify-between">
           <div className="flex items-center gap-2 text-xl font-black text-gray-900 dark:text-white tracking-tighter cursor-pointer" onClick={onBack}>
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">R</div>
              Checkout
           </div>
           <button onClick={onBack} className="text-sm font-bold text-gray-500 hover:text-cyan-600 flex items-center gap-1">
              <ShoppingBag className="w-4 h-4" /> Back to Cart
           </button>
        </div>

        <StepIndicator />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Forms */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Information */}
            {step === 1 && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-white/5 animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                   <h2 className="text-xl font-bold dark:text-white flex items-center gap-2">
                     <User className="w-5 h-5 text-cyan-600" /> Contact Information
                   </h2>
                   <div className="text-sm text-gray-500">
                      Already have an account? <span className="text-cyan-600 font-bold cursor-pointer hover:underline">Log in</span>
                   </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                   <InputField name="email" label="Email Address" type="email" placeholder="you@example.com" icon={Mail} />
                   <InputField name="phone" label="Phone Number" type="tel" placeholder="+880 1XXX XXXXXX" icon={Smartphone} />
                </div>

                <h2 className="text-xl font-bold dark:text-white flex items-center gap-2 mb-6">
                   <MapPin className="w-5 h-5 text-cyan-600" /> Shipping Address
                </h2>
                <div className="grid grid-cols-2 gap-4">
                   <InputField name="firstName" label="First Name" placeholder="Rahim" width="half" />
                   <InputField name="lastName" label="Last Name" placeholder="Ahmed" width="half" />
                   <InputField name="address" label="Address" placeholder="House 12, Road 5, Bashundhara R/A" icon={Home} />
                   <InputField name="city" label="City" placeholder="Dhaka" width="half" />
                   <InputField name="zip" label="Postal Code" placeholder="1229" width="half" />
                </div>
                
                <div className="mt-6 flex items-center gap-2">
                   <input 
                    type="checkbox" 
                    name="saveInfo"
                    checked={formData.saveInfo} 
                    onChange={handleInputChange}
                    id="saveInfo"
                    className="w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                   />
                   <label htmlFor="saveInfo" className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer">Save this information for next time</label>
                </div>
              </div>
            )}

            {/* Step 2: Shipping */}
            {step === 2 && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-white/5 animate-fade-in">
                 <h2 className="text-xl font-bold dark:text-white flex items-center gap-2 mb-6">
                     <Truck className="w-5 h-5 text-cyan-600" /> Shipping Method
                 </h2>
                 
                 <div className="space-y-4">
                    <label className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${shippingMethod === 'standard' ? 'border-cyan-600 bg-cyan-50 dark:bg-cyan-900/10 shadow-sm' : 'border-gray-200 dark:border-white/10 hover:border-cyan-300'}`}>
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                             <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${shippingMethod === 'standard' ? 'border-cyan-600' : 'border-gray-300'}`}>
                                {shippingMethod === 'standard' && <div className="w-2.5 h-2.5 bg-cyan-600 rounded-full" />}
                             </div>
                             <div>
                                <p className="font-bold text-gray-900 dark:text-white">Standard Delivery</p>
                                <p className="text-xs text-gray-500">3-5 Business Days</p>
                             </div>
                          </div>
                          <span className="font-bold text-gray-900 dark:text-white">{finalShippingCost === 0 && shippingMethod === 'standard' ? 'FREE' : '৳60'}</span>
                       </div>
                    </label>

                    <label className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${shippingMethod === 'express' ? 'border-cyan-600 bg-cyan-50 dark:bg-cyan-900/10 shadow-sm' : 'border-gray-200 dark:border-white/10 hover:border-cyan-300'}`}>
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                             <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${shippingMethod === 'express' ? 'border-cyan-600' : 'border-gray-300'}`}>
                                {shippingMethod === 'express' && <div className="w-2.5 h-2.5 bg-cyan-600 rounded-full" />}
                             </div>
                             <div>
                                <div className="flex items-center gap-2">
                                   <p className="font-bold text-gray-900 dark:text-white">Express Delivery</p>
                                   <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded-full">FAST</span>
                                </div>
                                <p className="text-xs text-gray-500">1-2 Business Days</p>
                             </div>
                          </div>
                          <span className="font-bold text-gray-900 dark:text-white">৳120</span>
                       </div>
                    </label>
                 </div>
                 
                 <div className="mt-8">
                     <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide ml-1">Delivery Notes (Optional)</label>
                     <textarea 
                        name="note"
                        value={formData.note}
                        onChange={handleInputChange}
                        placeholder="E.g., Leave at the reception..."
                        className="w-full mt-2 bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl p-3 text-sm outline-none focus:border-cyan-500 transition-all dark:text-white h-24 resize-none"
                     />
                 </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-white/5 animate-fade-in">
                 <h2 className="text-xl font-bold dark:text-white flex items-center gap-2 mb-6">
                     <CreditCard className="w-5 h-5 text-cyan-600" /> Payment Method
                 </h2>

                 <div className="grid grid-cols-2 gap-4 mb-6">
                    {(['bkash', 'nagad', 'card', 'cod'] as const).map((method) => (
                       <button
                         key={method}
                         onClick={() => setPaymentMethod(method)}
                         className={`relative py-4 px-3 rounded-xl border-2 font-bold text-sm flex flex-col items-center justify-center gap-2 transition-all group ${
                            paymentMethod === method 
                            ? 'border-cyan-600 bg-cyan-50 dark:bg-cyan-900/10 text-cyan-700 dark:text-cyan-400 shadow-sm' 
                            : 'border-gray-200 dark:border-white/10 text-gray-500 hover:border-gray-300 dark:hover:border-white/20'
                         }`}
                       >
                          {paymentMethod === method && (
                             <div className="absolute top-2 right-2 w-4 h-4 bg-cyan-600 rounded-full flex items-center justify-center">
                                <Check className="w-3 h-3 text-white" />
                             </div>
                          )}
                          
                          {method === 'bkash' && <span className="text-pink-600 text-lg">bKash</span>}
                          {method === 'nagad' && <span className="text-orange-600 text-lg">Nagad</span>}
                          {method === 'card' && <CreditCard className="w-6 h-6 mb-1" />}
                          {method === 'cod' && <Banknote className="w-6 h-6 mb-1" />}
                          <span className="uppercase text-[10px] tracking-wider">{method === 'cod' ? 'Cash On Delivery' : method}</span>
                       </button>
                    ))}
                 </div>

                 <div className="transition-all duration-300">
                    {paymentMethod === 'card' && (
                        <div className="p-6 bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-200 dark:border-white/5 animate-fade-in">
                        <div className="mb-4">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Card Number</label>
                            <input type="text" placeholder="0000 0000 0000 0000" className="w-full mt-1 bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg p-3 outline-none focus:border-cyan-500 transition-colors" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Expiry</label>
                                <input type="text" placeholder="MM/YY" className="w-full mt-1 bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg p-3 outline-none focus:border-cyan-500 transition-colors" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">CVC</label>
                                <input type="text" placeholder="123" className="w-full mt-1 bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg p-3 outline-none focus:border-cyan-500 transition-colors" />
                            </div>
                        </div>
                        </div>
                    )}

                    {paymentMethod === 'bkash' && (
                        <div className="p-6 bg-pink-50 dark:bg-pink-900/10 rounded-xl border border-pink-100 dark:border-pink-500/20 text-center animate-fade-in">
                        <p className="text-pink-700 dark:text-pink-400 font-bold mb-2">Pay with bKash</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">You will be redirected to the secure bKash gateway to complete your payment.</p>
                        </div>
                    )}

                    {paymentMethod === 'cod' && (
                        <div className="p-6 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 flex items-center gap-4 animate-fade-in">
                        <div className="p-3 bg-white dark:bg-black/20 rounded-full text-green-600">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 dark:text-white">Cash on Delivery</p>
                            <p className="text-sm text-gray-500">Pay in cash when you receive your order.</p>
                        </div>
                        </div>
                    )}
                 </div>
              </div>
            )}

            {/* Navigation Buttons (Desktop) */}
            <div className="hidden lg:flex items-center justify-between pt-4">
               <button 
                  onClick={handleBackStep}
                  className="text-gray-500 font-bold hover:text-gray-800 dark:hover:text-white transition-colors flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5"
               >
                  <ArrowLeft className="w-4 h-4" /> {step === 1 ? 'Return to Cart' : 'Back'}
               </button>
               <button 
                  onClick={handleNext}
                  disabled={isProcessing}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3.5 px-10 rounded-xl shadow-lg shadow-cyan-500/20 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
               >
                  {isProcessing ? 'Processing...' : step === 3 ? 'Pay & Place Order' : 'Continue'}
                  {!isProcessing && <ArrowRight className="w-4 h-4" />}
               </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Order Summary */}
          <div className="lg:col-span-5 space-y-6">
             <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg shadow-gray-200/50 dark:shadow-none border border-gray-200 dark:border-white/5 p-6 md:p-8 sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                   <ShoppingBag className="w-5 h-5 text-cyan-600" /> Order Summary
                </h3>
                
                {/* Items List */}
                <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                   {cart.map((item, idx) => (
                      <div key={idx} className="flex gap-4 group">
                         <div className="relative w-16 h-16 rounded-lg bg-gray-100 dark:bg-black/20 overflow-hidden flex-shrink-0 border border-gray-200 dark:border-white/5">
                            <img src={item.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                            <span className="absolute top-0 right-0 bg-gray-900 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-bl-lg">
                               {item.quantity}
                            </span>
                         </div>
                         <div className="flex-1 min-w-0 flex flex-col justify-center">
                            <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{item.name}</p>
                            <p className="text-xs text-gray-500 mt-0.5">
                               {item.selectedColor ? item.selectedColor : ''} {item.selectedSize ? `• ${item.selectedSize}` : ''}
                            </p>
                            <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">৳{item.price.toLocaleString()}</p>
                         </div>
                      </div>
                   ))}
                </div>

                {/* Promo Code */}
                <div className="flex gap-2 mb-8">
                   <div className="relative flex-1">
                      <Gift className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                      <input type="text" placeholder="Discount code" className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm outline-none focus:border-cyan-500 dark:text-white" />
                   </div>
                   <button className="bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-gray-300 font-bold text-sm px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-white/20 transition-colors">Apply</button>
                </div>

                {/* Totals Breakdown */}
                <div className="space-y-3 pt-6 border-t border-gray-100 dark:border-white/5 text-sm">
                   <div className="flex justify-between text-gray-500 dark:text-gray-400">
                      <span>Subtotal</span>
                      <span>৳{subtotal.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">Shipping <Info className="w-3 h-3" /></span>
                      <span>{step > 1 && finalShippingCost === 0 ? 'Free' : `৳${finalShippingCost}`}</span>
                   </div>
                   <div className="flex justify-between text-gray-500 dark:text-gray-400">
                      <span>Estimated Tax (5%)</span>
                      <span>৳{tax.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between items-end pt-4 border-t border-gray-100 dark:border-white/5 mt-4">
                      <span className="text-base font-bold text-gray-900 dark:text-white">Total</span>
                      <div className="text-right">
                         <span className="text-xs text-gray-400 block mb-0.5">BDT</span>
                         <span className="text-2xl font-black text-cyan-600">৳{total.toLocaleString()}</span>
                      </div>
                   </div>
                </div>

                {/* Secure Badge */}
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400 bg-gray-50 dark:bg-white/5 py-2 rounded-lg">
                   <Lock className="w-3 h-3" /> Payments are secure and encrypted
                </div>

                {/* Mobile Action Button */}
                <div className="mt-8 lg:hidden">
                    <button 
                      onClick={handleNext}
                      disabled={isProcessing}
                      className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
                    >
                        {isProcessing ? 'Processing...' : step === 3 ? 'Pay & Place Order' : 'Continue'}
                        {!isProcessing && <ArrowRight className="w-4 h-4" />}
                    </button>
                    <button onClick={handleBackStep} className="w-full mt-4 text-gray-500 font-bold text-sm py-2">
                       {step === 1 ? 'Return to Cart' : 'Back'}
                    </button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};