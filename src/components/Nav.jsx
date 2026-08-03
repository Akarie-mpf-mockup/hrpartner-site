import { useEffect, useState } from 'react'
import { useScrollProgress, useActiveSection } from '../motion'

// HRチャットは独立メニューにしない（従の扱い）。01_コンセプトとページ構成 §2-1 の注記に従う。
// 参考 lab/05 は「HOME NEWS COMPANY BACKGROUND SERVICES CONTACT」の等幅欧文のみで、
// 塗りの CTA ボタンを置いていない。その形に合わせる（CTA は Hero と各セクションで受ける）。
// ⚠ 欧文だけにすると意味が伝わらないので title 属性に日本語を添える。
const LINKS = [
  { href: '#forms', label: 'Approaches', ja: '4つの形' },
  { href: '#partner', label: 'Scope', ja: 'できること' },
  { href: '#method', label: 'Method', ja: '調べ方' },
  { href: '#flow', label: 'Process', ja: '進め方' },
  { href: '#pricing', label: 'Pricing', ja: '費用' },
  { href: '#faq', label: 'FAQ', ja: 'よくある質問' },
  { href: '#contact', label: 'Contact', ja: 'お問い合わせ' },
]

const IDS = ['forms', 'partner', 'method', 'flow', 'pricing', 'faq']

export default function Nav() {
  const [solid, setSolid] = useState(false)
  const progressRef = useScrollProgress()
  const active = useActiveSection(IDS)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        height: 'var(--nav-h)',
        background: solid ? 'rgba(247,244,238,0.86)' : 'transparent',
        borderBottom: solid ? '1px solid var(--rule-soft)' : '1px solid transparent',
        backdropFilter: solid ? 'saturate(180%) blur(12px)' : 'none',
        transition: 'background .2s ease, border-color .2s ease',
      }}
    >
      <div
        className="container"
        style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}
      >
        <a href="#top" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, letterSpacing: '0.04em', fontSize: '1.12rem' }}>
          HR<span style={{ color: 'var(--accent)' }}>パートナー</span>
        </a>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
          {/* 狭い画面では nav-links を隠すため、問い合わせ導線だけは必ず残す
              （消すと小さい画面から Contact に行けなくなる） */}
          <a href="#contact" className="nav-contact" title="お問い合わせ">Contact</a>

          <ul className="nav-links">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  title={l.ja}
                  data-active={active === l.href.slice(1) ? '1' : '0'}
                  style={{ color: active === l.href.slice(1) ? 'var(--ink)' : undefined }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* 読み進みを示す線。header の内側に置くと fixed の重なり順を1箇所で管理できる */}
      <div ref={progressRef} className="progress" aria-hidden="true" />

      <style>{`
        .nav-links {
          display: flex;
          gap: 30px;
          font-family: var(--font-mono);
          font-size: 0.66rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-dim);
        }
        .nav-contact {
          display: none;
          font-family: var(--font-mono);
          font-size: 0.66rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          border-bottom: 1px solid var(--accent);
          padding-bottom: 3px;
        }
        @media (max-width: 980px) {
          .nav-links { display: none !important; }
          .nav-contact { display: inline-block; }
        }
      `}</style>
    </header>
  )
}
