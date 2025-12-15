import type { Language, SuggestedLanguages, SortMetric, Region, AllOptions } from './types'
import {
  languages,
  languagesByRank,
  languagesByAlpha,
  languagesByNative,
  calculateScore,
} from './data'
import { presets } from './presets'
import { detectBrowser, suggest } from './suggest'

// Re-export types
export type { Language, SuggestedLanguages, SortMetric, Region, AllOptions }

// Re-export suggest functions
export { detectBrowser, suggest }

/**
 * Get top N languages by composite rank
 * @param n - Number of languages to return (default: all)
 */
export function getTop(n?: number): Language[] {
  if (n === undefined) return languagesByRank
  return languagesByRank.slice(0, n)
}

/**
 * Get all languages sorted by a specific metric
 */
export function sortBy(metric: SortMetric): Language[] {
  switch (metric) {
    case 'total':
      return [...languages].sort((a, b) => b.totalSpeakers - a.totalSpeakers)
    case 'native':
      return [...languages].sort((a, b) => b.nativeSpeakers - a.nativeSpeakers)
    case 'internet':
      return [...languages].sort((a, b) => b.internetUsage - a.internetUsage)
    case 'rank':
    default:
      return languagesByRank
  }
}

/**
 * Get languages for a specific region
 * Returns languages commonly used in that region, ordered by regional importance
 */
export function preset(region: Region): Language[] {
  const codes = presets[region]
  if (!codes) return []

  return codes
    .map((code) => languages.find((l) => l.code === code))
    .filter((l): l is Language => l !== undefined)
}

/**
 * Get all languages with optional sorting
 */
export function all(options?: AllOptions): Language[] {
  const sort = options?.sort ?? 'rank'

  switch (sort) {
    case 'alpha':
      return languagesByAlpha
    case 'native':
      return languagesByNative
    case 'rank':
    default:
      return languagesByRank
  }
}

/**
 * Find a language by its ISO 639-1 or 639-2 code
 */
export function find(code: string): Language | undefined {
  const normalized = code.toLowerCase()
  return languages.find(
    (l) => l.code === normalized || l.code3 === normalized
  )
}

/**
 * Get just the ISO 639-1 codes (useful for <option> values)
 * @param n - Number of codes to return (default: all, sorted by rank)
 */
export function codes(n?: number): string[] {
  const list = n ? languagesByRank.slice(0, n) : languagesByRank
  return list.map((l) => l.code)
}

/**
 * Get available regions for presets
 */
export function regions(): Region[] {
  return Object.keys(presets) as Region[]
}


