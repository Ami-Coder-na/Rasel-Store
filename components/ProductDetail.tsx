
import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Star, ShoppingBag, Heart, Share2, 
  Check, Truck, ShieldCheck, RefreshCw, 
  ChevronRight, Box, Image as ImageIcon, Minus, Plus,
  Zap, ArrowRight, AlertCircle, Coins
} from 'lucide-react';
import { Product, CartItem } from '../types';
import { MOCK_PRODUCTS } from '../constants';
import { Product3DViewer } from './Product3DViewer';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (item: CartItem) => void;
  onBuyNow: (item: CartItem) => void;
  onProductSelect: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
  isCompared: boolean;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ 
  product, 
  onBack, 
  onAddToCart,
  onBuyNow,
  onProductSelect,
  onToggleCompare,
  isCompared,
  onToggleWishlist,
  isWishlisted
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'image' | '3d'>('image');
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product.sizes?.[0]);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const [isAdding, setIsAdding] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  // Scroll to top when product changes
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
    setActiveImageIndex(0);
    setQuantity(1);
    setSelectedColor(product.colors?.[0]);
    setSelectedSize(product.sizes?.[0]);
    setViewMode('image');
  }, [product]);

  const currentCartItem: CartItem = {
    ...product,
    quantity,
    selectedColor,
    selectedSize
  };

  // Calculate Points (1 Point per 10 BDT)
  const earnedPoints = Math.floor(product.price / 10);

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      onAddToCart(currentCartItem);
      setIsAdding(false);
    }, 600);
  };

  const handleBuyNow = () => {
    onBuyNow(currentCartItem);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, Math.min(product.stock, prev + delta)));
  };

  const relatedProducts = MOCK_PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div ref={topRef} className="animate-fade-in pb-12 bg-gray-50 dark:bg-black min-h-screen">
      {/* Breadcrumb & Navigation */}
      <div className="sticky top-[72px] z-30 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10 mb-6 transition-all">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button 
            onClick={onBack} 
            className="group flex items-center gap-2 text-sm text-gray-500 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400 transition-colors"
          >
            <div className="p-1.5 rounded-full bg-gray-100 dark:bg-white/10 group-hover:bg-cyan-50 dark:group-hover:bg-cyan-900/30 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="font-medium hidden md:inline">Back</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="cursor-pointer hover:text-cyan-600">Home</span>
            <ChevronRight className="w-3 h-3" />
            <span className="cursor-pointer hover:text-cyan-600">{product.category}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="font-medium text-gray-900 dark:text-white truncate max-w-[150px]">{product.name}</span>
          </div>

          <div className="flex gap-2">
            <button onClick={() => onToggleCompare(product)} className={`p-2 rounded-full transition-colors ${isCompared ? 'text-cyan-600 bg-cyan-50 dark:bg-cyan-900/20' : 'text-gray-400 hover:text-cyan-600 hover:bg-gray-100 dark:hover:bg-white/5'}`}>
               <RefreshCw className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onToggleWishlist(product)}
              className={`p-2 rounded-full transition-colors ${isWishlisted ? 'text-red-500 bg-red-50 dark:bg-red-900/20' : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'}`}
            >
               <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
            <button className="p-2 rounded-full text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
               <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Gallery (Sticky on Desktop only) */}
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-32 space-y-4">
              <div className="relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-white/5 overflow-hidden aspect-square md:aspect-[4/3] group shadow-sm">
                
                {/* Modern Toggle Switch */}
                {product.arEnabled && (
                  <div className="absolute top-4 left-4 z-20 bg-white/10 backdrop-blur-md border border-white/20 p-1 rounded-full flex gap-1">
                     <button
                        onClick={() => setViewMode('image')}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${viewMode === 'image' ? 'bg-white text-black shadow-md' : 'text-white hover:bg-white/10'}`}
                     >
                        <ImageIcon className="w-3 h-3" /> Gallery
                     </button>
                     <button
                        onClick={() => setViewMode('3d')}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${viewMode === '3d' ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/40' : 'text-white hover:bg-white/10'}`}
                     >
                        <Box className="w-3 h-3" /> 3D View
                     </button>
                  </div>
                )}

                {/* Main Content */}
                {viewMode === 'image' ? (
                  <div className="w-full h-full relative cursor-zoom-in overflow-hidden bg-gray-100 dark:bg-black/20">
                     <img 
                        src={product.images[activeImageIndex]} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125 origin-center"
                        alt={product.name}
                     />
                     {/* Discount Badge */}
                     <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
                       -20% OFF
                     </div>
                  </div>
                ) : (
                  <Product3DViewer image={product.images[activeImageIndex]} />
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {product.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => { setActiveImageIndex(idx); setViewMode('image'); }}
                    className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${activeImageIndex === idx ? 'border-cyan-500 ring-2 ring-cyan-500/20' : 'border-transparent opacity-70 hover:opacity-100 hover:border-gray-300 dark:hover:border-gray-600'}`}
                  >
                    <img src={img} className="w-full h-full object-cover" alt={`view ${idx}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Product Info */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-white/5 shadow-sm">
              
              <div className="flex items-center gap-2 mb-2">
                 <span className="px-2.5 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 text-[10px] font-bold uppercase tracking-wider rounded-md">
                   {product.category}
                 </span>
                 {product.stock < 5 && (
                   <span className="flex items-center gap-1 text-red-500 text-xs font-bold animate-pulse">
                     <AlertCircle className="w-3 h-3" /> Low Stock
                   </span>
                 )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <h1 className="text-3xl font-heading font-black text-gray-900 dark:text-white leading-tight flex-1">
                  {product.name}
                </h1>
              </div>

              {/* Rating & Stock */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-gray-900 dark:text-white">{product.rating}</span>
                  <span className="text-gray-400">({product.reviews} reviews)</span>
                </div>
                <div className="w-px h-4 bg-gray-300 dark:bg-gray-700"></div>
                <div className="text-green-600 flex items-center gap-1 font-medium">
                   <Check className="w-4 h-4" /> In Stock
                </div>
                {product.carbonFootprint === 'Low' && (
                   <>
                    <div className="w-px h-4 bg-gray-300 dark:bg-gray-700"></div>
                    <div className="text-green-500 flex items-center gap-1 text-xs">
                      <Zap className="w-3 h-3 fill-current" /> Eco-Friendly
                    </div>
                   </>
                )}
              </div>

              {/* Price & Points */}
              <div className="mb-8 p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 relative overflow-hidden">
                <div className="flex items-end gap-3 mb-2">
                  <span className="text-4xl font-bold text-orange-500">৳{product.price.toLocaleString()}</span>
                  <span className="text-lg text-gray-400 line-through mb-1">৳{Math.round(product.price * 1.2).toLocaleString()}</span>
                </div>
                
                {/* Gamification Badge */}
                <div className="inline-flex items-center gap-1.5 bg-yellow-100 dark:bg-yellow-900/30 px-3 py-1 rounded-full border border-yellow-200 dark:border-yellow-700/50 mb-3">
                   <div className="bg-yellow-400 rounded-full p-0.5">
                      <Coins className="w-3 h-3 text-yellow-900" />
                   </div>
                   <span className="text-xs font-bold text-yellow-800 dark:text-yellow-400">
                      Earn +{earnedPoints} Coins
                   </span>
                </div>

                <div className="mt-2 text-xs text-gray-500 flex items-center gap-2">
                   <Truck className="w-3 h-3" /> Free Delivery on orders over 5k BDT
                </div>
              </div>

              {/* Selectors */}
              <div className="space-y-6 mb-8">
                 {/* Colors */}
                 {product.colors && (
                    <div>
                      <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 block">Color: <span className="text-gray-500 font-normal">{selectedColor}</span></label>
                      <div className="flex flex-wrap gap-3">
                         {product.colors.map(color => (
                            <button
                              key={color}
                              onClick={() => setSelectedColor(color)}
                              className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${selectedColor === color ? 'border-cyan-500 scale-110 shadow-lg shadow-cyan-500/20' : 'border-gray-200 dark:border-gray-700 hover:scale-105'}`}
                              style={{ backgroundColor: color }}
                            >
                               {selectedColor === color && <Check className="w-6 h-6 text-white drop-shadow-md" />}
                            </button>
                         ))}
                      </div>
                    </div>
                 )}

                 {/* Sizes */}
                 {product.sizes && (
                    <div>
                      <div className="flex justify-between mb-3">
                         <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Size: <span className="text-gray-500 font-normal">{selectedSize}</span></label>
                         <button className="text-xs text-cyan-600 hover:underline">Size Chart</button>
                      </div>
                      <div className="flex flex-wrap gap-3">
                         {product.sizes.map(size => (
                            <button
                              key={size}
                              onClick={() => setSelectedSize(size)}
                              className={`min-w-[48px] h-12 px-4 rounded-lg border text-sm font-bold transition-all ${selectedSize === size ? 'border-cyan-500 bg-cyan-600 text-white shadow-lg shadow-cyan-500/20' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-cyan-500/50'}`}
                            >
                               {size}
                            </button>
                         ))}
                      </div>
                    </div>
                 )}
              </div>

              {/* Action Buttons */}
              <div className="mt-auto space-y-4">
                 {/* Quantity & Cart */}
                 <div className="flex gap-4">
                    <div className="flex items-center bg-gray-100 dark:bg-black/20 rounded-xl px-2 border border-gray-200 dark:border-white/10">
                       <button onClick={() => handleQuantityChange(-1)} className="p-3 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"><Minus className="w-4 h-4" /></button>
                       <span className="w-8 text-center font-bold text-gray-900 dark:text-white">{quantity}</span>
                       <button onClick={() => handleQuantityChange(1)} className="p-3 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"><Plus className="w-4 h-4" /></button>
                    </div>
                    
                    <button 
                      onClick={handleAddToCart}
                      disabled={isAdding || product.stock === 0}
                      className={`flex-1 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all transform active:scale-[0.98] ${
                        isAdding 
                          ? 'bg-green-600' 
                          : 'bg-gray-900 dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200'
                      }`}
                    >
                       {isAdding ? (
                          <> <Check className="w-5 h-5 animate-bounce" /> Added </>
                       ) : (
                          <> <ShoppingBag className="w-5 h-5" /> Add to Cart </>
                       )}
                    </button>
                 </div>

                 {/* Buy Now */}
                 <button 
                   onClick={handleBuyNow}
                   className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] active:scale-[0.99]"
                 >
                    Buy Now <ArrowRight className="w-5 h-5" />
                 </button>
              </div>
              
              {/* Service Features Grid */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-100 dark:border-white/5">
                 <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900 dark:text-white">Fast Delivery</p>
                      <p className="text-[10px] text-gray-500">1-3 days in Dhaka</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900 dark:text-white">Authentic</p>
                      <p className="text-[10px] text-gray-500">100% Original</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600">
                      <RefreshCw className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900 dark:text-white">Easy Returns</p>
                      <p className="text-[10px] text-gray-500">7 days policy</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-3">
                    <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-orange-600">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900 dark:text-white">Warranty</p>
                      <p className="text-[10px] text-gray-500">1 Year Official</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm overflow-hidden">
           <div className="flex border-b border-gray-200 dark:border-white/5 overflow-x-auto">
              {(['description', 'specs', 'reviews'] as const).map(tab => (
                 <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-6 py-5 text-sm font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
                       activeTab === tab 
                       ? 'border-cyan-600 text-cyan-600 bg-cyan-50/50 dark:bg-cyan-900/10' 
                       : 'border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5'
                    }`}
                 >
                    {tab === 'specs' ? 'Specifications' : tab}
                 </button>
              ))}
           </div>

           <div className="p-6 md:p-10 min-h-[300px]">
              {activeTab === 'description' && (
                 <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Product Highlights</h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                         {product.description}
                      </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="bg-gray-50 dark:bg-black/20 p-6 rounded-xl border border-gray-100 dark:border-white/5">
                        <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                           <Zap className="w-5 h-5 text-yellow-500" /> Performance
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                           Engineered for peak performance, ensuring you get the most out of every interaction. Whether for work or play, stability is guaranteed.
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-black/20 p-6 rounded-xl border border-gray-100 dark:border-white/5">
                        <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                           <ShieldCheck className="w-5 h-5 text-green-500" /> Durability
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                           Built with premium materials to withstand daily wear and tear. Tested rigorously to meet international quality standards.
                        </p>
                      </div>
                    </div>
                 </div>
              )}

              {activeTab === 'specs' && (
                 <div className="max-w-4xl mx-auto animate-fade-in">
                    <h3 className="text-xl font-bold dark:text-white mb-6">Technical Specifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                       {Object.entries(product.specs).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-white/5">
                             <span className="font-medium text-gray-500 dark:text-gray-400">{key}</span>
                             <span className="font-bold text-gray-900 dark:text-white text-right">{value}</span>
                          </div>
                       ))}
                       <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-white/5">
                          <span className="font-medium text-gray-500 dark:text-gray-400">Sustainability</span>
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                             product.carbonFootprint === 'Low' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                             {product.carbonFootprint} Carbon Footprint
                          </span>
                       </div>
                    </div>
                 </div>
              )}

              {activeTab === 'reviews' && (
                 <div className="max-w-4xl mx-auto animate-fade-in">
                    <div className="grid md:grid-cols-12 gap-8 mb-12">
                       <div className="md:col-span-4 bg-gray-50 dark:bg-black/20 p-6 rounded-2xl text-center border border-gray-100 dark:border-white/5">
                          <div className="text-6xl font-black text-gray-900 dark:text-white mb-2">{product.rating}</div>
                          <div className="flex justify-center text-yellow-400 mb-2">
                             {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300 dark:text-gray-600'}`} />
                             ))}
                          </div>
                          <p className="text-sm text-gray-500">{product.reviews} Verified Reviews</p>
                       </div>
                       
                       <div className="md:col-span-8 space-y-3">
                          {[5, 4, 3, 2, 1].map((star) => (
                             <div key={star} className="flex items-center gap-3">
                                <span className="text-sm font-bold w-3">{star}</span>
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <div className="flex-1 h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                   <div 
                                      className="h-full bg-yellow-400 rounded-full" 
                                      style={{ width: `${star === 5 ? 75 : star === 4 ? 15 : 5}%` }}
                                   ></div>
                                </div>
                                <span className="text-xs text-gray-400 w-8">{star === 5 ? '75%' : star === 4 ? '15%' : '5%'}</span>
                             </div>
                          ))}
                       </div>
                    </div>

                    <div className="space-y-6">
                       <h3 className="font-bold text-lg dark:text-white">Customer Feedback</h3>
                       {[1, 2, 3].map((i) => (
                          <div key={i} className="border-b border-gray-100 dark:border-white/5 pb-6 last:border-0">
                             <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-3">
                                   <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-md">
                                      {i === 1 ? 'RK' : i === 2 ? 'JD' : 'SA'}
                                   </div>
                                   <div>
                                      <p className="font-bold text-gray-900 dark:text-white text-sm">{i === 1 ? 'Rasel Khan' : i === 2 ? 'John Doe' : 'Sarah Ahmed'}</p>
                                      <div className="flex text-yellow-400 text-xs">
                                         {[...Array(5)].map((_, idx) => (
                                            <Star key={idx} className="w-3 h-3 fill-current" />
                                         ))}
                                      </div>
                                   </div>
                                </div>
                                <span className="text-xs text-gray-400">{i * 2} days ago</span>
                             </div>
                             <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                {i === 1 
                                 ? "The product quality exceeded my expectations! The delivery was super fast, got it within 24 hours in Gulshan."
                                 : "Great value for the price. The AR feature really helped me visualize how it looks before buying."}
                             </p>
                          </div>
                       ))}
                       <button className="w-full py-3 border border-gray-200 dark:border-white/10 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                          Load More Reviews
                       </button>
                    </div>
                 </div>
              )}
           </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 mb-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">You Might Also Like</h2>
              <button className="text-cyan-600 text-sm font-bold hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
               {relatedProducts.map(rp => (
                  <div 
                    key={rp.id} 
                    onClick={() => onProductSelect(rp)}
                    className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300"
                  >
                     <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-black/20">
                        <img src={rp.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={rp.name} />
                        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                           <button className="bg-white text-black p-2 rounded-full shadow-lg hover:bg-cyan-500 hover:text-white transition-colors">
                              <ArrowRight className="w-4 h-4" />
                           </button>
                        </div>
                     </div>
                     <div className="p-4">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1 mb-1 group-hover:text-cyan-600 transition-colors">{rp.name}</h3>
                        <p className="text-orange-500 font-bold">৳{rp.price.toLocaleString()}</p>
                     </div>
                  </div>
               ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
