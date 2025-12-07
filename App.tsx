import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, Sun, Moon, Zap, User, ArrowRight, Truck, ShieldCheck, Cpu, Mail, MapPin, Phone, Globe, Instagram, Facebook, Twitter, X } from 'lucide-react';
import { MOCK_PRODUCTS, SUGGESTED_QUERIES } from './constants';
import { Product, CartItem, UserContext, ViewState } from './types';
import { Copilot } from './components/Copilot';
import { OneSlideCheckout } from './components/OneSlideCheckout';
import { Product3DViewer } from './components/Product3DViewer';

// --- Sub-Components ---

const FeatureCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors group cursor-default">
    <div className="w-12 h-12 bg-cyan-900/30 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
      <Icon className="w-6 h-6 text-cyan-400" />
    </div>
    <h3 className="text-xl font-bold mb-2 text-white font-heading">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

const Footer = ({ onNavigate }: { onNavigate: (view: ViewState) => void }) => (
  <footer className="bg-black border-t border-white/10 pt-16 pb-8 px-8 md:px-16">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
      <div className="space-y-4">
        <h2 className="text-2xl font-black tracking-widest text-white font-heading">LUMINA</h2>
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
      <p>© 2024 Lumina Store. All rights reserved.</p>
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
  const [userContext, setUserContext] = useState<UserContext>({
    timeOfDay: 'afternoon',
    location: 'Dhaka',
    deviceType: 'desktop'
  });

  // Adaptivity Logic: Set theme based on time
  useEffect(() => {
    const hours = new Date().getHours();
    let time: UserContext['timeOfDay'] = 'night';
    if (hours >= 5 && hours < 12) time = 'morning';
    else if (hours >= 12 && hours < 17) time = 'afternoon';
    else if (hours >= 17 && hours < 21) time = 'evening';
    
    setUserContext(prev => ({ ...prev, timeOfDay: time }));
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

  const handleCheckoutComplete = () => {
    setCart([]);
    setView(ViewState.HOME);
    alert("Order Placed Successfully! 🚀");
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setView(ViewState.PRODUCT_DETAIL);
  };

  // Helper to render stars
  const renderStars = (rating: number) => (
    <div className="flex text-yellow-400 text-xs">
      {'★'.repeat(Math.floor(rating))}
      <span className="text-gray-600">{'★'.repeat(5 - Math.floor(rating))}</span>
    </div>
  );

  return (
    <div className={`min-h-screen text-white font-sans transition-colors duration-1000 flex flex-col ${
      userContext.timeOfDay === 'morning' ? 'bg-slate-900' : 'bg-black'
    }`}>
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
         <div className={`absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-20 ${
           userContext.timeOfDay === 'morning' ? 'bg-orange-500' : 'bg-purple-900'
         }`}></div>
         <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-cyan-900 rounded-full blur-[120px] opacity-10"></div>
      </div>

      {/* Navigation Header */}
      <header className="px-6 py-4 backdrop-blur-xl border-b border-white/5 bg-black/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
            <h1 className="text-2xl font-black tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 cursor-pointer font-heading" onClick={() => setView(ViewState.HOME)}>
              LUMINA
            </h1>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
             <button onClick={() => setView(ViewState.HOME)} className={`hover:text-white transition-colors ${view === ViewState.HOME ? 'text-cyan-400' : ''}`}>Home</button>
             <button onClick={() => setView(ViewState.PRODUCTS)} className={`hover:text-white transition-colors ${view === ViewState.PRODUCTS ? 'text-cyan-400' : ''}`}>Shop</button>
             <button onClick={() => setView(ViewState.ABOUT)} className={`hover:text-white transition-colors ${view === ViewState.ABOUT ? 'text-cyan-400' : ''}`}>About Us</button>
             <button onClick={() => setView(ViewState.CONTACT)} className={`hover:text-white transition-colors ${view === ViewState.CONTACT ? 'text-cyan-400' : ''}`}>Contact</button>
          </nav>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 border border-white/10 w-64">
              <Search className="w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none outline-none text-sm w-full text-white placeholder-gray-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <button className="relative" onClick={() => cart.length > 0 && setView(ViewState.CART_CHECKOUT)}>
              <ShoppingBag className="w-6 h-6 hover:text-cyan-400 transition-colors" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-cyan-500 text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cart.reduce((acc, i) => acc + i.quantity, 0)}
                </span>
              )}
            </button>
            
            <div className="hidden md:block w-px h-6 bg-white/10"></div>
            <div className="hidden md:flex items-center gap-2 text-xs text-gray-400">
               <MapPin className="w-3 h-3" />
               <span>{userContext.location}</span>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
           <div className="md:hidden absolute top-full left-0 w-full bg-black border-b border-white/10 p-4 flex flex-col gap-4 shadow-2xl animate-fade-in">
              <button onClick={() => { setView(ViewState.HOME); setMobileMenuOpen(false); }} className="text-left text-gray-300 hover:text-white py-2 border-b border-white/5">Home</button>
              <button onClick={() => { setView(ViewState.PRODUCTS); setMobileMenuOpen(false); }} className="text-left text-gray-300 hover:text-white py-2 border-b border-white/5">Shop Products</button>
              <button onClick={() => { setView(ViewState.ABOUT); setMobileMenuOpen(false); }} className="text-left text-gray-300 hover:text-white py-2 border-b border-white/5">About Us</button>
              <button onClick={() => { setView(ViewState.CONTACT); setMobileMenuOpen(false); }} className="text-left text-gray-300 hover:text-white py-2">Contact</button>
           </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 w-full max-w-7xl mx-auto flex flex-col">
        
        {/* --- HOME VIEW --- */}
        {view === ViewState.HOME && (
          <div className="animate-fade-in">
            {/* Hero Section */}
            <section className="relative min-h-[80vh] flex items-center px-6 md:px-16 overflow-hidden">
               <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
                  <div className="space-y-8 animate-fade-in-up">
                     <div className="inline-block px-3 py-1 bg-cyan-900/30 border border-cyan-500/30 text-cyan-400 text-xs font-bold rounded-full tracking-wider">
                        THE FUTURE OF FASHION & TECH
                     </div>
                     <h1 className="text-5xl md:text-7xl font-black leading-tight font-heading">
                        Experience <br/> 
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">Adaptive</span> Reality.
                     </h1>
                     <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
                       Lumina adapts to your world. From weather-responsive apparel to AR-enabled tech, discover gear that evolves with you.
                     </p>
                     <div className="flex flex-wrap gap-4 pt-4">
                       <button onClick={() => setView(ViewState.PRODUCTS)} className="bg-white text-black font-bold py-4 px-10 rounded-full hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                         Shop Collection
                       </button>
                       <button onClick={() => setView(ViewState.ABOUT)} className="border border-white/30 backdrop-blur-md text-white font-bold py-4 px-10 rounded-full hover:bg-white/10 transition-colors flex items-center gap-2">
                         Our Story <ArrowRight className="w-4 h-4" />
                       </button>
                     </div>
                  </div>
                  
                  {/* Hero Visual */}
                  <div className="relative h-[400px] md:h-[600px] w-full hidden lg:block">
                     <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
                     <img 
                        src="https://picsum.photos/id/338/800/800" 
                        className="absolute inset-0 w-full h-full object-cover rounded-[3rem] shadow-2xl border border-white/10 opacity-90 animate-float"
                        alt="Hero Visual"
                     />
                     <div className="absolute -bottom-10 -left-10 bg-black/60 backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex items-center gap-4 shadow-xl">
                        <div className="bg-green-500/20 p-3 rounded-full">
                           <ShieldCheck className="text-green-400 w-6 h-6" />
                        </div>
                        <div>
                           <p className="text-white font-bold">Carbon Neutral</p>
                           <p className="text-xs text-gray-400">Verified Delivery</p>
                        </div>
                     </div>
                  </div>
               </div>
            </section>

            {/* Features Grid */}
            <section className="px-6 md:px-16 py-20">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FeatureCard 
                    icon={Cpu} 
                    title="AI Copilot" 
                    desc="Your personal shopping assistant. Ask questions, compare items, and get style advice in real-time." 
                  />
                  <FeatureCard 
                    icon={Zap} 
                    title="AR Try-On" 
                    desc="Don't just guess. Visualize products in your space or on yourself before you buy." 
                  />
                  <FeatureCard 
                    icon={Truck} 
                    title="Flash Delivery" 
                    desc="Get your gear in under 4 hours within Dhaka. Real-time tracking with carbon-neutral routes." 
                  />
               </div>
            </section>

            {/* Featured Products */}
            <section className="px-6 md:px-16 py-12">
               <div className="flex justify-between items-end mb-8">
                  <div>
                    <h3 className="text-cyan-400 font-bold tracking-widest text-sm mb-2">NEW ARRIVALS</h3>
                    <h2 className="text-3xl md:text-4xl font-black text-white font-heading">Trending Now</h2>
                  </div>
                  <button onClick={() => setView(ViewState.PRODUCTS)} className="text-gray-400 hover:text-white flex items-center gap-2 text-sm font-bold">
                     View All <ArrowRight className="w-4 h-4" />
                  </button>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {MOCK_PRODUCTS.slice(0, 4).map((product) => (
                    <div 
                      key={product.id} 
                      className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-cyan-500/50 transition-all duration-300"
                      onClick={() => handleProductClick(product)}
                    >
                      <div className="aspect-[3/4] overflow-hidden relative">
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        {product.arEnabled && (
                          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full border border-white/20 flex items-center gap-1">
                            <Zap className="w-3 h-3 text-cyan-400" />
                            <span className="text-[10px] font-bold">AR</span>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold truncate text-white mb-1 font-heading">{product.name}</h3>
                        <div className="flex justify-between items-center">
                          <span className="text-cyan-400 font-bold">{product.price.toLocaleString()} BDT</span>
                          {renderStars(product.rating)}
                        </div>
                      </div>
                    </div>
                  ))}
               </div>
            </section>

             {/* Newsletter CTA */}
             <section className="px-6 md:px-16 py-20">
                <div className="bg-gradient-to-r from-cyan-900/40 to-purple-900/40 border border-white/10 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
                   <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                      <h2 className="text-3xl md:text-5xl font-black font-heading text-white">Join the Future</h2>
                      <p className="text-gray-300">Sign up for early access to limited drops and AR experiences.</p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                         <input type="email" placeholder="Enter your email" className="bg-black/50 border border-white/20 rounded-full px-6 py-4 text-white focus:border-cyan-500 outline-none w-full sm:w-96" />
                         <button className="bg-white text-black font-bold px-8 py-4 rounded-full hover:bg-cyan-400 transition-colors">Subscribe</button>
                      </div>
                   </div>
                   <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                </div>
             </section>
          </div>
        )}

        {/* --- PRODUCTS VIEW --- */}
        {view === ViewState.PRODUCTS && (
          <div className="px-6 md:px-16 py-12 animate-fade-in min-h-screen">
            <div className="mb-12 text-center">
               <h1 className="text-4xl md:text-6xl font-black mb-4 font-heading">Shop All</h1>
               <p className="text-gray-400 max-w-2xl mx-auto">Explore our complete collection of adaptive wear and future-ready tech.</p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center mb-12">
               {['All', 'Apparel', 'Tech', 'Footwear'].map(cat => (
                 <button key={cat} className="px-6 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors text-sm font-bold">
                   {cat}
                 </button>
               ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {MOCK_PRODUCTS.map((product) => (
                  <div 
                    key={product.id} 
                    className="group flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]"
                    onClick={() => handleProductClick(product)}
                  >
                    <div className="aspect-square overflow-hidden relative bg-gray-900">
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                         <button className="bg-white text-black font-bold py-2 px-6 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform">View Details</button>
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                         <h3 className="font-bold text-lg leading-tight font-heading">{product.name}</h3>
                         <span className="bg-white/10 px-2 py-1 rounded text-xs text-gray-300">{product.category}</span>
                      </div>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">{product.description}</p>
                      <div className="flex justify-between items-end border-t border-white/10 pt-4">
                        <div>
                           <p className="text-xs text-gray-500 mb-1">Price</p>
                           <p className="text-cyan-400 font-bold text-xl">{product.price.toLocaleString()} BDT</p>
                        </div>
                        <button className="p-2 rounded-full bg-white/5 hover:bg-cyan-600 transition-colors">
                           <ShoppingBag className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        )}

        {/* --- ABOUT VIEW --- */}
        {view === ViewState.ABOUT && (
           <div className="animate-fade-in">
              <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                 <div className="absolute inset-0">
                    <img src="https://picsum.photos/id/20/1920/1080" className="w-full h-full object-cover opacity-30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                 </div>
                 <div className="relative z-10 text-center px-6">
                    <h1 className="text-5xl md:text-7xl font-black mb-6 font-heading tracking-tight">We Are Lumina</h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
                       Architecting the intersection of culture, technology, and sustainability in Bangladesh.
                    </p>
                 </div>
              </div>

              <div className="px-6 md:px-16 py-20 max-w-5xl mx-auto space-y-24">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                       <h2 className="text-3xl font-bold font-heading text-cyan-400">Our Mission</h2>
                       <p className="text-gray-300 leading-loose">
                          Lumina wasn't born in a boardroom; it was forged in the bustling streets of Dhaka and the quiet hum of server rooms. We believe that shopping shouldn't just be a transaction—it should be an experience.
                       </p>
                       <p className="text-gray-300 leading-loose">
                          By leveraging <strong>Artificial Intelligence</strong> and <strong>Augmented Reality</strong>, we bridge the gap between digital convenience and physical assurance. We are building a future where technology serves humanity, not the other way around.
                       </p>
                    </div>
                    <div className="relative h-80 rounded-2xl overflow-hidden border border-white/10">
                       <img src="https://picsum.photos/id/60/800/600" className="w-full h-full object-cover" />
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-8 bg-white/5 rounded-2xl">
                       <h3 className="text-4xl font-black text-white mb-2">100%</h3>
                       <p className="text-gray-400">Carbon Neutral Shipping</p>
                    </div>
                    <div className="p-8 bg-white/5 rounded-2xl">
                       <h3 className="text-4xl font-black text-white mb-2">24/7</h3>
                       <p className="text-gray-400">AI Support Active</p>
                    </div>
                    <div className="p-8 bg-white/5 rounded-2xl">
                       <h3 className="text-4xl font-black text-white mb-2">50k+</h3>
                       <p className="text-gray-400">Happy Customers</p>
                    </div>
                 </div>
              </div>
           </div>
        )}

        {/* --- CONTACT VIEW --- */}
        {view === ViewState.CONTACT && (
           <div className="px-6 md:px-16 py-20 animate-fade-in min-h-screen flex items-center">
              <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16">
                 <div>
                    <h1 className="text-5xl font-black mb-8 font-heading">Get in Touch</h1>
                    <p className="text-gray-400 mb-12 text-lg">
                       Have a question about an order, a product, or just want to talk tech? 
                       Our team (and bots) are ready to help.
                    </p>
                    
                    <div className="space-y-8">
                       <div className="flex items-start gap-4">
                          <div className="p-3 bg-cyan-900/30 rounded-lg">
                             <MapPin className="text-cyan-400 w-6 h-6" />
                          </div>
                          <div>
                             <h3 className="font-bold text-white mb-1">Headquarters</h3>
                             <p className="text-gray-400">Level 12, Future Tower<br/>Gulshan Avenue, Dhaka-1212</p>
                          </div>
                       </div>
                       
                       <div className="flex items-start gap-4">
                          <div className="p-3 bg-purple-900/30 rounded-lg">
                             <Mail className="text-purple-400 w-6 h-6" />
                          </div>
                          <div>
                             <h3 className="font-bold text-white mb-1">Email Us</h3>
                             <p className="text-gray-400">hello@luminastore.bd<br/>support@luminastore.bd</p>
                          </div>
                       </div>

                       <div className="flex items-start gap-4">
                          <div className="p-3 bg-green-900/30 rounded-lg">
                             <Phone className="text-green-400 w-6 h-6" />
                          </div>
                          <div>
                             <h3 className="font-bold text-white mb-1">Call Us</h3>
                             <p className="text-gray-400">+880 1711 000000<br/>(10 AM - 8 PM)</p>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl">
                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Message Sent!"); }}>
                       <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                             <label className="text-sm font-bold text-gray-400">First Name</label>
                             <input type="text" className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500 outline-none transition-colors" placeholder="John" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-sm font-bold text-gray-400">Last Name</label>
                             <input type="text" className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500 outline-none transition-colors" placeholder="Doe" />
                          </div>
                       </div>
                       
                       <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-400">Email Address</label>
                          <input type="email" className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500 outline-none transition-colors" placeholder="john@example.com" />
                       </div>

                       <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-400">Message</label>
                          <textarea rows={4} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500 outline-none transition-colors" placeholder="How can we help you?"></textarea>
                       </div>

                       <button type="submit" className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-4 rounded-xl hover:scale-[1.02] transition-transform shadow-lg">
                          Send Message
                       </button>
                    </form>
                 </div>
              </div>
           </div>
        )}

        {/* --- PRODUCT DETAIL VIEW (Shared) --- */}
        {view === ViewState.PRODUCT_DETAIL && selectedProduct && (
          <div className="pb-24 animate-fade-in px-6 md:px-16 pt-8">
            <button onClick={() => setView(ViewState.PRODUCTS)} className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors w-fit">
               <ArrowRight className="rotate-180 w-4 h-4" /> Back to Shop
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 min-h-[80vh]">
              {/* Left: Visuals */}
              <div className="flex flex-col justify-center">
                 <Product3DViewer image={selectedProduct.images[0]} />
                 <div className="mt-6 flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {selectedProduct.images.map((img, i) => (
                      <img key={i} src={img} className="w-24 h-24 rounded-xl border border-white/10 object-cover cursor-pointer hover:border-cyan-400 transition-colors" />
                    ))}
                 </div>
              </div>

              {/* Right: Story & Details */}
              <div className="flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-bold mb-4 tracking-widest uppercase bg-cyan-900/20 px-3 py-1 rounded-full w-fit">
                  <Zap className="w-3 h-3" /> Recommended for {userContext.timeOfDay}
                </div>
                <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight font-heading">{selectedProduct.name}</h1>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed font-light">{selectedProduct.description}</p>
                
                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {Object.entries(selectedProduct.specs).map(([key, val]) => (
                    <div key={key} className="bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-colors">
                      <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{key}</p>
                      <p className="font-mono text-white font-bold">{val}</p>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-6">
                   <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-center justify-between">
                      <div>
                        <span className="text-3xl font-bold">{selectedProduct.price.toLocaleString()} <span className="text-sm font-normal text-gray-500">BDT</span></span>
                        <p className="text-xs text-green-400 mt-1 flex items-center gap-1"><Truck className="w-3 h-3" /> Free Express Shipping</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-yellow-400 text-sm mb-1">
                           {'★'.repeat(5)} <span className="text-gray-500 text-xs">({selectedProduct.reviews} reviews)</span>
                        </div>
                        <p className="text-[10px] text-gray-500">Dhaka & Chattogram</p>
                      </div>
                   </div>
                   
                   <div className="flex gap-4">
                      <button 
                        onClick={() => addToCart(selectedProduct)}
                        className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-[1.02] transition-transform text-lg"
                      >
                        Add to Cart
                      </button>
                      <button className="px-6 border border-white/20 rounded-xl hover:bg-white/5 transition-colors">
                        <span className="sr-only">Like</span>
                        ❤️
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