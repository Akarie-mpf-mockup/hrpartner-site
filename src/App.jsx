import { useEffect } from 'react'
import Particles from './Particles'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Forms from './components/Forms'
import Partner from './components/Partner'
import Method from './components/Method'
import Chat from './components/Chat'
import Flow from './components/Flow'
import Pricing from './components/Pricing'
import Faq from './components/Faq'
import Contact from './components/Contact'
import Footer from './components/Footer'

// セクションの並びは Vault の
// 💦A.実務/HRP.HRパートナー/サービスサイト/01_コンセプトとページ構成_20260802.md §2-1 に対応。
// HRチャット（Chat）は「従」＝HRパートナーの後ろに置き、専用CTAは持たない。
/**
 * スクロール表示を**全セクションに**当てる。
 *
 * ⚠ 2026-08-03 の失敗: useReveal を Hero にだけ繋いでいたため、
 *   残り8セクションに動きが1つも無く「動きが全然ない」状態になっていた。
 *   各コンポーネントに手で入れると繋ぎ忘れが再発するので、ここで一括して当てる。
 *
 * 各 section 内の .container の直下要素を対象にし、順番に遅延をつけて出す（stagger）。
 * ライブラリは使わない（framer-motion は gzip 約50KB。IntersectionObserver で足りる）。
 */
function useRevealAll() {
  useEffect(() => {
    const targets = []
    document.querySelectorAll('main > section').forEach((sec) => {
      const box = sec.querySelector(':scope > .container') || sec
      Array.from(box.children).forEach((el, i) => {
        if (el.classList.contains('reveal')) return // Hero など既に付いているものは触らない
        // ⚠ 描画されない要素（コンポーネント内の <style> 等）を対象にしない。
        //   IntersectionObserver が永久に発火せず「未表示のまま残る要素」として数えられ、
        //   「未表示ゼロ＝全部見えている」という検査が使えなくなる（実測で1件混入していた）。
        if (el.tagName === 'STYLE' || el.tagName === 'SCRIPT') return
        if (!el.getClientRects().length && getComputedStyle(el).display === 'none') return
        el.classList.add('reveal')
        el.style.transitionDelay = `${Math.min(i, 5) * 90}ms`
        targets.push(el)
      })
    })

    // 観測できない環境では隠したままにせず必ず表示する（見えないのが最悪なので出す側に倒す）
    if (typeof IntersectionObserver === 'undefined') {
      targets.forEach((el) => el.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          e.target.classList.add('is-in')
          io.unobserve(e.target)
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' }
    )
    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function App() {
  useRevealAll()

  return (
    <>
      {/* 背面のアート。全セクションの裏に居続ける（参考 lab/05） */}
      <Particles />
      <Nav />
      <main>
        <Hero />
        <Forms />
        <Partner />
        <Method />
        <Chat />
        <Flow />
        <Pricing />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
