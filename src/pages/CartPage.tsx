import { useCartStore } from '../store/useStore';
import { formatPrice } from '../lib/utils';
import { Link } from '@tanstack/react-router';
import { Button } from '../components/ui/Button';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function CartPage() {
  const { cart, removeItem, updateQuantity } = useCartStore();
  
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 150 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center space-y-8">
        <div className="w-24 h-24 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <ShoppingBag size={48} className="text-zinc-300" />
        </div>
        <h1 className="text-4xl font-black uppercase tracking-tighter">Your cart is empty</h1>
        <p className="text-zinc-500 max-w-sm mx-auto">Looks like you haven't added anything to your cart yet. Time to explore our collection!</p>
        <Link to="/products">
          <Button size="xl" variant="premium">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-5xl font-black uppercase tracking-tighter mb-12">Shopping Bag</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-8">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="flex flex-col sm:flex-row gap-6 p-6 bg-white rounded-3xl border border-zinc-100 shadow-sm group"
              >
                <div className="w-full sm:w-40 h-48 rounded-2xl overflow-hidden bg-zinc-50 border shrink-0">
                  <img src={item.image} className="w-full h-full object-cover" alt={item.name} referrerPolicy="no-referrer" />
                </div>
                
                <div className="flex-grow flex flex-col justify-between space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold mb-1 hover:text-orange-600 transition-colors">
                        <Link to={`/products/${item.productId}` as any}>{item.name}</Link>
                      </h3>
                      <div className="flex gap-4 text-xs font-bold uppercase tracking-widest text-zinc-400">
                        <span>Size: <span className="text-black">{item.size}</span></span>
                        <span>Color: <span className="text-black">{item.color}</span></span>
                      </div>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="p-2 text-zinc-300 hover:text-red-600 transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center bg-zinc-50 rounded-xl p-1 border">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:bg-white rounded-lg transition-colors"><Minus size={14} /></button>
                      <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-white rounded-lg transition-colors"><Plus size={14} /></button>
                    </div>
                    <div className="text-xl font-black">{formatPrice(item.price * item.quantity)}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <Link to="/products" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-500 hover:text-black transition-colors">
            <ArrowRight className="rotate-180" size={16} /> Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <aside className="space-y-8">
          <div className="bg-zinc-50 rounded-3xl p-8 space-y-8 sticky top-32 border">
            <h2 className="text-2xl font-bold uppercase tracking-tight">Order Summary</h2>
            
            <div className="space-y-4 pt-4 border-t">
              <div className="flex justify-between text-zinc-500 font-medium">
                <span>Subtotal</span>
                <span className="text-black font-bold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-zinc-500 font-medium">
                <span>Delivery Charge</span>
                <span className="text-black font-bold">{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-zinc-500 font-medium">
                <span>Estimated Tax</span>
                <span className="text-black font-bold">{formatPrice(tax)}</span>
              </div>
              
              <div className="py-6 border-y flex justify-between items-end">
                <span className="text-lg font-black uppercase tracking-tighter">Total</span>
                <span className="text-3xl font-black text-orange-600">{formatPrice(total)}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Coupon Code" 
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border-zinc-200 text-sm focus:ring-1 focus:ring-black"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold uppercase text-orange-600">Apply</button>
              </div>

              <Link to="/checkout" className="block">
                <Button size="xl" variant="premium" className="w-full text-lg h-16 rounded-2xl group shadow-xl">
                  Checkout Now <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-xs font-bold text-zinc-500">
                <Truck size={16} className="text-orange-600" />
                <span>FREE shipping on orders above $150</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
