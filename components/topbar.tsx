'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Moon, Sun, LogOut, Settings, Home, Bell, User, Film } from 'lucide-react';
import { useTheme } from '@/lib/theme-context';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface TopbarProps {
  currentUserId?: string;
  onLogout?: () => void;
}

export function Topbar({ currentUserId, onLogout }: TopbarProps) {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white">
            V
          </div>
          <span className="hidden sm:inline">VibeSync</span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <Home className="w-4 h-4 mr-2" />
              Feed
            </Button>
          </Link>
          <Link href="/reels">
            <Button variant="ghost" size="sm">
              <Film className="w-4 h-4 mr-2" />
              Reels
            </Button>
          </Link>
          <Link href="/notifications">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
          </Link>
          {currentUserId && (
            <Link href={`/profile/${currentUserId}`}>
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
            </Link>
          )}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="w-9 h-9"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowMenu(!showMenu)}
              className="w-9 h-9"
            >
              <Settings className="w-4 h-4" />
            </Button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-1 z-50">
                <Link href="/settings" className="block px-4 py-2 hover:bg-secondary hover:text-secondary-foreground">
                  Settings
                </Link>
                {currentUserId && (
                  <Link href={`/profile/${currentUserId}`} className="block px-4 py-2 hover:bg-secondary hover:text-secondary-foreground">
                    My Profile
                  </Link>
                )}
                <button
                  onClick={() => {
                    onLogout?.();
                    router.push('/login');
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-secondary hover:text-secondary-foreground flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
