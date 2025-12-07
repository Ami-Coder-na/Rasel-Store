
import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Search, Menu, Sun, Moon, Zap, User, ArrowRight, Truck, ShieldCheck, Cpu, Mail, MapPin, Phone, Globe, Instagram, Facebook, Twitter, X, Clock, Coffee, Sparkles, Play, Star, Plus, Flame, TrendingUp, Gift, Headphones, Lock, ChevronRight, ChevronLeft, Smartphone, Watch, Camera, Gamepad, Shirt, Home, Monitor, Wifi, Code, Activity, Wind, Anchor, Scale, Eye, CreditCard, Send, Youtube, Linkedin, LogOut, Filter, History } from 'lucide-react';
import { MOCK_PRODUCTS, SUGGESTED_QUERIES, APP_NAME, CATEGORIES, SERVICE_FEATURES, BRANDS, ALL_CATEGORIES } from './constants';
import { Product, CartItem, UserContext, ViewState, UserProfile } from './types';
import { Copilot } from './components/Copilot';
import { OneSlideCheckout } from './components/OneSlideCheckout';
import { Product3DViewer } from './components/Product3DViewer';
import { CompareView } from './components/CompareView';
import { QuickViewModal } from './components/QuickViewModal';
import { AuthModal } from './components/AuthModal';
import { ProductDetail } from './components/ProductDetail';
import { UserProfileView } from './components/UserProfileView';

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

