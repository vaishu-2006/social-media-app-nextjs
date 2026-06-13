'use client';

import { useState } from 'react';
import { Topbar } from '@/components/topbar';
import { Sidebar } from '@/components/sidebar';
import { Feed } from '@/components/feed';
import { CreatePostCard } from '@/components/create-post-card';
import { DEMO_USERS, DEMO_POSTS, CURRENT_USER_ID } from '@/lib/mock-data';

export default function Home() {
  const [posts, setPosts] = useState(DEMO_POSTS);
  const currentUser = DEMO_USERS[CURRENT_USER_ID as keyof typeof DEMO_USERS];

  const handleCreatePost = (content: string) => {
    // This would normally be sent to the server
    console.log('[v0] Creating post:', content);
  };

  const handlePostLike = (postId: string) => {
    console.log('[v0] Liked post:', postId);
  };

  const handlePostComment = (postId: string) => {
    console.log('[v0] Commenting on post:', postId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Topbar currentUserId={CURRENT_USER_ID} />
      
      <main className="flex max-w-7xl mx-auto px-4 md:px-6 py-8 gap-6">
        {/* Main Feed */}
        <div className="flex-1 min-w-0">
          <div className="space-y-4">
            <CreatePostCard currentUser={currentUser} onPost={handleCreatePost} />
            <Feed
              posts={posts}
              currentUser={currentUser}
              onPostLike={handlePostLike}
              onPostComment={handlePostComment}
            />
          </div>
        </div>

        {/* Sidebar */}
        <Sidebar currentUser={currentUser} />
      </main>
    </div>
  );
}
