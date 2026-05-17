import { useOrderStore } from '../store/useStore';
import { formatPrice } from '../lib/utils';
import { Link } from '@tanstack/react-router';
import { ShoppingBag, ChevronRight, Search, SlidersHorizontal, Package, RefreshCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/Button';

export function OrderListPage() {
  const { orders } = useOrderStore();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-600';
      case 'Cancelled': return 'bg-red-100 text-red-600';
      case 'Pending': return 'bg-orange-100 text-orange-600';
      default: return 'bg-zinc-100 text-zinc-600';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center space-y-8">
        <div className="w-24 h-24 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <ShoppingBag size={48} className="text-zinc-300" />
        </div>
        <h1 className="text-4xl font-black uppercase tracking-tighter">No orders yet</h1>
        <p className="text-zinc-500 max-w-sm mx-auto">Looks like you haven't placed any orders. Your order history will appear here once you make a purchase.</p>
        <Link to="/products">
          <Button variant="premium" size="xl">Start Exploring</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20 pb-32">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-black uppercase tracking-tighter">Order History</h1>
            <p className="text-zinc-500">View and track all your previous and current orders.</p>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-grow md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-300" size={18} />
              <input type="text" placeholder="Search by Order ID..." className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-zinc-100 text-sm focus:ring-1 focus:ring-black" />
            </div>
            <button className="p-3 bg-white border border-zinc-100 rounded-2xl hover:bg-zinc-50 transition-all"><SlidersHorizontal size={18} /></button>
          </div>
        </div>

        <div className="space-y-8">
          {orders.map((order, idx) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-zinc-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group"
            >
              <div className="bg-zinc-50 p-8 border-b border-zinc-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex flex-wrap gap-8">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Order ID</span>
                    <p className="font-mono font-bold text-sm">#{order.id}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Date Placed</span>
                    <p className="font-bold text-sm">{new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Total Amount</span>
                    <p className="font-black text-sm text-orange-600">{formatPrice(order.total)}</p>
                  </div>
                </div>
                
                <div className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusColor(order.status)}`}>
                  {order.status}
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  <div className="space-y-6 lg:col-span-2">
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                      {order.items.map((item, i) => (
                        <div key={i} className="w-20 h-24 rounded-xl overflow-hidden shrink-0 border relative group">
                          <img src={item.image} className="w-full h-full object-cover" alt="Item" referrerPolicy="no-referrer" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold">
                            Qty: {item.quantity}
                          </div>
                        </div>
                      ))}
                      {order.items.length > 5 && (
                        <div className="w-20 h-24 rounded-xl bg-zinc-100 flex items-center justify-center font-black text-zinc-400 text-sm border-2 border-dashed">
                          +{order.items.length - 5}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-zinc-500 italic">Ships in <span className="text-black font-bold">2-3 Business Days</span> to {order.address.street}, {order.address.city}</p>
                  </div>

                  <div className="flex flex-col justify-center gap-3">
                    <Link to={`/orders/${order.id}` as any}>
                      <button className="w-full py-4 bg-black text-white rounded-2xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-[10px] hover:bg-zinc-800 transition-all">
                        <Package size={16} /> Track Order <ChevronRight size={14} />
                      </button>
                    </Link>
                    <button className="w-full py-4 border border-zinc-100 rounded-2xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-[10px] hover:bg-zinc-50 transition-all">
                      <RefreshCcw size={14} /> Buy Again
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
