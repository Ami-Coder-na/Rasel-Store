import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Search, Menu, Sun, Moon, Zap, User, ArrowRight, Truck, ShieldCheck, Cpu, Mail, MapPin, Phone, Globe, Instagram, Facebook, Twitter, X, Clock, Coffee, Sparkles, Play, Star, Plus, Flame, TrendingUp, Gift } from 'lucide-react';
import { MOCK_PRODUCTS, SUGGESTED_QUERIES, APP_NAME, CATEGORIES } from './constants';
import { Product, CartItem, UserContext, ViewState } from './types';
import { Copilot } from './components/Copilot';
import { OneSlideCheckout } from './components/OneSlideCheckout';
import { Product3DViewer } from './components/Product3DViewer';

// --- Sub-Components ---

const FeatureCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors group cursor-default backdrop-blur-sm">
    <div className="w-12 h-12 bg-cyan-900/30 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(6,182,212,0.3)]">
      <Icon className="w-6 h-6 text-cyan-400" />
    </div>
    <h3 className="text-xl font-bold mb-2 text-white font-heading">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

const ProductCard: React.FC<{ 
  product: Product; 
  onClick: () => void; 
  onAddToCart: (e: React.MouseEvent) => void;
  isMorning: boolean;
}> = ({ 
  product, 
  onClick, 
  onAddToCart, 
  isMorning 
}) => (
  <div 
    className="group flex flex-col bg-white/5 border border-white/10 rounded-3xl overflow-hidden cursor-pointer hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:-translate-y-2 relative"
    onClick={onClick}
  >
    <div className="aspect-[4/5] overflow-hidden relative bg-gray-900">
      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      
      {/* Overlay Actions */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
        <button className="bg-black/60 backdrop-blur-md p-2 rounded-full text-white hover:bg-cyan-500 hover:text-white transition-colors">
          <Star className="w-4 h-4" />
        </button>
         {product.arEnabled && (
          <div className="bg-black/60 backdrop-blur-md p-2 rounded-full text-white hover:bg-cyan-500 hover:text-white transition-colors" title="AR View">
            <Zap className="w-4 h-4" />
          </div>
        )}
      </div>

      {product.stock < 10 && (
        <div className="absolute top-4 left-4 bg-red-500/80 text-white text-[10px] font-bold px-3 py-1 rounded-full backdrop-blur-sm">
          LOW STOCK
        </div>
      )}
    </div>

    <div className="p-5 flex-1 flex flex-col">
      <div className="mb-2">
         <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg leading-tight font-heading text-white line-clamp-1 group-hover:text-cyan-400 transition-colors">{product.name}</h3>
         </div>
         <p className="text-gray-400 text-xs mt-1 line-clamp-2">{product.description}</p>
      </div>

      <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/10">
        <div>
           <p className={`font-bold text-lg ${isMorning ? 'text-orange-400' : 'text-cyan-400'}`}>{product.price.toLocaleString()} BDT</p>
           <div className="flex text-yellow-400 text-[10px] gap-0.5 mt-1">
             {'★'.repeat(Math.floor(product.rating))}
             <span className="text-gray-600">{'★'.repeat(5 - Math.floor(product.rating))}</span>
             <span className="text-gray-500 ml-1">({product.reviews})</span>
           </div>
        </div>
        <button 
          onClick={onAddToCart}
          className={`
            p-3 rounded-xl flex items-center gap-2 font-bold text-xs uppercase tracking-wider transition-all shadow-lg
            ${isMorning 
              ? 'bg-orange-500 hover:bg-orange-400 text-white shadow-orange-500/20' 
              : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-500/20'
            }
            active:scale-95
          `}
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>
    </div>
  </div>
);

const Footer = ({ onNavigate }: { onNavigate: (view: ViewState) => void }) => (
  <footer className="bg-black border-t border-white/10 pt-16 pb-8 px-8 md:px-16 mt-auto">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
      <div className="space-y-4">
        <h2 className="text-2xl font-black tracking-widest text-white font-heading uppercase">{APP_NAME}</h2>
        <p className="text-gray-500 text-sm">Defining the future of adaptive commerce in Bangladesh.</p>
        <div className="flex gap-4">
           <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan-600 transition-colors cursor-pointer"><Facebook className="w-4 h-4 text-white" /></div>
           <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan-600 transition-colors cursor-pointer"><Instagram className="w-4 h-4 text-white" /></div>
           <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan-600 transition-colors cursor-pointer"><Twitter className="w-4 h-4 text-white" /></div>
        </div>
      </div>
      <div>
        <h3 className="font-bold text-white mb-6 font-heading">Explore</h3>
        <ul className="space-y-3 text-gray-400 text-sm">
          <li className="hover:text-cyan-400 cursor-pointer transition-colors" onClick={() => onNavigate(ViewState.PRODUCTS)}>New Arrivals</li>
          <li className="hover:text-cyan-400 cursor-pointer transition-colors" onClick={() => onNavigate(ViewState.PRODUCTS)}>Best Sellers</li>
          <li className="hover:text-cyan-400 cursor-pointer transition-colors" onClick={() => onNavigate(ViewState.PRODUCTS)}>AR Collection</li>
          <li className="hover:text-cyan-400 cursor-pointer transition-colors" onClick={() => onNavigate(ViewState.PRODUCTS)}>Gift Cards</li>
        </ul>
      </div>
      <div>
        <h3 className="font-bold text-white mb-6 font-heading">Company</h3>
        <ul className="space-y-3 text-gray-400 text-sm">
          <li className="hover:text-cyan-400 cursor-pointer transition-colors" onClick={() => onNavigate(ViewState.ABOUT)}>About Us</li>
          <li className="hover:text-cyan-400 cursor-pointer transition-colors">Careers</li>
          <li className="hover:text-cyan-400 cursor-pointer transition-colors">Sustainability</li>
          <li className="hover:text-cyan-400 cursor-pointer transition-colors" onClick={() => onNavigate(ViewState.CONTACT)}>Contact</li>
        </ul>
      </div>
      <div>
        <h3 className="font-bold text-white mb-6 font-heading">Stay in the Loop</h3>
        <p className="text-gray-500 text-sm mb-4">Subscribe for exclusive drops.</p>
        <div className="flex">
          <input type="email" placeholder="Email Address" className="bg-white/5 border border-white/10 rounded-l-lg px-4 py-2 text-sm text-white focus:outline-none w-full" />
          <button className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-r-lg font-bold text-sm transition-colors">JOIN</button>
        </div>
      </div>
    </div>
    <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
      <p>© 2024 {APP_NAME}. All rights reserved.</p>
      <div className="flex gap-6">
        <span className="cursor-pointer hover:text-gray-400">Privacy Policy</span>
        <span className="cursor-pointer hover:text-gray-400">Terms of Service</span>
      </div>
    </div>
  </footer>
);

// --- Main Application ---

const App = () => {
  // State
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [userContext, setUserContext] = useState<UserContext>({
    timeOfDay: 'afternoon',
    location: 'Dhaka',
    deviceType: 'desktop'
  });

  // Adaptivity Logic: Set theme based on time
  useEffect(() => {
    const checkTime = () => {
      const hours = new Date().getHours();
      let time: UserContext['timeOfDay'] = 'night';
      if (hours >= 5 && hours < 12) time = 'morning';
      else if (hours >= 12 && hours < 17) time = 'afternoon';
      else if (hours >= 17 && hours < 21) time = 'evening';
      setUserContext(prev => ({ ...prev, timeOfDay: time }));
    };
    
    checkTime();
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Scroll Listener for Parallax
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
    const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    setMousePos({ x, y });
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    // Optional: Show a toast here
  };

  const handleAddToCartClick = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation(); // Prevent opening product detail
    addToCart(product);
  };

  const handleCheckoutComplete = () => {
    setCart([]);
    setView(ViewState.HOME);
    alert("Order Placed Successfully! 🚀");
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setView(ViewState.PRODUCT_DETAIL);
  };

  const getBackgroundGradient = () => {
    switch (userContext.timeOfDay) {
      case 'morning': return 'from-slate-900 via-sky-900 to-slate-900';
      case 'afternoon': return 'from-gray-900 via-cyan-950 to-black';
      case 'evening': return 'from-indigo-950 via-purple-950 to-black';
      case 'night': return 'from-black via-gray-950 to-black';
    }
  };

  const isMorning = userContext.timeOfDay === 'morning';
  const isEvening = userContext.timeOfDay === 'evening' || userContext.timeOfDay === 'night';

  return (
    <div 
      className={`min-h-screen text-white font-sans flex flex-col bg-gradient-to-br ${getBackgroundGradient()} transition-colors duration-1000 overflow-x-hidden`}
      onMouseMove={view === ViewState.HOME ? handleMouseMove : undefined}
    >
      
      {/* Navigation Header */}
      <header className={`px-6 py-4 backdrop-blur-xl border-b border-white/5 bg-black/20 sticky top-0 z-50 transition-all duration-300 ${scrollY > 50 ? 'shadow-2xl bg-black/60' : ''}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
            <h1 
              className="text-2xl font-black tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 cursor-pointer font-heading uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] hover:drop-shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all" 
              onClick={() => setView(ViewState.HOME)}
            >
              {APP_NAME}
            </h1>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
             <button onClick={() => setView(ViewState.HOME)} className={`hover:text-white transition-all hover:scale-105 ${view === ViewState.HOME ? 'text-cyan-400 font-bold' : ''}`}>Home</button>
             <button onClick={() => setView(ViewState.PRODUCTS)} className={`hover:text-white transition-all hover:scale-105 ${view === ViewState.PRODUCTS ? 'text-cyan-400 font-bold' : ''}`}>Shop</button>
             <button onClick={() => setView(ViewState.ABOUT)} className={`hover:text-white transition-all hover:scale-105 ${view === ViewState.ABOUT ? 'text-cyan-400 font-bold' : ''}`}>About</button>
             <button onClick={() => setView(ViewState.CONTACT)} className={`hover:text-white transition-all hover:scale-105 ${view === ViewState.CONTACT ? 'text-cyan-400 font-bold' : ''}`}>Contact</button>
          </nav>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 border border-white/10 w-64 focus-within:border-cyan-500/50 transition-colors">
              <Search className="w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="bg-transparent border-none outline-none text-sm w-full text-white placeholder-gray-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <button className="relative group" onClick={() => cart.length > 0 && setView(ViewState.CART_CHECKOUT)}>
              <div className="absolute -inset-2 bg-cyan-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <ShoppingBag className="w-6 h-6 hover:text-cyan-400 transition-colors relative z-10" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-bounce">
                  {cart.reduce((acc, i) => acc + i.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
           <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-6 shadow-2xl animate-fade-in z-50">
              <button onClick={() => { setView(ViewState.HOME); setMobileMenuOpen(false); }} className="text-left text-xl font-bold text-gray-300 hover:text-white border-b border-white/5 pb-2">Home</button>
              <button onClick={() => { setView(ViewState.PRODUCTS); setMobileMenuOpen(false); }} className="text-left text-xl font-bold text-gray-300 hover:text-white border-b border-white/5 pb-2">Products</button>
              <button onClick={() => { setView(ViewState.ABOUT); setMobileMenuOpen(false); }} className="text-left text-xl font-bold text-gray-300 hover:text-white border-b border-white/5 pb-2">About Us</button>
              <button onClick={() => { setView(ViewState.CONTACT); setMobileMenuOpen(false); }} className="text-left text-xl font-bold text-gray-300 hover:text-white pb-2">Contact</button>
           </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 w-full max-w-7xl mx-auto flex flex-col">
        
        {/* --- HOME VIEW (Adaptive Landing) --- */}
        {view === ViewState.HOME && (
          <div className="animate-fade-in">
            {/* Contextual Banner */}
            <div className={`w-full py-2 flex justify-center items-center gap-2 text-xs font-bold tracking-widest uppercase ${isMorning ? 'bg-orange-500/10 text-orange-300' : 'bg-purple-500/10 text-purple-300'}`}>
               {isMorning ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
               {isMorning ? "Morning Edition • Fresh Deals Loaded" : "Evening Mode • Relax & Shop"}
            </div>

            {/* Parallax Hero Section */}
            <section className="relative min-h-[90vh] flex items-center px-6 md:px-16 overflow-hidden">
               
               {/* Fixed Background with Parallax */}
               <div className="absolute inset-0 z-0 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-75 ease-linear will-change-transform"
                    style={{ 
                      backgroundImage: `url(${isMorning ? 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070' : 'https://images.unsplash.com/photo-1515630278258-407f66498911?q=80&w=2098'})`,
                      transform: `translateY(${scrollY * 0.5}px) scale(1.1)`, // Parallax Movement
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10"></div>
                  
                  {/* Subtle video overlay for movement */}
                   <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen"
                  >
                     <source src="https://cdn.pixabay.com/video/2020/05/25/40156-424930030_large.mp4" type="video/mp4" />
                  </video>
               </div>

               {/* Hero Content */}
               <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10 pt-8 lg:pt-0">
                  <div className="space-y-8 animate-fade-in-up" style={{ transform: `translateY(${-scrollY * 0.2}px)` }}>
                     <div className={`inline-flex items-center gap-2 px-4 py-1.5 border backdrop-blur-md rounded-full text-xs font-bold tracking-wider ${
                       isMorning 
                         ? 'bg-orange-500/10 border-orange-500/30 text-orange-400' 
                         : 'bg-cyan-900/30 border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                     }`}>
                        <Sparkles className="w-3 h-3 animate-pulse" /> {isMorning ? "START YOUR DAY SMART" : "FUTURE READY GEAR"}
                     </div>
                     
                     <h1 className="text-5xl md:text-7xl font-black leading-none font-heading text-shadow-lg">
                        {isMorning ? (
                          <>
                            Wake Up <br/> to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 drop-shadow-[0_0_25px_rgba(251,146,60,0.6)]">Innovation.</span>
                          </>
                        ) : (
                          <>
                            Experience <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 drop-shadow-[0_0_35px_rgba(34,211,238,0.5)]">Adaptive</span> Reality.
                          </>
                        )}
                     </h1>
                     
                     <p className="text-gray-300 text-lg max-w-xl leading-relaxed font-light text-shadow-sm">
                       {isMorning 
                         ? "Get moving with our high-performance activewear and smart morning essentials. Delivery by noon available."
                         : "Lumina adapts to your world. From weather-responsive apparel to AR-enabled tech, discover gear that evolves with you."
                       }
                     </p>
                     
                     <div className="flex flex-wrap gap-4 pt-4">
                       <button 
                        onClick={() => setView(ViewState.PRODUCTS)} 
                        className={`
                          relative overflow-hidden group text-black font-bold py-4 px-10 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] 
                          ${isMorning ? 'bg-white hover:bg-orange-50' : 'bg-white hover:bg-cyan-50'}
                          transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.5)]
                        `}
                       >
                         <span className="relative z-10 flex items-center gap-2">
                           {isMorning ? "Shop Fresh Deals" : "Shop Collection"}
                           <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                         </span>
                       </button>
                       <button onClick={() => setView(ViewState.ABOUT)} className="border border-white/30 backdrop-blur-md text-white font-bold py-4 px-10 rounded-full hover:bg-white/10 transition-colors flex items-center gap-2 hover:border-cyan-400/50">
                         Explore Rasel Store 
                       </button>
                     </div>
                  </div>
                  
                  {/* Hero Visual - Parallax */}
                  <div 
                    className="relative h-[450px] md:h-[650px] w-full hidden lg:block perspective-1000"
                    style={{
                      transform: `translateY(${scrollY * 0.1}px) perspective(1000px) rotateX(${mousePos.y * 2}deg) rotateY(${mousePos.x * 2}deg)`
                    }}
                  >
                     <div className={`absolute inset-0 bg-gradient-to-tr rounded-[3rem] blur-3xl animate-pulse-slow ${isMorning ? 'from-orange-500/20 to-pink-500/20' : 'from-cyan-500/20 to-purple-500/20'}`}></div>
                     
                     {/* Floating Cards Effect */}
                     <div className="relative w-full h-full transition-transform duration-100 ease-out">
                        <img 
                          src={isMorning ? "https://picsum.photos/id/103/800/800" : "https://picsum.photos/id/338/800/800"}
                          className="absolute inset-0 w-full h-full object-cover rounded-[3rem] shadow-2xl border border-white/10 opacity-90 animate-float z-10"
                          alt="Hero Visual"
                        />
                        
                        <div 
                          className="absolute top-20 -right-8 bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center gap-3 shadow-xl z-20 animate-float" 
                          style={{ animationDelay: '1s', transform: `translateZ(50px)` }}
                        >
                            <div className="bg-cyan-500/20 p-2 rounded-full"><Zap className="text-cyan-400 w-5 h-5 animate-pulse" /></div>
                            <div>
                              <p className="text-white text-sm font-bold">New Arrival</p>
                              <p className="text-xs text-gray-400">CyberWeave v2</p>
                            </div>
                        </div>

                        <div 
                          className="absolute bottom-20 -left-8 bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center gap-3 shadow-xl z-20 animate-float" 
                          style={{ animationDelay: '2s', transform: `translateZ(30px)` }}
                        >
                            <div className="bg-green-500/20 p-2 rounded-full"><ShieldCheck className="text-green-400 w-5 h-5" /></div>
                            <div>
                              <p className="text-white text-sm font-bold">Carbon Neutral</p>
                              <p className="text-xs text-gray-400">Verified</p>
                            </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>

            {/* Shop by Category Section */}
            <section className="px-6 md:px-16 py-20 bg-black relative z-10">
               <div className="flex items-end justify-between mb-12">
                  <h2 className="text-3xl md:text-4xl font-black text-white font-heading">Shop by Category</h2>
                  <button onClick={() => setView(ViewState.PRODUCTS)} className="text-cyan-400 font-bold text-sm hover:underline">View All</button>
               </div>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                 {CATEGORIES.map((cat) => (
                    <div 
                      key={cat.id} 
                      onClick={() => setView(ViewState.PRODUCTS)}
                      className={`relative overflow-hidden rounded-3xl h-48 cursor-pointer group border border-white/5 hover:border-white/20 transition-all`}
                    >
                       <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-20 group-hover:opacity-40 transition-opacity`}></div>
                       <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-10">
                          <h3 className="text-xl font-bold text-white mb-2">{cat.name}</h3>
                          <span className="w-8 h-1 bg-white/50 rounded-full group-hover:w-16 transition-all"></span>
                       </div>
                    </div>
                 ))}
               </div>
            </section>

            {/* Trending Products */}
            <section className="px-6 md:px-16 py-20 bg-gradient-to-b from-gray-900 to-black border-t border-white/5">
               <div className="flex items-center gap-3 mb-12">
                  <div className="p-3 bg-red-500/20 rounded-full"><Flame className="w-6 h-6 text-red-500" /></div>
                  <h2 className="text-3xl md:text-5xl font-black text-white font-heading">Trending Now</h2>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {MOCK_PRODUCTS.slice(0, 4).map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onClick={() => handleProductClick(product)}
                      onAddToCart={(e) => handleAddToCartClick(e, product)}
                      isMorning={isMorning}
                    />
                  ))}
               </div>
            </section>

            {/* Promotional Banner */}
            <section className="py-20 px-6">
               <div className="max-w-7xl mx-auto relative rounded-[3rem] overflow-hidden min-h-[400px] flex items-center bg-gradient-to-r from-purple-900 to-indigo-900">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/hexellence.png')] opacity-20"></div>
                  <img src="https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=2072" className="absolute right-0 top-0 w-1/2 h-full object-cover opacity-50 mix-blend-overlay hidden md:block" />
                  
                  <div className="relative z-10 p-12 md:p-24 max-w-2xl">
                     <span className="inline-block px-4 py-2 bg-yellow-400 text-black font-black uppercase tracking-widest text-xs rounded-full mb-6 animate-pulse">Limited Time Offer</span>
                     <h2 className="text-5xl md:text-7xl font-black text-white font-heading mb-6 leading-none">CYBER <br/>WEEK SALE</h2>
                     <p className="text-purple-200 text-xl mb-8 font-light">Get up to <span className="font-bold text-white">40% OFF</span> on all neural interfaces and smart wearables. The future is on sale.</p>
                     <div className="flex gap-4">
                        <button onClick={() => setView(ViewState.PRODUCTS)} className="bg-white text-purple-900 font-bold py-4 px-10 rounded-xl hover:scale-105 transition-transform shadow-xl">Shop Sale</button>
                        <div className="flex items-center gap-2 text-white/80 px-6 py-4 border border-white/20 rounded-xl">
                           <Clock className="w-5 h-5" /> 
                           <span className="font-mono">23:59:59</span>
                        </div>
                     </div>
                  </div>
               </div>
            </section>

            {/* Best Sellers */}
            <section className="px-6 md:px-16 py-20 bg-black">
               <div className="flex items-center gap-3 mb-12">
                  <div className="p-3 bg-yellow-500/20 rounded-full"><TrendingUp className="w-6 h-6 text-yellow-500" /></div>
                  <h2 className="text-3xl md:text-5xl font-black text-white font-heading">Best Sellers</h2>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {MOCK_PRODUCTS.slice(2, 6).map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onClick={() => handleProductClick(product)}
                      onAddToCart={(e) => handleAddToCartClick(e, product)}
                      isMorning={isMorning}
                    />
                  ))}
               </div>
            </section>

             {/* New Arrivals */}
            <section className="px-6 md:px-16 py-20 bg-gradient-to-t from-gray-900 to-black">
               <div className="flex items-center justify-between mb-12">
                  <div className="flex items-center gap-3">
                     <div className="p-3 bg-green-500/20 rounded-full"><Sparkles className="w-6 h-6 text-green-500" /></div>
                     <h2 className="text-3xl md:text-5xl font-black text-white font-heading">New Arrivals</h2>
                  </div>
                  <button onClick={() => setView(ViewState.PRODUCTS)} className="hidden md:flex items-center gap-2 border border-white/20 px-6 py-2 rounded-full hover:bg-white/10 transition-colors">See All <ArrowRight className="w-4 h-4"/></button>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[...MOCK_PRODUCTS].reverse().slice(0, 4).map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onClick={() => handleProductClick(product)}
                      onAddToCart={(e) => handleAddToCartClick(e, product)}
                      isMorning={isMorning}
                    />
                  ))}
               </div>
            </section>

             {/* Newsletter CTA */}
             <section className="px-6 md:px-16 py-20 pb-32">
                <div className="bg-gradient-to-r from-gray-900 to-black border border-white/10 rounded-[3rem] p-8 md:p-20 text-center relative overflow-hidden group">
                   <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 group-hover:opacity-20 transition-opacity duration-700"></div>
                   <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-30 ${isMorning ? 'bg-orange-500' : 'bg-cyan-500'}`}></div>
                   
                   <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                      <h2 className="text-4xl md:text-6xl font-black font-heading text-white tracking-tight drop-shadow-xl">Join the {APP_NAME} Community</h2>
                      <p className="text-gray-400 text-lg">Sign up for early access to limited drops, AR experiences, and exclusive deals.</p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                         <input type="email" placeholder="Enter your email" className="bg-white/5 border border-white/20 rounded-full px-8 py-5 text-white focus:border-cyan-500 outline-none w-full sm:w-96 backdrop-blur-sm" />
                         <button className={`text-black font-bold px-10 py-5 rounded-full hover:scale-105 transition-all shadow-lg ${isMorning ? 'bg-orange-400 hover:bg-orange-300' : 'bg-cyan-400 hover:bg-cyan-300'}`}>Subscribe</button>
                      </div>
                   </div>
                </div>
             </section>
          </div>
        )}

        {/* --- PRODUCTS VIEW --- */}
        {view === ViewState.PRODUCTS && (
          <div className="px-6 md:px-16 py-12 animate-fade-in min-h-screen">
            <div className="mb-16 text-center space-y-4">
               <h1 className="text-5xl md:text-7xl font-black font-heading tracking-tight text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">Catalog</h1>
               <p className="text-gray-400 max-w-2xl mx-auto text-lg">Explore our complete collection of adaptive wear and future-ready tech.</p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center mb-16">
               <button className="px-8 py-3 bg-white text-black rounded-full transition-all text-sm font-bold tracking-wide shadow-lg">All</button>
               {CATEGORIES.map(cat => (
                 <button key={cat.id} className="px-8 py-3 border border-white/10 bg-white/5 rounded-full hover:bg-white hover:text-black transition-all text-sm font-bold tracking-wide backdrop-blur-sm">
                   {cat.name}
                 </button>
               ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {MOCK_PRODUCTS.map((product) => (
                  <ProductCard 
                      key={product.id} 
                      product={product} 
                      onClick={() => handleProductClick(product)}
                      onAddToCart={(e) => handleAddToCartClick(e, product)}
                      isMorning={isMorning}
                    />
              ))}
            </div>
          </div>
        )}

        {/* --- ABOUT VIEW --- */}
        {view === ViewState.ABOUT && (
           <div className="animate-fade-in pb-20">
              <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                 <div className="absolute inset-0">
                    <img src="https://picsum.photos/id/20/1920/1080" className="w-full h-full object-cover opacity-40 scale-105 animate-pulse-slow" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black"></div>
                 </div>
                 <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <span className="text-cyan-400 font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Our Identity</span>
                    <h1 className="text-5xl md:text-8xl font-black mb-8 font-heading tracking-tight leading-none drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                      WE ARE <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">RASEL STORE</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
                       Architecting the intersection of culture, technology, and sustainability in Bangladesh.
                    </p>
                 </div>
              </div>

              <div className="px-6 md:px-16 py-20 max-w-6xl mx-auto space-y-32">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                       <h2 className="text-4xl font-bold font-heading text-white">The Mission</h2>
                       <div className="w-20 h-1 bg-cyan-500 rounded-full"></div>
                       <p className="text-gray-300 leading-loose text-lg">
                          {APP_NAME} wasn't born in a boardroom; it was forged in the bustling streets of Dhaka and the quiet hum of server rooms. We believe that shopping shouldn't just be a transaction—it should be an experience.
                       </p>
                       <p className="text-gray-300 leading-loose text-lg">
                          By leveraging <strong>Artificial Intelligence</strong> and <strong>Augmented Reality</strong>, we bridge the gap between digital convenience and physical assurance. We are building a future where technology serves humanity, not the other way around.
                       </p>
                    </div>
                    <div className="relative h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                       <img src="https://picsum.photos/id/60/800/600" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                       <div className="absolute bottom-8 left-8">
                          <p className="text-white font-bold text-xl">Dhaka HQ</p>
                          <p className="text-gray-400">Innovation Hub</p>
                       </div>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {[
                      { val: "100%", label: "Carbon Neutral", icon: ShieldCheck },
                      { val: "24/7", label: "AI Support", icon: Cpu },
                      { val: "50k+", label: "Happy Humans", icon: User }
                    ].map((stat, i) => (
                      <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors group">
                         <div className="w-16 h-16 bg-cyan-900/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <stat.icon className="w-8 h-8 text-cyan-400" />
                         </div>
                         <h3 className="text-5xl font-black text-white mb-2 font-heading">{stat.val}</h3>
                         <p className="text-gray-400 uppercase tracking-widest text-xs font-bold">{stat.label}</p>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        )}

        {/* --- CONTACT VIEW --- */}
        {view === ViewState.CONTACT && (
           <div className="px-6 md:px-16 py-20 animate-fade-in min-h-screen flex items-center">
              <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
                 <div>
                    <span className="text-cyan-400 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Support 24/7</span>
                    <h1 className="text-5xl md:text-6xl font-black mb-8 font-heading text-white">Get in Touch</h1>
                    <p className="text-gray-400 mb-12 text-lg leading-relaxed">
                       Have a question about an order, a product, or just want to talk tech? 
                       Our team (and bots) are ready to help.
                    </p>
                    
                    <div className="space-y-8">
                       {[
                         { icon: MapPin, title: "Headquarters", text: "Level 12, Future Tower\nGulshan Avenue, Dhaka-1212", color: "cyan" },
                         { icon: Mail, title: "Email Us", text: "hello@raselstore.bd\nsupport@raselstore.bd", color: "purple" },
                         { icon: Phone, title: "Call Us", text: "+880 1711 000000\n(10 AM - 8 PM)", color: "green" }
                       ].map((item, i) => (
                         <div key={i} className="flex items-start gap-6 group">
                            <div className={`p-4 bg-${item.color}-900/20 rounded-2xl border border-${item.color}-500/20 group-hover:bg-${item.color}-900/30 transition-colors`}>
                               <item.icon className={`text-${item.color}-400 w-6 h-6`} />
                            </div>
                            <div>
                               <h3 className="font-bold text-white mb-1 text-lg">{item.title}</h3>
                               <p className="text-gray-400 whitespace-pre-line leading-relaxed">{item.text}</p>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-[50px]"></div>
                    <form className="space-y-6 relative z-10" onSubmit={(e) => { e.preventDefault(); alert("Message Sent!"); }}>
                       <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                             <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">First Name</label>
                             <input type="text" className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500 outline-none transition-all focus:bg-black/60" placeholder="John" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Last Name</label>
                             <input type="text" className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500 outline-none transition-all focus:bg-black/60" placeholder="Doe" />
                          </div>
                       </div>
                       
                       <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                          <input type="email" className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500 outline-none transition-all focus:bg-black/60" placeholder="john@example.com" />
                       </div>

                       <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Message</label>
                          <textarea rows={4} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500 outline-none transition-all focus:bg-black/60" placeholder="How can we help you?"></textarea>
                       </div>

                       <button type="submit" className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-4 rounded-xl hover:scale-[1.02] transition-transform shadow-lg border border-white/10">
                          Send Message
                       </button>
                    </form>
                 </div>
              </div>
           </div>
        )}

        {/* --- PRODUCT DETAIL VIEW (Shared) --- */}
        {view === ViewState.PRODUCT_DETAIL && selectedProduct && (
          <div className="pb-24 animate-fade-in px-6 md:px-16 pt-8 min-h-screen">
            <button onClick={() => setView(ViewState.PRODUCTS)} className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors w-fit group">
               <ArrowRight className="rotate-180 w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Shop
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 min-h-[80vh]">
              {/* Left: Visuals */}
              <div className="flex flex-col justify-center">
                 <Product3DViewer image={selectedProduct.images[0]} />
                 <div className="mt-8 flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                    {selectedProduct.images.map((img, i) => (
                      <div key={i} className="relative group cursor-pointer">
                         <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-400 rounded-2xl transition-colors"></div>
                         <img src={img} className="w-24 h-24 rounded-2xl border border-white/10 object-cover" />
                      </div>
                    ))}
                 </div>
              </div>

              {/* Right: Story & Details */}
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                   <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-bold tracking-widest uppercase bg-cyan-900/20 border border-cyan-500/20 px-3 py-1.5 rounded-full w-fit">
                     <Zap className="w-3 h-3" /> Recommended for {userContext.timeOfDay}
                   </div>
                   {selectedProduct.stock < 10 && (
                      <span className="text-red-400 text-xs font-bold uppercase tracking-widest animate-pulse">Only {selectedProduct.stock} left</span>
                   )}
                </div>
                
                <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight font-heading text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">{selectedProduct.name}</h1>
                <p className="text-lg text-gray-300 mb-10 leading-relaxed font-light border-l-2 border-white/10 pl-6">{selectedProduct.description}</p>
                
                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-4 mb-10">
                  {Object.entries(selectedProduct.specs).map(([key, val]) => (
                    <div key={key} className="bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-colors">
                      <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-2">{key}</p>
                      <p className="font-mono text-white font-bold text-sm md:text-base">{val}</p>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-6">
                   <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex items-center justify-between backdrop-blur-sm">
                      <div>
                        <span className="text-4xl font-bold text-white">{selectedProduct.price.toLocaleString()} <span className="text-sm font-normal text-gray-500">BDT</span></span>
                        <p className="text-xs text-green-400 mt-2 flex items-center gap-1.5 font-bold uppercase tracking-wider"><Truck className="w-3 h-3" /> Free Express Shipping</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-yellow-400 text-sm mb-1 justify-end">
                           {'★'.repeat(5)} 
                        </div>
                        <p className="text-gray-400 text-xs">({selectedProduct.reviews} verified reviews)</p>
                      </div>
                   </div>
                   
                   <div className="flex gap-4">
                      <button 
                        onClick={() => addToCart(selectedProduct)}
                        className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-5 rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:scale-[1.02] transition-transform text-lg border-t border-white/20"
                      >
                        Add to Cart
                      </button>
                      <button className="px-8 border border-white/20 rounded-2xl hover:bg-white/5 transition-colors group">
                        <span className="sr-only">Like</span>
                        <span className="text-2xl group-hover:scale-110 block transition-transform">❤️</span>
                      </button>
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- CHECKOUT VIEW --- */}
        {view === ViewState.CART_CHECKOUT && (
          <div className="pt-8 pb-24 animate-fade-in px-4">
            <OneSlideCheckout 
              cart={cart} 
              onBack={() => setView(ViewState.PRODUCTS)} 
              onComplete={handleCheckoutComplete}
            />
          </div>
        )}

      </main>

      {/* Footer */}
      <Footer onNavigate={setView} />

      {/* Copilot Overlay (Persistent) */}
      <Copilot products={MOCK_PRODUCTS} cart={cart} />

    </div>
  );
};

export default App;