
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ShoppingBag, Search, Menu, Sun, Moon, Zap, User, ArrowRight, Truck, ShieldCheck, Cpu, Mail, MapPin, Phone, Globe, Instagram, Facebook, Twitter, X, Clock, Coffee, Sparkles, Play, Star, Plus, Flame, TrendingUp, Gift, Headphones, Lock, ChevronRight, ChevronLeft, Smartphone, Watch, Camera, Gamepad, Shirt, Home, Monitor, Wifi, Code, Activity, Wind, Anchor, Scale, Eye, CreditCard, Send, Youtube, Linkedin, LogOut, Filter, History, Heart, ListFilter, Wallet, Ticket, Timer, Loader2, ArrowUp } from 'lucide-react';
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
import { CartDrawer } from './components/CartDrawer';
import { ToastContainer, ToastMessage, ToastType } from './components/Toast';
import { TrackOrderView } from './components/TrackOrderView';
import { ProductFilter } from './components/ProductFilter';

// --- Layout Constants ---
const CONTAINER_CLASS = "max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8";

// --- Sub-Components ---

const TopBar = ({ onTrackClick }: { onTrackClick: () => void }) => (
  <div className="bg-gray-100 dark:bg-black/80 border-b border-gray-200 dark:border-white/5 transition-colors">
    <div className={`${CONTAINER_CLASS} py-2 flex justify-between items-center text-[10px] md:text-xs text-gray-600 dark:text-gray-400`}>
      <div className="flex items-center gap-6">
        <span className="hover:text-cyan-600 cursor-pointer transition-colors">Save More on App</span>
        <span className="hidden md:inline hover:text-cyan-600 cursor-pointer transition-colors">Sell on {APP_NAME}</span>
      </div>
      <div className="flex items-center gap-6">
        <span className="hover:text-cyan-600 cursor-pointer transition-colors">Customer Care</span>
        <button onClick={onTrackClick} className="hover:text-cyan-600 cursor-pointer transition-colors font-medium">Track My Order</button>
        <span className="hover:text-cyan-600 cursor-pointer transition-colors text-cyan-600 font-bold">BN / EN</span>
      </div>
    </div>
  </div>
);

const CategorySidebar = ({ onSelect }: { onSelect: (categoryName: string) => void }) => (
  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-2xl shadow-sm h-full py-3 overflow-y-auto hidden lg:block custom-scrollbar">
    {ALL_CATEGORIES.map((cat) => {
      // Map string icon name to component (simplified for demo)
      const IconMap: any = { Shirt, Smartphone, Monitor, Headphones, Camera, Gamepad, Home, Watch, Wind, Wifi, Code, Activity };
      const Icon = IconMap[cat.icon] || Sparkles;
      
      return (
        <div 
          key={cat.id} 
          onClick={() => onSelect(cat.name)}
          className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer group transition-colors"
        >
          <Icon className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{cat.name}</span>
          <ChevronRight className="w-3 h-3 ml-auto text-gray-300 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
        </div>
      );
    })}
  </div>
);

const Marquee = () => (
  <div className="bg-black text-white text-xs py-2.5 overflow-hidden relative border-y border-gray-800">
    <div className="whitespace-nowrap animate-marquee flex gap-12 font-medium tracking-wide">
      <span className="flex items-center gap-2">🔥 FLASH SALE: Up to 70% OFF on Neural Chips!</span>
      <span className="flex items-center gap-2">🚚 FREE DELIVERY all over Dhaka for orders &gt; 2000 BDT</span>
      <span className="flex items-center gap-2">📢 New Outlet Opening in Bashundhara City!</span>
      <span className="flex items-center gap-2">💳 Get 10% Cashback with bKash payment.</span>
      <span className="flex items-center gap-2">🔥 FLASH SALE: Up to 70% OFF on Neural Chips!</span>
      <span className="flex items-center gap-2">🚚 FREE DELIVERY all over Dhaka for orders &gt; 2000 BDT</span>
    </div>
  </div>
);

