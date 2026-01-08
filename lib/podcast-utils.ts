/**
 * Simple hash function for deterministic color selection
 */
export function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Extract 1-2 character initials from podcast title
 * Examples:
 * - "The Daily" → "TD"
 * - "Dhalgren" → "DH"
 * - "99% Invisible" → "9I"
 */
export function getPodcastInitials(title: string): string {
  if (!title) return '??';

  // Clean title: remove special characters except spaces
  const cleaned = title.replace(/[^\w\s]/g, '').trim();
  if (!cleaned) return title.substring(0, 2).toUpperCase();

  const words = cleaned.split(/\s+/);

  if (words.length === 1) {
    // Single word: take first 2 characters
    return words[0].substring(0, 2).toUpperCase();
  }

  // Multiple words: take first letter of first 2 words
  return (words[0][0] + words[1][0]).toUpperCase();
}

/**
 * Gradient colors for podcast placeholders
 */
export interface GradientColors {
  from: string;
  to: string;
}

const GRADIENT_PALETTE: GradientColors[] = [
  { from: '#3b82f6', to: '#4f46e5' },  // blue to indigo
  { from: '#8b5cf6', to: '#ec4899' },  // purple to pink
  { from: '#10b981', to: '#059669' },  // green to emerald
  { from: '#f97316', to: '#ef4444' },  // orange to red
  { from: '#06b6d4', to: '#3b82f6' },  // cyan to blue
  { from: '#f43f5e', to: '#ec4899' },  // rose to pink
  { from: '#f59e0b', to: '#f97316' },  // amber to orange
  { from: '#14b8a6', to: '#06b6d4' },  // teal to cyan
];

/**
 * Get deterministic gradient colors for a podcast
 * Same podcast ID always returns same colors
 */
export function getPodcastColor(podcastId: number | string): GradientColors {
  const hash = typeof podcastId === 'number'
    ? podcastId
    : hashString(podcastId.toString());

  const index = hash % GRADIENT_PALETTE.length;
  return GRADIENT_PALETTE[index];
}
