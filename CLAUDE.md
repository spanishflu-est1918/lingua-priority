# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm build        # Build with tsup (outputs ESM + CJS to dist/)
pnpm test         # Run tests once
pnpm test:watch   # Run tests in watch mode
pnpm dev          # Build in watch mode
```

Run a single test:
```bash
pnpm vitest run tests/index.test.ts -t "suggest()"
```

## Architecture

A zero-dependency library (~2.5KB gzipped) that sorts languages by global usage instead of alphabetically. Main use case: language dropdown UIs.

### Source Structure

- `src/types.ts` - TypeScript interfaces (`Language`, `SuggestedLanguages`, `Region`)
- `src/data.ts` - Language dataset (50 languages) with speaker counts and internet usage stats. Contains `calculateScore()` for composite ranking and pre-sorted arrays (`languagesByRank`, `languagesByAlpha`, `languagesByNative`)
- `src/presets.ts` - Regional language packs (EU, Americas, APAC, MENA, Africa)
- `src/suggest.ts` - Browser detection (`detectBrowser()`) and smart suggestions (`suggest()`)
- `src/index.ts` - Public API exports

### Ranking Algorithm

Composite score weights:
- Total speakers: 40%
- Native speakers: 30%
- Internet usage: 30%

Normalized against max values (English: 1450M total, 49% internet; Chinese: 920M native).

### Key Functions

- `suggest(n)` - Returns `{ suggested, rest }` for dropdown UIs. Prioritizes browser languages via `navigator.languages`, backfills with top-ranked languages
- `getTop(n)` - Top N by composite rank
- `sortBy(metric)` - Sort by 'total', 'native', 'internet', or 'rank'
- `preset(region)` - Regional language packs
- `find(code)` - Lookup by ISO 639-1 or 639-2

### SSR Compatibility

`detectBrowser()` returns `[]` when `navigator` is undefined, making `suggest()` gracefully fall back to pure ranking.
