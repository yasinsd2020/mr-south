import { useAuthStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { User, MapPin, CreditCard, Key, LogOut, Camera, ChevronRight, Bell, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export function ProfilePage() {
  const { user, logout } = useAuthStore();
  const [activeSubTab, setActiveSubTab] = useState<'info' | 'address' | 'payment' | 'security'>('info');

  if (!user) return (
    <div className="p-20 text-center space-y-4">
      <h2 className="text-2xl font-bold">Please log in to view your profile</h2>
      <Button variant="premium">Login</Button>
    </div>
  );

  const tabs = [
    { id: 'info', label: 'Personal Info', icon: <User size={18} /> },
    { id: 'address', label: 'Addresses', icon: <MapPin size={18} /> },
    { id: 'payment', label: 'Payments', icon: <CreditCard size={18} /> },
    { id: 'security', label: 'Security', icon: <Key size={18} /> },
  ];

  return (
    <div className="container mx-auto px-4 py-20 pb-32">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16">
        {/* Sidebar */}
        <aside className="w-full md:w-80 space-y-8 shrink-0">
          <div className="bg-zinc-900 text-white rounded-[2.5rem] p-8 text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600 rounded-full blur-[60px] opacity-20" />
            <div className="relative group w-24 h-24 mx-auto cursor-pointer">
              <div className="w-full h-full bg-zinc-800 rounded-full flex items-center justify-center text-4xl font-black border-4 border-zinc-700 overflow-hidden">
                {user.name.charAt(0)}
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera size={20} className="text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight">{user.name}</h2>
              <p className="text-zinc-500 text-sm">{user.email}</p>
            </div>
            <div className="flex justify-center gap-2">
              <span className="bg-orange-600/20 text-orange-500 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-[0.2em] border border-orange-600/30">Member Gold</span>
            </div>
          </div>

          <nav className="space-y-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                  activeSubTab === tab.id ? 'bg-zinc-50 text-black border shadow-sm' : 'text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${activeSubTab === tab.id ? 'bg-black text-white' : 'bg-transparent text-zinc-300'}`}>
                    {tab.icon}
                  </div>
                  <span className="text-sm font-bold uppercase tracking-widest">{tab.label}</span>
                </div>
                <ChevronRight size={16} />
              </button>
            ))}
            <button 
              onClick={logout}
              className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all font-bold uppercase tracking-widest text-sm mt-8 border border-transparent hover:border-red-100"
            >
              <div className="p-2 bg-red-100 rounded-lg text-red-600"><LogOut size={18} /></div>
              <span>Logout Account</span>
            </button>
          </nav>

          <div className="p-8 bg-zinc-50 rounded-[2rem] border border-dashed border-zinc-200">
            <div className="flex items-center gap-2 mb-4 text-orange-600">
              <Bell size={18} />
              <h4 className="text-sm font-bold uppercase tracking-widest text-black">Notifications</h4>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed mb-4">You have 3 unread messages regarding your latest order #ORD-9821.</p>
            <button className="text-xs font-black uppercase text-black hover:underline underline-offset-4">View All</button>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-grow space-y-12">
          {activeSubTab === 'info' && (
            <motion.section 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-10"
            >
              <div className="space-y-2">
                <h2 className="text-4xl font-black uppercase tracking-tighter">Account Information</h2>
                <p className="text-zinc-500">Update your personal details and account settings.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-10 rounded-[3rem] border border-zinc-100 shadow-sm relative overflow-hidden">
                <Shield className="absolute -top-12 -right-12 w-48 h-48 text-zinc-50 opacity-[0.03]" />
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Full Name</label>
                  <Input defaultValue={user.name} className="h-14 rounded-2xl bg-zinc-50 border-none font-bold text-lg" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Email Address</label>
                  <Input defaultValue={user.email} className="h-14 rounded-2xl bg-zinc-50 border-none font-bold text-lg" disabled />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Phone Number</label>
                  <Input defaultValue={user.phone || '+1 (555) 000-0000'} className="h-14 rounded-2xl bg-zinc-50 border-none font-bold text-lg" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Date of Birth</label>
                  <Input type="date" defaultValue="1995-05-15" className="h-14 rounded-2xl bg-zinc-50 border-none font-bold text-lg" />
                </div>
                <div className="md:col-span-2 pt-6">
                  <Button variant="premium" size="lg" className="rounded-2xl h-14 px-10 shadow-lg shadow-zinc-200" onClick={() => toast.success('Profile updated!')}>
                    Save Changes
                  </Button>
                </div>
              </div>

              <div className="p-10 bg-black text-white rounded-[3rem] shadow-xl relative overflow-hidden group cursor-pointer">
                <div className="absolute top-0 right-0 p-8 opacity-20 transition-transform group-hover:scale-110 duration-500">
                  <CreditCard size={120} />
                </div>
                <div className="relative z-10 space-y-4">
                  <h3 className="text-xl font-bold uppercase tracking-widest">Mr South Loyalty Points</h3>
                  <div className="text-5xl font-black tracking-tighter">1,250 <span className="text-sm font-medium text-orange-500">PTS</span></div>
                  <p className="text-zinc-400 max-w-xs text-sm">You are $250 away from reaching PLATINUM status with exclusive 20% discounts.</p>
                  <Button variant="accent" size="sm" className="rounded-full px-6">Redeem Points</Button>
                </div>
              </div>
            </motion.section>
          )}

          {activeSubTab === 'address' && (
            <motion.section 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-10"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h2 className="text-4xl font-black uppercase tracking-tighter">Addresses</h2>
                  <p className="text-zinc-500">Manage your shipping and billing locations.</p>
                </div>
                <Button variant="premium" size="lg" className="rounded-2xl">+ Add New</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { type: 'Home', address: '123 Fashion Ave, Suite 4B, New York, NY 10001', phone: '+1 234 567 8901', default: true },
                  { type: 'Office', address: '500 Tech Blvd, floor 12, San Francisco, CA 94105', phone: '+1 098 765 4321', default: false },
                ].map((addr, i) => (
                  <div key={i} className={`p-8 bg-white border-2 rounded-[2.5rem] transition-all relative ${addr.default ? 'border-black shadow-lg shadow-zinc-100' : 'border-zinc-50 text-zinc-500'}`}>
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${addr.default ? 'bg-black text-white' : 'bg-zinc-100 text-zinc-400'}`}>
                          <MapPin size={18} />
                        </div>
                        <h4 className={`text-lg font-bold ${addr.default ? 'text-black' : 'text-zinc-500'}`}>{addr.type} Address</h4>
                      </div>
                      {addr.default && <span className="bg-orange-600 text-white text-[8px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded-full">Default</span>}
                    </div>
                    <p className="font-medium mb-6 leading-relaxed text-sm">{addr.address}</p>
                    <div className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-8">Phone: {addr.phone}</div>
                    <div className="flex gap-4">
                      <button className="text-xs font-black uppercase text-black hover:underline underline-offset-4">Edit</button>
                      <button className="text-xs font-black uppercase text-red-500 hover:underline underline-offset-4">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {activeSubTab === 'payment' && (
            <motion.section 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-10"
            >
              <div className="space-y-2">
                <h2 className="text-4xl font-black uppercase tracking-tighter">Saved Payments</h2>
                <p className="text-zinc-500">Your secure payment methods for faster checkout.</p>
              </div>
              <div className="h-64 bg-zinc-50 rounded-[3rem] border border-dashed border-zinc-200 flex flex-col items-center justify-center text-center p-12">
                <div className="p-4 bg-white rounded-full shadow-sm mb-4"><CreditCard size={32} className="text-zinc-200" /></div>
                <h3 className="font-bold uppercase tracking-widest text-zinc-400">No payment methods saved</h3>
                <p className="text-xs text-zinc-400 mt-2 max-w-xs">You haven't saved any payment information yet. Add a card to speed up your future purchases.</p>
                <Button variant="link" className="text-orange-600 uppercase tracking-widest text-xs font-black mt-4">Add Card Now</Button>
              </div>
            </motion.section>
          )}
        </main>
      </div>
    </div>
  );
}
