
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Check, Filter, X, Star } from 'lucide-react';

interface ProductFilterProps {
  categories: { id: string; name: string }[];
  brands: { name: string }[];
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  selectedBrands: string[];
  onBrandChange: (brand: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  minRating: number | null;
  onRatingChange: (rating: number | null) => void;
  className?: string;
  onCloseMobile?: () => void;
}

const FilterSection: React.FC<{ 
  title: string; 
  children: React.ReactNode; 
  defaultOpen?: boolean 
}> = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-100 dark:border-white/5 py-5 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full mb-3 text-sm font-bold text-gray-900 dark:text-white hover:text-cyan-600 transition-colors"
      >
        <span>{title}</span>
        {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      
      <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        {children}
      </div>
    </div>
  );
};

export const ProductFilter: React.FC<ProductFilterProps> = ({
  categories,
  brands,
  selectedCategories,
  onCategoryChange,
  selectedBrands,
  onBrandChange,
  priceRange,
  onPriceChange,
  minRating,
  onRatingChange,
  className = '',
  onCloseMobile
}) => {
  const [localMinPrice, setLocalMinPrice] = useState(priceRange[0]);
  const [localMaxPrice, setLocalMaxPrice] = useState(priceRange[1]);

  const handlePriceApply = () => {
    onPriceChange([localMinPrice, localMaxPrice]);
  };

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-white/5 h-fit ${className}`}>
      
      {/* Header */}
      <div className="p-5 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
        <h3 className="font-bold text-lg dark:text-white flex items-center gap-2">
          <Filter className="w-5 h-5 text-cyan-600" /> Filters
        </h3>
        {onCloseMobile && (
          <button onClick={onCloseMobile} className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="p-5 pt-0">
        
        {/* Categories */}
        <FilterSection title="Categories">
          <div className="space-y-2.5">
            {categories.map((cat) => (
              <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${selectedCategories.includes(cat.name) ? 'bg-cyan-600 border-cyan-600' : 'border-gray-300 dark:border-gray-600 group-hover:border-cyan-500'}`}>
                  {selectedCategories.includes(cat.name) && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
                <input 
                  type="checkbox" 
                  className="hidden"
                  checked={selectedCategories.includes(cat.name)}
                  onChange={() => onCategoryChange(cat.name)}
                />
                <span className={`text-sm ${selectedCategories.includes(cat.name) ? 'font-bold text-cyan-600' : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200'}`}>
                  {cat.name}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Price Range */}
        <FilterSection title="Price Range (BDT)">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input 
                type="number" 
                value={localMinPrice}
                onChange={(e) => setLocalMinPrice(Number(e.target.value))}
                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg py-2 px-3 text-sm focus:border-cyan-500 outline-none dark:text-white"
                placeholder="Min"
              />
              <span className="text-gray-400">-</span>
              <input 
                type="number" 
                value={localMaxPrice}
                onChange={(e) => setLocalMaxPrice(Number(e.target.value))}
                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg py-2 px-3 text-sm focus:border-cyan-500 outline-none dark:text-white"
                placeholder="Max"
              />
            </div>
            <button 
              onClick={handlePriceApply}
              className="w-full bg-gray-100 dark:bg-white/5 hover:bg-cyan-600 hover:text-white text-gray-700 dark:text-gray-300 font-bold py-2 rounded-lg text-sm transition-colors"
            >
              Apply Price
            </button>
          </div>
        </FilterSection>

        {/* Brands */}
        <FilterSection title="Brands">
          <div className="space-y-2.5 max-h-[200px] overflow-y-auto custom-scrollbar pr-2">
            {brands.map((brand, idx) => (
              <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${selectedBrands.includes(brand.name) ? 'bg-cyan-600 border-cyan-600' : 'border-gray-300 dark:border-gray-600 group-hover:border-cyan-500'}`}>
                   {selectedBrands.includes(brand.name) && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
                <input 
                  type="checkbox" 
                  className="hidden"
                  checked={selectedBrands.includes(brand.name)}
                  onChange={() => onBrandChange(brand.name)}
                />
                <span className={`text-sm ${selectedBrands.includes(brand.name) ? 'font-bold text-cyan-600' : 'text-gray-600 dark:text-gray-400'}`}>
                  {brand.name}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Rating */}
        <FilterSection title="Rating">
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <button 
                key={rating}
                onClick={() => onRatingChange(minRating === rating ? null : rating)}
                className={`flex items-center gap-2 w-full px-2 py-1.5 rounded-lg transition-colors ${minRating === rating ? 'bg-yellow-50 dark:bg-yellow-900/20' : 'hover:bg-gray-50 dark:hover:bg-white/5'}`}
              >
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">& Up</span>
                {minRating === rating && <Check className="w-4 h-4 ml-auto text-cyan-600" />}
              </button>
            ))}
          </div>
        </FilterSection>

      </div>
    </div>
  );
};
