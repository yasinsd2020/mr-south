import { useSearch, Link } from '@tanstack/react-router';
import { Button } from '../components/ui/Button';
import { CheckCircle2, Package, Truck, ArrowRight, Download, Share2 } from 'lucide-react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

export function OrderConfirmedPage() {
  const search: any = useSearch({ from: '/order-confirmed' });
  const orderId = search.orderId || 'ORD-ABC123XYZ';

  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#000', '#EA580C', '#fff']
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-20 min-h-[80vh] flex items-center justify-center">
      <div className="max-w-xl w-full text-center space-y-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 12 }}
          className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto"
        >
          <CheckCircle2 size={48} />
        </motion.div>

        <div className="space-y-4">
          <h1 className="text-5xl font-black uppercase tracking-tighter">Order Confirmed!</h1>
          <p className="text-zinc-500 text-lg">Thank you for shopping with Mr South. Your order has been placed and is being processed.</p>
        </div>

        <div className="bg-zinc-50 rounded-[2.5rem] p-10 space-y-6 border border-zinc-100 shadow-sm">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Order ID</span>
            <span className="text-2xl font-black font-mono tracking-wider">{orderId}</span>
          </div>
          
          <div className="h-px bg-zinc-200" />
          
          <div className="grid grid-cols-2 gap-8 text-left">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Estimated Delivery</span>
              <p className="font-bold text-sm">May 24 - May 26, 2024</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Courier Partner</span>
              <p className="font-bold text-sm">Premium Express</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/orders">
            <Button variant="outline" size="xl" className="w-full rounded-2xl font-bold uppercase tracking-widest text-xs">
              <Package size={18} className="mr-2" /> Track Order
            </Button>
          </Link>
          <Button variant="premium" size="xl" className="w-full rounded-2xl font-bold uppercase tracking-widest text-xs">
            <Download size={18} className="mr-2" /> Download Invoice
          </Button>
        </div>

        <div className="flex items-center justify-center gap-8 pt-4">
          <Link to="/products" className="text-sm font-bold uppercase tracking-widest hover:text-orange-600 transition-colors inline-flex items-center gap-2">
            Continue Shopping <ArrowRight size={16} />
          </Link>
          <button className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:text-orange-600 transition-colors">
            <Share2 size={16} /> Share Experience
          </button>
        </div>

        <div className="pt-10 flex flex-col items-center gap-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
          <Truck size={24} className="text-orange-600 animate-bounce" />
          <span>Your items are on their way to the packaging center!</span>
        </div>
      </div>
    </div>
  );
}
