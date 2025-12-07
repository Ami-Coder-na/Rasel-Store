import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Search, Menu, Sun, Moon, Zap, User, ArrowRight, Truck, ShieldCheck, Cpu, Mail, MapPin, Phone, Globe, Instagram, Facebook, Twitter, X, Clock, Coffee, Sparkles, Play, Star, Plus, Flame, TrendingUp, Gift, Headphones, Lock, ChevronRight, ChevronLeft, Smartphone, Watch, Camera, Gamepad, Shirt, Home, Monitor, Wifi, Code, Activity, Wind, Anchor, Scale, Eye } from 'lucide-react';
import { MOCK_PRODUCTS, SUGGESTED_QUERIES, APP_NAME, CATEGORIES, SERVICE_FEATURES, BRANDS, ALL_CATEGORIES } from './constants';
import { Product, CartItem, UserContext, ViewState } from './types';
import { Copilot } from './components/Copilot';
import { OneSlideCheckout } from './components/OneSlideCheckout';
import { Product3DViewer } from './components/Product3DViewer';
import { CompareView } from './components/CompareView';
import { QuickViewModal } from './components/QuickViewModal';

// --- Layout Constants ---
const CONTAINER_CLASS = "max-w-[1400px] mx-auto px-4 lg:px-6";

// --- Sub-Components ---

const TopBar = () => (
  <div className="bg-gray-100 dark:bg-black/80 border-b border-gray-200 dark:border-white/5">
    <div className={`${CONTAINER_CLASS} py-1.5 flex justify-between items-center text-[10px] md:text-xs text-gray-600 dark:text-gray-400`}>
      <div className="flex items-center gap-4">
        <span className="hover:text-cyan-600 cursor-pointer transition-colors">Save More on App</span>
        <span className="hidden md:inline hover:text-cyan-600 cursor-pointer transition-colors">Sell on {APP_NAME}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="hover:text-cyan-600 cursor-pointer transition-colors">Customer Care</span>
        <span className="hover:text-cyan-600 cursor-pointer transition-colors">Track My Order</span>
        <span className="hover:text-cyan-600 cursor-pointer transition-colors text-cyan-600 font-bold">BN / EN</span>
      </div>
    </div>
  </div>
);

