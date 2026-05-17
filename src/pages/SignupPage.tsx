import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Link, useNavigate } from '@tanstack/react-router';
import { Mail, Lock, ArrowRight, User, Phone } from 'lucide-react';
import { useAuthStore } from '../store/useStore';
import { toast } from 'react-hot-toast';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

export function SignupPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setAuth({ id: '1', name: data.name, email: data.email, phone: data.phone }, 'fake-jwt-token');
    toast.success('Account created successfully!');
    navigate({ to: '/' });
  };

  return (
    <div className="min-h-screen flex items-stretch">
      {/* Left side: Illustration */}
      <div className="hidden lg:block w-1/2 bg-zinc-900 relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1000" 
          className="w-full h-full object-cover opacity-60"
          alt="Signup background"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute bottom-20 left-20 right-20 space-y-4 text-white">
          <h2 className="text-5xl font-black tracking-tighter leading-none uppercase">Create your <br /> legacy</h2>
          <p className="text-zinc-400 max-w-sm">Experience fashion like never before. Exclusive drops, personalized recommendations, and premium service.</p>
        </div>
      </div>

      {/* Right side: Form */}
      <div className="flex-grow flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl font-black uppercase tracking-tighter">Sign Up</h1>
            <p className="text-zinc-500">Create your account to start shopping.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-300" size={18} />
                <Input {...register('name')} placeholder="John Doe" className="pl-10 h-12 rounded-xl" />
              </div>
              {errors.name && <p className="text-xs text-red-500 font-bold">{errors.name.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-300" size={18} />
                  <Input {...register('email')} type="email" placeholder="john@example.com" className="pl-10 h-12 rounded-xl" />
                </div>
                {errors.email && <p className="text-xs text-red-500 font-bold">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-300" size={18} />
                  <Input {...register('phone')} placeholder="+1 234 567 890" className="pl-10 h-12 rounded-xl" />
                </div>
                {errors.phone && <p className="text-xs text-red-500 font-bold">{errors.phone.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-300" size={18} />
                <Input {...register('password')} type="password" placeholder="••••••••" className="pl-10 h-12 rounded-xl" />
              </div>
              {errors.password && <p className="text-xs text-red-500 font-bold">{errors.password.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-300" size={18} />
                <Input {...register('confirmPassword')} type="password" placeholder="••••••••" className="pl-10 h-12 rounded-xl" />
              </div>
              {errors.confirmPassword && <p className="text-xs text-red-500 font-bold">{errors.confirmPassword.message}</p>}
            </div>

            <Button type="submit" size="xl" variant="premium" className="w-full group" disabled={isSubmitting}>
              {isSubmitting ? 'Creating Account...' : 'Sign Up'}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <p className="text-center text-sm font-medium text-zinc-500">
            Already have an account? <Link to="/login" className="text-orange-600 font-bold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
