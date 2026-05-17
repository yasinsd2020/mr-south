import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/api';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/Button';
import { Link } from '@tanstack/react-router';
import { ArrowRight, Zap, Shield, TrendingUp, Star } from 'lucide-react';
import { motion } from 'motion/react';

export function HomePage() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getProducts,
  });

  const featured = products?.filter(p => p.isFeatured) || [];
  const trending = products?.filter(p => p.isTrending) || [];

  const categories = [
    { name: 'Hoodies', icon: '👕', count: 42, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400' },
    { name: 'Shoes', icon: '👟', count: 86, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400' },
    { name: 'Watches', icon: '⌚', count: 15, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=400' },
    { name: 'Jackets', icon: '🧥', count: 24, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=400' },
  ];

  return (
    <div className="space-y-20 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover"
            alt="Hero Background"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-white"
          >
            <span className="inline-block px-4 py-1 bg-orange-600 text-white rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Exclusive Summer Collection 2024
            </span>
            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-none">
              REDEFINE YOUR <br />
              <span className="text-orange-500 italic">STYLE</span> QUOTIENT
            </h1>
            <p className="text-xl md:text-2xl text-zinc-200 mb-10 max-w-xl font-light">
              Discover the latest trend-setting apparel designed for the modern individual. Quality meets premium comfort.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button size="xl" variant="accent" className="group">
                  Shop Now <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/products" search={{ filter: 'new' } as any}>
                <Button size="xl" variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white hover:text-black">
                  Explore New Arrivals
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Stripe */}
      <section className="bg-zinc-50 py-10 border-y border-zinc-100">
        <div className="container mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <TrendingUp className="text-orange-600" />, title: 'Premium Quality', desc: 'Crafted with the finest materials' },
            { icon: <Zap className="text-orange-600" />, title: 'Fast Delivery', desc: 'Ships within 24-48 hours' },
            { icon: <Shield className="text-orange-600" />, title: 'Secure Payment', desc: '100% encrypted transactions' },
            { icon: <Star className="text-orange-600" />, title: 'Customer First', desc: 'Rated 4.9/5 by 10k+ users' },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-xl shadow-sm">{f.icon}</div>
              <div>
                <h4 className="font-bold text-sm">{f.title}</h4>
                <p className="text-xs text-zinc-500">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold tracking-tight mb-2 uppercase">Shop by Category</h2>
            <div className="h-1.5 w-20 bg-orange-600 rounded-full" />
          </div>
          <Link to="/products" className="text-sm font-bold border-b-2 border-black pb-1 hover:text-orange-600 hover:border-orange-600 transition-colors">
            View All Categories
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              whileHover={{ scale: 1.02 }}
              className="relative group h-64 rounded-3xl overflow-hidden cursor-pointer"
            >
              <img src={cat.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={cat.name} referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <span className="text-3xl mb-2 block">{cat.icon}</span>
                <h3 className="text-xl font-bold uppercase">{cat.name}</h3>
                <p className="text-sm text-zinc-300 font-medium">{cat.count}+ Products</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-bold tracking-tight uppercase">Featured Arrivals</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="rounded-full"><ArrowRight className="rotate-180" /></Button>
            <Button variant="outline" size="icon" className="rounded-full"><ArrowRight /></Button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1,2,3,4].map(i => <div key={i} className="aspect-[3/4] bg-zinc-100 rounded-2xl animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {featured.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* Offer Banner */}
      <section className="container mx-auto px-4">
        <div className="bg-black text-white rounded-[2rem] overflow-hidden relative flex flex-col md:flex-row">
          <div className="md:w-1/2 p-12 lg:p-20 flex flex-col justify-center space-y-8 relative z-10">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
              SUMMER <br />
              <span className="text-orange-500">FLASH SALE</span>
            </h2>
            <p className="text-xl text-zinc-400 font-light max-w-md">
              Get up to 50% discount on all premium hoodies and sneakers. Limited time offer!
            </p>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold">12</div>
                <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Hours</div>
              </div>
              <div className="text-3xl font-bold text-orange-600">:</div>
              <div className="text-center">
                <div className="text-3xl font-bold">45</div>
                <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Minutes</div>
              </div>
              <div className="text-3xl font-bold text-orange-600">:</div>
              <div className="text-center">
                <div className="text-3xl font-bold">22</div>
                <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Seconds</div>
              </div>
            </div>
            <Button size="xl" variant="accent" className="w-fit">Shop The Sale</Button>
          </div>
          <div className="md:w-1/2 h-80 md:h-auto overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1000" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              alt="Sale"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-bold tracking-tight uppercase">Trending Now</h2>
          <Link to="/products" className="text-sm font-bold uppercase hover:text-orange-600">Explore Collection</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {trending.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
