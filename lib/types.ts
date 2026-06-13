export interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  bio: string;
  avatar: string;
  vibe: string;
  followers: number;
  following: number;
  createdAt: string;
}

export interface Post {
  id: string;
  authorId: string;
  author?: User;
  content: string;
  vibe: string;
  image?: string;
  likes: number;
  comments: number;
  liked?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Reel {
  id: string;
  authorId: string;
  author?: User;
  videoUrl: string;
  thumbnail: string;
  title: string;
  description: string;
  vibe: string;
  likes: number;
  comments: number;
  liked?: boolean;
  views: number;
  createdAt: string;
}

export interface Comment {
  id: string;
  postId?: string;
  authorId: string;
  author?: User;
  content: string;
  likes: number;
  createdAt: string;
  replies?: Comment[];
}

export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'follow';
  actorId: string;
  actor?: User;
  postId?: string;
  read: boolean;
  createdAt: string;
}
