import { useEffect, useState } from 'react'
import { useScrollProgress, useActiveSection } from '../motion'

// HRチャットは独立メニューにしない（従の扱い）。01_コンセプトとページ構成 §2-1 の注記に従う。
const LINKS = [
  { href: '#forms', label: '4つの形' },
  { href: '#partner', label: 'できること' },
  { href: '#method', label: '調べ方' },
  { href: '#flow', label: '進め方' },
  { href: '#pricing', label: '費用' },
  { href: '#faq', label: 'よくある質問' },
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
          <ul className="nav-links" style={{ display: 'flex', gap: 26, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  data-active={active === l.href.slice(1) ? '1' : '0'}
                  style={{ transition: 'color .15s', color: active === l.href.slice(1) ? 'var(--ink)' : undefined }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn btn--primary" style={{ padding: '11px 22px', fontSize: '0.88rem' }}>
            採用ページを見てもらう
          </a>
        </nav>
      </div>

      {/* 読み進みを示す線。header の内側に置くと fixed の重なり順を1箇所で管理できる */}
      <div ref={progressRef} className="progress" aria-hidden="true" />

      <style>{`
        @media (max-width: 900px) { .nav-links { display: none !important; } }
      `}</style>
    </header>
  )
}
