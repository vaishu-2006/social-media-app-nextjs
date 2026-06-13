'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DEMO_USERS } from '@/lib/mock-data';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const demoAccounts = Object.values(DEMO_USERS).map((user) => ({
    email: user.email,
    password: 'demo123',
    userId: user.id,
  }));

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate auth delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const account = demoAccounts.find(
      (acc) => acc.email === email && acc.password === password
    );

    if (account) {
      console.log('[v0] Login successful:', account.userId);
      // In a real app, we'd set auth context here
      router.push('/');
    } else {
      setError('Invalid email or password');
    }

    setIsLoading(false);
  };

  const handleDemoLogin = (email: string) => {
    setEmail(email);
    setPassword('demo123');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white mx-auto mb-4">
            <span className="text-2xl font-bold">V</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">VibeSync</h1>
          <p className="text-muted-foreground">
            Connect with people who share your vibe
          </p>
        </div>

        {/* Login Form */}
        <Card className="p-6 border border-border mb-6">
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" />
                <span>Remember me</span>
              </label>
              <Link href="#" className="text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Signup Link */}
          <div className="mt-6 pt-6 border-t border-border text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link href="/signup" className="text-primary font-medium hover:underline">
              Sign up
            </Link>
          </div>
        </Card>

        {/* Demo Accounts */}
        <Card className="p-6 border border-border bg-secondary/30">
          <h3 className="font-semibold mb-4">Demo Accounts</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Try out VibeSync with these demo accounts. All use password: <code className="bg-background px-2 py-1 rounded">demo123</code>
          </p>

          <div className="space-y-2">
            {demoAccounts.map((account) => {
              const user = Object.values(DEMO_USERS).find(
                (u) => u.id === account.userId
              );
              return (
                <button
                  key={account.email}
                  onClick={() => handleDemoLogin(account.email)}
                  className="w-full p-3 text-left border border-border rounded-lg hover:bg-secondary/50 transition-colors group"
                >
                  <p className="font-medium text-sm group-hover:text-primary">
                    {user?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {account.email} • {user?.vibe}
                  </p>
                </button>
              );
            })}
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            Click a demo account to autofill the form, then click "Sign In"
          </p>
        </Card>
      </div>
    </div>
  );
}
