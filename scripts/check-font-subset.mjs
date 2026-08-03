#!/usr/bin/env node
/**
 * 明朝の文字サブセット（index.css の @import ...&text=...）が、
 * **実際に明朝で描画されている文字を全部含んでいるか**を検査する。
 *
 * なぜ要るか:
 *   日本語 Web フォントを全文字読むとフォントだけで 401KB あった（実測 2026-08-03）。
 *   text= で使う文字だけに絞って 47KB にしたが、この方式には弱点がある——
 *   **明朝で表示する文言を足すと、その文字はフォントに含まれず、
 *   エラーも警告も出ないまま静かにゴシックへフォールバックする。**
 *   実際、見本セクションを追加した直後に 170 → 173 文字へ増えて漏れが発生した。
 *   人の記憶に頼ると必ず忘れるので、機械で落とす。
 *
 * 使い方:
 *   npm run build && npx vite preview --port 4190 &
 *   node scripts/check-font-subset.mjs http://localhost:4190/
 *
 * 終了コード: 0 = 網羅できている / 2 = 不足あり（不足文字と、貼り替え用の新しい一覧を表示）
 */

import { readFileSync } from 'node:fs'

// ⚠ ESM の bare specifier は**スクリプトの位置**から解決される（NODE_PATH は効かない）。
//   このリポジトリは playwright を依存に持たないので、外の場所を明示フォールバックする。
//   ops-tools/browser_research.js と同じ作法。
let chromium
for (const cand of [
  'playwright',
  '/root/project/hrm_project/node_modules/playwright/index.mjs',
  '/root/project/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs',
]) {
  try { ({ chromium } = await import(cand)); break } catch { /* 次の候補へ */ }
}
if (!chromium) {
  console.error('✗ playwright が見つかりません。`npx playwright install chromium` 済みの環境で実行してください。')
  process.exit(2)
}

// ⚠ 変数名を URL にするとグローバルの URL コンストラクタを隠す（TypeError になる）
const TARGET = process.argv[2] || 'http://localhost:4190/'
const CSS = new URL('../src/index.css', import.meta.url).pathname

// --- CSS の text= を読む ------------------------------------------------------
const css = readFileSync(CSS, 'utf8')
const m = css.match(/@import url\('([^']*text=[^']*)'\)/)
if (!m) {
  console.error('✗ index.css に text= 付きの @import が見つかりません。')
  process.exit(2)
}
const declared = new Set(decodeURIComponent(new URL(m[1]).searchParams.get('text') || ''))

// --- 実際に明朝で描画されている文字を集める ----------------------------------
const browser = await chromium.launch()
const page = await browser.newPage()
await page.goto(TARGET, { waitUntil: 'networkidle' })
const used = await page.evaluate(() => {
  const out = new Set()
  const walk = (el) => {
    const mincho = /Shippori|Mincho/i.test(getComputedStyle(el).fontFamily || '')
    for (const n of el.childNodes) {
      if (n.nodeType === 3) {
        if (mincho) for (const c of n.textContent) if (c.trim()) out.add(c)
      } else if (n.nodeType === 1) walk(n)
    }
  }
  walk(document.body)
  return [...out]
})
await browser.close()

// --- 差分 --------------------------------------------------------------------
const missing = used.filter((c) => !declared.has(c))
console.log(`宣言: ${declared.size} 文字 / 実使用: ${used.length} 文字`)

if (missing.length === 0) {
  console.log('✓ サブセットは実使用文字をすべて含んでいます。')
  process.exit(0)
}

const merged = [...new Set([...declared, ...used])].sort().join('')
console.error(`\n✗ ${missing.length} 文字がサブセットに含まれていません: ${missing.join('')}`)
console.error('  → この文字は無言でゴシックにフォールバックします。')
console.error('\n新しい text= の値（index.css の @import を貼り替えてください）:')
console.error(encodeURIComponent(merged))
process.exit(2)
