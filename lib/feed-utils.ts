import { Post, User } from './types';

export type FeedSortMode = 'latest' | 'trending' | 'same-vibe';

/**
 * Smart feed scoring algorithm
 * Weights:
 * - sameVibe: 50 (if post vibe matches user vibe)
 * - likes: 2 (per like)
 * - recency: inversely proportional (newer posts score higher)
 */
export function calculateFeedScore(
  post: Post,
  userVibe: string,
  now: Date = new Date()
): number {
  let score = 0;

  // Same vibe bonus (heavy weight)
  if (post.vibe === userVibe) {
    score += 50;
  }

  // Like weight
  score += post.likes * 2;

  // Recency weight - decay over time
  const postAge = now.getTime() - new Date(post.createdAt).getTime();
  const daysSincePost = postAge / (1000 * 60 * 60 * 24);
  const recencyScore = Math.max(0, 100 - daysSincePost * 10);
  score += recencyScore;

  return score;
}

export function sortFeedByMode(
  posts: Post[],
  userVibe: string,
  mode: FeedSortMode
): Post[] {
  const now = new Date();

  switch (mode) {
    case 'latest':
      return [...posts].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

    case 'trending':
      return [...posts].sort((a, b) => b.likes - a.likes);

    case 'same-vibe':
      return [...posts].sort((a, b) => {
        const scoreA = calculateFeedScore(a, userVibe, now);
        const scoreB = calculateFeedScore(b, userVibe, now);
        return scoreB - scoreA;
      });

    default:
      return posts;
  }
}
