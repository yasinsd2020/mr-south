import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Link, useNavigate } from '@tanstack/react-router';
import { Mail, Lock, ArrowRight, Github, Chrome } from 'lucide-react';
import { useAuthStore } from '../store/useStore';
import { toast } from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setAuth({ id: '1', name: 'John Doe', email: data.email }, 'fake-jwt-token');
    toast.success('Welcome back, John!');
    navigate({ to: '/' });
  };

  return (
    <div className="min-h-screen flex items-stretch">
      {/* Left side: Form */}
      <div className="flex-grow flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl font-black uppercase tracking-tighter">Login</h1>
            <p className="text-zinc-500">Welcome back! Please enter your details.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-300" size={18} />
                <Input 
                  {...register('email')}
                  type="email" 
                  placeholder="name@example.com" 
                  className="pl-10 h-12 rounded-xl"
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 font-bold">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Password</label>
                <Link to="/forgot-password" size="sm" className="text-xs font-bold text-orange-600 hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-300" size={18} />
                <Input 
                  {...register('password')}
                  type="password" 
                  placeholder="••••••••" 
                  className="pl-10 h-12 rounded-xl"
                />
              </div>
              {errors.password && <p className="text-xs text-red-500 font-bold">{errors.password.message}</p>}
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" {...register('rememberMe')} className="rounded accent-black" />
              <span className="text-xs font-bold text-zinc-500">Remember me for 30 days</span>
            </div>

            <Button type="submit" size="xl" variant="premium" className="w-full group" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in...' : 'Sign In'}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-px bg-zinc-100 flex-grow" />
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Or continue with</span>
              <div className="h-px bg-zinc-100 flex-grow" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" size="lg" className="rounded-xl">
                <Chrome size={18} className="mr-2" /> Google
              </Button>
              <Button variant="outline" size="lg" className="rounded-xl">
                <Github size={18} className="mr-2" /> GitHub
              </Button>
            </div>

            <p className="text-center text-sm font-medium text-zinc-500">
              Don't have an account? <Link to="/signup" className="text-orange-600 font-bold hover:underline">Sign up for free</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side: Illustration/Poster */}
      <div className="hidden lg:block w-1/2 bg-zinc-900 relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000" 
          className="w-full h-full object-cover opacity-60"
          alt="Login background"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute bottom-20 left-20 right-20 space-y-4 text-white">
          <h2 className="text-5xl font-black tracking-tighter leading-none uppercase">Step into <br /> excellence</h2>
          <p className="text-zinc-400 max-w-sm">Join our exclusive community of fashion enthusiasts and get early access to new collections.</p>
        </div>
      </div>
    </div>
  );
}
