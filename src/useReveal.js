import { useEffect, useRef } from 'react'

/**
 * スクロールで要素をふわっと出す。framer-motion の代替。
 *
 * なぜ自作か: framer-motion は gzip で約50KB ある。ここで欲しいのは
 * 「画面に入ったら一度だけ表示する」だけなので、IntersectionObserver で足りる。
 * ライブラリを足さない＝**転送量 0KB**（参考サイトより軽くするための判断／2026-08-03）。
 *
 * 使い方:
 *   const ref = useReveal()
 *   <div ref={ref} className="reveal">…</div>
 *
 * 実際の見た目は index.css の .reveal / .reveal.is-in が持つ。
 * `prefers-reduced-motion` は CSS 側で無効化しているので、ここでは扱わない。
 */
export default function useReveal({ threshold = 0.15, once = true } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // IntersectionObserver が無い環境では、隠したままにせず必ず表示する
    // （見えないままになるのが最悪なので、フォールバックは「出す」側に倒す）
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-in')
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            if (once) io.unobserve(e.target)
          } else if (!once) {
            e.target.classList.remove('is-in')
          }
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, once])

  return ref
}
