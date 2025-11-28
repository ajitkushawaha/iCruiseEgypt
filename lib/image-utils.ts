/**
 * Image utility functions for handling missing images
 */

const FALLBACK_IMAGES = {
  cruise: '/hero.png',
  destination: '/deck.png',
  cabin: '/cabin.png',
  deck: '/deck.png',
  default: '/hero.png',
};

/**
 * Get a fallback image path if the provided image doesn't exist
 */
export function getImagePath(imagePath?: string | null, type: keyof typeof FALLBACK_IMAGES = 'default'): string {
  if (!imagePath) {
    return FALLBACK_IMAGES[type];
  }
  
  // If image path exists and is a valid path, return it
  // In production, you might want to check if the file actually exists
  if (imagePath.startsWith('/') || imagePath.startsWith('http')) {
    return imagePath;
  }
  
  return FALLBACK_IMAGES[type];
}

/**
 * Generate a placeholder image URL using a placeholder service
 * This can be used when no image is available
 */
export function getPlaceholderImage(width: number = 400, height: number = 300, text?: string): string {
  const placeholderText = text ? encodeURIComponent(text) : 'Cruise Image';
  return `https://placehold.co/${width}x${height}?text=${placeholderText}`;
}

