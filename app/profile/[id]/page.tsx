'use client';

import { useState, use } from 'react';
import Image from 'next/image';
import { Topbar } from '@/components/topbar';
import { PostCard } from '@/components/post-card';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DEMO_USERS, DEMO_POSTS } from '@/lib/mock-data';
import { Users, UserPlus, Share2 } from 'lucide-react';

interface ProfilePageProps {
  params: Promise<{ id: string }>;
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { id } = use(params);
  const user = DEMO_USERS[id as keyof typeof DEMO_USERS];
  const [isFollowing, setIsFollowing] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Topbar />
        <main className="flex items-center justify-center py-20">
          <p className="text-muted-foreground">User not found</p>
        </main>
      </div>
    );
  }

  const userPosts = DEMO_POSTS.filter((post) => post.authorId === user.id);

  return (
    <div className="min-h-screen bg-background">
      <Topbar currentUserId={id} />

      <main className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        {/* Profile Header */}
        <Card className="overflow-hidden mb-8 border border-border">
          {/* Banner */}
          <div className="h-32 bg-gradient-to-r from-primary via-accent to-primary" />

          {/* Profile Info */}
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 -mt-16 mb-6">
              {/* Avatar and Name */}
              <div className="flex items-end gap-4">
                <div className="w-32 h-32 rounded-lg border-4 border-background overflow-hidden bg-card shadow-lg">
                  {user.avatar && (
                    <Image
                      src={user.avatar}
                      alt={user.username}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="pb-2">
                  <h1 className="text-3xl font-bold">{user.name}</h1>
                  <p className="text-muted-foreground">@{user.username}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  variant={isFollowing ? 'outline' : 'default'}
                  onClick={() => setIsFollowing(!isFollowing)}
                  className="gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
                <Button variant="outline" className="gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </div>

            {/* Bio */}
            <p className="text-foreground mb-4 leading-relaxed">{user.bio}</p>

            {/* Stats */}
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4 p-4 bg-secondary/30 rounded-lg mb-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{user.followers}</p>
                <p className="text-xs text-muted-foreground">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{user.following}</p>
                <p className="text-xs text-muted-foreground">Following</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-accent">{userPosts.length}</p>
                <p className="text-xs text-muted-foreground">Posts</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 rounded-full">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-primary">{user.vibe}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Vibe</p>
              </div>
            </div>
          </div>
        </Card>

        {/* User Posts */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Posts</h2>
          {userPosts.length > 0 ? (
            userPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <Card className="p-8 text-center text-muted-foreground border border-border">
              <p>No posts yet</p>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
