import { useEffect, useState } from 'react'

// HRチャットは独立メニューにしない（従の扱い）。01_コンセプトとページ構成 §2-1 の注記に従う。
const LINKS = [
  { href: '#forms', label: '4つの形' },
  { href: '#partner', label: 'できること' },
  { href: '#method', label: '調べ方' },
  { href: '#flow', label: '進め方' },
  { href: '#pricing', label: '費用' },
  { href: '#faq', label: 'よくある質問' },
]

export default function Nav() {
  const [solid, setSolid] = useState(false)

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
        background: solid ? 'rgba(255,255,255,0.92)' : 'transparent',
        borderBottom: solid ? '1px solid var(--border-light)' : '1px solid transparent',
        backdropFilter: solid ? 'saturate(180%) blur(12px)' : 'none',
        transition: 'background .2s ease, border-color .2s ease',
      }}
    >
      <div
        className="container"
        style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}
      >
        <a href="#top" style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, letterSpacing: '-0.01em', fontSize: '1.05rem' }}>
          HR<span style={{ color: 'var(--accent)' }}>パートナー</span>
        </a>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
          <ul className="nav-links" style={{ display: 'flex', gap: 26, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} style={{ transition: 'color .15s' }}>{l.label}</a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn btn--primary" style={{ padding: '11px 22px', fontSize: '0.88rem' }}>
            採用ページを見てもらう
          </a>
        </nav>
      </div>

      <style>{`
        @media (max-width: 900px) { .nav-links { display: none !important; } }
      `}</style>
    </header>
  )
}
