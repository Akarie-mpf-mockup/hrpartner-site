import { useEffect, useRef } from 'react'

/**
 * 背面に敷く粒子のアート（参考: off-notes-yuki.web.app/lab/05）。
 *
 * ■ 軽さのための設計（ここが本体）
 *   参考サイトは three.js / 重い canvas で、lab/03 は読み込み 10.3秒・lab/04 は 996KB だった。
 *   同じ見た目を **毎フレームの計算をほぼ増やさずに** 出すため、2枚のキャンバスに分ける。
 *
 *   1) static … 数千個の点を **一度だけ** 描く。以後は resize までノータッチ。
 *   2) live   … ゆらぐ点だけを rAF で描く。**数百個に固定**（画面サイズで増やさない）。
 *
 *   ★毎フレームで**画面全体を消さない**。動いた点の周りだけを消す（ダーティ矩形）。
 *   全画面 clearRect は 1440×900×DPR1.5 ＝ 約290万ピクセルを毎回触ることになり、
 *   実測で 50ms超のコマが増え平均が 58fps → 49.8fps に落ちた。
 *   点の周りだけなら 200個 × 約10×10px ＝ 約2万ピクセルで済む。
 *   影・グラデーション・パスは1つも使わない（どれも1個あたりの単価が高い）。
 *
 * ■ 守っていること
 *   - static は devicePixelRatio 1.5 で打ち止め。**live は DPR 1 固定**
 *     （1〜2px の点なので等倍で足りる。塗る面積が 2.25分の1になる）
 *   - 20fps で間引く（ゆっくり漂う絵なので滑らかさは要らない）
 *   - タブが隠れたら rAF を止める（裏で回し続けない）
 *   - prefers-reduced-motion なら live 層を動かさず1回だけ描く
 *   - pointer-events: none。スクロールもクリックも一切邪魔しない
 *   - three.js も外部ライブラリも使わない（転送量 0 追加）
 */

// 生成りの地に載る、彩度を落とした色。robottte のシアンを1色だけ混ぜる。
const HUES = [
  'rgba(10,120,174,',   // シアン寄り（ブランド色を落としたもの）
  'rgba(150,110,60,',   // 金茶
  'rgba(150,80,80,',    // 赤錆
  'rgba(90,110,80,',    // 苔
  'rgba(60,70,90,',     // 藍
]

/** 見た目のための擬似乱数（毎回同じ絵にする＝リロードで印象が変わらない） */
function rng(seed) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

/** 中心に寄った散らばり（箱型より雲らしくなる） */
function gauss(r) {
  return (r() + r() + r() - 1.5) / 1.5
}

