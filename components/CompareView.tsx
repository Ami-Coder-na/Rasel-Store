import React from 'react';
import { X, ShoppingBag, Trash2, ArrowLeft, Star } from 'lucide-react';
import { Product } from '../types';

interface CompareViewProps {
  products: Product[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onAddToCart: (product: Product) => void;
  onBack: () => void;
}

export const CompareView: React.FC<CompareViewProps> = ({ products, onRemove, onClear, onAddToCart, onBack }) => {
  // Extract all unique spec keys from the selected products
  const allSpecKeys = Array.from(new Set(products.flatMap(p => Object.keys(p.specs)))) as string[];

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-center p-4">
        <p className="text-xl text-gray-500 mb-4">No products selected for comparison.</p>
        <button onClick={onBack} className="text-cyan-600 font-bold hover:underline">Back to Shop</button>
      </div>
    );
  }

  return (
    <div className="py-4 animate-fade-in">
      {/* Header Actions */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-cyan-600 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </button>
        <button onClick={onClear} className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 transition-colors px-4 py-2 bg-red-50 dark:bg-red-900/10 rounded-lg">
          <Trash2 className="w-4 h-4" /> Clear All
        </button>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold dark:text-white mb-8">Compare Products</h1>

      {/* Comparison Table Container */}
      <div className="overflow-x-auto pb-4 custom-scrollbar">
        <div className="min-w-[800px]">
          {/* Product Header Row */}
          <div className="grid gap-4 mb-8" style={{ gridTemplateColumns: `200px repeat(${products.length}, minmax(200px, 1fr))` }}>
            <div className="flex items-end pb-4 font-bold text-gray-400">
              Feature
            </div>
            {products.map(product => (
              <div key={product.id} className="relative bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-white/5 shadow-sm">
                <button 
                  onClick={() => onRemove(product.id)}
                  className="absolute -top-2 -right-2 bg-gray-200 dark:bg-gray-700 text-gray-500 hover:text-red-500 rounded-full p-1 shadow-md transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="aspect-square bg-gray-100 dark:bg-black/20 rounded-lg overflow-hidden mb-4">
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-2 line-clamp-2 h-12">{product.name}</h3>
                <div className="text-orange-500 font-bold text-lg mb-2">৳ {product.price.toLocaleString()}</div>
                <div className="flex items-center text-yellow-500 text-xs mb-4">
                  <Star className="w-3 h-3 fill-current" />
                  <span className="ml-1 text-gray-500">{product.rating} ({product.reviews})</span>
                </div>
                <button 
                  onClick={() => onAddToCart(product)}
                  className="w-full bg-cyan-600 text-white font-bold py-2 rounded-lg hover:bg-cyan-700 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Cart
                </button>
              </div>
            ))}
          </div>

          {/* Specs Rows */}
          <div className="space-y-1">
            {allSpecKeys.map((specKey, idx) => (
              <div 
                key={specKey} 
                className={`grid gap-4 p-4 rounded-lg ${idx % 2 === 0 ? 'bg-gray-50 dark:bg-white/5' : 'bg-transparent'}`}
                style={{ gridTemplateColumns: `200px repeat(${products.length}, minmax(200px, 1fr))` }}
              >
                <div className="font-medium text-gray-500 dark:text-gray-400 flex items-center">
                  {specKey}
                </div>
                {products.map(product => (
                  <div key={product.id} className="text-gray-800 dark:text-gray-200 text-sm flex items-center">
                    {product.specs[specKey] || <span className="text-gray-400 italic">--</span>}
                  </div>
                ))}
              </div>
            ))}
            
            {/* Additional Info Rows */}
            <div 
              className="grid gap-4 p-4 rounded-lg bg-gray-50 dark:bg-white/5"
              style={{ gridTemplateColumns: `200px repeat(${products.length}, minmax(200px, 1fr))` }}
            >
              <div className="font-medium text-gray-500 dark:text-gray-400 flex items-center">Carbon Footprint</div>
              {products.map(product => (
                <div key={product.id} className="text-gray-800 dark:text-gray-200 text-sm flex items-center">
                   <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                     product.carbonFootprint === 'Low' ? 'bg-green-100 text-green-700' : 
                     product.carbonFootprint === 'High' ? 'bg-red-100 text-red-700' : 'bg-gray-200 text-gray-700'
                   }`}>
                     {product.carbonFootprint}
                   </span>
                </div>
              ))}
            </div>
            
            <div 
               className="grid gap-4 p-4 rounded-lg"
               style={{ gridTemplateColumns: `200px repeat(${products.length}, minmax(200px, 1fr))` }}
            >
               <div className="font-medium text-gray-500 dark:text-gray-400 flex items-center">Stock Status</div>
               {products.map(product => (
                <div key={product.id} className="text-gray-800 dark:text-gray-200 text-sm flex items-center">
                   {product.stock > 0 ? (
                      <span className="text-green-600">In Stock ({product.stock})</span>
                   ) : (
                      <span className="text-red-500">Out of Stock</span>
                   )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};