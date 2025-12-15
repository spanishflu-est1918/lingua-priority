export interface Language {
  /** ISO 639-1 code (e.g., 'es') */
  code: string
  /** ISO 639-2 code (e.g., 'spa') */
  code3: string
  /** English name */
  name: string
  /** Native name (e.g., 'Español') */
  nativeName: string
  /** Native speakers in millions */
  nativeSpeakers: number
  /** Total speakers in millions (native + L2) */
  totalSpeakers: number
  /** Percentage of web content */
  internetUsage: number
}

export interface SuggestedLanguages {
  /** Smart picks: browser languages + top ranked */
  suggested: Language[]
  /** Everything else, alphabetically sorted */
  rest: Language[]
}

export type SortMetric = 'total' | 'native' | 'internet' | 'rank'

export type Region = 'EU' | 'Americas' | 'APAC' | 'MENA' | 'Africa'

export interface AllOptions {
  sort?: 'rank' | 'alpha' | 'native'
}
