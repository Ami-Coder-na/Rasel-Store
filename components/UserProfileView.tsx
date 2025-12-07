
import React, { useState, useRef } from 'react';
import { 
  User, Package, Settings, Clock, LogOut, Camera, 
  MapPin, Mail, Phone, Shield, Edit2, ChevronRight, 
  CreditCard, CheckCircle, Clock3, XCircle, ShoppingBag, 
  Truck, Save, X, Box, ArrowRight, Star, Upload, ThumbsUp, Image as ImageIcon
} from 'lucide-react';
import { UserProfile, Order, ActivityLog, CartItem } from '../types';
import { MOCK_ORDERS, MOCK_ACTIVITY } from '../constants';

interface UserProfileViewProps {
  user: UserProfile;
  onLogout: () => void;
  onUpdateUser: (updatedUser: UserProfile) => void;
}

type TabType = 'dashboard' | 'orders' | 'settings' | 'activity';

// --- Tracking Components ---

interface TrackingStep {
  title: string;
  date: string;
  time: string;
  location: string;
  status: 'completed' | 'current' | 'pending';
  icon: any;
}

const TrackingModal: React.FC<{ order: Order; onClose: () => void }> = ({ order, onClose }) => {
  // Generate mock tracking steps based on order status
  const getSteps = (): TrackingStep[] => {
    const steps: TrackingStep[] = [
      { title: 'Order Placed', date: order.date, time: '10:30 AM', location: 'Online', status: 'completed', icon: ShoppingBag },
      { title: 'Payment Confirmed', date: order.date, time: '10:35 AM', location: 'System', status: 'completed', icon: CreditCard },
      { title: 'Packed & Ready', date: order.date, time: '04:00 PM', location: 'Warehouse A', status: 'completed', icon: Box },
    ];

    if (order.status === 'Processing') {
      steps.push({ title: 'Shipped', date: 'Estimated', time: '--:--', location: 'Dhaka Hub', status: 'current', icon: Truck });
      steps.push({ title: 'Delivered', date: 'Estimated', time: '--:--', location: 'Your Address', status: 'pending', icon: CheckCircle });
    } else if (order.status === 'Shipped') {
      steps[2].status = 'completed';
      steps.push({ title: 'Shipped', date: 'Yesterday', time: '09:00 AM', location: 'Dhaka Hub', status: 'completed', icon: Truck });
      steps.push({ title: 'In Transit', date: 'Today', time: '08:00 AM', location: 'Gulshan Branch', status: 'current', icon: MapPin });
      steps.push({ title: 'Delivered', date: 'Estimated Tomorrow', time: '--:--', location: 'Your Address', status: 'pending', icon: CheckCircle });
    } else if (order.status === 'Delivered') {
       steps.push({ title: 'Shipped', date: '2 days ago', time: '09:00 AM', location: 'Dhaka Hub', status: 'completed', icon: Truck });
       steps.push({ title: 'Out for Delivery', date: 'Yesterday', time: '08:00 AM', location: 'Local Courier', status: 'completed', icon: MapPin });
       steps.push({ title: 'Delivered', date: 'Yesterday', time: '02:15 PM', location: 'Your Address', status: 'completed', icon: CheckCircle });
    } else if (order.status === 'Cancelled') {
       steps.push({ title: 'Cancelled', date: 'Today', time: '11:00 AM', location: 'System', status: 'current', icon: XCircle });
    }

    return steps;
  };

  const steps = getSteps();

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-gray-50 dark:bg-white/5">
          <div>
            <h3 className="text-xl font-bold dark:text-white flex items-center gap-2">
               <Truck className="w-5 h-5 text-cyan-600" /> Track Order
            </h3>
            <p className="text-sm text-gray-500 mt-1">Order ID: <span className="font-mono text-cyan-600">{order.id}</span></p>
          </div>
          <button onClick={onClose} className="p-2 bg-white dark:bg-gray-800 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
           
           {/* Visual Map Placeholder */}
           <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-xl mb-8 relative overflow-hidden group">
              <img 
                 src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop" 
                 className="w-full h-full object-cover opacity-60 dark:opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="bg-white dark:bg-gray-900 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
                    <MapPin className="w-4 h-4 text-cyan-600" />
                    <span className="text-xs font-bold dark:text-white">
                       {order.status === 'Delivered' ? 'Delivered' : 'In Transit'}
                    </span>
                 </div>
              </div>
           </div>

           {/* Timeline */}
           <div className="relative pl-6 border-l-2 border-gray-100 dark:border-gray-800 space-y-8">
              {steps.map((step, idx) => (
                 <div key={idx} className={`relative pl-8 ${step.status === 'pending' ? 'opacity-50 grayscale' : 'opacity-100'}`}>
                    {/* Timeline Dot */}
                    <div className={`absolute -left-[35px] top-0 w-8 h-8 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center z-10 
                       ${step.status === 'completed' ? 'bg-cyan-600 text-white' : 
                         step.status === 'current' ? 'bg-orange-500 text-white animate-pulse' : 
                         'bg-gray-200 dark:bg-gray-800 text-gray-400'}`}
                    >
                       <step.icon className="w-4 h-4" />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                       <div>
                          <h4 className={`font-bold text-sm ${step.status === 'current' ? 'text-orange-500' : 'text-gray-900 dark:text-white'}`}>
                             {step.title}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{step.location}</p>
                       </div>
                       <div className="text-right">
                          <p className="text-xs font-bold text-gray-700 dark:text-gray-300">{step.date}</p>
                          <p className="text-[10px] text-gray-400">{step.time}</p>
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5">
           <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Courier: <span className="font-bold text-gray-700 dark:text-gray-300">Pathao Courier</span></span>
              <span>Tracking: <span className="font-mono text-gray-700 dark:text-gray-300">{order.trackingNumber || 'TRK-PENDING'}</span></span>
           </div>
        </div>

      </div>
    </div>
  );
};


// --- Review Modal Component ---

const ReviewModal: React.FC<{ order: Order; onClose: () => void }> = ({ order, onClose }) => {
   const [selectedItem, setSelectedItem] = useState<CartItem>(order.items[0]);
   const [rating, setRating] = useState(0);
   const [hoverRating, setHoverRating] = useState(0);
   const [reviewText, setReviewText] = useState('');
   const [images, setImages] = useState<string[]>([]);
   const [isSubmitted, setIsSubmitted] = useState(false);
   const [tags, setTags] = useState<string[]>([]);

   const fileInputRef = useRef<HTMLInputElement>(null);

   const REVIEW_TAGS = ["High Quality", "Value for Money", "Fast Delivery", "Good Packaging", "Stylish"];

   const handleTagToggle = (tag: string) => {
      setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
   };

   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
         const newImages = Array.from(e.target.files).map(file => URL.createObjectURL(file));
         setImages(prev => [...prev, ...newImages]);
      }
   };

   const handleSubmit = () => {
      setIsSubmitted(true);
      setTimeout(onClose, 2000);
   };

   if (isSubmitted) {
      return (
         <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
            <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-12 text-center animate-fade-in-up shadow-2xl">
               <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
               </div>
               <h3 className="text-2xl font-bold dark:text-white mb-2">Review Submitted!</h3>
               <p className="text-gray-500">Thank you for your feedback.</p>
            </div>
         </div>
      );
   }

   return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
         <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
         <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="p-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-gray-50 dark:bg-white/5">
               <div>
                  <h3 className="text-xl font-bold dark:text-white flex items-center gap-2">
                     <Star className="w-5 h-5 text-orange-500 fill-orange-500" /> Write a Review
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">Order <span className="font-mono">{order.id}</span></p>
               </div>
               <button onClick={onClose} className="p-2 bg-white dark:bg-gray-800 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                  <X className="w-5 h-5 text-gray-500" />
               </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8">
               {/* Item Selector */}
               <div className="mb-8">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Select Item to Review</p>
                  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                     {order.items.map((item, idx) => (
                        <div 
                           key={idx}
                           onClick={() => { setSelectedItem(item); setRating(0); }}
                           className={`relative flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all min-w-[200px] ${selectedItem.id === item.id ? 'border-cyan-600 bg-cyan-50 dark:bg-cyan-900/10 ring-2 ring-cyan-500/20' : 'border-gray-100 dark:border-white/10 hover:border-cyan-300'}`}
                        >
                           <img src={item.images[0]} className="w-10 h-10 rounded-md object-cover bg-gray-100" />
                           <div className="overflow-hidden">
                              <p className="text-xs font-bold dark:text-white truncate">{item.name}</p>
                              <p className="text-[10px] text-gray-500">Qty: {item.quantity}</p>
                           </div>
                           {selectedItem.id === item.id && (
                              <div className="absolute top-2 right-2 w-4 h-4 bg-cyan-600 rounded-full flex items-center justify-center">
                                 <CheckCircle className="w-3 h-3 text-white" />
                              </div>
                           )}
                        </div>
                     ))}
                  </div>
               </div>

               {/* Rating Stars */}
               <div className="mb-8 text-center">
                  <p className="text-lg font-bold dark:text-white mb-4">How would you rate it?</p>
                  <div className="flex justify-center gap-2">
                     {[1, 2, 3, 4, 5].map((star) => (
                        <button 
                           key={star}
                           onMouseEnter={() => setHoverRating(star)}
                           onMouseLeave={() => setHoverRating(0)}
                           onClick={() => setRating(star)}
                           className="transition-transform hover:scale-110 active:scale-95 p-1"
                        >
                           <Star 
                              className={`w-10 h-10 transition-colors ${
                                 star <= (hoverRating || rating) 
                                 ? 'text-orange-400 fill-orange-400 drop-shadow-md' 
                                 : 'text-gray-200 dark:text-gray-700'
                              }`} 
                           />
                        </button>
                     ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-2 h-5 font-medium">
                     {hoverRating === 5 ? "Excellent!" : hoverRating === 4 ? "Good" : hoverRating === 3 ? "Average" : hoverRating === 2 ? "Poor" : hoverRating === 1 ? "Terrible" : rating > 0 ? "Thanks!" : ""}
                  </p>
               </div>

               {/* Tags */}
               <div className="mb-6">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">What did you like?</p>
                  <div className="flex flex-wrap gap-2">
                     {REVIEW_TAGS.map(tag => (
                        <button 
                           key={tag}
                           onClick={() => handleTagToggle(tag)}
                           className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                              tags.includes(tag) 
                              ? 'bg-cyan-600 border-cyan-600 text-white' 
                              : 'border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-cyan-500'
                           }`}
                        >
                           {tag}
                        </button>
                     ))}
                  </div>
               </div>

               {/* Review Text */}
               <div className="mb-6">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">Your Review</label>
                  <textarea 
                     value={reviewText}
                     onChange={(e) => setReviewText(e.target.value)}
                     placeholder="Share your experience with this product..."
                     className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl p-4 text-sm focus:border-cyan-500 outline-none dark:text-white h-32 resize-none"
                  />
               </div>

               {/* Photo Upload */}
               <div className="mb-6">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">Add Photos</label>
                  <div className="flex gap-3 overflow-x-auto">
                     <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-20 h-20 flex-shrink-0 flex flex-col items-center justify-center gap-1 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl hover:border-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-900/10 transition-all text-gray-400 hover:text-cyan-600"
                     >
                        <ImageIcon className="w-5 h-5" />
                        <span className="text-[10px] font-bold">Add</span>
                     </button>
                     <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" multiple accept="image/*" />
                     
                     {images.map((img, idx) => (
                        <div key={idx} className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 group">
                           <img src={img} className="w-full h-full object-cover" />
                           <button 
                              onClick={() => setImages(prev => prev.filter((_, i) => i !== idx))}
                              className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                           >
                              <X className="w-3 h-3" />
                           </button>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 flex justify-end gap-3">
               <button onClick={onClose} className="px-6 py-2.5 rounded-xl font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                  Cancel
               </button>
               <button 
                  onClick={handleSubmit}
                  disabled={rating === 0}
                  className="px-8 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
               >
                  Submit Review
               </button>
            </div>

         </div>
      </div>
   );
};


// --- Main Component ---

export const UserProfileView: React.FC<UserProfileViewProps> = ({ user, onLogout, onUpdateUser }) => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [trackingOrder, setTrackingOrder] = useState<Order | null>(null);
  const [reviewingOrder, setReviewingOrder] = useState<Order | null>(null);
  
  // Edit State
  const [editForm, setEditForm] = useState(user);
  const [isSaving, setIsSaving] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newAvatar = reader.result as string;
        setEditForm(prev => ({ ...prev, avatar: newAvatar }));
        onUpdateUser({ ...user, avatar: newAvatar });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      onUpdateUser(editForm);
      setIsSaving(false);
      alert("Profile updated successfully!");
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Delivered': return 'text-green-500 bg-green-50 dark:bg-green-900/20';
      case 'Processing': return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'Cancelled': return 'text-red-500 bg-red-50 dark:bg-red-900/20';
      default: return 'text-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const TabButton = ({ id, icon: Icon, label }: { id: TabType, icon: any, label: string }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        activeTab === id 
          ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/30' 
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
      {activeTab === id && <ChevronRight className="w-4 h-4 ml-auto" />}
    </button>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 min-h-[80vh] animate-fade-in relative">
      
      {/* Tracking Modal Overlay */}
      {trackingOrder && (
         <TrackingModal order={trackingOrder} onClose={() => setTrackingOrder(null)} />
      )}

      {/* Review Modal Overlay */}
      {reviewingOrder && (
         <ReviewModal order={reviewingOrder} onClose={() => setReviewingOrder(null)} />
      )}

      {/* Sidebar */}
      <div className="w-full lg:w-1/4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-white/5 h-full">
          {/* User Brief */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-24 h-24 mb-4 group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <img 
                src={user.avatar || "https://via.placeholder.com/150"} 
                className="w-full h-full rounded-full object-cover border-4 border-gray-100 dark:border-gray-800 group-hover:border-cyan-500 transition-colors" 
              />
              <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                 <Camera className="w-6 h-6 text-white" />
              </div>
              <input type="file" ref={fileInputRef} onChange={handleAvatarUpload} className="hidden" accept="image/*" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <TabButton id="dashboard" icon={User} label="Overview" />
            <TabButton id="orders" icon={Package} label="My Orders" />
            <TabButton id="activity" icon={Clock} label="Activity Log" />
            <TabButton id="settings" icon={Settings} label="Settings" />
          </nav>

          <div className="mt-8 pt-8 border-t border-gray-100 dark:border-white/5">
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-white/5 min-h-full relative">
          
          {/* Dashboard View */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fade-in">
              <h2 className="text-2xl font-bold dark:text-white">Account Overview</h2>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-6 text-white shadow-lg shadow-cyan-500/20">
                  <div className="flex items-center gap-3 mb-2 opacity-80">
                    <ShoppingBag className="w-5 h-5" /> Total Spend
                  </div>
                  <div className="text-3xl font-bold">৳{MOCK_ORDERS.reduce((a,b) => a + b.total, 0).toLocaleString()}</div>
                </div>
                <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2 text-gray-500 dark:text-gray-400">
                    <Package className="w-5 h-5" /> Total Orders
                  </div>
                  <div className="text-3xl font-bold dark:text-white">{MOCK_ORDERS.length}</div>
                </div>
                <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2 text-gray-500 dark:text-gray-400">
                    <Clock3 className="w-5 h-5" /> Pending
                  </div>
                  <div className="text-3xl font-bold text-orange-500">{MOCK_ORDERS.filter(o => o.status === 'Processing').length}</div>
                </div>
              </div>

              {/* Recent Orders Preview */}
              <div>
                <div className="flex justify-between items-center mb-4">
                   <h3 className="font-bold text-lg dark:text-white">Recent Orders</h3>
                   <button onClick={() => setActiveTab('orders')} className="text-sm text-cyan-600 hover:underline">View All</button>
                </div>
                <div className="space-y-3">
                   {MOCK_ORDERS.slice(0, 2).map(order => (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-100 dark:border-white/5">
                         <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-full ${getStatusColor(order.status)}`}>
                               <Package className="w-5 h-5" />
                            </div>
                            <div>
                               <p className="font-bold text-sm dark:text-white">Order #{order.id}</p>
                               <p className="text-xs text-gray-500">{order.items.length} Items • ৳{order.total.toLocaleString()}</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-3">
                           <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(order.status)}`}>{order.status}</span>
                           <button onClick={() => setTrackingOrder(order)} className="p-2 text-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-full transition-colors" title="Track Order">
                              <Truck className="w-4 h-4" />
                           </button>
                         </div>
                      </div>
                   ))}
                </div>
              </div>
            </div>
          )}

          {/* Orders View */}
          {activeTab === 'orders' && (
            <div className="space-y-6 animate-fade-in">
               <h2 className="text-2xl font-bold dark:text-white">My Orders</h2>
               <div className="space-y-4">
                  {MOCK_ORDERS.map(order => (
                    <div key={order.id} className="bg-white dark:bg-black/20 border border-gray-200 dark:border-white/5 rounded-xl p-6 hover:shadow-md transition-shadow">
                       <div className="flex flex-wrap justify-between items-start gap-4 mb-4 pb-4 border-b border-gray-100 dark:border-white/5">
                          <div>
                             <p className="text-xs text-gray-500 uppercase font-bold">Order ID</p>
                             <p className="font-mono font-bold text-cyan-600">#{order.id}</p>
                          </div>
                          <div>
                             <p className="text-xs text-gray-500 uppercase font-bold">Date</p>
                             <p className="text-sm dark:text-gray-300">{order.date}</p>
                          </div>
                          <div>
                             <p className="text-xs text-gray-500 uppercase font-bold">Total</p>
                             <p className="font-bold dark:text-white">৳{order.total.toLocaleString()}</p>
                          </div>
                          <div>
                             <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>{order.status}</span>
                          </div>
                       </div>
                       
                       <div className="space-y-3">
                          {order.items.map((item, idx) => (
                             <div key={idx} className="flex items-center gap-4">
                                <img src={item.images[0]} className="w-12 h-12 rounded-md object-cover bg-gray-100" />
                                <div>
                                   <p className="text-sm font-medium dark:text-white line-clamp-1">{item.name}</p>
                                   <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                </div>
                             </div>
                          ))}
                       </div>

                       <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/5 flex justify-end gap-3">
                          <button 
                             onClick={() => setTrackingOrder(order)} 
                             className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-cyan-600 flex items-center gap-1 px-4 py-2 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors"
                          >
                             <Truck className="w-4 h-4" /> Track
                          </button>
                          <button 
                            onClick={() => setSelectedOrder(order)}
                            className="text-sm font-bold text-cyan-600 border border-cyan-600/30 px-4 py-2 rounded-lg hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-colors"
                          >
                             View Details
                          </button>
                          {order.status === 'Delivered' && (
                             <button 
                                onClick={() => setReviewingOrder(order)}
                                className="text-sm font-bold text-white bg-cyan-600 px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors flex items-center gap-2"
                             >
                                <Star className="w-3 h-3" /> Write Review
                             </button>
                          )}
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {/* Settings View */}
          {activeTab === 'settings' && (
             <div className="space-y-8 animate-fade-in max-w-2xl">
                <div>
                   <h2 className="text-2xl font-bold dark:text-white mb-6">Profile Settings</h2>
                   <form onSubmit={handleSaveProfile} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                         <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
                            <input 
                              type="text" 
                              value={editForm.name}
                              onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                              className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-sm focus:border-cyan-500 outline-none dark:text-white"
                            />
                         </div>
                         <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Phone</label>
                            <input 
                              type="text" 
                              value={editForm.phone || ''}
                              onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                              placeholder="+880..."
                              className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-sm focus:border-cyan-500 outline-none dark:text-white"
                            />
                         </div>
                      </div>
                      <div className="space-y-1">
                         <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                         <input 
                           type="email" 
                           value={editForm.email}
                           onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                           className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-sm focus:border-cyan-500 outline-none dark:text-white"
                         />
                      </div>
                      <div className="space-y-1">
                         <label className="text-xs font-bold text-gray-500 uppercase">Address</label>
                         <textarea 
                           value={editForm.address || ''}
                           onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                           className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-sm focus:border-cyan-500 outline-none dark:text-white h-24 resize-none"
                         />
                      </div>
                      
                      <div className="pt-4">
                         <button 
                           type="submit"
                           disabled={isSaving}
                           className="bg-cyan-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-cyan-700 transition-colors flex items-center gap-2"
                         >
                            {isSaving ? 'Saving...' : <><Save className="w-4 h-4" /> Save Changes</>}
                         </button>
                      </div>
                   </form>
                </div>

                <div className="border-t border-gray-100 dark:border-white/5 pt-8">
                   <h3 className="text-lg font-bold dark:text-white mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-gray-500" /> Security
                   </h3>
                   <div className="space-y-4">
                      <div className="space-y-1">
                         <label className="text-xs font-bold text-gray-500 uppercase">Current Password</label>
                         <input type="password" className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-sm focus:border-cyan-500 outline-none dark:text-white" />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                         <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">New Password</label>
                            <input type="password" className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-sm focus:border-cyan-500 outline-none dark:text-white" />
                         </div>
                         <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Confirm Password</label>
                            <input type="password" className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-sm focus:border-cyan-500 outline-none dark:text-white" />
                         </div>
                      </div>
                      <button className="text-sm font-bold text-cyan-600 border border-cyan-600/30 px-6 py-2 rounded-lg hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-colors">
                         Update Password
                      </button>
                   </div>
                </div>
             </div>
          )}

          {/* Activity View */}
          {activeTab === 'activity' && (
             <div className="space-y-6 animate-fade-in">
                <h2 className="text-2xl font-bold dark:text-white">Activity Log</h2>
                <div className="relative border-l-2 border-gray-200 dark:border-gray-700 ml-4 space-y-8">
                   {MOCK_ACTIVITY.map(log => (
                      <div key={log.id} className="relative pl-8">
                         <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-cyan-600 border-2 border-white dark:border-gray-900"></div>
                         <div>
                            <p className="font-bold text-gray-900 dark:text-white text-sm">{log.action}</p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{log.description}</p>
                            <span className="text-xs text-gray-400 mt-2 block">{log.timestamp}</span>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          )}

          {/* Order Detail Modal (Nested) */}
          {selectedOrder && (
             <div className="absolute inset-0 z-10 bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 animate-fade-in flex flex-col">
                <button 
                  onClick={() => setSelectedOrder(null)} 
                  className="mb-6 flex items-center gap-2 text-sm text-gray-500 hover:text-cyan-600"
                >
                   <ChevronRight className="w-4 h-4 rotate-180" /> Back to Orders
                </button>
                
                <div className="flex justify-between items-start mb-8">
                   <div>
                      <h2 className="text-2xl font-bold dark:text-white mb-1">Order Details</h2>
                      <p className="text-gray-500">#{selectedOrder.id}</p>
                   </div>
                   <div className="text-right">
                      <p className="font-bold text-cyan-600 text-lg">৳{selectedOrder.total.toLocaleString()}</p>
                      <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(selectedOrder.status)}`}>{selectedOrder.status}</span>
                   </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                   <div className="grid md:grid-cols-2 gap-8 mb-8">
                      <div className="p-4 bg-gray-50 dark:bg-black/20 rounded-xl">
                         <h4 className="font-bold mb-3 flex items-center gap-2 dark:text-white"><MapPin className="w-4 h-4 text-cyan-600" /> Delivery Address</h4>
                         <p className="text-sm text-gray-600 dark:text-gray-300">{user.address || 'Dhaka, Bangladesh'}</p>
                         <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{user.phone}</p>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-black/20 rounded-xl">
                         <h4 className="font-bold mb-3 flex items-center gap-2 dark:text-white"><CreditCard className="w-4 h-4 text-cyan-600" /> Payment Info</h4>
                         <p className="text-sm text-gray-600 dark:text-gray-300">Method: {selectedOrder.paymentMethod}</p>
                         <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Status: Paid</p>
                      </div>
                   </div>

                   <h4 className="font-bold mb-4 dark:text-white">Items</h4>
                   <div className="space-y-4">
                      {selectedOrder.items.map((item, idx) => (
                         <div key={idx} className="flex gap-4 border-b border-gray-100 dark:border-white/5 pb-4">
                            <img src={item.images[0]} className="w-16 h-16 rounded-lg object-cover bg-gray-100" />
                            <div className="flex-1">
                               <p className="font-bold text-sm dark:text-white">{item.name}</p>
                               <p className="text-xs text-gray-500">Color: {item.selectedColor || 'Default'} | Size: {item.selectedSize || 'Default'}</p>
                            </div>
                            <div className="text-right">
                               <p className="font-bold text-sm dark:text-white">৳{item.price.toLocaleString()}</p>
                               <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                            </div>
                         </div>
                      ))}
                   </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/5 flex justify-between items-center">
                   <button className="text-sm text-cyan-600 font-bold hover:underline">Download Invoice</button>
                   <div className="flex gap-3">
                      <button 
                         onClick={() => setTrackingOrder(selectedOrder)}
                         className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 px-6 py-2 rounded-lg font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                      >
                         <Truck className="w-4 h-4" /> Track Order
                      </button>
                      {selectedOrder.status === 'Delivered' && (
                         <button 
                            onClick={() => setReviewingOrder(selectedOrder)}
                            className="bg-cyan-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-cyan-700 flex items-center gap-2"
                         >
                            <Star className="w-4 h-4" /> Write Review
                         </button>
                      )}
                   </div>
                </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};
