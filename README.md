# lingua-priority

> **Stop scrolling past Somali to find Spanish.**

[![npm version](https://img.shields.io/npm/v/lingua-priority.svg)](https://www.npmjs.com/package/lingua-priority)
[![bundle size](https://img.shields.io/bundlephobia/minzip/lingua-priority)](https://bundlephobia.com/package/lingua-priority)
[![tests](https://img.shields.io/badge/tests-48%20passed-brightgreen)](https://github.com/spanishflu-est1918/lingua-priority)
[![zero dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)](https://www.npmjs.com/package/lingua-priority)

A tiny (~2.5KB) zero-dependency library that sorts languages by actual global usage instead of alphabetically. Because **Spanish has 500+ million speakers** and shouldn't be buried under Samoan, Serbian, and Shona.

## The Problem

Every language dropdown ever:

```
Afrikaans
Albanian  
Amharic
Armenian
Azerbaijani
...
[42 languages later]
...
Slovenian
Somali
Spanish   ← There it is! The 4th most spoken language on Earth!
```

Your users in Madrid, Mexico City, and Miami are mass-scrolling past Sango (5M speakers) to find their language. This is broken UX that's been copy-pasted across the internet for decades.

## The Solution

```bash
npm install lingua-priority
```

```typescript
import { suggest } from 'lingua-priority'

const { suggested, rest } = suggest(10)
// suggested: English, Chinese, Spanish, Hindi, Arabic... (by actual usage)
// rest: Afrikaans, Albanian, Amharic... (alphabetical)
```

That's it. Two arrays. Build your dropdown with a separator.

## Perfect Dropdown Pattern

```
┌─────────────────────────────┐
│ 🔥 Suggested                │
├─────────────────────────────┤
│ Español                     │  ← Browser detected: Spanish
│ English                     │  ← Browser detected: English
│ 中文 (Chinese)              │  ← Top global #2
│ हिन्दी (Hindi)               │  ← Top global #4
│ العربية (Arabic)            │  ← Top global #5
├─────────────────────────────┤
│ 🌍 All Languages            │
├─────────────────────────────┤
│ Afrikaans                   │
│ Albanian                    │
│ Amharic                     │
│ ...                         │
└─────────────────────────────┘
```

The `suggest()` function:
1. Detects browser languages via `navigator.languages`
2. Backfills with top global languages by speaker count
3. Returns the rest alphabetically

Your Spanish user sees Spanish first. Your Japanese user sees Japanese first. Everyone else gets English, Chinese, Spanish at the top — languages that cover **60% of the internet**.

## React Example

```tsx
import { suggest } from 'lingua-priority'

function LanguageSelect({ value, onChange }) {
  const { suggested, rest } = suggest(10)

  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <optgroup label="Suggested">
        {suggested.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.nativeName}
          </option>
        ))}
      </optgroup>
      <optgroup label="All Languages">
        {rest.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.nativeName}
          </option>
        ))}
      </optgroup>
    </select>
  )
}
```

## Vue Example

```vue
<script setup>
import { suggest } from 'lingua-priority'

const { suggested, rest } = suggest(10)
const selected = ref('en')
</script>

<template>
  <select v-model="selected">
    <optgroup label="Suggested">
      <option v-for="lang in suggested" :key="lang.code" :value="lang.code">
        {{ lang.nativeName }}
      </option>
    </optgroup>
    <optgroup label="All Languages">
      <option v-for="lang in rest" :key="lang.code" :value="lang.code">
        {{ lang.nativeName }}
      </option>
    </optgroup>
  </select>
</template>
```

## API

### `suggest(n?: number)`

The main event. Returns browser-detected languages first, filled with top global languages.

```typescript
const { suggested, rest } = suggest(10)
// suggested: Language[] - Smart picks (max n)
// rest: Language[] - Everything else, A-Z
```

### `getTop(n?: number)`

Top languages by composite rank (speakers + internet usage).

```typescript
getTop(5)
// → English, Chinese, Spanish, Hindi, Arabic
```

### `sortBy(metric)`

Sort by a specific metric.

```typescript
sortBy('native')   // By native speakers: Chinese, Spanish, English...
sortBy('total')    // By total speakers: English, Chinese, Spanish...
sortBy('internet') // By web content: English, Russian, German...
```

### `preset(region)`

Regional language packs.

```typescript
preset('EU')       // German, French, Spanish, Italian, Polish...
preset('Americas') // English, Spanish, Portuguese, French
preset('APAC')     // Chinese, Japanese, Korean, Hindi...
preset('MENA')     // Arabic, Turkish, Persian, Hebrew, Urdu
preset('Africa')   // English, French, Arabic, Swahili...
```

### `find(code)`

Find by ISO 639-1 or 639-2 code.

```typescript
find('es')  // → { code: 'es', name: 'Spanish', nativeName: 'Español', ... }
find('spa') // → Same (ISO 639-2 also works)
```

### `codes(n?: number)`

Just the codes, for `<option value="">`.

```typescript
codes(5) // → ['en', 'zh', 'es', 'hi', 'ar']
```

### `detectBrowser()`

Get browser language preferences. SSR-safe (returns `[]` on server).

```typescript
detectBrowser() // → [{ code: 'es', ... }, { code: 'en', ... }]
```

## Data Shape

```typescript
interface Language {
  code: string         // 'es' (ISO 639-1)
  code3: string        // 'spa' (ISO 639-2)
  name: string         // 'Spanish'
  nativeName: string   // 'Español'
  nativeSpeakers: number // 475 (millions)
  totalSpeakers: number  // 550 (millions)
  internetUsage: number  // 4.4 (% of web content)
}
```

## Why This Ranking?

The composite score balances three factors:

| Factor | Weight | Why |
|--------|--------|-----|
| Total speakers | 40% | Actual reach (native + L2) |
| Native speakers | 30% | Cultural weight |
| Internet usage | 30% | Digital relevance |

This puts **English** first (internet dominance), **Chinese** second (speaker count), and **Spanish** third (huge L2 population). Hindi and Arabic round out the top 5.

## Data Sources

- **Ethnologue 2024** — Speaker counts
- **W3Techs** — Web content statistics  
- **Wikipedia** — Cross-reference

## SSR / Next.js / Remix

Works perfectly. `detectBrowser()` returns `[]` when `navigator` is undefined, so `suggest()` gracefully falls back to pure ranking. No hydration mismatches.

```typescript
// Server: suggest() returns top by rank
// Client: suggest() returns browser langs + top by rank
```

## Bundle Size

| Format | Size | Gzipped |
|--------|------|---------|
| ESM | 7.9 KB | 2.5 KB |
| CJS | 8.0 KB | 2.6 KB |

Zero dependencies. Tree-shakeable.

## FAQ

**Q: Why not just use the browser's locale?**

`navigator.language` gives you one language. `navigator.languages` gives you a preference list, but most users don't configure this. Our approach: use browser preferences when available, fall back to global usage statistics.

**Q: Why not alphabetical with "popular" pinned at top?**

That's essentially what `suggest()` does, but smarter. The "popular" list is generated from actual data, and it adapts to the user's browser settings.

**Q: Can I customize the ranking weights?**

Not yet. Open an issue if you need this.

**Q: What about country-specific variants (en-US, en-GB)?**

We normalize to base language codes. `en-US` and `en-GB` both map to `en`. For most dropdowns, this is what you want.

## Contributing

PRs welcome. The language data is in `src/data.ts`. If you find outdated statistics, please submit a fix with sources.

## License

MIT © [SPANISH FLU](https://github.com/spanishflu-est1918)

---

**Stop punishing your users with alphabetical language lists.** Spanish speakers shouldn't have to scroll past Somali. Hindi speakers shouldn't hunt past Hausa. Fix your dropdowns.

```bash
npm install lingua-priority
```
