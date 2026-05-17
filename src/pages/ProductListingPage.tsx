import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/api';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/Button';
import { Search, Filter, ChevronDown, LayoutGrid, List, SlidersHorizontal } from 'lucide-react';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function ProductListingPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getProducts,
  });

  const categories = ['All', 'Hoodies', 'Shoes', 'Watches', 'Jackets', 'T-Shirts', 'Pants'];

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    
    return products
      .filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return (a.discountPrice || a.price) - (b.discountPrice || b.price);
        if (sortBy === 'price-high') return (b.discountPrice || b.price) - (a.discountPrice || a.price);
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // Default featured
      });
  }, [products, search, selectedCategory, sortBy, priceRange]);

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      {/* Page Header */}
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-5xl font-black uppercase tracking-tighter">Premium Collection</h1>
        <p className="text-zinc-500 max-w-xl mx-auto">
          Explore our curated selection of high-end fashion pieces designed for those who value quality and style.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden lg:block w-64 space-y-10">
          <div className="space-y-6">
            <h3 className="text-lg font-bold uppercase tracking-widest border-b pb-4">Categories</h3>
            <div className="space-y-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`block w-full text-left text-sm font-medium transition-colors hover:text-orange-600 ${
                    selectedCategory === cat ? 'text-orange-600 font-bold' : 'text-zinc-500'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-bold uppercase tracking-widest border-b pb-4">Price Range</h3>
            <div className="space-y-4">
              <input 
                type="range" 
                min="0" 
                max="1000" 
                value={priceRange[1]} 
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full accent-orange-600"
              />
              <div className="flex justify-between text-xs font-bold text-zinc-500">
                <span>$0</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>

          <div className="bg-zinc-50 p-6 rounded-2xl border border-dashed border-zinc-200">
            <h4 className="text-sm font-bold mb-2">Need help?</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">Our fashion consultants are available 24/7 to help you pick the perfect fit.</p>
            <Button variant="link" size="sm" className="p-0 h-auto text-orange-600 mt-2">Chat with us</Button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-grow space-y-8">
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border shadow-sm sticky top-24 z-30">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-50 border-none focus:ring-2 focus:ring-orange-600 transition-all"
              />
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="flex items-center gap-2 text-sm font-medium text-zinc-500 whitespace-nowrap">
                <span>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 text-black font-bold cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
              
              <div className="h-6 w-px bg-zinc-200" />
              
              <button 
                className="lg:hidden p-2 hover:bg-zinc-100 rounded-lg"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <SlidersHorizontal size={20} />
              </button>

              <div className="hidden md:flex items-center gap-1 bg-zinc-100 p-1 rounded-xl">
                <button className="p-1.5 bg-white shadow-sm rounded-lg"><LayoutGrid size={18} /></button>
                <button className="p-1.5 text-zinc-400"><List size={18} /></button>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden overflow-hidden bg-zinc-50 rounded-2xl p-6 space-y-6"
              >
                <div>
                  <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-zinc-400">Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                      <button 
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          selectedCategory === cat ? 'bg-black text-white' : 'bg-white border border-zinc-200 text-zinc-600'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Info */}
          <div className="flex items-center justify-between">
            <p className="text-zinc-500 text-sm">Showing <span className="text-black font-bold">{filteredProducts.length}</span> products</p>
            {selectedCategory !== 'All' && (
              <button onClick={() => setSelectedCategory('All')} className="text-xs font-bold text-orange-600 underline">Clear Category</button>
            )}
          </div>

          {/* Product Grid */}
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-[3/4] bg-zinc-100 rounded-3xl animate-pulse" />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-2 md:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-20 bg-zinc-50 rounded-[3rem] border border-dashed">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">No products found</h3>
              <p className="text-zinc-500 mb-8">Try adjusting your filters or search terms.</p>
              <Button variant="premium" onClick={() => { setSearch(''); setSelectedCategory('All'); setPriceRange([0, 1000]); }}>
                Reset All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