const FlashSaleCard: React.FC<{ 
  product: Product, 
  onClick: () => void, 
  onAdd: (e: any) => void,
  onCompare: (e: any) => void,
  onQuickView: (e: any) => void,
  isCompared: boolean,
  onToggleWishlist: (e: any) => void,
  isWishlisted: boolean
}> = ({ product, onClick, onAdd, onCompare, onQuickView, isCompared, onToggleWishlist, isWishlisted }) => (
  <div onClick={onClick} className="min-w-[170px] md:min-w-[200px] bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl hover:shadow-xl hover:border-orange-200 dark:hover:border-orange-900/30 transition-all cursor-pointer group flex flex-col h-full relative overflow-hidden">
    <div className="relative aspect-square p-3">
      <img src={product.images[0]} className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm z-10 shadow-sm">
        -25%
      </div>
      
      {/* Action Buttons Container */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-20 translate-y-24 group-hover:translate-y-0 transition-transform duration-300">
        {/* Wishlist Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(e); }}
          className={`p-2 rounded-full shadow-lg transition-colors ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-red-50 hover:text-red-500'}`}
          title="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
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
      </div>
    </div>
    <div className="p-4 flex flex-col flex-1">
      <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-2 mb-2 group-hover:text-orange-500 transition-colors h-10">{product.name}</h3>
      <div className="mt-auto">
        <div className="flex items-end justify-between mb-2">
           <div className="flex flex-col">
              <span className="text-orange-600 dark:text-orange-400 font-bold text-base">৳{product.price.toLocaleString()}</span>
              <span className="text-gray-400 text-xs line-through">৳{Math.round(product.price * 1.25).toLocaleString()}</span>
           </div>
           {/* Small Add Button */}
           <button 
             onClick={(e) => { e.stopPropagation(); onAdd(e); }}
             className="bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 hover:bg-orange-500 hover:text-white p-2 rounded-lg transition-colors shadow-sm"
             title="Add to Cart"
           >
              <Plus className="w-4 h-4" />
           </button>
        </div>
        <div className="w-full bg-gray-100 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
          <div className="bg-orange-500 h-full w-[70%]"></div>
        </div>
        <p className="text-[10px] text-gray-500 mt-1.5 font-medium">15 sold</p>
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
  isCompared?: boolean,
  onToggleWishlist?: (e: any) => void,
  isWishlisted?: boolean
}> = ({ product, onClick, onAdd, onCompare, onQuickView, isCompared, onToggleWishlist, isWishlisted }) => (
  <div onClick={onClick} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-xl hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:border-cyan-500/30 transition-all duration-300 cursor-pointer group flex flex-col overflow-hidden relative h-full">
    <div className="relative aspect-square bg-gray-50 dark:bg-black/20 overflow-hidden">
      <img src={product.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
      {product.arEnabled && (
         <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md p-1.5 rounded-full z-10 border border-white/20">
            <Zap className="w-3 h-3 text-cyan-400" />
         </div>
      )}
      
      {/* Floating Actions */}
      <div className="absolute bottom-3 right-3 flex flex-col gap-2 z-20 translate-y-48 group-hover:translate-y-0 transition-transform duration-300">
         {/* Wishlist */}
         <button 
           onClick={(e) => { e.stopPropagation(); onToggleWishlist?.(e); }}
           className={`p-2.5 rounded-full shadow-lg flex items-center justify-center transition-colors ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-red-50 hover:text-red-500'}`}
           title="Wishlist"
         >
           <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
         </button>
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
      </div>

    </div>
    <div className="p-4 flex flex-col flex-1">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200 line-clamp-2 h-10 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mb-2">{product.name}</h3>
      <div className="flex items-center justify-between mt-auto">
         <div className="flex flex-col">
            <span className="text-cyan-600 dark:text-cyan-400 font-bold text-lg">৳{product.price.toLocaleString()}</span>
            <div className="flex items-center text-yellow-500 text-[10px] mt-0.5">
                <Star className="w-3 h-3 fill-current" />
                <span className="ml-1 text-gray-400 font-medium">({product.reviews})</span>
            </div>
         </div>
         {/* Small Add to Cart Button */}
         <button 
            onClick={(e) => { e.stopPropagation(); onAdd?.(e); }}
            className="bg-gray-100 dark:bg-white/5 hover:bg-cyan-600 hover:text-white text-gray-600 dark:text-gray-300 p-2.5 rounded-xl transition-colors shadow-sm"
            title="Add to Cart"
         >
            <ShoppingBag className="w-4 h-4" />
         </button>
      </div>
    </div>
  </div>
);

const SplashOffer = ({ onClick }: { onClick: () => void }) => (
  <div onClick={onClick} className="mb-16 relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer border border-white/10 h-[320px] md:h-[450px]">
    {/* Background */}
    <div className="absolute inset-0">
      <img 
        src="https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=2000" 
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
        alt="Splash Offer"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent/20"></div>
    </div>

    {/* Content */}
    <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20 max-w-4xl">
       <div className="flex items-center gap-3 mb-6 animate-fade-in-up">
          <span className="px-3 py-1 bg-orange-500 text-white text-[11px] font-bold uppercase tracking-wider rounded-md shadow-lg shadow-orange-500/30">Mega Deal</span>
          <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
             <Zap className="w-4 h-4 fill-current" /> Limited Time Only
          </span>
       </div>

       <h2 className="text-4xl md:text-7xl font-black text-white leading-[0.9] mb-6 font-heading animate-fade-in-up drop-shadow-xl" style={{animationDelay: '100ms'}}>
         CYBER <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">MONDAY</span> <br/>
         IS LIVE NOW
       </h2>

       <p className="text-gray-200 text-base md:text-xl mb-10 max-w-2xl leading-relaxed animate-fade-in-up font-light" style={{animationDelay: '200ms'}}>
         Get up to <span className="text-white font-bold">70% OFF</span> on top-tier tech, neural chips, and gravity-defying gear. 
         Don't miss the future of savings.
       </p>

       <button className="w-fit bg-white text-black font-bold py-3.5 md:py-4 px-10 md:px-12 rounded-full hover:bg-cyan-400 hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] animate-fade-in-up text-sm md:text-base tracking-wide" style={{animationDelay: '300ms'}}>
         Grab the Deal
       </button>
    </div>

    {/* Abstract Shapes */}
    <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] group-hover:bg-cyan-500/30 transition-colors duration-700"></div>
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
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc' | 'rating'>('relevance');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Filter States
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Load More Logic
  const [visibleProductCount, setVisibleProductCount] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Optimized Infinite List Generation
  const justForYouProducts = useMemo(() => {
    let pool = [...MOCK_PRODUCTS];
    // Duplicate multiple times to simulate a large database, ensure IDs are unique
    for(let i=0; i<4; i++) {
        const dups = MOCK_PRODUCTS.map(p => ({...p, id: `${p.id}_dup_${i}`}));
        pool = pool.concat(dups);
    }
    return pool;
  }, []);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    // Simulate network request
    setTimeout(() => {
        setVisibleProductCount(prev => Math.min(prev + 12, justForYouProducts.length));
        setIsLoadingMore(false);
    }, 800);
  };

  // Scroll to Top Logic
  useEffect(() => {
    const handleScroll = () => {
        setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset Scroll on View Change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);


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

  const showToast = (message: string, type: ToastType = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addToCart = (product: Product | CartItem) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      let newCart;
      if (existing) {
        // If it's a CartItem (has quantity from PDP), add that amount. otherwise add 1.
        const qtyToAdd = (product as CartItem).quantity || 1;
        newCart = prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + qtyToAdd } : item);
      } else {
        newCart = [...prev, { ...product, quantity: (product as CartItem).quantity || 1 }];
      }
      return newCart;
    });
    showToast(`Added ${product.name} to cart`, 'success');
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
    showToast('Item removed from cart', 'info');
  };

  const handleBuyNow = (item: CartItem) => {
    addToCart(item);
    setIsCartOpen(false); // Ensure cart drawer is closed
    setView(ViewState.CART_CHECKOUT);
  };

  const toggleCompare = (product: Product) => {
    setCompareList(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        showToast('Removed from comparison', 'info');
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 4) {
        showToast('Comparison limit reached (max 4)', 'error');
        return prev;
      }
      showToast('Added to comparison', 'success');
      return [...prev, product];
    });
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        showToast('Removed from Wishlist', 'info');
        return prev.filter(p => p.id !== product.id);
      }
      showToast('Added to Wishlist', 'success');
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
    showToast(`Welcome back, ${user.name}!`, 'success');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView(ViewState.HOME);
    showToast('Logged out successfully', 'info');
  };

  const handleCategorySelect = (categoryName: string) => {
    // When selected from Home/Sidebar, we reset other filters and strictly set this category
    setSelectedCategories([categoryName]);
    setSelectedBrands([]);
    setPriceRange([0, 500000]);
    setMinRating(null);
    setSearchQuery('');
    
    setView(ViewState.PRODUCTS);
  };

  // Filter Handlers
  const toggleFilterCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const toggleFilterBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 500000]);
    setMinRating(null);
    setSearchQuery('');
  };

  // Filter products logic
  const getFilteredProducts = () => {
    let filtered = [...MOCK_PRODUCTS];

    // Filter by Category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }

    // Filter by Brand
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(p => selectedBrands.includes(p.brand));
    }

    // Filter by Price
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Filter by Rating
    if (minRating !== null) {
      filtered = filtered.filter(p => p.rating >= minRating);
    }

    // Filter by Search Query
    if (searchQuery) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Sorting Logic
    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  };

  const displayedProducts = getFilteredProducts();

  return (
    <div className={themeMode}>
      <div className="min-h-screen bg-gray-50 dark:bg-black font-sans text-gray-900 dark:text-white transition-colors duration-300 relative pb-20 selection:bg-cyan-500 selection:text-white">
        
        {/* Toast Container */}
        <ToastContainer toasts={toasts} onDismiss={removeToast} />

        {/* Cart Drawer */}
        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          cart={cart}
          onUpdateQuantity={updateCartQuantity}
          onRemoveItem={removeFromCart}
          onCheckout={() => { setIsCartOpen(false); setView(ViewState.CART_CHECKOUT); }}
        />

        {/* Back to Top Button */}
        <button 
           onClick={scrollToTop}
           className={`fixed bottom-6 left-6 z-40 p-3 rounded-full bg-gray-900 dark:bg-gray-700 text-white shadow-lg transition-all duration-300 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        >
           <ArrowUp className="w-5 h-5" />
        </button>

        {/* Top Utility Bar */}
        <TopBar onTrackClick={() => setView(ViewState.TRACK_ORDER)} />

        {/* Sticky Header */}
        <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-white/5 transition-colors">
          <div className={`${CONTAINER_CLASS} py-3 lg:py-4 flex items-center gap-4 lg:gap-8`}>
            
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => { setView(ViewState.HOME); clearAllFilters(); }}>
               <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">R</div>
               <span className="text-xl md:text-2xl font-black font-heading tracking-tighter text-gray-800 dark:text-white">{APP_NAME}</span>
            </div>

            {/* Search Bar (Wide) - Centered using mx-auto */}
            <div className="flex-1 max-w-2xl hidden md:flex mx-auto">
              <div className="relative w-full group">
                <input 
                  type="text" 
                  placeholder="Search products, brands and categories..." 
                  className="w-full bg-gray-100 dark:bg-white/5 border border-transparent focus:bg-white dark:focus:bg-black focus:border-cyan-500 rounded-xl pl-5 pr-14 py-3 text-sm outline-none transition-all dark:text-white shadow-inner"
                  value={searchQuery}
                  onChange={(e) => { 
                    setSearchQuery(e.target.value); 
                    if (e.target.value && view !== ViewState.PRODUCTS) setView(ViewState.PRODUCTS); 
                  }}
                />
                <button className="absolute right-2 top-2 bg-cyan-600 hover:bg-cyan-700 text-white p-1.5 rounded-lg transition-colors shadow-md">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mobile Menu & Search Trigger */}
            <div className="flex md:hidden ml-auto gap-4">
               <button onClick={() => setView(ViewState.PRODUCTS)} className="text-gray-600 dark:text-gray-300">
                  <Search className="w-6 h-6" />
               </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 md:gap-8">
               <button onClick={toggleTheme} className="text-gray-500 dark:text-gray-400 hover:text-cyan-600 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-all">
                 {themeMode === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
               </button>
               
               {/* User Auth Trigger */}
               <div className="flex items-center gap-2 cursor-pointer group relative">
                  {currentUser ? (
                    <div className="flex items-center gap-2" onClick={() => setView(ViewState.PROFILE)} title="My Account">
                      <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-cyan-500 p-0.5">
                        <div className="w-full h-full rounded-full overflow-hidden">
                          {currentUser.avatar ? (
                            <img src={currentUser.avatar} alt="User" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-cyan-600 flex items-center justify-center text-white font-bold">{currentUser.name.charAt(0)}</div>
                          )}
                        </div>
                      </div>
                      <div className="hidden lg:block">
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Account</p>
                        <p className="text-sm font-bold leading-none truncate max-w-[100px]">{currentUser.name.split(' ')[0]}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-white/5 p-1.5 rounded-lg transition-colors" onClick={() => setIsAuthOpen(true)}>
                      <User className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-cyan-600" />
                      <div className="hidden lg:block">
                         <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Welcome</p>
                         <p className="text-sm font-bold leading-none">Sign In</p>
                      </div>
                    </div>
                  )}
               </div>

               <div className="relative cursor-pointer p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors" onClick={() => setIsCartOpen(true)}>
                  <ShoppingBag className="w-6 h-6 text-gray-600 dark:text-gray-300 hover:text-cyan-600" />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-black animate-bounce">
                      {cart.reduce((a, b) => a + b.quantity, 0)}
                    </span>
                  )}
               </div>
            </div>
          </div>
        </header>

        <main className={`${CONTAINER_CLASS} py-8`}>
          
          {view === ViewState.HOME && (
            <>
              {/* SECTION: Hero Area (3-Column Layout) */}
              <div className="grid grid-cols-12 gap-6 h-auto lg:h-[420px] mb-12">
                 {/* 1. Sidebar Category (20%) */}
                 <div className="hidden lg:col-span-2 lg:block h-full">
                    <CategorySidebar onSelect={handleCategorySelect} />
                 </div>

                 {/* 2. Main Slider (60%) */}
                 <div className="col-span-12 lg:col-span-8 h-[220px] md:h-[300px] lg:h-full relative rounded-2xl overflow-hidden shadow-sm group bg-gray-200 dark:bg-gray-800">
                    {HERO_SLIDES.map((slide, i) => (
                       <div key={slide.id} className={`absolute inset-0 transition-opacity duration-1000 ${i === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                          <img src={slide.img} className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[2000ms]" />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent flex flex-col justify-center px-8 md:px-16">
                             <h2 className="text-3xl md:text-6xl font-black text-white font-heading mb-4 translate-y-4 opacity-0 transition-all duration-700 delay-300 drop-shadow-lg" style={{ transform: i === currentSlide ? 'translateY(0)' : 'translateY(20px)', opacity: i === currentSlide ? 1 : 0 }}>{slide.title}</h2>
                             <p className="text-cyan-400 text-lg md:text-2xl font-bold mb-8 translate-y-4 opacity-0 transition-all duration-700 delay-500 drop-shadow-md" style={{ transform: i === currentSlide ? 'translateY(0)' : 'translateY(20px)', opacity: i === currentSlide ? 1 : 0 }}>{slide.sub}</p>
                             <button onClick={() => setView(ViewState.PRODUCTS)} className="bg-white text-gray-900 font-bold py-3 px-8 rounded-full w-fit hover:bg-cyan-500 hover:text-white transition-all shadow-lg hover:shadow-cyan-500/50">Shop Now</button>
                          </div>
                       </div>
                    ))}
                    {/* Dots */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                       {HERO_SLIDES.map((_, i) => (
                          <button key={i} onClick={() => setCurrentSlide(i)} className={`h-2 rounded-full transition-all duration-300 shadow-sm ${i === currentSlide ? 'bg-cyan-500 w-8' : 'bg-white/50 w-2 hover:bg-white'}`} />
                       ))}
                    </div>
                 </div>

                 {/* 3. Right Promo Column (20%) */}
                 <div className="hidden lg:col-span-2 lg:flex flex-col gap-6 h-full">
                    
                    {/* Top Card: Premium Member Hub */}
                    <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-white/5 flex flex-col justify-between relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
                        {/* Background Decoration */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/5 to-blue-600/5 z-0 group-hover:from-cyan-600/10 group-hover:to-blue-600/10 transition-colors"></div>
                        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>

                        {/* User Header */}
                        <div className="relative z-10">
                           <div className="flex items-center gap-3 mb-4 cursor-pointer" onClick={() => currentUser ? setView(ViewState.PROFILE) : setIsAuthOpen(true)}>
                                <div className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-700 overflow-hidden shadow-sm flex-shrink-0">
                                  {currentUser ? (
                                     currentUser.avatar ? <img src={currentUser.avatar} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-cyan-600 flex items-center justify-center text-white font-bold text-sm">{currentUser.name.charAt(0)}</div>
                                  ) : (
                                     <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                                        <User className="w-6 h-6" />
                                     </div>
                                  )}
                                </div>
                                <div className="min-w-0">
                                   <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Welcome</p>
                                   <p className="font-bold text-base text-gray-900 dark:text-white truncate leading-tight">
                                      {currentUser ? currentUser.name.split(' ')[0] : 'Guest'}
                                   </p>
                                </div>
                           </div>

                           {/* Wallet Balance / Gamification */}
                           <div className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-black dark:to-gray-900 rounded-xl p-4 text-white shadow-lg mb-4 border border-gray-700">
                              <div className="flex justify-between items-start">
                                 <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Coins</p>
                                    <div className="flex items-baseline gap-1">
                                       <span className="text-2xl font-black text-yellow-400">{currentUser ? '2,450' : '0'}</span>
                                       <span className="text-[10px] text-gray-500">pts</span>
                                    </div>
                                 </div>
                                 <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                                    <Wallet className="w-5 h-5 text-cyan-400" />
                                 </div>
                              </div>
                           </div>
                        </div>
                        
                        {/* Quick Actions Grid */}
                        <div className="relative z-10 grid grid-cols-2 gap-3">
                           <button 
                             onClick={() => currentUser ? setView(ViewState.PROFILE) : setIsAuthOpen(true)}
                             className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-colors gap-1.5 border border-transparent hover:border-cyan-200 dark:hover:border-cyan-800/30"
                           >
                              <ShoppingBag className="w-5 h-5 text-cyan-600" />
                              <span className="text-[10px] font-bold text-gray-600 dark:text-gray-300">Orders</span>
                           </button>
                           <button className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors gap-1.5 border border-transparent hover:border-orange-200 dark:hover:border-orange-800/30">
                              <Ticket className="w-5 h-5 text-orange-500" />
                              <span className="text-[10px] font-bold text-gray-600 dark:text-gray-300">Vouchers</span>
                           </button>
                        </div>
                    </div>

                    {/* Bottom Card: Live Deal of the Hour */}
                    <div className="h-[45%] relative rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-shadow" onClick={() => { handleCategorySelect('Audio'); setView(ViewState.PRODUCTS); }}>
                       <img src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>
                       
                       {/* Floating Timer Badge */}
                       <div className="absolute top-3 right-3 bg-red-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 animate-pulse shadow-lg border border-red-400/30">
                          <Timer className="w-3 h-3" />
                          <span>02:14:59</span>
                       </div>

                       {/* Content */}
                       <div className="absolute inset-x-0 bottom-0 p-5">
                          <div className="flex items-center gap-2 mb-1.5">
                             <span className="bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide">Hot</span>
                             <p className="text-cyan-400 text-xs font-bold uppercase tracking-wide">Audio Gear</p>
                          </div>
                          <h3 className="text-white font-bold leading-tight mb-3 line-clamp-2 text-lg group-hover:text-cyan-400 transition-colors">Sony Noise Cancelling Pro X2</h3>
                          <div className="flex items-center justify-between">
                             <div className="flex flex-col">
                                <span className="text-gray-400 text-[10px] line-through font-medium">৳35,000</span>
                                <span className="text-white font-bold text-xl">৳28,500</span>
                             </div>
                             <button className="bg-white text-black p-2.5 rounded-full hover:bg-cyan-400 hover:scale-110 transition-all shadow-lg">
                                <ArrowRight className="w-4 h-4" />
                             </button>
                          </div>
                       </div>
                    </div>

                 </div>
              </div>

              {/* Service Bar Strip */}
              <div className="mb-12">
                 <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-white/5 py-6 px-6 lg:px-12 flex justify-between flex-wrap gap-6 lg:gap-8">
                    {SERVICE_FEATURES.map(f => (
                       <div key={f.id} className="flex items-center gap-3 group cursor-pointer flex-1 min-w-[200px] justify-center lg:justify-start">
                          <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-full group-hover:bg-cyan-50 dark:group-hover:bg-cyan-900/20 transition-colors">
                             <Truck className="w-6 h-6 text-cyan-600 group-hover:scale-110 transition-transform" />
                          </div>
                          <div>
                             <h4 className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-cyan-600 transition-colors">{f.title}</h4>
                             <p className="text-xs text-gray-500 dark:text-gray-400">{f.desc}</p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Marquee Ticker */}
              <div className="mb-12 rounded-xl overflow-hidden shadow-lg border border-gray-800">
                <Marquee />
              </div>

              {/* SECTION: Flash Sale */}
              <div className="mb-16">
                 <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-white/5 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 dark:border-white/5 flex items-center justify-between bg-gray-50 dark:bg-white/5">
                       <div className="flex items-center gap-4 md:gap-6">
                          <h2 className="text-xl md:text-2xl font-bold text-orange-500 flex items-center gap-2">
                             <Flame className="w-6 h-6 fill-current animate-pulse" /> Flash Sale
                          </h2>
                          <div className="flex gap-3 items-center">
                             <span className="text-xs font-bold text-gray-500 uppercase tracking-widest hidden md:block">Ending in</span>
                             <div className="flex gap-1.5 text-white text-sm font-bold">
                                <span className="bg-orange-500 px-2 py-1.5 rounded-md min-w-[32px] text-center">02</span>
                                <span className="text-orange-500 py-1 font-black">:</span>
                                <span className="bg-orange-500 px-2 py-1.5 rounded-md min-w-[32px] text-center">15</span>
                                <span className="text-orange-500 py-1 font-black">:</span>
                                <span className="bg-orange-500 px-2 py-1.5 rounded-md min-w-[32px] text-center">45</span>
                             </div>
                          </div>
                       </div>
                       <button onClick={() => setView(ViewState.PRODUCTS)} className="text-orange-600 border border-orange-200 dark:border-orange-800 hover:bg-orange-50 dark:hover:bg-orange-900/20 text-xs font-bold px-6 py-2.5 rounded-full transition-colors uppercase tracking-wide">See All</button>
                    </div>
                    
                    <div className="p-6 overflow-x-auto scrollbar-hide flex gap-5">
                       {MOCK_PRODUCTS.slice(0, 8).map((p) => (
                          <FlashSaleCard 
                            key={p.id} 
                            product={p} 
                            onClick={() => handleProductClick(p)} 
                            onAdd={() => addToCart(p)}
                            onCompare={() => toggleCompare(p)}
                            onQuickView={() => setQuickViewProduct(p)}
                            isCompared={compareList.some(c => c.id === p.id)}
                            onToggleWishlist={() => toggleWishlist(p)}
                            isWishlisted={wishlist.some(w => w.id === p.id)}
                          />
                       ))}
                    </div>
                 </div>
              </div>

              {/* SECTION: Categories Grid */}
              <div className="mb-16">
                 <div className="flex justify-between items-end mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Shop By Categories</h2>
                 </div>
                 <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 md:gap-6">
                    {ALL_CATEGORIES.slice(0, 8).map((cat, idx) => (
                       <div 
                        key={idx} 
                        onClick={() => handleCategorySelect(cat.name)}
                        className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-white/5 p-4 flex flex-col items-center justify-center gap-3 hover:shadow-lg cursor-pointer transition-all hover:-translate-y-1 hover:border-cyan-500/30 group h-32"
                      >
                          <div className="w-12 h-12 rounded-full bg-cyan-50 dark:bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform group-hover:bg-cyan-100 dark:group-hover:bg-cyan-900/30">
                             <Sparkles className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                          </div>
                          <span className="text-xs font-bold text-center text-gray-700 dark:text-gray-300 group-hover:text-cyan-600 transition-colors leading-tight">{cat.name}</span>
                       </div>
                    ))}
                 </div>
              </div>

              {/* SECTION: Splash Offer */}
              <SplashOffer onClick={() => setView(ViewState.PRODUCTS)} />

              {/* SECTION: Today's Top Sales */}
              <div className="mb-16 animate-fade-in-up">
                 <div className="flex items-center justify-between mb-8 border-b border-gray-200 dark:border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                       <div className="p-2.5 bg-red-100 dark:bg-red-900/20 rounded-full text-red-600">
                          <Flame className="w-6 h-6 fill-current animate-pulse" />
                       </div>
                       <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Today's Top Sales</h2>
                    </div>
                    <button onClick={() => { handleCategorySelect('Top Sales'); setView(ViewState.PRODUCTS); }} className="text-sm font-bold text-cyan-600 hover:underline flex items-center gap-1.5 bg-cyan-50 dark:bg-cyan-900/10 px-4 py-2 rounded-lg">
                       View All <ArrowRight className="w-4 h-4" />
                    </button>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {MOCK_PRODUCTS.slice(0, 4).map((p, idx) => (
                       <div 
                         key={p.id}
                         onClick={() => handleProductClick(p)}
                         className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-white/5 p-5 flex gap-5 cursor-pointer hover:shadow-xl hover:border-cyan-500/20 transition-all group relative overflow-hidden items-center"
                       >
                          <div className={`absolute top-0 left-0 text-white text-xs font-bold px-3 py-1.5 rounded-br-xl z-10 shadow-md ${
                              idx === 0 ? 'bg-yellow-500' : idx === 1 ? 'bg-gray-400' : idx === 2 ? 'bg-orange-700' : 'bg-gray-800'
                          }`}>
                             #{idx + 1} Best Seller
                          </div>

                          <div className="w-24 h-24 flex-shrink-0 bg-gray-100 dark:bg-black/20 rounded-xl overflow-hidden">
                             <img src={p.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          
                          <div className="flex flex-col justify-center flex-1 min-w-0">
                             <h3 className="font-bold text-sm text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-cyan-600 transition-colors h-10">{p.name}</h3>
                             <div className="flex items-baseline gap-2 mb-3">
                                <span className="text-orange-500 font-bold text-lg">৳{p.price.toLocaleString()}</span>
                                <span className="text-xs text-gray-400 line-through">৳{Math.round(p.price * 1.2).toLocaleString()}</span>
                             </div>
                             
                             <div className="w-full bg-gray-100 dark:bg-white/10 h-2 rounded-full overflow-hidden mb-1">
                                <div className="bg-gradient-to-r from-orange-500 to-red-500 h-full rounded-full" style={{ width: `${90 - (idx * 15)}%` }}></div>
                             </div>
                             <p className="text-[10px] text-gray-500 flex justify-between">
                                <span>{200 - (idx * 20)} sold</span>
                                <span className="text-red-500 font-bold uppercase tracking-wider">Hot</span>
                             </p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              {/* SECTION: Just For You (Infinite Grid) */}
              <div className="mb-24">
                 <div className="flex items-center gap-3 mb-8">
                     <div className="w-1.5 h-8 bg-cyan-600 rounded-full"></div>
                     <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Just For You</h2>
                 </div>
                 
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
                    {justForYouProducts.slice(0, visibleProductCount).map((p) => (
                       <ProductCardMinimal 
                         key={p.id} 
                         product={p} 
                         onClick={() => handleProductClick(p)} 
                         onAdd={() => addToCart(p)} 
                         onCompare={() => toggleCompare(p)}
                         onQuickView={() => setQuickViewProduct(p)}
                         isCompared={compareList.some(c => c.id === p.id)}
                         onToggleWishlist={() => toggleWishlist(p)}
                         isWishlisted={wishlist.some(w => w.id === p.id)}
                       />
                    ))}
                 </div>
                 
                 {visibleProductCount < justForYouProducts.length && (
                    <div className="mt-16 text-center">
                        <button 
                            onClick={handleLoadMore}
                            disabled={isLoadingMore}
                            className="px-12 py-4 border-2 border-cyan-600 text-cyan-600 dark:text-cyan-400 dark:border-cyan-400 font-bold rounded-full hover:bg-cyan-600 hover:text-white transition-all uppercase tracking-widest text-xs flex items-center gap-3 mx-auto disabled:opacity-70 disabled:cursor-not-allowed group"
                        >
                            {isLoadingMore ? (
                                <><Loader2 className="w-4 h-4 animate-spin" /> Loading...</>
                            ) : (
                                <>Load More Products <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                            )}
                        </button>
                    </div>
                 )}
              </div>

              {/* SECTION: Recently Viewed */}
              {recentlyViewed.length > 0 && (
                <div className="mb-16 animate-fade-in-up">
                   <div className="flex items-center gap-2 mb-6 border-b border-gray-200 dark:border-white/10 pb-4">
                      <History className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                      <h2 className="text-xl font-bold text-gray-800 dark:text-white">Recently Viewed</h2>
                   </div>
                   <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-white/5">
                      <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-2">
                         {recentlyViewed.map(p => (
                            <div key={p.id} className="min-w-[160px] w-[160px]">
                               <ProductCardMinimal 
                                 product={p} 
                                 onClick={() => handleProductClick(p)} 
                                 onAdd={() => addToCart(p)} 
                                 onCompare={() => toggleCompare(p)}
                                 onQuickView={() => setQuickViewProduct(p)}
                                 isCompared={compareList.some(c => c.id === p.id)}
                                 onToggleWishlist={() => toggleWishlist(p)}
                                 isWishlisted={wishlist.some(w => w.id === p.id)}
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
               {/* Mobile Filter Toggle */}
               <div className="lg:hidden mb-4">
                 <button 
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 py-3 rounded-xl font-bold text-gray-700 dark:text-white shadow-sm"
                 >
                   <Filter className="w-5 h-5" /> Filter Products
                 </button>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  {/* Left Column: Filters */}
                  <div className={`
                    fixed inset-0 z-[60] lg:static lg:z-auto lg:block transition-all duration-300
                    ${isMobileFilterOpen ? 'visible opacity-100' : 'invisible opacity-0 lg:visible lg:opacity-100'}
                  `}>
                    {/* Mobile Backdrop */}
                    <div 
                      className={`absolute inset-0 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${isMobileFilterOpen ? 'opacity-100' : 'opacity-0'}`} 
                      onClick={() => setIsMobileFilterOpen(false)}
                    ></div>
                    
                    {/* Filter Panel Content */}
                    <div className={`
                       absolute inset-y-0 left-0 w-full max-w-xs bg-white dark:bg-gray-900 lg:relative lg:w-auto lg:bg-transparent lg:inset-auto h-full lg:h-auto overflow-y-auto lg:overflow-visible transition-transform duration-300
                       ${isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                    `}>
                      <ProductFilter 
                        categories={ALL_CATEGORIES}
                        brands={BRANDS}
                        selectedCategories={selectedCategories}
                        onCategoryChange={toggleFilterCategory}
                        selectedBrands={selectedBrands}
                        onBrandChange={toggleFilterBrand}
                        priceRange={priceRange}
                        onPriceChange={setPriceRange}
                        minRating={minRating}
                        onRatingChange={setMinRating}
                        className="sticky top-24 min-h-screen lg:min-h-0"
                        onCloseMobile={() => setIsMobileFilterOpen(false)}
                      />
                    </div>
                  </div>

                  {/* Right Column: Product Grid */}
                  <div className="lg:col-span-3">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5">
                        <div>
                          <h1 className="text-2xl font-bold dark:text-white mb-1">
                            {selectedCategories.length === 1 ? selectedCategories[0] : 'All Products'}
                          </h1>
                          <p className="text-sm text-gray-500">
                            Showing <span className="font-bold text-cyan-600">{displayedProducts.length}</span> results
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <div className="relative group z-30">
                              <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-white/10 rounded-xl text-sm font-bold text-gray-700 dark:text-white hover:border-cyan-500 transition-colors">
                                  <ListFilter className="w-4 h-4" />
                                  {sortBy === 'relevance' ? 'Relevance' : sortBy === 'price-asc' ? 'Price: Low to High' : sortBy === 'price-desc' ? 'Price: High to Low' : 'Top Rated'}
                              </button>
                              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-100 dark:border-white/10 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all transform origin-top-right scale-95 group-hover:scale-100">
                                  <div className="py-2">
                                    <button onClick={() => setSortBy('relevance')} className={`block w-full text-left px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-white/5 ${sortBy === 'relevance' ? 'text-cyan-600 font-bold bg-cyan-50/50 dark:bg-cyan-900/20' : 'text-gray-700 dark:text-gray-300'}`}>Relevance</button>
                                    <button onClick={() => setSortBy('price-asc')} className={`block w-full text-left px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-white/5 ${sortBy === 'price-asc' ? 'text-cyan-600 font-bold bg-cyan-50/50 dark:bg-cyan-900/20' : 'text-gray-700 dark:text-gray-300'}`}>Price: Low to High</button>
                                    <button onClick={() => setSortBy('price-desc')} className={`block w-full text-left px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-white/5 ${sortBy === 'price-desc' ? 'text-cyan-600 font-bold bg-cyan-50/50 dark:bg-cyan-900/20' : 'text-gray-700 dark:text-gray-300'}`}>Price: High to Low</button>
                                    <button onClick={() => setSortBy('rating')} className={`block w-full text-left px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-white/5 ${sortBy === 'rating' ? 'text-cyan-600 font-bold bg-cyan-50/50 dark:bg-cyan-900/20' : 'text-gray-700 dark:text-gray-300'}`}>Top Rated</button>
                                  </div>
                              </div>
                            </div>

                            {(selectedCategories.length > 0 || selectedBrands.length > 0 || priceRange[0] > 0 || minRating) && (
                              <button 
                                onClick={clearAllFilters}
                                className="flex items-center gap-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 px-4 py-2.5 rounded-xl transition-colors text-sm font-bold border border-transparent hover:border-red-200"
                              >
                                <X className="w-4 h-4" /> Clear
                              </button>
                            )}
                        </div>
                      </div>

                      {displayedProducts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/5 text-center px-4">
                            <div className="w-20 h-20 bg-gray-200 dark:bg-white/10 rounded-full flex items-center justify-center mb-6">
                              <Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-700 dark:text-gray-200">No Products Found</h3>
                            <p className="text-gray-500 mt-2 max-w-xs mx-auto">We couldn't find any products matching your filters.</p>
                            <button onClick={clearAllFilters} className="mt-6 text-cyan-600 font-bold hover:underline">Clear All Filters</button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                            {displayedProducts.map(p => (
                              <ProductCardMinimal 
                                key={p.id} 
                                product={p} 
                                onClick={() => handleProductClick(p)} 
                                onAdd={() => addToCart(p)}
                                onCompare={() => toggleCompare(p)}
                                onQuickView={() => setQuickViewProduct(p)}
                                isCompared={compareList.some(c => c.id === p.id)} 
                                onToggleWishlist={() => toggleWishlist(p)}
                                isWishlisted={wishlist.some(w => w.id === p.id)}
                              />
                            ))}
                        </div>
                      )}
                  </div>
               </div>
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
              onToggleWishlist={() => toggleWishlist(selectedProduct)}
              isWishlisted={wishlist.some(w => w.id === selectedProduct.id)}
            />
          )}

          {view === ViewState.CART_CHECKOUT && (
             <div className="py-4">
                <OneSlideCheckout cart={cart} onBack={() => setView(ViewState.HOME)} onComplete={() => { setCart([]); setView(ViewState.HOME); showToast('Order Placed Successfully!', 'success'); }} />
             </div>
          )}

          {view === ViewState.PROFILE && currentUser && (
             <div className="py-4">
               <UserProfileView 
                 user={currentUser} 
                 onLogout={handleLogout} 
                 onUpdateUser={(updated) => setCurrentUser(updated)}
                 wishlist={wishlist}
                 onToggleWishlist={toggleWishlist}
               />
             </div>
          )}

          {view === ViewState.TRACK_ORDER && (
             <TrackOrderView onBack={() => setView(ViewState.HOME)} />
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
           <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white dark:bg-gray-800 shadow-2xl rounded-full px-6 py-3 border border-gray-200 dark:border-white/10 flex items-center gap-4 animate-fade-in-up">
              <div className="flex items-center gap-2">
                 <Scale className="w-5 h-5 text-cyan-600" />
                 <span className="font-bold text-gray-800 dark:text-white">{compareList.length} <span className="text-xs font-normal text-gray-500">/ 4</span></span>
              </div>
              <div className="h-4 w-px bg-gray-300 dark:bg-gray-600"></div>
              <button onClick={() => setCompareList([])} className="text-xs font-bold text-gray-500 hover:text-red-500 transition-colors">Clear</button>
              <button 
                 onClick={() => setView(ViewState.COMPARE)}
                 className="bg-cyan-600 text-white text-xs font-bold px-6 py-2 rounded-full hover:bg-cyan-700 transition-colors"
              >
                 COMPARE
              </button>
           </div>
        )}

        {/* Mega Footer */}
        <footer className="bg-gray-900 text-gray-300 pt-20 pb-10 text-sm mt-20 border-t border-gray-800">
           {/* Top: App Download */}
           <div className={`${CONTAINER_CLASS} flex flex-col md:flex-row justify-between items-center mb-16 gap-8 bg-gray-800/50 p-8 rounded-3xl border border-gray-700`}>
              <div className="flex items-center gap-6">
                 <div className="w-16 h-16 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-cyan-900/50">
                    <Smartphone className="w-8 h-8" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Shop Better on App</h3>
                    <p className="text-gray-400">Get exclusive deals & fast updates directly.</p>
                 </div>
              </div>
              <div className="flex gap-4">
                 <button className="flex items-center gap-2 bg-black border border-gray-600 px-6 py-3 rounded-xl hover:border-white transition-all hover:scale-105">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" className="h-8" alt="Play Store" />
                 </button>
                 <button className="flex items-center gap-2 bg-black border border-gray-600 px-6 py-3 rounded-xl hover:border-white transition-all hover:scale-105">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" className="h-8" alt="App Store" />
                 </button>
              </div>
           </div>

           {/* Middle: Links */}
           <div className={`${CONTAINER_CLASS} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-16 mb-16`}>
              <div className="lg:col-span-1">
                 <div className="flex items-center gap-2 mb-8 text-white">
                     <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center font-bold text-lg">R</div>
                     <span className="font-heading font-black text-2xl tracking-tight">{APP_NAME}</span>
                 </div>
                 <div className="space-y-4 text-sm text-gray-400">
                    <div className="flex items-start gap-3">
                       <MapPin className="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                       <span className="leading-relaxed">Level 4, Bashundhara City,<br/>Panthapath, Dhaka-1215</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <Mail className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                       <span>support@raselstore.bd</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <Phone className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                       <span>+880 1712 345678</span>
                    </div>
                 </div>
              </div>

              <div>
                 <h4 className="text-white font-bold mb-6 text-lg">Customer Care</h4>
                 <ul className="space-y-4 text-gray-400">
                    <li className="hover:text-cyan-400 cursor-pointer transition-colors">Help Center</li>
                    <li className="hover:text-cyan-400 cursor-pointer transition-colors">How to Buy</li>
                    <li className="hover:text-cyan-400 cursor-pointer transition-colors">Returns & Refunds</li>
                    <li className="hover:text-cyan-400 cursor-pointer transition-colors">Contact Us</li>
                    <li className="hover:text-cyan-400 cursor-pointer transition-colors">Terms & Conditions</li>
                 </ul>
              </div>

              <div>
                 <h4 className="text-white font-bold mb-6 text-lg">Rasel Store</h4>
                 <ul className="space-y-4 text-gray-400">
                    <li className="hover:text-cyan-400 cursor-pointer transition-colors">About Us</li>
                    <li className="hover:text-cyan-400 cursor-pointer transition-colors">Digital Payments</li>
                    <li className="hover:text-cyan-400 cursor-pointer transition-colors">Rasel Card</li>
                    <li className="hover:text-cyan-400 cursor-pointer transition-colors">Blog</li>
                    <li className="hover:text-cyan-400 cursor-pointer transition-colors">Privacy Policy</li>
                 </ul>
              </div>

              <div>
                 <h4 className="text-white font-bold mb-6 text-lg">Payment Methods</h4>
                 <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white p-2 rounded-lg h-10 flex items-center justify-center hover:scale-105 transition-transform"><span className="text-pink-600 font-bold text-xs">bKash</span></div>
                    <div className="bg-white p-2 rounded-lg h-10 flex items-center justify-center hover:scale-105 transition-transform"><span className="text-orange-600 font-bold text-xs">Nagad</span></div>
                    <div className="bg-white p-2 rounded-lg h-10 flex items-center justify-center hover:scale-105 transition-transform"><CreditCard className="text-gray-600 w-5 h-5" /></div>
                    <div className="bg-white p-2 rounded-lg h-10 flex items-center justify-center hover:scale-105 transition-transform"><span className="text-blue-800 font-bold text-xs">VISA</span></div>
                    <div className="bg-white p-2 rounded-lg h-10 flex items-center justify-center hover:scale-105 transition-transform"><span className="text-red-600 font-bold text-xs">MC</span></div>
                    <div className="bg-white p-2 rounded-lg h-10 flex items-center justify-center hover:scale-105 transition-transform"><span className="text-gray-800 font-bold text-xs">COD</span></div>
                 </div>
              </div>
              
              <div>
                 <h4 className="text-white font-bold mb-6 text-lg">Newsletter</h4>
                 <p className="text-gray-400 mb-4 leading-relaxed">Subscribe to get new offers and daily deals!</p>
                 <div className="flex gap-2">
                    <input type="email" placeholder="Your Email" className="bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-xl w-full text-sm focus:border-cyan-500 outline-none transition-colors" />
                    <button className="bg-cyan-600 p-3 rounded-xl hover:bg-cyan-700 text-white transition-colors shadow-lg"><Send className="w-4 h-4" /></button>
                 </div>
                 <div className="mt-8 flex gap-6">
                    <Facebook className="w-6 h-6 text-gray-500 hover:text-white cursor-pointer transition-colors hover:scale-110" />
                    <Instagram className="w-6 h-6 text-gray-500 hover:text-white cursor-pointer transition-colors hover:scale-110" />
                    <Youtube className="w-6 h-6 text-gray-500 hover:text-white cursor-pointer transition-colors hover:scale-110" />
                    <Linkedin className="w-6 h-6 text-gray-500 hover:text-white cursor-pointer transition-colors hover:scale-110" />
                 </div>
              </div>
           </div>

           {/* Bottom */}
           <div className={`${CONTAINER_CLASS} pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4`}>
              <p>&copy; 2024 {APP_NAME} Limited. All rights reserved.</p>
              <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full">
                 <span>Made with</span>
                 <Flame className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
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
