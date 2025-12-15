import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  getTop,
  sortBy,
  preset,
  all,
  find,
  codes,
  regions,
  suggest,
  detectBrowser,
} from '../src/index'
import { languages } from '../src/data'

// Helper to mock navigator.languages
function mockNavigatorLanguages(langs: string[] | undefined) {
  if (langs === undefined) {
    vi.stubGlobal('navigator', undefined)
  } else {
    vi.stubGlobal('navigator', { languages: langs })
  }
}

describe('lingua-priority', () => {
  describe('data integrity', () => {
    it('should have at least 50 languages', () => {
      expect(languages.length).toBeGreaterThanOrEqual(50)
    })

    it('should have valid structure for all languages', () => {
      for (const lang of languages) {
        expect(lang.code).toMatch(/^[a-z]{2}$/)
        expect(lang.code3).toMatch(/^[a-z]{3}$/)
        expect(lang.name).toBeTruthy()
        expect(lang.nativeName).toBeTruthy()
        expect(lang.nativeSpeakers).toBeGreaterThan(0)
        expect(lang.totalSpeakers).toBeGreaterThan(0)
        expect(lang.internetUsage).toBeGreaterThanOrEqual(0)
      }
    })

    it('should have unique ISO codes', () => {
      const codes = languages.map((l) => l.code)
      const uniqueCodes = new Set(codes)
      expect(uniqueCodes.size).toBe(codes.length)
    })

    it('should have totalSpeakers >= nativeSpeakers', () => {
      for (const lang of languages) {
        expect(lang.totalSpeakers).toBeGreaterThanOrEqual(lang.nativeSpeakers)
      }
    })
  })

  describe('getTop()', () => {
    it('should return all languages when no argument', () => {
      expect(getTop().length).toBe(languages.length)
    })

    it('should return exact count requested', () => {
      expect(getTop(5)).toHaveLength(5)
      expect(getTop(10)).toHaveLength(10)
      expect(getTop(1)).toHaveLength(1)
    })

    it('should return English first (highest composite rank)', () => {
      const top = getTop(1)
      expect(top[0].code).toBe('en')
    })

    it('should have Spanish in top 5', () => {
      const top5 = getTop(5)
      const spanish = top5.find((l) => l.code === 'es')
      expect(spanish).toBeDefined()
    })

    it('should return languages sorted by composite rank', () => {
      const top = getTop(10)
      // English should beat Chinese (more internet usage despite fewer native)
      expect(top[0].code).toBe('en')
      // Chinese should be second (most native speakers)
      expect(top[1].code).toBe('zh')
    })
  })

  describe('sortBy()', () => {
    it('should sort by total speakers', () => {
      const sorted = sortBy('total')
      expect(sorted[0].code).toBe('en') // 1450M total
      for (let i = 1; i < sorted.length; i++) {
        expect(sorted[i - 1].totalSpeakers).toBeGreaterThanOrEqual(
          sorted[i].totalSpeakers
        )
      }
    })

    it('should sort by native speakers', () => {
      const sorted = sortBy('native')
      expect(sorted[0].code).toBe('zh') // 920M native
      for (let i = 1; i < sorted.length; i++) {
        expect(sorted[i - 1].nativeSpeakers).toBeGreaterThanOrEqual(
          sorted[i].nativeSpeakers
        )
      }
    })

    it('should sort by internet usage', () => {
      const sorted = sortBy('internet')
      expect(sorted[0].code).toBe('en') // 49% of web
      for (let i = 1; i < sorted.length; i++) {
        expect(sorted[i - 1].internetUsage).toBeGreaterThanOrEqual(
          sorted[i].internetUsage
        )
      }
    })

    it('should sort by rank (same as getTop)', () => {
      const sorted = sortBy('rank')
      const top = getTop()
      expect(sorted).toEqual(top)
    })
  })

  describe('preset()', () => {
    it('should return EU languages', () => {
      const eu = preset('EU')
      expect(eu.length).toBeGreaterThan(10)
      expect(eu.some((l) => l.code === 'de')).toBe(true)
      expect(eu.some((l) => l.code === 'fr')).toBe(true)
      expect(eu.some((l) => l.code === 'es')).toBe(true)
    })

    it('should return Americas languages', () => {
      const americas = preset('Americas')
      expect(americas.some((l) => l.code === 'en')).toBe(true)
      expect(americas.some((l) => l.code === 'es')).toBe(true)
      expect(americas.some((l) => l.code === 'pt')).toBe(true)
    })

    it('should return APAC languages', () => {
      const apac = preset('APAC')
      expect(apac.some((l) => l.code === 'zh')).toBe(true)
      expect(apac.some((l) => l.code === 'ja')).toBe(true)
      expect(apac.some((l) => l.code === 'ko')).toBe(true)
    })

    it('should return MENA languages', () => {
      const mena = preset('MENA')
      expect(mena.some((l) => l.code === 'ar')).toBe(true)
      expect(mena.some((l) => l.code === 'tr')).toBe(true)
      expect(mena.some((l) => l.code === 'fa')).toBe(true)
    })

    it('should return Africa languages', () => {
      const africa = preset('Africa')
      expect(africa.some((l) => l.code === 'sw')).toBe(true)
      expect(africa.some((l) => l.code === 'ar')).toBe(true)
    })
  })

  describe('all()', () => {
    it('should return all languages by rank (default)', () => {
      const result = all()
      expect(result.length).toBe(languages.length)
      expect(result[0].code).toBe('en')
    })

    it('should sort alphabetically by English name', () => {
      const result = all({ sort: 'alpha' })
      for (let i = 1; i < result.length; i++) {
        expect(result[i - 1].name.localeCompare(result[i].name)).toBeLessThanOrEqual(0)
      }
    })

    it('should sort by native name', () => {
      const result = all({ sort: 'native' })
      expect(result.length).toBe(languages.length)
    })
  })

  describe('find()', () => {
    it('should find by ISO 639-1 code', () => {
      const spanish = find('es')
      expect(spanish?.name).toBe('Spanish')
      expect(spanish?.nativeName).toBe('Español')
    })

    it('should find by ISO 639-2 code', () => {
      const spanish = find('spa')
      expect(spanish?.name).toBe('Spanish')
    })

    it('should be case insensitive', () => {
      expect(find('ES')?.code).toBe('es')
      expect(find('SPA')?.code).toBe('es')
    })

    it('should return undefined for unknown codes', () => {
      expect(find('xx')).toBeUndefined()
      expect(find('xxx')).toBeUndefined()
    })
  })

  describe('codes()', () => {
    it('should return all codes when no argument', () => {
      const result = codes()
      expect(result.length).toBe(languages.length)
      expect(result[0]).toBe('en')
    })

    it('should return requested count', () => {
      expect(codes(5)).toHaveLength(5)
      expect(codes(5)).toEqual(['en', 'zh', 'es', 'hi', 'ar'])
    })

    it('should return strings only', () => {
      const result = codes(10)
      for (const code of result) {
        expect(typeof code).toBe('string')
        expect(code).toMatch(/^[a-z]{2}$/)
      }
    })
  })

  describe('regions()', () => {
    it('should return all available regions', () => {
      const result = regions()
      expect(result).toContain('EU')
      expect(result).toContain('Americas')
      expect(result).toContain('APAC')
      expect(result).toContain('MENA')
      expect(result).toContain('Africa')
    })
  })

  describe('detectBrowser()', () => {
    afterEach(() => {
      vi.unstubAllGlobals()
    })

    it('should return empty array in SSR (no navigator)', () => {
      mockNavigatorLanguages(undefined)
      expect(detectBrowser()).toEqual([])
    })

    it('should return empty array if navigator.languages is undefined', () => {
      vi.stubGlobal('navigator', {})
      expect(detectBrowser()).toEqual([])
    })

    it('should detect browser languages', () => {
      mockNavigatorLanguages(['es-ES', 'en-US', 'ca'])
      const detected = detectBrowser()
      expect(detected).toHaveLength(3)
      expect(detected[0].code).toBe('es')
      expect(detected[1].code).toBe('en')
      expect(detected[2].code).toBe('ca')
    })

    it('should handle language codes without region', () => {
      mockNavigatorLanguages(['fr', 'de'])
      const detected = detectBrowser()
      expect(detected[0].code).toBe('fr')
      expect(detected[1].code).toBe('de')
    })

    it('should dedupe same base language', () => {
      mockNavigatorLanguages(['en-US', 'en-GB', 'en'])
      const detected = detectBrowser()
      expect(detected).toHaveLength(1)
      expect(detected[0].code).toBe('en')
    })

    it('should skip unknown language codes', () => {
      mockNavigatorLanguages(['es', 'xx', 'en'])
      const detected = detectBrowser()
      expect(detected).toHaveLength(2)
      expect(detected[0].code).toBe('es')
      expect(detected[1].code).toBe('en')
    })
  })

  describe('suggest()', () => {
    afterEach(() => {
      vi.unstubAllGlobals()
    })

    it('should return suggested and rest arrays', () => {
      mockNavigatorLanguages(undefined)
      const result = suggest(10)
      expect(result).toHaveProperty('suggested')
      expect(result).toHaveProperty('rest')
      expect(Array.isArray(result.suggested)).toBe(true)
      expect(Array.isArray(result.rest)).toBe(true)
    })

    it('should return correct count in suggested', () => {
      mockNavigatorLanguages(undefined)
      expect(suggest(5).suggested).toHaveLength(5)
      expect(suggest(10).suggested).toHaveLength(10)
    })

    it('should not have duplicates between suggested and rest', () => {
      mockNavigatorLanguages(undefined)
      const { suggested, rest } = suggest(10)
      const suggestedCodes = new Set(suggested.map((l) => l.code))
      for (const lang of rest) {
        expect(suggestedCodes.has(lang.code)).toBe(false)
      }
    })

    it('should have all languages accounted for', () => {
      mockNavigatorLanguages(undefined)
      const { suggested, rest } = suggest(10)
      expect(suggested.length + rest.length).toBe(languages.length)
    })

    it('should sort rest alphabetically', () => {
      mockNavigatorLanguages(undefined)
      const { rest } = suggest(10)
      for (let i = 1; i < rest.length; i++) {
        expect(rest[i - 1].name.localeCompare(rest[i].name)).toBeLessThanOrEqual(0)
      }
    })

    it('should prioritize browser languages', () => {
      mockNavigatorLanguages(['ca', 'eu']) // Catalan and Basque (not globally top)
      const { suggested } = suggest(10)
      expect(suggested[0].code).toBe('ca')
      expect(suggested[1].code).toBe('eu')
    })

    it('should fill with top global after browser langs', () => {
      mockNavigatorLanguages(['ca']) // Only Catalan
      const { suggested } = suggest(5)
      expect(suggested[0].code).toBe('ca') // Browser first
      expect(suggested[1].code).toBe('en') // Then top global
      expect(suggested[2].code).toBe('zh')
    })

    it('should work in SSR (no browser)', () => {
      mockNavigatorLanguages(undefined)
      const { suggested } = suggest(5)
      // Should just be top 5 by rank
      expect(suggested.map((l) => l.code)).toEqual(['en', 'zh', 'es', 'hi', 'ar'])
    })

    it('should default to 10 suggestions', () => {
      mockNavigatorLanguages(undefined)
      const { suggested } = suggest()
      expect(suggested).toHaveLength(10)
    })
  })

  describe('real-world scenarios', () => {
    afterEach(() => {
      vi.unstubAllGlobals()
    })

    it('Spanish should never require scrolling past Somali', () => {
      mockNavigatorLanguages(undefined)
      const { suggested } = suggest(10)
      const spanishIndex = suggested.findIndex((l) => l.code === 'es')
      // Spanish should be in top 10 suggestions
      expect(spanishIndex).toBeGreaterThanOrEqual(0)
      expect(spanishIndex).toBeLessThan(10)
    })

    it('should work for a Spanish user', () => {
      mockNavigatorLanguages(['es-ES', 'ca', 'en'])
      const { suggested, rest } = suggest(10)

      // Their languages come first
      expect(suggested[0].code).toBe('es')
      expect(suggested[1].code).toBe('ca')
      expect(suggested[2].code).toBe('en')

      // Rest is alphabetical and doesn't include their languages
      expect(rest.find((l) => l.code === 'es')).toBeUndefined()
    })

    it('should work for a German user', () => {
      mockNavigatorLanguages(['de-DE', 'en-US'])
      const { suggested } = suggest(10)

      expect(suggested[0].code).toBe('de')
      expect(suggested[1].code).toBe('en')
    })

    it('should work for a Japanese user', () => {
      mockNavigatorLanguages(['ja'])
      const { suggested } = suggest(5)

      expect(suggested[0].code).toBe('ja')
      // Rest filled with top global
      expect(suggested.slice(1).map((l) => l.code)).toEqual(['en', 'zh', 'es', 'hi'])
    })
  })
})
