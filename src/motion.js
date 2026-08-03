import { useEffect, useRef, useState } from 'react'

/**
 * 動きのための小さなフック集。
 *
 * 方針: ライブラリを足さない（framer-motion は gzip 約50KB、GSAP はさらに大きい）。
 *   参考サイト（off-notes-yuki/lab）は canvas と three.js で動かしていたが、
 *   lab/03 は読み込み 10.3秒、lab/04 は 996KB だった。同じ密度の動きは狙わず、
 *   **軽いまま「生きている」ように見せる**方に振る。
 *
 * 共通の約束:
 *   - スクロールは1つの listener に集約し、rAF で間引く（複数登録すると重くなる）。
 *   - 再描画を避けるため、値は state ではなく ref 経由で直接 style / CSS 変数に書く。
 *   - `prefers-reduced-motion` を尊重する。動きを止めても内容は必ず見える形にする。
 */

const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** スクロール位置を rAF で間引いて配るだけの共有 listener */
function onScrollRAF(cb) {
  let raf = 0
  const handler = () => {
    if (raf) return
    raf = requestAnimationFrame(() => {
      raf = 0
      cb(window.scrollY)
    })
  }
  handler()
  window.addEventListener('scroll', handler, { passive: true })
  window.addEventListener('resize', handler, { passive: true })
  return () => {
    window.removeEventListener('scroll', handler)
    window.removeEventListener('resize', handler)
    if (raf) cancelAnimationFrame(raf)
  }
}

/**
 * 読み進み具合を示す細い線。要素の transform を直接書く（再描画しない）。
 */
export function useScrollProgress() {
  const ref = useRef(null)
  useEffect(() => {
    return onScrollRAF((y) => {
      const el = ref.current
      if (!el) return
      const max = document.documentElement.scrollHeight - window.innerHeight
      const r = max > 0 ? Math.min(1, y / max) : 0
      el.style.transform = `scaleX(${r})`
    })
  }, [])
  return ref
}

/**
 * いま画面の中心にあるセクションの id を返す（ナビの現在地表示に使う）。
 * ⚠ 「どれにも当たらない」状態を無理に直前の値で埋めない。null を返して
 *    ナビ側で何も光らせない方に倒す（推測で当てると別の項目が光って誤誘導する）。
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(null)
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!els.length) return
    return onScrollRAF(() => {
      const mid = window.scrollY + window.innerHeight * 0.4
      let hit = null
      for (const el of els) {
        const top = el.offsetTop
        if (mid >= top && mid < top + el.offsetHeight) { hit = el.id; break }
      }
      setActive(hit)
    })
  }, [ids.join(',')])
  return active
}

/**
 * 要素を、スクロール量に応じてわずかに動かす（奥行きを出す）。
 * speed は正で「ゆっくり動く」＝背面に見える。
 */
export function useParallax(speed = 0.06) {
  const ref = useRef(null)
  useEffect(() => {
    if (reduced()) return
    return onScrollRAF((y) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const center = rect.top + rect.height / 2 - window.innerHeight / 2
      el.style.setProperty('--par', `${(-center * speed).toFixed(1)}px`)
    })
  }, [speed])
  return ref
}

/**
 * 画面に入ったら 0 から数え上げる。桁区切りは元の文字列の形を保つ。
 * ⚠ 動きを切っている環境では最初から最終値を出す（数字が 0 のまま残るのが最悪）。
 */
export function useCountUp(text, { duration = 1100 } = {}) {
  const ref = useRef(null)
  const [shown, setShown] = useState(() => (reduced() ? text : null))

  useEffect(() => {
    if (reduced()) { setShown(text); return }
    const target = Number(String(text).replace(/[^\d.]/g, ''))
    if (!isFinite(target)) { setShown(text); return }

    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') { setShown(text); return }

    let raf = 0
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        io.unobserve(e.target)
        const t0 = performance.now()
        const step = (now) => {
          const p = Math.min(1, (now - t0) / duration)
          // 終わりを緩める（easeOutCubic）
          const v = target * (1 - Math.pow(1 - p, 3))
          setShown(Math.round(v).toLocaleString('ja-JP'))
          if (p < 1) raf = requestAnimationFrame(step)
          else setShown(text) // 最後は元の文字列に戻す（表記ゆれを残さない）
        }
        raf = requestAnimationFrame(step)
      }
    }, { threshold: 0.4 })
    io.observe(el)
    return () => { io.disconnect(); if (raf) cancelAnimationFrame(raf) }
  }, [text, duration])

  return [ref, shown ?? '0']
}
