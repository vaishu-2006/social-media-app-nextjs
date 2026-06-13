'use client';

import { useState } from 'react';
import { Topbar } from '@/components/topbar';
import { Sidebar } from '@/components/sidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CURRENT_USER_ID } from '@/lib/mock-data';
import { Bell, Lock, Zap, Toggle2 } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: true,
    emailDigest: false,
    privateProfile: false,
    allowMessages: true,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    console.log('[v0] Settings saved:', settings);
  };

  return (
    <div className="min-h-screen bg-background">
      <Topbar currentUserId={CURRENT_USER_ID} />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 max-w-2xl mx-auto px-4 md:px-6 py-8">
          <h1 className="text-3xl font-bold mb-8">Settings</h1>

          {/* Notifications */}
          <Card className="p-6 mb-6 border border-border">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                <Bell className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h2 className="text-xl font-semibold mb-2">Notifications</h2>
                  <p className="text-sm text-muted-foreground">
                    Manage how you receive notifications and updates
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications on your device
                  </p>
                </div>
                <button
                  onClick={() => handleToggle('notifications')}
                  className={`relative w-12 h-7 rounded-full transition-colors ${
                    settings.notifications ? 'bg-primary' : 'bg-muted'
                  }`}
                  role="switch"
                  aria-checked={settings.notifications}
                >
                  <div
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.notifications ? 'translate-x-5' : ''
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors">
                <div>
                  <p className="font-medium">Email Digest</p>
                  <p className="text-sm text-muted-foreground">
                    Weekly summary of your vibe community
                  </p>
                </div>
                <button
                  onClick={() => handleToggle('emailDigest')}
                  className={`relative w-12 h-7 rounded-full transition-colors ${
                    settings.emailDigest ? 'bg-primary' : 'bg-muted'
                  }`}
                  role="switch"
                  aria-checked={settings.emailDigest}
                >
                  <div
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.emailDigest ? 'translate-x-5' : ''
                    }`}
                  />
                </button>
              </div>
            </div>
          </Card>

          {/* Privacy */}
          <Card className="p-6 mb-6 border border-border">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                <Lock className="w-6 h-6 text-accent mt-1" />
                <div>
                  <h2 className="text-xl font-semibold mb-2">Privacy</h2>
                  <p className="text-sm text-muted-foreground">
                    Control your privacy settings
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors">
                <div>
                  <p className="font-medium">Private Profile</p>
                  <p className="text-sm text-muted-foreground">
                    Only followers can see your posts
                  </p>
                </div>
                <button
                  onClick={() => handleToggle('privateProfile')}
                  className={`relative w-12 h-7 rounded-full transition-colors ${
                    settings.privateProfile ? 'bg-primary' : 'bg-muted'
                  }`}
                  role="switch"
                  aria-checked={settings.privateProfile}
                >
                  <div
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.privateProfile ? 'translate-x-5' : ''
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors">
                <div>
                  <p className="font-medium">Allow Direct Messages</p>
                  <p className="text-sm text-muted-foreground">
                    Anyone can send you messages
                  </p>
                </div>
                <button
                  onClick={() => handleToggle('allowMessages')}
                  className={`relative w-12 h-7 rounded-full transition-colors ${
                    settings.allowMessages ? 'bg-primary' : 'bg-muted'
                  }`}
                  role="switch"
                  aria-checked={settings.allowMessages}
                >
                  <div
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.allowMessages ? 'translate-x-5' : ''
                    }`}
                  />
                </button>
              </div>
            </div>
          </Card>

          {/* Account */}
          <Card className="p-6 mb-6 border border-border">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                <Zap className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h2 className="text-xl font-semibold mb-2">Account</h2>
                  <p className="text-sm text-muted-foreground">
                    Manage your account settings
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-secondary/30 rounded-lg">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">alex@vibesync.com</p>
              </div>

              <div className="p-3 bg-secondary/30 rounded-lg">
                <p className="text-sm text-muted-foreground">Username</p>
                <p className="font-medium">@alexvibe</p>
              </div>

              <div className="p-3 bg-secondary/30 rounded-lg">
                <p className="text-sm text-muted-foreground">Account Status</p>
                <p className="font-medium text-green-600">Active</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border space-y-3">
              <Button variant="outline" className="w-full">
                Change Password
              </Button>
              <Button variant="outline" className="w-full">
                Two-Factor Authentication
              </Button>
              <Button variant="destructive" className="w-full">
                Delete Account
              </Button>
            </div>
          </Card>

          {/* Save Button */}
          <div className="flex gap-3">
            <Button onClick={handleSave} className="flex-1">
              Save Changes
            </Button>
            <Button variant="outline" className="flex-1">
              Cancel
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