const CategorySidebar = ({ onSelect }: { onSelect: (categoryName: string) => void }) => (
  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-lg shadow-sm h-full py-2 overflow-y-auto hidden lg:block custom-scrollbar">
    {ALL_CATEGORIES.map((cat) => {
      // Map string icon name to component (simplified for demo)
      const IconMap: any = { Shirt, Smartphone, Monitor, Headphones, Camera, Gamepad, Home, Watch, Wind, Wifi, Code, Activity };
      const Icon = IconMap[cat.icon] || Sparkles;
      
      return (
        <div 
          key={cat.id} 
          onClick={() => onSelect(cat.name)}
          className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer group transition-colors"
        >
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
  <div onClick={onClick} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-lg hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-all cursor-pointer group flex flex-col overflow-hidden relative h-full">
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

const SplashOffer = ({ onClick }: { onClick: () => void }) => (
  <div onClick={onClick} className="mb-12 relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer border border-white/10 h-[300px] md:h-[400px]">
    {/* Background */}
    <div className="absolute inset-0">
      <img 
        src="https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=2000" 
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
        alt="Splash Offer"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent/20"></div>
    </div>

    {/* Content */}
    <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 max-w-3xl">
       <div className="flex items-center gap-2 mb-4 animate-fade-in-up">
          <span className="px-3 py-1 bg-orange-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-sm">Mega Deal</span>
          <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1">
             <Zap className="w-3 h-3 fill-current" /> Limited Time Only
          </span>
       </div>

       <h2 className="text-4xl md:text-6xl font-black text-white leading-none mb-6 font-heading animate-fade-in-up" style={{animationDelay: '100ms'}}>
         CYBER <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">MONDAY</span> <br/>
         IS LIVE NOW
       </h2>

       <p className="text-gray-300 text-sm md:text-lg mb-8 max-w-xl leading-relaxed animate-fade-in-up" style={{animationDelay: '200ms'}}>
         Get up to <span className="text-white font-bold">70% OFF</span> on top-tier tech, neural chips, and gravity-defying gear. 
         Don't miss the future of savings.
       </p>

       <button className="w-fit bg-white text-black font-bold py-3 md:py-4 px-8 md:px-10 rounded-full hover:bg-cyan-400 hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] animate-fade-in-up" style={{animationDelay: '300ms'}}>
         Grab the Deal
       </button>
    </div>

    {/* Abstract Shapes */}
    <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl group-hover:bg-cyan-500/30 transition-colors"></div>
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
  
  // Persistent Recently Viewed State
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('rasel_recently_viewed');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('light');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Auth State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Auto-play Slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Save recently viewed to local storage
  useEffect(() => {
    localStorage.setItem('rasel_recently_viewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const addToCart = (product: Product | CartItem) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        // If it's a CartItem (has quantity from PDP), add that amount. otherwise add 1.
        const qtyToAdd = (product as CartItem).quantity || 1;
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + qtyToAdd } : item);
      }
      return [...prev, { ...product, quantity: (product as CartItem).quantity || 1 }];
    });
  };

  const handleBuyNow = (item: CartItem) => {
    addToCart(item);
    setView(ViewState.CART_CHECKOUT);
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
    
    // Add to recently viewed with duplicate removal and limit
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 10);
    });

    setView(ViewState.PRODUCT_DETAIL);
  };

  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView(ViewState.HOME);
  };

  const handleCategorySelect = (categoryName: string) => {
    setActiveCategory(categoryName);
    setView(ViewState.PRODUCTS);
    setSearchQuery(''); // Clear search when picking a category
  };

  // Filter products based on category and search
  const getFilteredProducts = () => {
    let filtered = MOCK_PRODUCTS;

    if (activeCategory) {
      filtered = filtered.filter(p => {
        const cat = activeCategory.toLowerCase();
        // Simple mapping/matching logic for demo
        if (cat.includes('fashion') || cat.includes('apparel') || cat.includes('sales')) return p.category === 'Apparel';
        if (cat.includes('phone') || cat.includes('laptop') || cat.includes('tech') || cat.includes('camera') || cat.includes('drone')) return p.category === 'Tech';
        if (cat.includes('audio')) return p.category === 'Audio';
        if (cat.includes('gaming')) return p.category === 'Gaming';
        if (cat.includes('home')) return p.category === 'Home';
        if (cat.includes('accessories')) return p.category === 'Accessories';
        return true; // Fallback to show all if no specific match for demo
      });
    }

    if (searchQuery) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    return filtered;
  };

  const displayedProducts = getFilteredProducts();

  return (
    <div className={themeMode}>
      <div className="min-h-screen bg-gray-50 dark:bg-black font-sans text-gray-900 dark:text-white transition-colors duration-300 relative pb-20">
        
        {/* Top Utility Bar */}
        <TopBar />

        {/* Sticky Header */}
        <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-white/5 transition-colors">
          <div className={`${CONTAINER_CLASS} py-4 flex items-center gap-4 lg:gap-8`}>
            
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setView(ViewState.HOME); setActiveCategory(null); }}>
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
                  onChange={(e) => { setSearchQuery(e.target.value); if (e.target.value) setView(ViewState.PRODUCTS); }}
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
               
               {/* User Auth Trigger */}
               <div className="flex items-center gap-2 cursor-pointer group relative">
                  {currentUser ? (
                    <div className="flex items-center gap-2" onClick={() => setView(ViewState.PROFILE)} title="My Account">
                      <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-cyan-500">
                        {currentUser.avatar ? (
                          <img src={currentUser.avatar} alt="User" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-cyan-600 flex items-center justify-center text-white font-bold">{currentUser.name.charAt(0)}</div>
                        )}
                      </div>
                      <div className="hidden lg:block">
                        <p className="text-[10px] text-gray-400">Hello,</p>
                        <p className="text-xs font-bold leading-none truncate max-w-[80px]">{currentUser.name}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2" onClick={() => setIsAuthOpen(true)}>
                      <User className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-cyan-600" />
                      <div className="hidden lg:block">
                         <p className="text-[10px] text-gray-400">Welcome</p>
                         <p className="text-xs font-bold leading-none">Sign In / Register</p>
                      </div>
                    </div>
                  )}
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
                    <CategorySidebar onSelect={handleCategorySelect} />
                 </div>

                 {/* 2. Main Slider (60%) */}
                 <div className="col-span-12 lg:col-span-8 h-[200px] lg:h-full relative rounded-xl overflow-hidden shadow-sm group bg-gray-200 dark:bg-gray-800">
                    {HERO_SLIDES.map((slide, i) => (
                       <div key={slide.id} className={`absolute inset-0 transition-opacity duration-700 ${i === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                          <img src={slide.img} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center px-8 md:px-16">
                             <h2 className="text-3xl md:text-5xl font-black text-white font-heading mb-2 translate-y-4 opacity-0 transition-all duration-700 delay-300" style={{ transform: i === currentSlide ? 'translateY(0)' : 'translateY(20px)', opacity: i === currentSlide ? 1 : 0 }}>{slide.title}</h2>
                             <p className="text-cyan-400 text-lg md:text-xl font-bold mb-6 translate-y-4 opacity-0 transition-all duration-700 delay-500" style={{ transform: i === currentSlide ? 'translateY(0)' : 'translateY(20px)', opacity: i === currentSlide ? 1 : 0 }}>{slide.sub}</p>
                             <button onClick={() => setView(ViewState.PRODUCTS)} className="bg-white text-gray-900 font-bold py-2 px-6 rounded-full w-fit hover:bg-cyan-500 hover:text-white transition-colors">Shop Now</button>
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
                       <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-800 rounded-full flex items-center justify-center mb-2 overflow-hidden cursor-pointer" onClick={() => currentUser && setView(ViewState.PROFILE)}>
                          {currentUser ? (
                             currentUser.avatar ? <img src={currentUser.avatar} className="w-full h-full object-cover" /> : <span className="font-bold text-cyan-600 dark:text-cyan-300 text-xl">{currentUser.name.charAt(0)}</span>
                          ) : (
                             <User className="w-6 h-6 text-cyan-600 dark:text-cyan-300" />
                          )}
                       </div>
                       <p className="text-xs text-gray-500 dark:text-gray-400">
                          {currentUser ? `Hi, ${currentUser.name}` : 'Welcome to Rasel Store'}
                       </p>
                       <div className="flex gap-2 mt-3 w-full">
                          {currentUser ? (
                             <button onClick={() => setView(ViewState.PROFILE)} className="flex-1 bg-cyan-600 text-white text-xs font-bold py-1.5 rounded-md hover:bg-cyan-700 w-full">My Account</button>
                          ) : (
                             <>
                                <button onClick={() => setIsAuthOpen(true)} className="flex-1 bg-cyan-600 text-white text-xs font-bold py-1.5 rounded-md hover:bg-cyan-700">Join</button>
                                <button onClick={() => setIsAuthOpen(true)} className="flex-1 bg-white dark:bg-white/10 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/30 text-xs font-bold py-1.5 rounded-md hover:bg-gray-50">Sign In</button>
                             </>
                          )}
                       </div>
                    </div>
                    <div className="h-[45%] bg-orange-50 dark:bg-orange-900/10 rounded-lg overflow-hidden relative cursor-pointer" onClick={() => { setActiveCategory('Tech'); setView(ViewState.PRODUCTS); }}>
                       <img src="https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=800" className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-700" />
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
                       <button onClick={() => setView(ViewState.PRODUCTS)} className="text-orange-500 border border-orange-500 hover:bg-orange-50 text-xs font-bold px-4 py-1.5 rounded-full transition-colors">SHOP ALL</button>
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
                       <div 
                        key={idx} 
                        onClick={() => handleCategorySelect(cat.name)}
                        className="bg-white dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/5 p-3 flex flex-col items-center justify-center gap-2 hover:shadow-md cursor-pointer transition-all hover:border-cyan-500/30 group"
                      >
                          <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                             <Sparkles className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-cyan-500" />
                          </div>
                          <span className="text-[11px] font-medium text-center text-gray-600 dark:text-gray-300 leading-tight">{cat.name}</span>
                       </div>
                    ))}
                 </div>
              </div>

              {/* SECTION: Splash Offer (New) */}
              <SplashOffer onClick={() => setView(ViewState.PRODUCTS)} />

              {/* SECTION: Today's Top Sales */}
              <div className="mb-12 animate-fade-in-up">
                 <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                       <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-full text-red-600">
                          <Flame className="w-5 h-5 fill-current animate-pulse" />
                       </div>
                       <h2 className="text-xl font-bold text-gray-800 dark:text-white">Today's Top Sales</h2>
                    </div>
                    <button onClick={() => { setActiveCategory('Top Sales'); setView(ViewState.PRODUCTS); }} className="text-sm font-bold text-cyan-600 hover:underline flex items-center gap-1">
                       View All <ArrowRight className="w-4 h-4" />
                    </button>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {MOCK_PRODUCTS.slice(0, 4).map((p, idx) => (
                       <div 
                         key={p.id}
                         onClick={() => handleProductClick(p)}
                         className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-white/5 p-4 flex gap-4 cursor-pointer hover:shadow-lg transition-all group relative overflow-hidden"
                       >
                          {/* Rank Badge */}
                          <div className="absolute top-0 left-0 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded-br-lg z-10">
                             #{idx + 1}
                          </div>

                          <div className="w-24 h-24 flex-shrink-0 bg-gray-100 dark:bg-black/20 rounded-lg overflow-hidden">
                             <img src={p.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          
                          <div className="flex flex-col justify-center flex-1 min-w-0">
                             <h3 className="font-bold text-sm text-gray-900 dark:text-white line-clamp-2 mb-1 group-hover:text-cyan-600 transition-colors">{p.name}</h3>
                             <div className="flex items-center gap-2 mb-2">
                                <span className="text-orange-500 font-bold">৳{p.price.toLocaleString()}</span>
                                <span className="text-xs text-gray-400 line-through">৳{Math.round(p.price * 1.2).toLocaleString()}</span>
                             </div>
                             
                             {/* Progress Bar */}
                             <div className="w-full bg-gray-100 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-gradient-to-r from-orange-500 to-red-500 h-full rounded-full" style={{ width: `${90 - (idx * 15)}%` }}></div>
                             </div>
                             <p className="text-[10px] text-gray-500 mt-1 flex justify-between">
                                <span>Sold: {200 - (idx * 20)}</span>
                                <span className="text-red-500 font-bold">Fast Selling</span>
                             </p>
                          </div>
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

              {/* SECTION: Recently Viewed */}
              {recentlyViewed.length > 0 && (
                <div className="mb-12 animate-fade-in-up">
                   <div className="flex items-center gap-2 mb-6">
                      <History className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                      <h2 className="text-xl font-bold text-gray-800 dark:text-white">Recently Viewed</h2>
                   </div>
                   <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-white/5">
                      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                         {recentlyViewed.map(p => (
                            <div key={p.id} className="min-w-[150px] w-[150px]">
                               <ProductCardMinimal 
                                 product={p} 
                                 onClick={() => handleProductClick(p)} 
                                 onAdd={() => addToCart(p)} 
                                 onCompare={() => toggleCompare(p)}
                                 onQuickView={() => setQuickViewProduct(p)}
                                 isCompared={compareList.some(c => c.id === p.id)}
                               />
                            </div>
                         ))}
                      </div>
                   </div>
                </div>
              )}
            </>
          )}

          {/* Fallback for other views to keep layout */}
          {view === ViewState.PRODUCTS && (
            <div className="py-4">
               <div className="flex items-center justify-between mb-6">
                 <div>
                   <h1 className="text-2xl font-bold dark:text-white">
                     {activeCategory ? activeCategory : 'All Products'}
                   </h1>
                   <p className="text-sm text-gray-500">
                     Showing {displayedProducts.length} items
                     {searchQuery && ` for "${searchQuery}"`}
                   </p>
                 </div>
                 {activeCategory && (
                   <button 
                     onClick={() => setActiveCategory(null)}
                     className="flex items-center gap-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium"
                   >
                     <X className="w-4 h-4" /> Clear Filter
                   </button>
                 )}
               </div>

               {displayedProducts.length === 0 ? (
                 <div className="flex flex-col items-center justify-center py-20 bg-gray-50 dark:bg-white/5 rounded-2xl">
                    <Search className="w-12 h-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-bold text-gray-500">No Products Found</h3>
                    <p className="text-gray-400 text-sm">Try checking another category or clearing filters.</p>
                 </div>
               ) : (
                 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {displayedProducts.map(p => (
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
               )}
            </div>
          )}

          {view === ViewState.PRODUCT_DETAIL && selectedProduct && (
            <ProductDetail 
              product={selectedProduct} 
              onBack={() => setView(ViewState.HOME)} 
              onAddToCart={addToCart}
              onBuyNow={handleBuyNow}
              onProductSelect={handleProductClick}
              onToggleCompare={toggleCompare}
              isCompared={compareList.some(c => c.id === selectedProduct.id)}
            />
          )}

          {view === ViewState.CART_CHECKOUT && (
             <div className="py-4">
                <OneSlideCheckout cart={cart} onBack={() => setView(ViewState.HOME)} onComplete={() => { setCart([]); setView(ViewState.HOME); alert("Ordered!"); }} />
             </div>
          )}

          {view === ViewState.PROFILE && currentUser && (
             <div className="py-4">
               <UserProfileView 
                 user={currentUser} 
                 onLogout={handleLogout} 
                 onUpdateUser={(updated) => setCurrentUser(updated)} 
               />
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
        
        {/* Auth Modal */}
        {isAuthOpen && (
           <AuthModal onClose={() => setIsAuthOpen(false)} onLogin={handleLogin} />
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

        {/* Mega Footer */}
        <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 text-sm mt-12 border-t border-gray-800">
           {/* Top: App Download */}
           <div className={`${CONTAINER_CLASS} flex flex-col md:flex-row justify-between items-center mb-12 gap-6 bg-gray-800/50 p-6 rounded-2xl border border-gray-700`}>
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-cyan-600 rounded-xl flex items-center justify-center text-white">
                    <Smartphone className="w-7 h-7" />
                 </div>
                 <div>
                    <h3 className="text-xl font-bold text-white">Shop Better on App</h3>
                    <p className="text-gray-400 text-xs">Get exclusive deals & fast updates.</p>
                 </div>
              </div>
              <div className="flex gap-4">
                 <button className="flex items-center gap-2 bg-black border border-gray-600 px-4 py-2 rounded-lg hover:border-white transition-colors">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" className="h-8" alt="Play Store" />
                 </button>
                 <button className="flex items-center gap-2 bg-black border border-gray-600 px-4 py-2 rounded-lg hover:border-white transition-colors">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" className="h-8" alt="App Store" />
                 </button>
              </div>
           </div>

           {/* Middle: Links */}
           <div className={`${CONTAINER_CLASS} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12`}>
              <div className="lg:col-span-1">
                 <div className="flex items-center gap-2 mb-6 text-white">
                     <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center font-bold">R</div>
                     <span className="font-heading font-black text-xl">{APP_NAME}</span>
                 </div>
                 <div className="space-y-3 text-xs">
                    <div className="flex items-start gap-3">
                       <MapPin className="w-4 h-4 text-cyan-500 mt-0.5" />
                       <span>Level 4, Bashundhara City,<br/>Panthapath, Dhaka-1215</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <Mail className="w-4 h-4 text-cyan-500" />
                       <span>support@raselstore.bd</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <Phone className="w-4 h-4 text-cyan-500" />
                       <span>+880 1712 345678</span>
                    </div>
                 </div>
              </div>

              <div>
                 <h4 className="text-white font-bold mb-6">Customer Care</h4>
                 <ul className="space-y-3 text-xs">
                    <li className="hover:text-cyan-400 cursor-pointer">Help Center</li>
                    <li className="hover:text-cyan-400 cursor-pointer">How to Buy</li>
                    <li className="hover:text-cyan-400 cursor-pointer">Returns & Refunds</li>
                    <li className="hover:text-cyan-400 cursor-pointer">Contact Us</li>
                    <li className="hover:text-cyan-400 cursor-pointer">Terms & Conditions</li>
                 </ul>
              </div>

              <div>
                 <h4 className="text-white font-bold mb-6">Rasel Store</h4>
                 <ul className="space-y-3 text-xs">
                    <li className="hover:text-cyan-400 cursor-pointer">About Us</li>
                    <li className="hover:text-cyan-400 cursor-pointer">Digital Payments</li>
                    <li className="hover:text-cyan-400 cursor-pointer">Rasel Card</li>
                    <li className="hover:text-cyan-400 cursor-pointer">Blog</li>
                    <li className="hover:text-cyan-400 cursor-pointer">Privacy Policy</li>
                 </ul>
              </div>

              <div>
                 <h4 className="text-white font-bold mb-6">Payment Methods</h4>
                 <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white p-1 rounded h-8 flex items-center justify-center"><span className="text-pink-600 font-bold text-[10px]">bKash</span></div>
                    <div className="bg-white p-1 rounded h-8 flex items-center justify-center"><span className="text-orange-600 font-bold text-[10px]">Nagad</span></div>
                    <div className="bg-white p-1 rounded h-8 flex items-center justify-center"><CreditCard className="text-gray-600 w-4 h-4" /></div>
                    <div className="bg-white p-1 rounded h-8 flex items-center justify-center"><span className="text-blue-800 font-bold text-[10px]">VISA</span></div>
                    <div className="bg-white p-1 rounded h-8 flex items-center justify-center"><span className="text-red-600 font-bold text-[10px]">MC</span></div>
                    <div className="bg-white p-1 rounded h-8 flex items-center justify-center"><span className="text-gray-800 font-bold text-[10px]">COD</span></div>
                 </div>
              </div>
              
              <div>
                 <h4 className="text-white font-bold mb-6">Newsletter</h4>
                 <p className="text-xs mb-4">Subscribe to get new offers!</p>
                 <div className="flex gap-2">
                    <input type="email" placeholder="Your Email" className="bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-lg w-full text-xs focus:border-cyan-500 outline-none" />
                    <button className="bg-cyan-600 p-2 rounded-lg hover:bg-cyan-700 text-white"><Send className="w-4 h-4" /></button>
                 </div>
                 <div className="mt-6 flex gap-4">
                    <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                    <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                    <Youtube className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                    <Linkedin className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                 </div>
              </div>
           </div>

           {/* Bottom */}
           <div className={`${CONTAINER_CLASS} pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4`}>
              <p>&copy; 2024 {APP_NAME} Limited. All rights reserved.</p>
              <div className="flex items-center gap-2">
                 <span>Made with</span>
                 <Flame className="w-3 h-3 text-red-500 fill-red-500" />
                 <span>in Bangladesh</span>
              </div>
           </div>
        </footer>

        <Copilot products={MOCK_PRODUCTS} cart={cart} />
      </div>
    </div>
  );
};

export default App;
