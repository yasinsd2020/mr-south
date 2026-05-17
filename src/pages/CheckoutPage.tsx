import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useCartStore, useOrderStore } from '../store/useStore';
import { formatPrice } from '../lib/utils';
import { Link, useNavigate } from '@tanstack/react-router';
import { CreditCard, Truck, ShieldCheck, MapPin, CheckCircle2, ChevronRight, School as Bank } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const checkoutSchema = z.object({
  name: z.string().min(2, 'Required'),
  street: z.string().min(5, 'Required'),
  city: z.string().min(2, 'Required'),
  state: z.string().min(2, 'Required'),
  zip: z.string().min(5, 'Required'),
  phone: z.string().min(10, 'Required'),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCartStore();
  const addOrder = useOrderStore((state) => state.addOrder);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('card');

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 150 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const orderId = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    addOrder({
      id: orderId,
      date: new Date().toISOString(),
      items: [...cart],
      total: total,
      status: 'Pending',
      address: { ...data, id: '1' },
    });
    
    clearCart();
    toast.success('Order placed successfully!');
    navigate({ to: '/order-confirmed', search: { orderId } as any });
  };

  if (cart.length === 0) return <div className="p-20 text-center"><Link to="/products" className="text-orange-600 font-bold">Back to products</Link></div>;

  return (
    <div className="container mx-auto px-4 py-20 pb-32">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-zinc-400">
          <Link to="/cart" className="hover:text-black">Cart</Link>
          <ChevronRight size={16} />
          <span className="text-black">Checkout</span>
          <ChevronRight size={16} />
          <span>Confirmation</span>
        </div>

        <h1 className="text-5xl font-black uppercase tracking-tighter">Secure Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Shipping Info */}
          <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-12">
            <section className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold">1</div>
                <h2 className="text-2xl font-bold uppercase tracking-tight">Shipping Address</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Full Name</label>
                  <Input {...register('name')} placeholder="Recipient Name" className="h-12 rounded-xl" />
                  {errors.name && <p className="text-[10px] text-red-500 font-bold">{errors.name.message}</p>}
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Street Address</label>
                  <Input {...register('street')} placeholder="123 Luxury Lane" className="h-12 rounded-xl" />
                  {errors.street && <p className="text-[10px] text-red-500 font-bold">{errors.street.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">City</label>
                    <Input {...register('city')} placeholder="New York" className="h-12 rounded-xl" />
                    {errors.city && <p className="text-[10px] text-red-500 font-bold">{errors.city.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Zip Code</label>
                    <Input {...register('zip')} placeholder="10001" className="h-12 rounded-xl" />
                    {errors.zip && <p className="text-[10px] text-red-500 font-bold">{errors.zip.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">State</label>
                    <Input {...register('state')} placeholder="NY" className="h-12 rounded-xl" />
                    {errors.state && <p className="text-[10px] text-red-500 font-bold">{errors.state.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Phone</label>
                    <Input {...register('phone')} placeholder="+1 (555) 000-0000" className="h-12 rounded-xl" />
                    {errors.phone && <p className="text-[10px] text-red-500 font-bold">{errors.phone.message}</p>}
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold">2</div>
                <h2 className="text-2xl font-bold uppercase tracking-tight">Payment Method</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all ${
                    paymentMethod === 'card' ? 'border-orange-600 bg-orange-50/30' : 'border-zinc-100'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <CreditCard size={24} className={paymentMethod === 'card' ? 'text-orange-600' : 'text-zinc-400'} />
                    <div className="text-left">
                      <h4 className="font-bold text-sm">Credit / Debit Card</h4>
                      <p className="text-[10px] text-zinc-500 font-medium">Visa, Mastercard, AMEX</p>
                    </div>
                  </div>
                  {paymentMethod === 'card' && <CheckCircle2 size={18} className="text-orange-600" />}
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all ${
                    paymentMethod === 'upi' ? 'border-orange-600 bg-orange-50/30' : 'border-zinc-100'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Bank size={24} className={paymentMethod === 'upi' ? 'text-orange-600' : 'text-zinc-400'} />
                    <div className="text-left">
                      <h4 className="font-bold text-sm">UPI / Bank Transfer</h4>
                      <p className="text-[10px] text-zinc-500 font-medium">Google Pay, Apple Pay, PayPal</p>
                    </div>
                  </div>
                  {paymentMethod === 'upi' && <CheckCircle2 size={18} className="text-orange-600" />}
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all ${
                    paymentMethod === 'cod' ? 'border-orange-600 bg-orange-50/30' : 'border-zinc-100'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Truck size={24} className={paymentMethod === 'cod' ? 'text-orange-600' : 'text-zinc-400'} />
                    <div className="text-left">
                      <h4 className="font-bold text-sm">Cash on Delivery</h4>
                      <p className="text-[10px] text-zinc-500 font-medium">Pay upon reception ($5 extra)</p>
                    </div>
                  </div>
                  {paymentMethod === 'cod' && <CheckCircle2 size={18} className="text-orange-600" />}
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="animate-in slide-in-from-top-4 duration-300 space-y-4 p-6 bg-zinc-50 rounded-2xl">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Card Number</label>
                    <Input placeholder="0000 0000 0000 0000" className="h-10 text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Expiry</label>
                      <Input placeholder="MM / YY" className="h-10 text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">CVC</label>
                      <Input placeholder="•••" className="h-10 text-sm" />
                    </div>
                  </div>
                </div>
              )}
            </section>
          </form>

          {/* Checkout Column 2 */}
          <aside className="space-y-12">
            <section className="bg-zinc-50 rounded-[2rem] p-8 border space-y-8">
              <h3 className="text-xl font-bold uppercase tracking-tight">Your Order</h3>
              
              <div className="space-y-6 max-h-60 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-20 rounded-lg overflow-hidden shrink-0 border">
                      <img src={item.image} className="w-full h-full object-cover" alt={item.name} referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-xs font-bold leading-tight uppercase">{item.name}</h4>
                      <p className="text-[10px] text-zinc-400 uppercase mt-1">Size: {item.size} • Color: {item.color}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs font-bold">Qty: {item.quantity}</span>
                        <span className="text-sm font-black">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-zinc-200">
                <div className="flex justify-between text-zinc-500 font-medium text-sm">
                  <span>Subtotal</span>
                  <span className="text-black font-bold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-zinc-500 font-medium text-sm">
                  <span>Shipping</span>
                  <span className="text-black font-bold">{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                </div>
                {paymentMethod === 'cod' && (
                  <div className="flex justify-between text-red-500 font-medium text-sm">
                    <span>COD Surcharge</span>
                    <span className="font-bold">+$5.00</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-500 font-medium text-sm">
                  <span>Tax (8%)</span>
                  <span className="text-black font-bold">{formatPrice(tax)}</span>
                </div>
                <div className="pt-6 border-t flex justify-between items-end">
                  <span className="text-lg font-black uppercase tracking-tight">Payable Total</span>
                  <span className="text-3xl font-black text-orange-600">{formatPrice(total + (paymentMethod === 'cod' ? 5 : 0))}</span>
                </div>
              </div>

              <Button 
                form="checkout-form" 
                type="submit" 
                size="xl" 
                variant="premium" 
                className="w-full h-16 rounded-2xl shadow-xl shadow-zinc-200"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing Payment...' : 'Complete Purchase'}
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-widest">
                <ShieldCheck size={16} className="text-orange-600" />
                <span>SSL Secured Transaction</span>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
