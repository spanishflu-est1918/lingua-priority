import type { Language, SuggestedLanguages } from './types'
import { languages, languagesByRank, languagesByAlpha } from './data'

/**
 * Detect browser language preferences
 * Returns Language objects for each detected language
 * Falls back to empty array in Node/SSR
 */
export function detectBrowser(): Language[] {
  if (typeof navigator === 'undefined' || !navigator.languages) {
    return []
  }

  const detected: Language[] = []
  const seen = new Set<string>()

  for (const browserLang of navigator.languages) {
    // Handle both 'en' and 'en-US' formats
    const code = browserLang.split('-')[0].toLowerCase()

    if (seen.has(code)) continue
    seen.add(code)

    const lang = languages.find((l) => l.code === code)
    if (lang) {
      detected.push(lang)
    }
  }

  return detected
}

/**
 * Smart suggestions for dropdown UIs
 * Returns browser languages first, backfilled with top global languages
 *
 * @param n - Number of suggestions (default: 10)
 * @returns { suggested, rest } - Two arrays for separated dropdown UI
 */
export function suggest(n: number = 10): SuggestedLanguages {
  const browserLangs = detectBrowser()
  const seen = new Set<string>()
  const suggested: Language[] = []

  // Add browser languages first
  for (const lang of browserLangs) {
    if (suggested.length >= n) break
    if (!seen.has(lang.code)) {
      seen.add(lang.code)
      suggested.push(lang)
    }
  }

  // Fill remaining slots with top global languages
  for (const lang of languagesByRank) {
    if (suggested.length >= n) break
    if (!seen.has(lang.code)) {
      seen.add(lang.code)
      suggested.push(lang)
    }
  }

  // Rest = everything not in suggested, alphabetically
  const rest = languagesByAlpha.filter((l) => !seen.has(l.code))

  return { suggested, rest }
}
