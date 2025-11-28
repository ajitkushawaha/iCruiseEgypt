import { Locale } from './config';

/**
 * Get localized text based on current locale
 */
export function getLocalizedText(
  textEn: string | undefined,
  textAr: string | undefined,
  locale: Locale,
  fallback?: string
): string {
  if (locale === 'ar' && textAr) return textAr;
  if (locale === 'en' && textEn) return textEn;
  // Fallback chain
  return textAr || textEn || fallback || '';
}

/**
 * Get localized cruise name
 */
export function getCruiseName(cruise: any, locale: Locale): string {
  if (locale === 'ar' && cruise.nameAr) return cruise.nameAr;
  if (locale === 'en' && cruise.nameEn) return cruise.nameEn;
  // Fallback to legacy field or default
  return cruise.name || cruise.nameEn || cruise.nameAr || 'Unnamed Cruise';
}

/**
 * Get localized cruise description
 */
export function getCruiseDescription(cruise: any, locale: Locale): string {
  if (locale === 'ar' && cruise.descriptionAr) return cruise.descriptionAr;
  if (locale === 'en' && cruise.descriptionEn) return cruise.descriptionEn;
  return cruise.description || cruise.descriptionEn || cruise.descriptionAr || '';
}

/**
 * Get localized cruise route
 */
export function getCruiseRoute(cruise: any, locale: Locale): string {
  if (locale === 'ar' && cruise.routeAr) return cruise.routeAr;
  if (locale === 'en' && cruise.routeEn) return cruise.routeEn;
  return cruise.route || cruise.routeEn || cruise.routeAr || '';
}