const CategorySidebar = () => (
  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-lg shadow-sm h-full py-2 overflow-y-auto hidden lg:block custom-scrollbar">
    {ALL_CATEGORIES.map((cat) => {
      // Map string icon name to component (simplified for demo)
      const IconMap: any = { Shirt, Smartphone, Monitor, Headphones, Camera, Gamepad, Home, Watch, Wind, Wifi, Code, Activity };
      const Icon = IconMap[cat.icon] || Sparkles;
      
      return (
        <div key={cat.id} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer group transition-colors">
          <Icon className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400" />
          <span className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400">{cat.name}</span>
          <ChevronRight className="w-3 h-3 ml-auto text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      );
    })}
  </div>
);

const Marquee = () => (
  <div className="bg-black text-white text-xs py-2 overflow-hidden relative">
    <div className="whitespace-nowrap animate-marquee flex gap-12">
      <span className="flex items-center gap-2">🔥 FLASH SALE: Up to 70% OFF on Neural Chips!</span>
      <span className="flex items-center gap-2">🚚 FREE DELIVERY all over Dhaka for orders > 2000 BDT</span>
      <span className="flex items-center gap-2">📢 New Outlet Opening in Bashundhara City!</span>
      <span className="flex items-center gap-2">💳 Get 10% Cashback with bKash payment.</span>
      <span className="flex items-center gap-2">🔥 FLASH SALE: Up to 70% OFF on Neural Chips!</span>
      <span className="flex items-center gap-2">🚚 FREE DELIVERY all over Dhaka for orders > 2000 BDT</span>
    </div>
  </div>
);

const FlashSaleCard: React.FC<{ 
  product: Product, 
  onClick: () => void, 
  onAdd: (e: any) => void,
  onCompare: (e: any) => void,
  onQuickView: (e: any) => void,
  isCompared: boolean 
}> = ({ product, onClick, onAdd, onCompare, onQuickView, isCompared }) => (
  <div onClick={onClick} className="min-w-[160px] md:min-w-[190px] bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg hover:shadow-lg transition-all cursor-pointer group flex flex-col h-full relative overflow-hidden">
    <div className="relative aspect-square p-2">
      <img src={product.images[0]} className="w-full h-full object-cover rounded-md group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute top-2 left-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm z-10">
        -25%
      </div>
      
      {/* Action Buttons Container */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-20 md:translate-y-12 group-hover:translate-y-0 transition-transform duration-300">
        {/* Quick View Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); onQuickView(e); }}
          className="bg-white text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 p-2 rounded-full shadow-lg transition-colors"
          title="Quick View"
        >
          <Eye className="w-4 h-4" />
        </button>
        {/* Compare Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); onCompare(e); }}
          className={`p-2 rounded-full shadow-lg transition-colors ${isCompared ? 'bg-cyan-600 text-white' : 'bg-white text-gray-700 hover:bg-cyan-50'}`}
          title="Compare"
        >
          <Scale className="w-4 h-4" />
        </button>
        {/* Add to Cart Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); onAdd(e); }}
          className="bg-orange-500 text-white p-2 rounded-full shadow-lg hover:bg-orange-600 transition-colors"
          title="Add to Cart"
        >
          <ShoppingBag className="w-4 h-4" />
        </button>
      </div>
    </div>
    <div className="p-3 flex flex-col flex-1">
      <h3 className="text-xs font-medium text-gray-800 dark:text-gray-200 line-clamp-2 mb-1 group-hover:text-orange-500 transition-colors h-8">{product.name}</h3>
      <div className="mt-auto">
        <div className="flex items-baseline gap-2">
          <span className="text-orange-600 dark:text-orange-400 font-bold text-sm">৳{product.price}</span>
          <span className="text-gray-400 text-[10px] line-through">৳{Math.round(product.price * 1.25)}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full mt-2 overflow-hidden">
          <div className="bg-orange-500 h-full w-[70%]"></div>
        </div>
        <p className="text-[9px] text-gray-500 mt-1">15 sold</p>
      </div>
    </div>
  </div>
);

const ProductCardMinimal: React.FC<{ 
  product: Product, 
  onClick: () => void, 
  onAdd?: (e: any) => void,
  onCompare?: (e: any) => void,
  onQuickView?: (e: any) => void,
  isCompared?: boolean 
}> = ({ product, onClick, onAdd, onCompare, onQuickView, isCompared }) => (
  <div onClick={onClick} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-lg hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-all cursor-pointer group flex flex-col overflow-hidden relative">
    <div className="relative aspect-square bg-gray-50 dark:bg-black/20 overflow-hidden">
      <img src={product.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      {product.arEnabled && (
         <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md p-1.5 rounded-full z-10">
            <Zap className="w-3 h-3 text-cyan-400" />
         </div>
      )}
      
      {/* Floating Actions */}
      <div className="absolute bottom-3 right-3 flex flex-col gap-2 z-20 md:translate-y-36 group-hover:translate-y-0 transition-transform duration-300">
         {/* Quick View */}
         <button 
           onClick={(e) => { e.stopPropagation(); onQuickView?.(e); }}
           className="bg-white text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 p-2.5 rounded-full shadow-lg flex items-center justify-center transition-colors"
           title="Quick View"
         >
           <Eye className="w-4 h-4" />
         </button>
         {/* Compare */}
         <button 
           onClick={(e) => { e.stopPropagation(); onCompare?.(e); }}
           className={`p-2.5 rounded-full shadow-lg flex items-center justify-center transition-colors ${isCompared ? 'bg-cyan-600 text-white' : 'bg-white text-gray-700 hover:bg-cyan-50'}`}
           title="Compare"
         >
           <Scale className="w-4 h-4" />
         </button>
         {/* Add to Cart */}
         <button 
           onClick={(e) => { e.stopPropagation(); onAdd?.(e); }}
           className="bg-orange-500 text-white p-2.5 rounded-full shadow-lg hover:bg-orange-600 flex items-center justify-center transition-colors"
           title="Add to Cart"
         >
           <ShoppingBag className="w-4 h-4" />
         </button>
      </div>

    </div>
    <div className="p-3">
      <h3 className="text-sm text-gray-700 dark:text-gray-200 line-clamp-2 h-10 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{product.name}</h3>
      <div className="mt-2 flex items-center justify-between">
         <span className="text-cyan-600 dark:text-cyan-400 font-bold text-base">৳{product.price.toLocaleString()}</span>
         <div className="flex items-center text-yellow-500 text-[10px]">
           <Star className="w-3 h-3 fill-current" />
           <span className="ml-0.5 text-gray-400">({product.reviews})</span>
         </div>
      </div>
    </div>
  </div>
);

// --- Main Components ---

const HERO_SLIDES = [
  { id: 1, img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070", title: "Eid Mega Sale", sub: "Up to 60% Off" },
  { id: 2, img: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=2070", title: "New Gadgets", sub: "Starting 500 BDT" },
  { id: 3, img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070", title: "Cyber Week", sub: "Free Delivery" },
];

const App = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('light');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play Slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const toggleCompare = (product: Product) => {
    setCompareList(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 4) {
        alert("You can compare up to 4 items at a time.");
        return prev;
      }
      return [...prev, product];
    });
  };

  const toggleTheme = () => setThemeMode(prev => prev === 'dark' ? 'light' : 'dark');

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setView(ViewState.PRODUCT_DETAIL);
  };

  return (
    <div className={themeMode}>
      <div className="min-h-screen bg-gray-50 dark:bg-black font-sans text-gray-900 dark:text-white transition-colors duration-300 relative pb-20">
        
        {/* Top Utility Bar */}
        <TopBar />

        {/* Sticky Header */}
        <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-white/5 transition-colors">
          <div className={`${CONTAINER_CLASS} py-4 flex items-center gap-4 lg:gap-8`}>
            
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView(ViewState.HOME)}>
               <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">R</div>
               <span className="text-xl md:text-2xl font-black font-heading tracking-tighter text-gray-800 dark:text-white">{APP_NAME}</span>
            </div>

            {/* Search Bar (Wide) - Centered using mx-auto */}
            <div className="flex-1 max-w-2xl hidden md:flex mx-auto">
              <div className="relative w-full">
                <input 
                  type="text" 
                  placeholder="Search in Rasel Store..." 
                  className="w-full bg-gray-100 dark:bg-white/10 border border-transparent focus:bg-white dark:focus:bg-black focus:border-cyan-500 rounded-lg pl-4 pr-12 py-2.5 text-sm outline-none transition-all dark:text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="absolute right-1 top-1 bg-cyan-600 hover:bg-cyan-700 text-white p-1.5 rounded-md transition-colors">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mobile Menu & Search Trigger */}
            <div className="flex md:hidden ml-auto gap-4">
               <Search className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 md:gap-6">
               <button onClick={toggleTheme} className="text-gray-500 dark:text-gray-400 hover:text-cyan-600">
                 {themeMode === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
               </button>
               
               <div className="flex items-center gap-2 cursor-pointer group">
                  <User className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-cyan-600" />
                  <div className="hidden lg:block">
                     <p className="text-[10px] text-gray-400">Welcome</p>
                     <p className="text-xs font-bold leading-none">Sign In / Register</p>
                  </div>
               </div>

               <div className="relative cursor-pointer" onClick={() => cart.length > 0 && setView(ViewState.CART_CHECKOUT)}>
                  <ShoppingBag className="w-6 h-6 text-gray-600 dark:text-gray-300 hover:text-cyan-600" />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                      {cart.reduce((a, b) => a + b.quantity, 0)}
                    </span>
                  )}
               </div>
            </div>
          </div>
        </header>

        <main className={`${CONTAINER_CLASS} py-4`}>
          
          {view === ViewState.HOME && (
            <>
              {/* SECTION: Hero Area (3-Column Layout) */}
              <div className="grid grid-cols-12 gap-4 h-auto lg:h-[380px] mb-6">
                 {/* 1. Sidebar Category (20%) */}
                 <div className="hidden lg:col-span-2 lg:block h-full">
                    <CategorySidebar />
                 </div>

                 {/* 2. Main Slider (60%) */}
                 <div className="col-span-12 lg:col-span-8 h-[200px] lg:h-full relative rounded-xl overflow-hidden shadow-sm group bg-gray-200 dark:bg-gray-800">
                    {HERO_SLIDES.map((slide, i) => (
                       <div key={slide.id} className={`absolute inset-0 transition-opacity duration-700 ${i === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                          <img src={slide.img} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center px-8 md:px-16">
                             <h2 className="text-3xl md:text-5xl font-black text-white font-heading mb-2 translate-y-4 opacity-0 transition-all duration-700 delay-300" style={{ transform: i === currentSlide ? 'translateY(0)' : 'translateY(20px)', opacity: i === currentSlide ? 1 : 0 }}>{slide.title}</h2>
                             <p className="text-cyan-400 text-lg md:text-xl font-bold mb-6 translate-y-4 opacity-0 transition-all duration-700 delay-500" style={{ transform: i === currentSlide ? 'translateY(0)' : 'translateY(20px)', opacity: i === currentSlide ? 1 : 0 }}>{slide.sub}</p>
                             <button className="bg-white text-gray-900 font-bold py-2 px-6 rounded-full w-fit hover:bg-cyan-500 hover:text-white transition-colors">Shop Now</button>
                          </div>
                       </div>
                    ))}
                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                       {HERO_SLIDES.map((_, i) => (
                          <button key={i} onClick={() => setCurrentSlide(i)} className={`w-2 h-2 rounded-full transition-all ${i === currentSlide ? 'bg-white w-6' : 'bg-white/50'}`} />
                       ))}
                    </div>
                 </div>

                 {/* 3. Right Promo Column (20%) */}
                 <div className="hidden lg:col-span-2 lg:flex flex-col gap-4 h-full">
                    <div className="flex-1 bg-cyan-50 dark:bg-cyan-900/10 rounded-lg p-4 flex flex-col justify-center items-center text-center border border-cyan-100 dark:border-cyan-500/20">
                       <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-800 rounded-full flex items-center justify-center mb-2">
                          <User className="w-6 h-6 text-cyan-600 dark:text-cyan-300" />
                       </div>
                       <p className="text-xs text-gray-500 dark:text-gray-400">Welcome to Rasel Store</p>
                       <div className="flex gap-2 mt-3 w-full">
                          <button className="flex-1 bg-cyan-600 text-white text-xs font-bold py-1.5 rounded-md hover:bg-cyan-700">Join</button>
                          <button className="flex-1 bg-white dark:bg-white/10 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/30 text-xs font-bold py-1.5 rounded-md hover:bg-gray-50">Sign In</button>
                       </div>
                    </div>
                    <div className="h-[45%] bg-orange-50 dark:bg-orange-900/10 rounded-lg overflow-hidden relative">
                       <img src="https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=800" className="w-full h-full object-cover opacity-80" />
                       <div className="absolute inset-0 p-4 flex flex-col justify-end">
                          <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm w-fit mb-1">NEW</span>
                          <p className="text-white font-bold leading-tight text-sm">Tech Week Deals</p>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Service Bar Strip */}
              <div className="mb-6">
                 <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-white/5 py-3 px-4 flex justify-around flex-wrap gap-4">
                    {SERVICE_FEATURES.map(f => (
                       <div key={f.id} className="flex items-center gap-2 group cursor-pointer">
                          <Truck className="w-5 h-5 text-cyan-600" />
                          <span className="text-xs font-bold text-gray-600 dark:text-gray-300 group-hover:text-cyan-600">{f.title}</span>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Marquee Ticker */}
              <div className="mb-6 rounded-lg overflow-hidden">
                <Marquee />
              </div>

              {/* SECTION: Flash Sale */}
              <div className="mb-6">
                 <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-white/5 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
                       <div className="flex items-center gap-4 md:gap-8">
                          <h2 className="text-lg md:text-xl font-bold text-orange-500">Flash Sale</h2>
                          {/* Countdown Timer (Static for demo) */}
                          <div className="flex gap-2 items-center">
                             <span className="text-xs text-gray-500 uppercase tracking-wider hidden md:block">Ending in</span>
                             <div className="flex gap-1 text-white text-xs font-bold">
                                <span className="bg-orange-500 px-1.5 py-1 rounded-sm">02</span>:
                                <span className="bg-orange-500 px-1.5 py-1 rounded-sm">15</span>:
                                <span className="bg-orange-500 px-1.5 py-1 rounded-sm">45</span>
                             </div>
                          </div>
                       </div>
                       <button className="text-orange-500 border border-orange-500 hover:bg-orange-50 text-xs font-bold px-4 py-1.5 rounded-full transition-colors">SHOP ALL</button>
                    </div>
                    
                    {/* Horizontal Scroll Container */}
                    <div className="p-4 overflow-x-auto scrollbar-hide flex gap-4">
                       {MOCK_PRODUCTS.slice(0, 8).map((p) => (
                          <FlashSaleCard 
                            key={p.id} 
                            product={p} 
                            onClick={() => handleProductClick(p)} 
                            onAdd={() => addToCart(p)}
                            onCompare={() => toggleCompare(p)}
                            onQuickView={() => setQuickViewProduct(p)}
                            isCompared={compareList.some(c => c.id === p.id)}
                          />
                       ))}
                    </div>
                 </div>
              </div>

              {/* SECTION: Categories Grid */}
              <div className="mb-6">
                 <h2 className="text-lg font-bold text-gray-700 dark:text-white mb-4">Categories</h2>
                 <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4">
                    {ALL_CATEGORIES.slice(0, 8).map((cat, idx) => (
                       <div key={idx} className="bg-white dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/5 p-3 flex flex-col items-center justify-center gap-2 hover:shadow-md cursor-pointer transition-all hover:border-cyan-500/30 group">
                          <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                             <Sparkles className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-cyan-500" />
                          </div>
                          <span className="text-[11px] font-medium text-center text-gray-600 dark:text-gray-300 leading-tight">{cat.name}</span>
                       </div>
                    ))}
                 </div>
              </div>

              {/* SECTION: Just For You (Infinite Grid) */}
              <div className="mb-12">
                 <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 border-l-4 border-cyan-600 pl-3">Just For You</h2>
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4">
                    {MOCK_PRODUCTS.map((p) => (
                       <ProductCardMinimal 
                         key={p.id} 
                         product={p} 
                         onClick={() => handleProductClick(p)} 
                         onAdd={() => addToCart(p)} 
                         onCompare={() => toggleCompare(p)}
                         onQuickView={() => setQuickViewProduct(p)}
                         isCompared={compareList.some(c => c.id === p.id)}
                       />
                    ))}
                    {MOCK_PRODUCTS.slice(0, 5).map((p) => (
                       <ProductCardMinimal 
                         key={p.id + 'dup'} 
                         product={{...p, id: p.id + 'dup'}} 
                         onClick={() => handleProductClick(p)} 
                         onAdd={() => addToCart(p)}
                         onCompare={() => toggleCompare(p)}
                         onQuickView={() => setQuickViewProduct(p)}
                         isCompared={compareList.some(c => c.id === p.id)} 
                       />
                    ))}
                 </div>
                 
                 <div className="mt-12 text-center">
                    <button className="px-12 py-3 border-2 border-cyan-600 text-cyan-600 dark:text-cyan-400 dark:border-cyan-400 font-bold rounded-full hover:bg-cyan-600 hover:text-white transition-all uppercase tracking-widest text-xs">Load More</button>
                 </div>
              </div>
            </>
          )}

          {/* Fallback for other views to keep layout */}
          {view === ViewState.PRODUCTS && (
            <div className="py-4">
               <h1 className="text-2xl font-bold mb-6 dark:text-white">All Products</h1>
               <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {MOCK_PRODUCTS.map(p => (
                     <ProductCardMinimal 
                       key={p.id} 
                       product={p} 
                       onClick={() => handleProductClick(p)} 
                       onAdd={() => addToCart(p)}
                       onCompare={() => toggleCompare(p)}
                       onQuickView={() => setQuickViewProduct(p)}
                       isCompared={compareList.some(c => c.id === p.id)} 
                     />
                  ))}
               </div>
            </div>
          )}

          {view === ViewState.PRODUCT_DETAIL && selectedProduct && (
            <div className="py-4">
               <button onClick={() => setView(ViewState.HOME)} className="mb-4 text-sm text-gray-500 hover:text-cyan-600 flex items-center gap-1"><ChevronLeft className="w-4 h-4" /> Back to Home</button>
               <div className="bg-white dark:bg-gray-900 rounded-xl p-4 md:p-8 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  <div className="space-y-4">
                     <Product3DViewer image={selectedProduct.images[0]} />
                     <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                        {selectedProduct.images.map((img, i) => (
                           <img key={i} src={img} className="w-20 h-20 rounded-lg border border-gray-200 cursor-pointer hover:border-cyan-500" />
                        ))}
                     </div>
                  </div>
                  <div>
                     <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">{selectedProduct.name}</h1>
                     <div className="flex items-center gap-4 mb-4">
                        <div className="flex text-yellow-500 text-sm">{'★'.repeat(5)}</div>
                        <span className="text-sm text-cyan-600">{selectedProduct.reviews} Ratings</span>
                        <span className="text-gray-300">|</span>
                        <span className="text-sm text-green-600">In Stock</span>
                     </div>
                     <div className="text-3xl font-bold text-orange-500 mb-6">৳ {selectedProduct.price.toLocaleString()}</div>
                     
                     <div className="space-y-4 mb-8">
                        <div className="flex gap-4 items-center text-sm">
                           <span className="text-gray-500 w-24">Color</span>
                           <div className="flex gap-2">
                              <button className="w-8 h-8 rounded-full bg-black border-2 border-gray-200 focus:border-cyan-500"></button>
                              <button className="w-8 h-8 rounded-full bg-blue-600 border-2 border-gray-200 focus:border-cyan-500"></button>
                           </div>
                        </div>
                        <div className="flex gap-4 items-center text-sm">
                           <span className="text-gray-500 w-24">Quantity</span>
                           <div className="flex items-center border border-gray-300 rounded-md">
                              <button className="px-3 py-1 hover:bg-gray-100">-</button>
                              <span className="px-3 py-1 font-bold">1</span>
                              <button className="px-3 py-1 hover:bg-gray-100">+</button>
                           </div>
                        </div>
                     </div>

                     <div className="flex gap-4">
                        <button className="flex-1 bg-cyan-100 text-cyan-700 font-bold py-3 rounded-lg hover:bg-cyan-200 transition-colors">Buy Now</button>
                        <button onClick={() => addToCart(selectedProduct)} className="flex-1 bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20">Add to Cart</button>
                        <button 
                           onClick={() => toggleCompare(selectedProduct)}
                           className={`p-3 rounded-lg border transition-colors ${compareList.some(c => c.id === selectedProduct.id) ? 'bg-cyan-600 text-white border-cyan-600' : 'border-gray-200 hover:border-cyan-500 text-gray-500'}`}
                           title="Compare"
                        >
                           <Scale className="w-6 h-6" />
                        </button>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {view === ViewState.CART_CHECKOUT && (
             <div className="py-4">
                <OneSlideCheckout cart={cart} onBack={() => setView(ViewState.HOME)} onComplete={() => { setCart([]); setView(ViewState.HOME); alert("Ordered!"); }} />
             </div>
          )}

          {/* Simple Contact View */}
          {view === ViewState.CONTACT && (
             <div className="h-screen flex items-center justify-center">
                <div className="text-center">
                   <h1 className="text-4xl font-bold dark:text-white">Contact Us</h1>
                   <p className="text-gray-500 mt-2">support@raselstore.bd</p>
                </div>
             </div>
          )}
           {view === ViewState.ABOUT && (
             <div className="h-screen flex items-center justify-center">
                <div className="text-center">
                   <h1 className="text-4xl font-bold dark:text-white">About Us</h1>
                   <p className="text-gray-500 mt-2">Leading Tech Retailer in BD.</p>
                </div>
             </div>
          )}

          {view === ViewState.COMPARE && (
             <CompareView 
                products={compareList} 
                onRemove={(id) => setCompareList(prev => prev.filter(p => p.id !== id))}
                onClear={() => setCompareList([])}
                onAddToCart={(p) => addToCart(p)}
                onBack={() => setView(ViewState.HOME)}
             />
          )}

        </main>

        {/* Modal Overlays */}
        {quickViewProduct && (
          <QuickViewModal 
             product={quickViewProduct} 
             onClose={() => setQuickViewProduct(null)} 
             onAddToCart={addToCart} 
          />
        )}

        {/* Floating Compare Bar */}
        {compareList.length > 0 && view !== ViewState.COMPARE && (
           <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-white dark:bg-gray-800 shadow-2xl rounded-full px-6 py-3 border border-gray-200 dark:border-white/10 flex items-center gap-4 animate-fade-in-up">
              <div className="flex items-center gap-2">
                 <Scale className="w-5 h-5 text-cyan-600" />
                 <span className="font-bold text-gray-800 dark:text-white">{compareList.length} <span className="text-xs font-normal text-gray-500">/ 4</span></span>
              </div>
              <div className="h-4 w-px bg-gray-300 dark:bg-gray-600"></div>
              <button onClick={() => setCompareList([])} className="text-xs font-bold text-gray-500 hover:text-red-500 transition-colors">Clear</button>
              <button 
                 onClick={() => setView(ViewState.COMPARE)}
                 className="bg-cyan-600 text-white text-xs font-bold px-4 py-1.5 rounded-full hover:bg-cyan-700 transition-colors"
              >
                 COMPARE
              </button>
           </div>
        )}

        <footer className="bg-gray-800 text-white pt-12 pb-6 mt-12">
           <div className={`${CONTAINER_CLASS} grid grid-cols-1 md:grid-cols-4 gap-8 mb-8`}>
              <div>
                 <h3 className="font-bold text-lg mb-4">Customer Care</h3>
                 <ul className="space-y-2 text-sm text-gray-400">
                    <li>Help Center</li>
                    <li>How to Buy</li>
                    <li>Returns & Refunds</li>
                    <li>Contact Us</li>
                 </ul>
              </div>
              <div>
                 <h3 className="font-bold text-lg mb-4">{APP_NAME}</h3>
                 <ul className="space-y-2 text-sm text-gray-400">
                    <li>About Us</li>
                    <li>Digital Payments</li>
                    <li>Rasel Card</li>
                    <li>Blog</li>
                 </ul>
              </div>
              <div>
                 <h3 className="font-bold text-lg mb-4">Payment Methods</h3>
                 <div className="flex gap-2 flex-wrap">
                    <div className="w-12 h-8 bg-white rounded-sm"></div>
                    <div className="w-12 h-8 bg-white rounded-sm"></div>
                    <div className="w-12 h-8 bg-white rounded-sm"></div>
                    <div className="w-12 h-8 bg-white rounded-sm"></div>
                 </div>
              </div>
              <div>
                 <h3 className="font-bold text-lg mb-4">Follow Us</h3>
                 <div className="flex gap-4">
                    <Facebook className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
                    <Instagram className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
                    <Globe className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
                 </div>
              </div>
           </div>
           <div className="text-center text-xs text-gray-500 border-t border-gray-700 pt-6">
              &copy; 2024 {APP_NAME} Ltd. All rights reserved.
           </div>
        </footer>

        <Copilot products={MOCK_PRODUCTS} cart={cart} />
      </div>
    </div>
  );
};

export default App;