'use client';

import { Topbar } from '@/components/topbar';
import { Sidebar } from '@/components/sidebar';
import { ReelPlayer } from '@/components/reel-player';
import { DEMO_REELS, CURRENT_USER_ID } from '@/lib/mock-data';

export default function ReelsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Topbar currentUserId={CURRENT_USER_ID} />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 px-4 md:px-6 py-8">
          <h1 className="text-3xl font-bold mb-2">Explore Reels</h1>
          <p className="text-muted-foreground mb-8">
            Discover short-form videos from your community
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEMO_REELS.map((reel) => (
              <ReelPlayer
                key={reel.id}
                reel={reel}
                onLike={(reelId) => console.log(`[v0] Liked reel ${reelId}`)}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
