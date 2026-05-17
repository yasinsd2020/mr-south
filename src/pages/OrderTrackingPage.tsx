import { useParams, Link } from '@tanstack/react-router';
import { useOrderStore } from '../store/useStore';
import { Package, Truck, CheckCircle2, ChevronRight, MapPin, Phone, History, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { formatPrice } from '../lib/utils';

export function OrderTrackingPage() {
  const { id } = useParams({ from: '/orders/$id' });
  const order = useOrderStore((state) => state.orders.find(o => o.id === id));

  const steps = [
    { label: 'Order Placed', time: '10:30 AM, May 17', completed: true, active: false, icon: <Package size={20} /> },
    { label: 'Under Process', time: '02:45 PM, May 17', completed: true, active: false, icon: <History size={20} /> },
    { label: 'Shipped', time: 'Pending', completed: false, active: true, icon: <Truck size={20} /> },
    { label: 'Out for Delivery', time: 'Estimated May 19', completed: false, active: false, icon: <MapPin size={20} /> },
    { label: 'Delivered', time: 'Estimated May 19', completed: false, active: false, icon: <CheckCircle2 size={20} /> },
  ];

  if (!order) return <div className="p-20 text-center"><h2 className="text-2xl font-bold">Order not found</h2><Link to="/orders" className="text-orange-600 font-bold">Back to orders</Link></div>;

  return (
    <div className="container mx-auto px-4 py-20 pb-32">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-12 border-b">
          <div className="space-y-4">
            <h1 className="text-5xl font-black uppercase tracking-tighter">Track Order</h1>
            <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              <span>Order ID: <span className="text-black">#{order.id}</span></span>
              <span>Courier: <span className="text-black">Premium Express</span></span>
              <span>Tracking: <span className="text-black">TRK98218321</span></span>
            </div>
          </div>
          <div className="bg-orange-50 text-orange-600 px-6 py-4 rounded-3xl border border-orange-100 flex items-center gap-3">
            <Truck size={24} className="animate-bounce" />
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest leading-none">Status</span>
              <span className="text-lg font-black tracking-tight">{order.status}</span>
            </div>
          </div>
        </div>

        {/* Tracking Timeline */}
        <div className="relative space-y-0 px-4 md:px-0">
          {/* Vertical Line */}
          <div className="absolute left-[29px] top-4 bottom-4 w-1 bg-zinc-100 md:left-[51px]" />
          
          <div className="space-y-12 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-8"
              >
                <div className={`w-14 h-14 md:w-20 md:h-20 shrink-0 rounded-full flex items-center justify-center transition-all duration-500 border-4 ${
                  step.completed ? 'bg-black text-white border-black scale-110 shadow-lg' : 
                  step.active ? 'bg-orange-600 text-white border-orange-200 scale-110 animate-pulse' : 
                  'bg-white text-zinc-300 border-zinc-100'
                }`}>
                  {step.icon}
                </div>
                
                <div className="pt-2 flex-grow space-y-1">
                  <h3 className={`text-xl font-bold transition-all ${step.completed || step.active ? 'text-black' : 'text-zinc-300'}`}>
                    {step.label}
                    {step.completed && <CheckCircle2 className="inline ml-3 text-green-500" size={18} />}
                  </h3>
                  <p className={`text-sm font-medium ${step.active ? 'text-orange-600 font-bold' : 'text-zinc-500'}`}>{step.time}</p>
                  {step.active && (
                    <div className="mt-4 p-4 bg-zinc-50 rounded-2xl border border-dashed border-zinc-200 text-xs text-zinc-500 flex items-center gap-3">
                      <AlertCircle size={16} />
                      <span>The shipment has left our main warehouse and is now in transit.</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Order Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-10 bg-zinc-900 text-white rounded-[3rem] space-y-8 relative overflow-hidden">
            <MapPin className="absolute -top-12 -right-12 w-48 h-48 opacity-[0.05]" />
            <h3 className="text-xl font-bold uppercase tracking-widest border-b border-zinc-800 pb-4">Shipping To</h3>
            <div className="space-y-4">
              <div>
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">Customer</p>
                <p className="text-lg font-bold">{order.address.name}</p>
              </div>
              <div>
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">Address</p>
                <p className="text-sm font-medium text-zinc-300">{order.address.street}, {order.address.city}, {order.address.state} {order.address.zip}</p>
              </div>
              <div className="flex items-center gap-3 pt-4">
                <Phone size={18} className="text-orange-600" />
                <span className="text-sm font-bold">{order.address.phone}</span>
              </div>
            </div>
            <button className="w-full py-4 bg-zinc-800 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-zinc-700 transition-all">
              Change Address
            </button>
          </div>

          <div className="p-10 bg-white border border-zinc-100 rounded-[3rem] space-y-8 shadow-sm">
            <h3 className="text-xl font-bold uppercase tracking-widest border-b pb-4">Order Summary</h3>
            <div className="space-y-4">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between items-center bg-zinc-50/50 p-4 rounded-2xl">
                  <div className="flex gap-4 items-center">
                    <img src={item.image} className="w-10 h-10 rounded-lg" alt="Item" referrerPolicy="no-referrer" />
                    <div>
                      <p className="text-xs font-bold uppercase leading-none mb-1">{item.name}</p>
                      <p className="text-[10px] text-zinc-400">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-sm font-black">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="pt-6 border-t flex justify-between items-end">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Total Paid</span>
              <span className="text-2xl font-black text-orange-600">{formatPrice(order.total)}</span>
            </div>
            <button className="w-full py-4 border border-zinc-100 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-zinc-50 transition-all flex items-center justify-center gap-2">
              <ChevronRight className="rotate-180" size={14} /> Download Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
