import * as React from 'react';
import { Link } from '@tanstack/react-router';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../lib/utils';
import { useWishlistStore, useCartStore } from '../store/useStore';
import { motion } from 'motion/react';
import { toast } from 'react-hot-toast';

export function ProductCard({ product }: { product: Product; key?: React.Key }) {
  const { wishlist, toggleWishlist } = useWishlistStore();
  const addItem = useCartStore((state) => state.addItem);
  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: `${product.id}-${product.sizes[0]}-${product.colors[0]}`,
      productId: product.id,
      name: product.name,
      price: product.discountPrice || product.price,
      image: product.images[0],
      size: product.sizes[0],
      color: product.colors[0],
      quantity: 1,
    });
    toast.success('Added to cart!');
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <Link to={`/products/${product.id}` as any} className="block relative aspect-[3/4] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNewArrival && (
            <span className="bg-black text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter">New Arrivals</span>
          )}
          {product.isBestSeller && (
            <span className="bg-orange-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter">Best Seller</span>
          )}
          {product.discountPrice && (
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter">
              {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleToggleWishlist}
            className={`p-2 rounded-full shadow-lg transition-colors ${
              isWishlisted ? 'bg-orange-600 text-white' : 'bg-white text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={handleAddToCart}
            className="p-2 bg-white text-gray-900 rounded-full shadow-lg hover:bg-black hover:text-white transition-colors"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-zinc-500 uppercase tracking-widest">{product.category}</span>
          <div className="flex items-center gap-1 text-xs font-semibold">
            <Star size={12} className="fill-orange-400 text-orange-400" />
            <span>{product.rating}</span>
          </div>
        </div>
        
        <Link to={`/products/${product.id}` as any} className="block group-hover:text-orange-600 transition-colors">
          <h3 className="font-bold text-gray-900 truncate mb-2">{product.name}</h3>
        </Link>

        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-black">
            {formatPrice(product.discountPrice || product.price)}
          </span>
          {product.discountPrice && (
            <span className="text-sm text-zinc-400 line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
