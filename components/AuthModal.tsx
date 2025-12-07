import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, Facebook, Chrome, Sparkles } from 'lucide-react';
import { UserProfile } from '../types';

interface AuthModalProps {
  onClose: () => void;
  onLogin: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Demo Credentials
  const DEMO_EMAIL = 'demo@raselstore.bd';
  const DEMO_PASS = 'password123';

  const fillDemo = () => {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASS);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);
      // Mock successful login/register
      const mockUser: UserProfile = {
        id: 'u1',
        name: isLogin ? 'Rasel Demo User' : name || 'New User',
        email: email,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100'
      };
      onLogin(mockUser);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-fade-in-up border border-gray-200 dark:border-white/10 min-h-[500px]">
        
        {/* Close Button (Mobile Only) */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-30 md:hidden p-2 bg-white/10 backdrop-blur-md rounded-full text-gray-500 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Visuals (Hidden on Mobile) */}
        <div className="hidden md:flex w-5/12 bg-gradient-to-br from-cyan-600 to-blue-800 relative overflow-hidden flex-col justify-between p-8 text-white">
           {/* Abstract Shapes */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
           
           <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                 <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center font-bold">R</div>
                 <span className="font-heading font-black text-xl tracking-tight">RASEL STORE</span>
              </div>
              <h2 className="text-3xl font-bold leading-tight mb-4">
                Unlock the Future <br/> of Shopping
              </h2>
              <p className="text-cyan-100 text-sm leading-relaxed opacity-90">
                Join our community to access exclusive drops, AI styling advice, and seamless one-tap checkout experiences.
              </p>
           </div>

           <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/10">
                 <Sparkles className="w-5 h-5 text-yellow-300" />
                 <div className="text-xs">
                    <p className="font-bold">Exclusive Rewards</p>
                    <p className="opacity-75">Earn points on every purchase</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 p-8 md:p-12 relative">
          <button 
            onClick={onClose} 
            className="absolute top-6 right-6 z-30 hidden md:block text-gray-400 hover:text-cyan-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {isLogin ? 'Welcome Back!' : 'Create Account'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
              {isLogin ? 'Enter your details to access your account' : 'Join Rasel Store for exclusive deals'}
            </p>

            {/* Tabs */}
            <div className="bg-gray-100 dark:bg-white/5 p-1 rounded-lg flex mb-8">
              <button 
                onClick={() => setIsLogin(true)} 
                className={`flex-1 py-2 text-sm font-bold rounded-md transition-all shadow-sm ${isLogin ? 'bg-white dark:bg-gray-800 text-cyan-600 shadow' : 'bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 shadow-none'}`}
              >
                Sign In
              </button>
              <button 
                onClick={() => setIsLogin(false)} 
                className={`flex-1 py-2 text-sm font-bold rounded-md transition-all shadow-sm ${!isLogin ? 'bg-white dark:bg-gray-800 text-cyan-600 shadow' : 'bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 shadow-none'}`}
              >
                Register
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {!isLogin && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-3 top-3 w-4 h-4 text-gray-400 group-focus-within:text-cyan-500 transition-colors" />
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe" 
                      className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 transition-all text-gray-900 dark:text-white placeholder-gray-400"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400 group-focus-within:text-cyan-500 transition-colors" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com" 
                    className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 transition-all text-gray-900 dark:text-white placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                   <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Password</label>
                   {isLogin && <a href="#" className="text-xs text-cyan-600 hover:underline">Forgot?</a>}
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400 group-focus-within:text-cyan-500 transition-colors" />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 transition-all text-gray-900 dark:text-white placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              {/* Demo Credentials Tip */}
              {isLogin && (
                <div className="bg-cyan-50/50 dark:bg-cyan-900/10 border border-cyan-100 dark:border-cyan-500/20 rounded-lg p-3 flex items-center justify-between text-xs animate-fade-in">
                   <div className="text-cyan-800 dark:text-cyan-200">
                      <span className="font-bold">Demo:</span> {DEMO_EMAIL}
                   </div>
                   <button 
                     type="button" 
                     onClick={fillDemo}
                     className="text-[10px] font-bold bg-white dark:bg-cyan-800 border border-cyan-200 dark:border-cyan-600 text-cyan-700 dark:text-cyan-100 px-2 py-1 rounded hover:shadow-sm transition-all"
                   >
                     Auto Fill
                   </button>
                </div>
              )}

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-4"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Social Login */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-gray-700"></div></div>
                <div className="relative flex justify-center text-xs"><span className="px-2 bg-white dark:bg-gray-900 text-gray-500">Or continue with</span></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <button type="button" className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300">
                   <Chrome className="w-4 h-4 text-orange-500" /> Google
                 </button>
                 <button type="button" className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300">
                   <Facebook className="w-4 h-4 text-blue-600" /> Facebook
                 </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};