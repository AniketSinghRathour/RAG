import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { User } from '../App';
import { Lock, Mail, Sparkles } from 'lucide-react';

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

const CREDENTIALS = {
  officer: {
    email: 'officer@mail.gov.in',
    password: 'officer123',
    name: 'Officer Singh',
    role: 'officer' as const,
  },
  user: {
    email: 'user@mail.in',
    password: 'user123',
    name: 'User Singh',
    role: 'user' as const,
  },
};

export default function LoginDialog({ open, onClose, onLogin }: LoginDialogProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Check credentials
    if (email === CREDENTIALS.officer.email && password === CREDENTIALS.officer.password) {
      onLogin({
        name: CREDENTIALS.officer.name,
        email: CREDENTIALS.officer.email,
        role: CREDENTIALS.officer.role,
      });
    } else if (email === CREDENTIALS.user.email && password === CREDENTIALS.user.password) {
      onLogin({
        name: CREDENTIALS.user.name,
        email: CREDENTIALS.user.email,
        role: CREDENTIALS.user.role,
      });
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#0f0f14] border-white/10 text-white sm:max-w-md backdrop-blur-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-blue-400" />
            Welcome to SARAL.ai
          </DialogTitle>
          <p className="text-center text-slate-400 text-sm">Sign in to access your dashboard</p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">Email Address</Label>
            <div className="relative group">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-500 group-hover:text-blue-400 transition-colors" />
              <Input
                id="email"
                type="email"
                placeholder="your.email@gov.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-300">Password</Label>
            <div className="relative group">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-slate-500 group-hover:text-blue-400 transition-colors" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                required
              />
            </div>
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center bg-red-500/10 p-3 rounded-lg border border-red-500/20">
              {error}
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-500/25"
          >
            Sign In
          </Button>

          <div className="text-xs text-slate-500 text-center space-y-2 pt-4 border-t border-white/5">
            <p className="text-slate-400">Demo Credentials</p>
            <div className="space-y-1.5 bg-white/5 p-3 rounded-lg">
              <p className="text-slate-300">
                <span className="text-blue-400">Officer:</span> officer@mail.gov.in / officer123
              </p>
              <p className="text-slate-300">
                <span className="text-purple-400">User:</span> user@mail.in / user123
              </p>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
