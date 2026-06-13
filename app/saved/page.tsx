'use client';

import { Topbar } from '@/components/topbar';
import { Sidebar } from '@/components/sidebar';
import { Card } from '@/components/ui/card';
import { CURRENT_USER_ID } from '@/lib/mock-data';
import { BookMarked } from 'lucide-react';

export default function SavedPage() {
  return (
    <div className="min-h-screen bg-background">
      <Topbar currentUserId={CURRENT_USER_ID} />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 max-w-3xl mx-auto px-4 md:px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Saved Posts</h1>
            <p className="text-muted-foreground">
              Your saved posts and bookmarks
            </p>
          </div>

          <Card className="p-12 text-center border border-border">
            <BookMarked className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground text-lg">
              No saved posts yet
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Save posts to read them later
            </p>
          </Card>
        </main>
      </div>
    </div>
  );
}
