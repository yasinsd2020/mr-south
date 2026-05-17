import { useWishlistStore, useCartStore } from '../store/useStore';
import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/api';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/Button';
import { Link } from '@tanstack/react-router';
import { Heart, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function WishlistPage() {
  const { wishlist } = useWishlistStore();
  const { data: allProducts, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getProducts,
  });

  const wishlistProducts = allProducts?.filter(p => wishlist.includes(p.id)) || [];

  if (isLoading) return (
    <div className="container mx-auto px-4 py-20 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-zinc-200 border-t-orange-600 rounded-full animate-spin" />
    </div>
  );

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center space-y-8">
        <div className="w-24 h-24 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <Heart size={48} className="text-zinc-300" />
        </div>
        <h1 className="text-4xl font-black uppercase tracking-tighter">Your wishlist is empty</h1>
        <p className="text-zinc-500 max-w-sm mx-auto">Found nothing you liked yet? Our new collection is full of surprises!</p>
        <Link to="/products">
          <Button size="xl" variant="premium">Discover More</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-5xl font-black uppercase tracking-tighter">My Wishlist</h1>
        <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest">{wishlist.length} Items saved</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <AnimatePresence>
          {wishlistProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
