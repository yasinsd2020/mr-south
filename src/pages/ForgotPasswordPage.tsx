import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Link } from '@tanstack/react-router';
import { Mail, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email'),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordPage() {
  const [isSent, setIsSent] = useState(false);
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordValues) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSent(true);
    toast.success('Reset link sent to your email!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-zinc-50">
      <div className="w-full max-w-md bg-white p-12 rounded-[3.5rem] shadow-xl border border-zinc-100 text-center space-y-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-orange-600" />
        
        {!isSent ? (
          <>
            <div className="w-20 h-20 bg-orange-50 text-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-10 transform rotate-12">
              <ShieldCheck size={40} />
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-black uppercase tracking-tighter">Forgot <br /> Password?</h1>
              <p className="text-zinc-500 text-sm">No worries! Enter your email and we'll send you a link to reset your password.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-300" size={18} />
                  <Input {...register('email')} type="email" placeholder="name@example.com" className="pl-10 h-14 rounded-2xl" />
                </div>
                {errors.email && <p className="text-[10px] text-red-500 font-bold">{errors.email.message}</p>}
              </div>

              <Button type="submit" size="xl" variant="premium" className="w-full group" disabled={isSubmitting}>
                {isSubmitting ? 'Sending Request...' : 'Reset Password'}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>

            <Link to="/login" className="block text-sm font-black uppercase tracking-widest text-zinc-400 hover:text-black transition-colors">
              Back to Login
            </Link>
          </>
        ) : (
          <div className="space-y-10 animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-green-50 text-green-600 rounded-3xl flex items-center justify-center mx-auto mb-10">
              <CheckCircle2 size={40} />
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-black uppercase tracking-tighter">Check Your <br /> Email</h1>
              <p className="text-zinc-500 text-sm leading-relaxed">
                We've sent a password reset link to your email. Please check your inbox and follow the instructions.
              </p>
            </div>

            <div className="p-6 bg-zinc-50 rounded-2xl border border-dashed border-zinc-200">
              <p className="text-[10px] font-bold text-zinc-400 uppercase leading-relaxed mb-4">Didn't receive any email?</p>
              <Button variant="outline" size="sm" className="font-bold border-2" onClick={() => setIsSent(false)}>Resend Link</Button>
            </div>

            <Link to="/login">
              <Button variant="premium" className="w-full h-14 rounded-2xl uppercase tracking-widest text-xs font-bold">
                Return to Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
