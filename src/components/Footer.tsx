import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Section */}
        <div className="space-y-6">
          <Link to="/" className="text-3xl font-bold tracking-tighter flex items-center gap-2">
            <span className="bg-white text-black px-2 py-0.5 rounded">MR</span>
            <span>SOUTH</span>
          </Link>
          <p className="text-zinc-400 max-w-xs leading-relaxed">
            Redefining modern elegance. Mr South brings you premium fashion choices for the sophisticated individual.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-zinc-900 rounded-full hover:bg-orange-600 transition-colors"><Instagram size={18} /></a>
            <a href="#" className="p-2 bg-zinc-900 rounded-full hover:bg-orange-600 transition-colors"><Facebook size={18} /></a>
            <a href="#" className="p-2 bg-zinc-900 rounded-full hover:bg-orange-600 transition-colors"><Twitter size={18} /></a>
            <a href="#" className="p-2 bg-zinc-900 rounded-full hover:bg-orange-600 transition-colors"><Youtube size={18} /></a>
          </div>
        </div>

        {/* Links Section */}
        <div>
          <h4 className="text-lg font-bold mb-6 uppercase tracking-widest text-orange-500">Shop</h4>
          <ul className="space-y-4 text-zinc-400">
            <li><Link to="/products" className="hover:text-white transition-colors">All Products</Link></li>
            <li><Link to="/products" className="hover:text-white transition-colors">New Arrivals</Link></li>
            <li><Link to="/products" className="hover:text-white transition-colors">Trending</Link></li>
            <li><Link to="/products" className="hover:text-white transition-colors">Best Sellers</Link></li>
            <li><Link to="/products" className="hover:text-white transition-colors">Sale</Link></li>
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h4 className="text-lg font-bold mb-6 uppercase tracking-widest text-orange-500">Support</h4>
          <ul className="space-y-4 text-zinc-400">
            <li><Link to="/" className="hover:text-white transition-colors">Shipping Policy</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">Returns & Exchanges</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">Track Your Order</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h4 className="text-lg font-bold mb-6 uppercase tracking-widest text-orange-500">Get in Touch</h4>
          <ul className="space-y-4 text-zinc-400">
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-zinc-500" />
              <span>support@mrsouth.com</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-zinc-500" />
              <span>+1 (555) 000-1234</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={18} className="text-zinc-500" />
              <span>123 Fashion Ave, NY 10001</span>
            </li>
          </ul>
          <div className="mt-8">
            <h5 className="text-sm font-bold mb-3 uppercase">Subscribe to Newsletter</h5>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-zinc-900 border-none px-4 py-2 text-sm rounded-l-md w-full focus:ring-1 focus:ring-orange-600"
              />
              <button className="bg-orange-600 px-4 py-2 rounded-r-md hover:bg-orange-700 transition-colors">
                <Mail size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-zinc-900 text-center text-zinc-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Mr South. All rights reserved.</p>
      </div>
    </footer>
  );
}
