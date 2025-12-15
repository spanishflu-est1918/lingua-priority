import type { Region } from './types'

/**
 * Regional presets - language codes commonly needed in each region
 * Ordered by regional importance, not global rank
 */
export const presets: Record<Region, string[]> = {
  EU: [
    'en', 'de', 'fr', 'es', 'it', 'pl', 'nl', 'pt', 'sv', 'cs',
    'ro', 'hu', 'el', 'da', 'fi', 'sk', 'bg', 'hr', 'sl', 'et',
    'lv', 'lt', 'ca', 'eu', 'gl'
  ],
  Americas: [
    'en', 'es', 'pt', 'fr'
  ],
  APAC: [
    'zh', 'ja', 'ko', 'hi', 'id', 'vi', 'th', 'ms', 'bn', 'ta',
    'te', 'mr'
  ],
  MENA: [
    'ar', 'tr', 'fa', 'he', 'ur'
  ],
  Africa: [
    'en', 'fr', 'ar', 'sw', 'am', 'yo', 'ha', 'pt'
  ],
}
