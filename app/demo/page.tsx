'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  Users,
  Flame,
  Heart,
  MessageCircle,
  TrendingUp,
  Shield,
  Zap,
} from 'lucide-react';

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Welcome to VibeSync</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
              Connect Over{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Shared Vibes
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 text-balance">
              A social platform where your energy matters. Find people who share your interests, passions, and vision for life. Built with intelligent feed scoring that learns your vibe.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" className="gap-2">
                  Get Started
                  <Zap className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="lg" variant="outline">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build authentic connections with your community
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Smart Feed */}
          <Card className="p-8 border border-border hover:border-primary/50 transition-all group">
            <div className="w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-4 transition-all">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Smart Feed Algorithm</h3>
            <p className="text-muted-foreground mb-4">
              Our intelligent scoring system (weighted by vibe match, engagement, and recency) ensures you see content that resonates with you.
            </p>
            <div className="text-sm space-y-2 text-muted-foreground">
              <p>• Same Vibe: 50 pts</p>
              <p>• Per Like: 2 pts</p>
              <p>• Recency: Time-decay factor</p>
            </div>
          </Card>

          {/* Vibe-Based Communities */}
          <Card className="p-8 border border-border hover:border-accent/50 transition-all group">
            <div className="w-12 h-12 rounded-lg bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center mb-4 transition-all">
              <Users className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Vibe-Based Communities</h3>
            <p className="text-muted-foreground mb-4">
              Find your tribe across 8+ vibes: Creative, Tech, Wellness, Music, Design, Business, Travel, and Food.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Creative', 'Tech', 'Wellness'].map((vibe) => (
                <span
                  key={vibe}
                  className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full"
                >
                  {vibe}
                </span>
              ))}
            </div>
          </Card>

          {/* Real-Time Interactions */}
          <Card className="p-8 border border-border hover:border-primary/50 transition-all group">
            <div className="w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-4 transition-all">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Real-Time Interactions</h3>
            <p className="text-muted-foreground">
              Like posts, share comments, and connect with others. Every interaction strengthens your network and influences your personalized feed.
            </p>
          </Card>

          {/* Notifications */}
          <Card className="p-8 border border-border hover:border-accent/50 transition-all group">
            <div className="w-12 h-12 rounded-lg bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center mb-4 transition-all">
              <MessageCircle className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Stay Connected</h3>
            <p className="text-muted-foreground">
              Get notified when someone likes your post, comments, or follows you. Never miss important updates from your community.
            </p>
          </Card>
        </div>

        {/* Demo Accounts */}
        <Card className="p-8 border border-border mb-12 bg-secondary/30">
          <h3 className="text-2xl font-bold mb-6">Try the Demo</h3>
          <p className="text-muted-foreground mb-6">
            Explore VibeSync with these pre-configured demo accounts. All use password: <code className="bg-background px-2 py-1 rounded text-sm">demo123</code>
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-background rounded-lg border border-border">
              <p className="font-semibold mb-1">Alex Rivera</p>
              <p className="text-sm text-muted-foreground mb-3">alex@vibesync.com</p>
              <p className="text-xs text-primary font-medium mb-3">Creative Vibe</p>
              <Link href="/login">
                <Button size="sm" variant="outline" className="w-full">
                  Login as Alex
                </Button>
              </Link>
            </div>

            <div className="p-4 bg-background rounded-lg border border-border">
              <p className="font-semibold mb-1">Jordan Kim</p>
              <p className="text-sm text-muted-foreground mb-3">jordan@vibesync.com</p>
              <p className="text-xs text-accent font-medium mb-3">Tech Vibe</p>
              <Link href="/login">
                <Button size="sm" variant="outline" className="w-full">
                  Login as Jordan
                </Button>
              </Link>
            </div>

            <div className="p-4 bg-background rounded-lg border border-border">
              <p className="font-semibold mb-1">Sam Chen</p>
              <p className="text-sm text-muted-foreground mb-3">sam@vibesync.com</p>
              <p className="text-xs text-accent font-medium mb-3">Wellness Vibe</p>
              <Link href="/login">
                <Button size="sm" variant="outline" className="w-full">
                  Login as Sam
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* CTA Section */}
        <Card className="p-12 border border-border bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">Ready to Find Your Vibe?</h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join a community where authenticity matters and connections are meaningful. Whether you're creative, tech-savvy, wellness-focused, or everything in between, there's a place for you on VibeSync.
            </p>
            <Link href="/signup">
              <Button size="lg" className="gap-2">
                Create Your Account
                <Sparkles className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <p className="font-bold mb-4">VibeSync</p>
              <p className="text-sm text-muted-foreground">
                Connect over shared interests and authentic relationships.
              </p>
            </div>
            <div>
              <p className="font-semibold mb-4">Product</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/" className="hover:text-foreground">Features</Link></li>
                <li><Link href="/" className="hover:text-foreground">Pricing</Link></li>
                <li><Link href="/" className="hover:text-foreground">Security</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-4">Company</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/" className="hover:text-foreground">About</Link></li>
                <li><Link href="/" className="hover:text-foreground">Blog</Link></li>
                <li><Link href="/" className="hover:text-foreground">Careers</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-4">Legal</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/" className="hover:text-foreground">Privacy</Link></li>
                <li><Link href="/" className="hover:text-foreground">Terms</Link></li>
                <li><Link href="/" className="hover:text-foreground">Contact</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 VibeSync. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
