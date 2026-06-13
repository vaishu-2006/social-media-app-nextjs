'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Topbar } from '@/components/topbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DEMO_USERS, CURRENT_USER_ID } from '@/lib/mock-data';
import { Heart, MessageCircle, UserPlus, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow';
  actor: (typeof DEMO_USERS)[keyof typeof DEMO_USERS];
  message: string;
  timestamp: string;
  read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'like',
    actor: DEMO_USERS.user2,
    message: 'liked your post',
    timestamp: '2024-04-10T10:30:00Z',
    read: false,
  },
  {
    id: '2',
    type: 'follow',
    actor: DEMO_USERS.user3,
    message: 'started following you',
    timestamp: '2024-04-10T08:15:00Z',
    read: false,
  },
  {
    id: '3',
    type: 'comment',
    actor: DEMO_USERS.user1,
    message: 'commented on your post',
    timestamp: '2024-04-09T18:45:00Z',
    read: true,
  },
  {
    id: '4',
    type: 'like',
    actor: DEMO_USERS.user3,
    message: 'liked your post',
    timestamp: '2024-04-09T14:20:00Z',
    read: true,
  },
  {
    id: '5',
    type: 'follow',
    actor: DEMO_USERS.user2,
    message: 'started following you',
    timestamp: '2024-04-08T11:05:00Z',
    read: true,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifications =
    filter === 'unread'
      ? notifications.filter((n) => !n.read)
      : notifications;

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="w-4 h-4 text-destructive" />;
      case 'comment':
        return <MessageCircle className="w-4 h-4 text-primary" />;
      case 'follow':
        return <UserPlus className="w-4 h-4 text-accent" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Topbar currentUserId={CURRENT_USER_ID} />

      <main className="max-w-2xl mx-auto px-4 md:px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Notifications</h1>
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'unread' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('unread')}
            >
              Unread ({notifications.filter((n) => !n.read).length})
            </Button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`p-4 border border-border transition-all ${
                  !notification.read
                    ? 'bg-primary/5 border-primary/30'
                    : 'hover:bg-secondary/30'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Actor Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent overflow-hidden flex-shrink-0">
                    {notification.actor.avatar && (
                      <Image
                        src={notification.actor.avatar}
                        alt={notification.actor.username}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {getIcon(notification.type)}
                      <Link href={`/profile/${notification.actor.id}`}>
                        <span className="font-semibold hover:underline">
                          {notification.actor.name}
                        </span>
                      </Link>
                      <span className="text-muted-foreground">
                        {notification.message}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(notification.timestamp), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 flex-shrink-0">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="text-xs"
                      >
                        Mark read
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(notification.id)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-8 text-center text-muted-foreground border border-border">
              <p>No notifications yet. Stay tuned for updates from your community!</p>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
