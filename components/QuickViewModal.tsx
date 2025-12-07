import React from 'react';
import { X, ShoppingBag, Star, Check, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-fade-in-up max-h-[90vh]">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-20 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-gray-800 dark:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 bg-gray-100 dark:bg-black/20 relative group">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
            <p className="text-white text-sm font-medium">
               {product.images.length > 1 ? `+${product.images.length - 1} more photos available in details` : ''}
            </p>
          </div>
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto custom-scrollbar">
          <div className="mb-2">
             <span className="text-[10px] font-bold text-cyan-600 uppercase tracking-wider bg-cyan-50 dark:bg-cyan-900/30 px-2 py-1 rounded-sm border border-cyan-100 dark:border-cyan-500/20">
               {product.category}
             </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">{product.name}</h2>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex text-yellow-500 text-sm">
               <Star className="w-4 h-4 fill-current" />
               <span className="ml-1 font-bold text-gray-700 dark:text-gray-300">{product.rating}</span>
            </div>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{product.reviews} reviews</span>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-green-600 font-medium flex items-center gap-1">
              <Check className="w-3 h-3" /> In Stock
            </span>
          </div>

          <div className="text-3xl font-bold text-orange-500 mb-6">৳ {product.price.toLocaleString()}</div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-sm leading-relaxed border-l-2 border-gray-200 dark:border-gray-700 pl-4">
            {product.description}
          </p>

          <div className="space-y-3 mb-8 bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/5">
             <h3 className="text-xs font-bold text-gray-400 uppercase">Key Specs</h3>
             {Object.entries(product.specs).slice(0, 3).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm">
                   <span className="text-gray-500">{key}</span>
                   <span className="font-medium text-gray-800 dark:text-gray-200">{value}</span>
                </div>
             ))}
          </div>

          <div className="mt-auto flex flex-col gap-3">
             <button 
               onClick={() => { onAddToCart(product); onClose(); }}
               className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-orange-500/20 transform hover:scale-[1.02] duration-200"
             >
               <ShoppingBag className="w-5 h-5" /> Add to Cart
             </button>
             <button 
                onClick={onClose} // Typically would navigate to product page here
                className="w-full bg-transparent hover:bg-gray-50 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400 font-medium py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-1"
             >
                View Full Details <ArrowRight className="w-4 h-4" />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};