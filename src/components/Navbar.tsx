import { Link } from '@tanstack/react-router';
import { Search, ShoppingBag, Heart, User, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCartStore, useWishlistStore, useAuthStore } from '../store/useStore';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItemsCount = useCartStore((state) => state.cart.reduce((acc, item) => acc + item.quantity, 0));
  const wishlistCount = useWishlistStore((state) => state.wishlist.length);
  const { user, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Shop All', to: '/products', search: {} },
    { name: 'New Arrivals', to: '/products', search: { filter: 'new' } },
    { name: 'Trending', to: '/products', search: { filter: 'trending' } },
    { name: 'Best Sellers', to: '/products', search: { filter: 'best' } },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Left: Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Center/Left: Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
          <span className="bg-black text-white px-2 py-0.5 rounded">MR</span>
          <span className="text-black">SOUTH</span>
        </Link>

        {/* Center: Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to as any}
              search={link.search as any}
              className="text-sm font-medium hover:text-orange-600 transition-colors uppercase tracking-wider"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <button className="hidden md:flex p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Search size={20} />
          </button>
          
          <Link to="/wishlist" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-0 bg-orange-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
            <ShoppingBag size={20} />
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-0 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {cartItemsCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="relative group">
              <Link to="/profile" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <User size={20} />
              </Link>
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 shadow-xl rounded-lg overflow-hidden hidden group-hover:block">
                <div className="p-3 border-bottom text-sm font-semibold">{user.name}</div>
                <Link to="/profile" className="block p-3 text-sm hover:bg-gray-50">Account Settings</Link>
                <Link to="/orders" className="block p-3 text-sm hover:bg-gray-50">My Orders</Link>
                <button 
                  onClick={logout}
                  className="w-full text-left p-3 text-sm text-red-600 hover:bg-gray-50 border-t"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login">
              <Button size="sm" variant="premium">Login</Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed inset-0 z-40 bg-white lg:hidden flex flex-col p-8 pt-24"
          >
            <nav className="flex flex-col gap-6 text-xl font-bold uppercase tracking-widest">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to as any}
                  search={link.search as any}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-orange-600"
                >
                  {link.name}
                </Link>
              ))}
              <hr className="my-4 border-gray-100" />
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>Profile</Link>
                  <Link to="/orders" onClick={() => setIsMobileMenuOpen(false)}>Orders</Link>
                  <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="text-red-600 text-left">Logout</button>
                </>
              ) : (
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Login / Register</Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
