import type { Language } from './types'

/**
 * Top 50 languages by composite score (speakers + internet usage)
 * Data sources: Ethnologue, W3Techs, Wikipedia
 * Last updated: 2024
 */
export const languages: Language[] = [
  { code: 'en', code3: 'eng', name: 'English', nativeName: 'English', nativeSpeakers: 380, totalSpeakers: 1450, internetUsage: 49.0 },
  { code: 'zh', code3: 'zho', name: 'Chinese', nativeName: '中文', nativeSpeakers: 920, totalSpeakers: 1120, internetUsage: 1.4 },
  { code: 'es', code3: 'spa', name: 'Spanish', nativeName: 'Español', nativeSpeakers: 475, totalSpeakers: 550, internetUsage: 4.4 },
  { code: 'hi', code3: 'hin', name: 'Hindi', nativeName: 'हिन्दी', nativeSpeakers: 345, totalSpeakers: 610, internetUsage: 0.5 },
  { code: 'ar', code3: 'ara', name: 'Arabic', nativeName: 'العربية', nativeSpeakers: 315, totalSpeakers: 420, internetUsage: 0.8 },
  { code: 'pt', code3: 'por', name: 'Portuguese', nativeName: 'Português', nativeSpeakers: 235, totalSpeakers: 265, internetUsage: 2.4 },
  { code: 'bn', code3: 'ben', name: 'Bengali', nativeName: 'বাংলা', nativeSpeakers: 230, totalSpeakers: 275, internetUsage: 0.2 },
  { code: 'ru', code3: 'rus', name: 'Russian', nativeName: 'Русский', nativeSpeakers: 150, totalSpeakers: 255, internetUsage: 5.0 },
  { code: 'ja', code3: 'jpn', name: 'Japanese', nativeName: '日本語', nativeSpeakers: 125, totalSpeakers: 125, internetUsage: 3.0 },
  { code: 'de', code3: 'deu', name: 'German', nativeName: 'Deutsch', nativeSpeakers: 95, totalSpeakers: 135, internetUsage: 5.5 },
  { code: 'fr', code3: 'fra', name: 'French', nativeName: 'Français', nativeSpeakers: 80, totalSpeakers: 310, internetUsage: 3.5 },
  { code: 'ko', code3: 'kor', name: 'Korean', nativeName: '한국어', nativeSpeakers: 80, totalSpeakers: 82, internetUsage: 1.0 },
  { code: 'vi', code3: 'vie', name: 'Vietnamese', nativeName: 'Tiếng Việt', nativeSpeakers: 85, totalSpeakers: 90, internetUsage: 1.0 },
  { code: 'tr', code3: 'tur', name: 'Turkish', nativeName: 'Türkçe', nativeSpeakers: 82, totalSpeakers: 90, internetUsage: 2.0 },
  { code: 'it', code3: 'ita', name: 'Italian', nativeName: 'Italiano', nativeSpeakers: 65, totalSpeakers: 85, internetUsage: 1.8 },
  { code: 'pl', code3: 'pol', name: 'Polish', nativeName: 'Polski', nativeSpeakers: 45, totalSpeakers: 50, internetUsage: 1.6 },
  { code: 'uk', code3: 'ukr', name: 'Ukrainian', nativeName: 'Українська', nativeSpeakers: 40, totalSpeakers: 45, internetUsage: 0.7 },
  { code: 'nl', code3: 'nld', name: 'Dutch', nativeName: 'Nederlands', nativeSpeakers: 25, totalSpeakers: 30, internetUsage: 1.2 },
  { code: 'th', code3: 'tha', name: 'Thai', nativeName: 'ไทย', nativeSpeakers: 60, totalSpeakers: 65, internetUsage: 0.6 },
  { code: 'id', code3: 'ind', name: 'Indonesian', nativeName: 'Bahasa Indonesia', nativeSpeakers: 45, totalSpeakers: 200, internetUsage: 1.4 },
  { code: 'fa', code3: 'fas', name: 'Persian', nativeName: 'فارسی', nativeSpeakers: 75, totalSpeakers: 110, internetUsage: 1.5 },
  { code: 'ms', code3: 'msa', name: 'Malay', nativeName: 'Bahasa Melayu', nativeSpeakers: 35, totalSpeakers: 290, internetUsage: 0.4 },
  { code: 'he', code3: 'heb', name: 'Hebrew', nativeName: 'עברית', nativeSpeakers: 9, totalSpeakers: 10, internetUsage: 0.4 },
  { code: 'el', code3: 'ell', name: 'Greek', nativeName: 'Ελληνικά', nativeSpeakers: 13, totalSpeakers: 14, internetUsage: 0.5 },
  { code: 'cs', code3: 'ces', name: 'Czech', nativeName: 'Čeština', nativeSpeakers: 10, totalSpeakers: 11, internetUsage: 0.6 },
  { code: 'sv', code3: 'swe', name: 'Swedish', nativeName: 'Svenska', nativeSpeakers: 10, totalSpeakers: 13, internetUsage: 0.6 },
  { code: 'ro', code3: 'ron', name: 'Romanian', nativeName: 'Română', nativeSpeakers: 24, totalSpeakers: 28, internetUsage: 0.5 },
  { code: 'hu', code3: 'hun', name: 'Hungarian', nativeName: 'Magyar', nativeSpeakers: 13, totalSpeakers: 14, internetUsage: 0.4 },
  { code: 'da', code3: 'dan', name: 'Danish', nativeName: 'Dansk', nativeSpeakers: 6, totalSpeakers: 6, internetUsage: 0.3 },
  { code: 'fi', code3: 'fin', name: 'Finnish', nativeName: 'Suomi', nativeSpeakers: 5, totalSpeakers: 6, internetUsage: 0.3 },
  { code: 'no', code3: 'nor', name: 'Norwegian', nativeName: 'Norsk', nativeSpeakers: 5, totalSpeakers: 5, internetUsage: 0.3 },
  { code: 'sk', code3: 'slk', name: 'Slovak', nativeName: 'Slovenčina', nativeSpeakers: 5, totalSpeakers: 6, internetUsage: 0.2 },
  { code: 'bg', code3: 'bul', name: 'Bulgarian', nativeName: 'Български', nativeSpeakers: 8, totalSpeakers: 9, internetUsage: 0.2 },
  { code: 'hr', code3: 'hrv', name: 'Croatian', nativeName: 'Hrvatski', nativeSpeakers: 5, totalSpeakers: 6, internetUsage: 0.1 },
  { code: 'sr', code3: 'srp', name: 'Serbian', nativeName: 'Српски', nativeSpeakers: 9, totalSpeakers: 12, internetUsage: 0.2 },
  { code: 'sl', code3: 'slv', name: 'Slovenian', nativeName: 'Slovenščina', nativeSpeakers: 2, totalSpeakers: 2.5, internetUsage: 0.1 },
  { code: 'et', code3: 'est', name: 'Estonian', nativeName: 'Eesti', nativeSpeakers: 1, totalSpeakers: 1.2, internetUsage: 0.1 },
  { code: 'lv', code3: 'lav', name: 'Latvian', nativeName: 'Latviešu', nativeSpeakers: 1.5, totalSpeakers: 2, internetUsage: 0.1 },
  { code: 'lt', code3: 'lit', name: 'Lithuanian', nativeName: 'Lietuvių', nativeSpeakers: 3, totalSpeakers: 3.2, internetUsage: 0.1 },
  { code: 'ca', code3: 'cat', name: 'Catalan', nativeName: 'Català', nativeSpeakers: 4, totalSpeakers: 10, internetUsage: 0.2 },
  { code: 'eu', code3: 'eus', name: 'Basque', nativeName: 'Euskara', nativeSpeakers: 0.75, totalSpeakers: 1, internetUsage: 0.05 },
  { code: 'gl', code3: 'glg', name: 'Galician', nativeName: 'Galego', nativeSpeakers: 2.4, totalSpeakers: 3, internetUsage: 0.05 },
  { code: 'ta', code3: 'tam', name: 'Tamil', nativeName: 'தமிழ்', nativeSpeakers: 78, totalSpeakers: 85, internetUsage: 0.3 },
  { code: 'te', code3: 'tel', name: 'Telugu', nativeName: 'తెలుగు', nativeSpeakers: 83, totalSpeakers: 95, internetUsage: 0.2 },
  { code: 'mr', code3: 'mar', name: 'Marathi', nativeName: 'मराठी', nativeSpeakers: 83, totalSpeakers: 95, internetUsage: 0.1 },
  { code: 'ur', code3: 'urd', name: 'Urdu', nativeName: 'اردو', nativeSpeakers: 70, totalSpeakers: 230, internetUsage: 0.3 },
  { code: 'sw', code3: 'swa', name: 'Swahili', nativeName: 'Kiswahili', nativeSpeakers: 16, totalSpeakers: 100, internetUsage: 0.1 },
  { code: 'am', code3: 'amh', name: 'Amharic', nativeName: 'አማርኛ', nativeSpeakers: 32, totalSpeakers: 57, internetUsage: 0.05 },
  { code: 'yo', code3: 'yor', name: 'Yoruba', nativeName: 'Yorùbá', nativeSpeakers: 45, totalSpeakers: 50, internetUsage: 0.05 },
  { code: 'ha', code3: 'hau', name: 'Hausa', nativeName: 'Hausa', nativeSpeakers: 50, totalSpeakers: 75, internetUsage: 0.05 },
]

/**
 * Calculate composite rank score
 * Weights: totalSpeakers (0.4), nativeSpeakers (0.3), internetUsage (0.3)
 */
export function calculateScore(lang: Language): number {
  // Normalize to 0-100 scale based on max values in dataset
  const maxTotal = 1450 // English
  const maxNative = 920 // Chinese
  const maxInternet = 49.0 // English

  const totalNorm = (lang.totalSpeakers / maxTotal) * 100
  const nativeNorm = (lang.nativeSpeakers / maxNative) * 100
  const internetNorm = (lang.internetUsage / maxInternet) * 100

  return totalNorm * 0.4 + nativeNorm * 0.3 + internetNorm * 0.3
}

/** Languages pre-sorted by composite score (descending) */
export const languagesByRank = [...languages].sort(
  (a, b) => calculateScore(b) - calculateScore(a)
)

/** Languages sorted alphabetically by English name */
export const languagesByAlpha = [...languages].sort((a, b) =>
  a.name.localeCompare(b.name)
)

/** Languages sorted alphabetically by native name */
export const languagesByNative = [...languages].sort((a, b) =>
  a.nativeName.localeCompare(b.nativeName)
)