export default function Particles() {
  const staticRef = useRef(null)
  const liveRef = useRef(null)

  useEffect(() => {
    const sc = staticRef.current
    const lc = liveRef.current
    if (!sc || !lc) return

    const reduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const sctx = sc.getContext('2d', { alpha: true })
    const lctx = lc.getContext('2d', { alpha: true })

    let W = 0, H = 0, DPR = 1
    let live = []

    const layout = () => {
      DPR = Math.min(window.devicePixelRatio || 1, 1.5)
      W = window.innerWidth
      // ページ全体ではなく画面1枚分だけ持つ（position: fixed で貼るため）。
      // 全長 14,000px 分の canvas を持つとメモリも塗り面積も跳ね上がる。
      H = window.innerHeight
      sc.width = Math.round(W * DPR)
      sc.height = Math.round(H * DPR)
      sc.style.width = W + 'px'
      sc.style.height = H + 'px'
      sctx.setTransform(DPR, 0, 0, DPR, 0, 0)

      // live は等倍。塗る面積を抑えるため DPR を掛けない
      lc.width = Math.round(W)
      lc.height = Math.round(H)
      lc.style.width = W + 'px'
      lc.style.height = H + 'px'
      lctx.setTransform(1, 0, 0, 1, 0, 0)
      drawStatic()
      buildLive()
      if (reduced) drawLive(0, true)
    }

    /** 一度だけ描く層。点の数は面積に比例させるが上限を置く。 */
    function drawStatic() {
      sctx.clearRect(0, 0, W, H)
      const r = rng(20260803)
      const area = W * H
      const N = Math.min(9000, Math.round(area / 320))

      // 雲の芯をいくつか置き、その周りに散らす
      const cores = 7
      const cx = [], cy = [], ch = []
      for (let i = 0; i < cores; i++) {
        cx.push(W * (0.42 + 0.62 * r()))
        cy.push(H * (0.1 + 0.85 * r()))
        ch.push(HUES[Math.floor(r() * HUES.length)])
      }

      for (let i = 0; i < N; i++) {
        const k = Math.floor(r() * cores)
        const spread = 110 + 360 * r()
        const x = cx[k] + gauss(r) * spread
        const y = cy[k] + gauss(r) * spread * 0.8
        if (x < -20 || x > W + 20 || y < -20 || y > H + 20) continue
        const a = 0.07 + 0.5 * r()
        const s = r() < 0.8 ? 1 : 2
        sctx.fillStyle = ch[k] + a.toFixed(2) + ')'
        sctx.fillRect(x, y, s, s)
      }

      // 地に薄く散る点（画面全体の質感）
      const M = Math.min(2200, Math.round(area / 1300))
      for (let i = 0; i < M; i++) {
        sctx.fillStyle = HUES[Math.floor(r() * HUES.length)] + (0.05 + 0.14 * r()).toFixed(2) + ')'
        sctx.fillRect(W * r(), H * r(), 1, 1)
      }
    }

    /** ゆらぐ層。**個数は画面サイズに関係なく固定**（重くならないため）。 */
    function buildLive() {
      const r = rng(77)
      const N = 200
      live = new Array(N)
      for (let i = 0; i < N; i++) {
        live[i] = {
          x: W * (0.35 + 0.7 * r()),
          y: H * r(),
          amp: 4 + 14 * r(),
          spd: 0.15 + 0.5 * r(),
          ph: r() * Math.PI * 2,
          c: HUES[Math.floor(r() * HUES.length)],
          a: 0.22 + 0.5 * r(),
          s: r() < 0.8 ? 1 : 2,
          px: 0, py: 0,   // 前回描いた位置（そこだけ消す）
        }
      }
    }

    /**
     * ⚠ 全画面 clearRect をしない。前回描いた位置の周りだけを消す。
     *   full clear は約290万ピクセル、こちらは約2万ピクセル。
     */
    function drawLive(t, first) {
      for (let i = 0; i < live.length; i++) {
        const p = live[i]
        if (!first) lctx.clearRect(p.px - 1, p.py - 1, p.s + 3, p.s + 3)
        const x = p.x + Math.sin(t * 0.0006 * p.spd + p.ph) * p.amp
        const y = p.y + Math.cos(t * 0.0005 * p.spd + p.ph) * p.amp * 0.6
        lctx.fillStyle = p.c + p.a.toFixed(2) + ')'
        lctx.fillRect(x, y, p.s, p.s)
        p.px = x
        p.py = y
      }
    }

    let raf = 0
    let last = 0
    let first = true
    const FRAME = 1000 / 20 // 20fps に間引く（ゆっくり漂う絵なので足りる）

    const loop = (t) => {
      raf = requestAnimationFrame(loop)
      if (t - last < FRAME) return
      last = t
      drawLive(t, first)
      first = false
    }

    const onVisible = () => {
      if (document.hidden) {
        if (raf) { cancelAnimationFrame(raf); raf = 0 }
      } else if (!raf && !reduced) {
        raf = requestAnimationFrame(loop)
      }
    }

    // resize は連続で飛んでくるので落ち着いてから1回だけ
    let rt = 0
    const onResize = () => {
      clearTimeout(rt)
      rt = setTimeout(layout, 220)
    }

    layout()
    if (!reduced) raf = requestAnimationFrame(loop)
    window.addEventListener('resize', onResize, { passive: true })
    document.addEventListener('visibilitychange', onVisible)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      clearTimeout(rt)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [])

  return (
    <div className="field" aria-hidden="true">
      <canvas ref={staticRef} />
      <canvas ref={liveRef} />
    </div>
  )
}
