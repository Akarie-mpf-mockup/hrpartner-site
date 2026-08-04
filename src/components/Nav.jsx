import { useEffect, useState } from 'react'
import { useScrollProgress, useActiveSection } from '../motion'

// HRチャットは独立メニューにしない（従の扱い）。01_コンセプトとページ構成 §2-1 の注記に従う。
//
// ⚠ 2026-08-04（ご指示「格好つけすぎてわかりづらい」）:
//   参考 lab/05 に合わせて等幅欧文だけ（Approaches / Scope / Method …）にしていたが、
//   **日本語の意味は title 属性の中にしか無く、マウスを載せるまで読めなかった**。
//   ナビは意味を運ぶ部品なので、見た目より読めることを優先して日本語に戻す。
//   参考サイトの体裁を写すのは、意味を落とさない範囲まで（見出しの欧文＝SectionHead は
//   すぐ下に日本語の <h2> があるので、あちらは欧文のまま）。
const LINKS = [
  { href: '#forms', ja: '4つの形' },
  { href: '#partner', ja: 'できること' },
  { href: '#method', ja: '調べ方' },
  { href: '#chat', ja: 'HRチャット' },
  { href: '#flow', ja: '進め方' },
  { href: '#pricing', ja: '費用' },
  { href: '#faq', ja: 'よくある質問' },
  { href: '#contact', ja: 'お問い合わせ' },
]

// ⚠ chat / contact が抜けていた（＝そのセクションを見ていてもナビが光らなかった）。
//   肩の「HRパートナー ／ HRチャット」の切り替えにも chat の判定を使うので、両方入れる。
const IDS = ['forms', 'partner', 'method', 'chat', 'flow', 'pricing', 'faq', 'contact']

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
        {/* 2026-08-04: 肩に HRチャットを併記する（ご指示）。
            ⚠ 引き継ぎ書の決定（2026-08-02）は「HRパートナーが主役／HRチャットは従」で、
              理由は KPI:167「HRチャットは独立サービスではなくHRモンスターのチャットボット機能の
              アップセル」＝実績も素材も無い側を主張しすぎない、というもの。
              併記はその決定を一部変更することになるため、指示書側にも記録した。 */}
        {/* 2026-08-04（第2弾・ご指示）: いま見ているのが HRパートナーの話か HRチャットの話かを
            肩で分かるようにする。#chat を読んでいる間だけ「HRチャット」側に印が移る。
            ⚠ 色だけで区別しない（色覚と、地が生成りで彩度差が出にくいため）。
              下線＋濃さ＋読み上げ用の (現在の位置) をセットで付ける。
            ⚠ 下線は border を出し入れせず、常に透明の border を敷いて色だけ変える（ズレ防止）。 */}
        <a href="#top" className="brand" data-on={active === 'chat' ? 'chat' : 'partner'}>
          <span className="brand__a">
            HRパートナー
            {active !== 'chat' && <span className="brand__sr">（現在の位置）</span>}
          </span>
          <span className="brand__slash">／</span>
          <span className="brand__b">
            HRチャット
            {active === 'chat' && <span className="brand__sr">（現在の位置）</span>}
          </span>
        </a>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
          {/* 狭い画面では nav-links を隠すため、問い合わせ導線だけは必ず残す
              （消すと小さい画面から問い合わせに行けなくなる） */}
          <a href="#contact" className="nav-contact">お問い合わせ</a>

          <ul className="nav-links">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  data-active={active === l.href.slice(1) ? '1' : '0'}
                  style={{ color: active === l.href.slice(1) ? 'var(--ink)' : undefined }}
                >
                  {l.ja}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* 読み進みを示す線。header の内側に置くと fixed の重なり順を1箇所で管理できる */}
      <div ref={progressRef} className="progress" aria-hidden="true" />

      <style>{`
        /* 日本語に戻したので等幅・大文字化はやめる（等幅は日本語が並びとして汚い）。
           字間だけ少し開けて、小さくても読める大きさにする。 */
        .nav-links {
          display: flex;
          gap: 22px;
          font-family: var(--font-body);
          font-size: 0.8rem;
          letter-spacing: 0.04em;
          color: var(--text-muted);
          white-space: nowrap;
        }
        .brand {
          font-family: var(--font-display);
          font-weight: 600;
          letter-spacing: 0.04em;
          font-size: 1.02rem;
          display: inline-flex;
          align-items: baseline;
          gap: 8px;
          white-space: nowrap;
        }
        .brand__slash { color: var(--text-dim); font-size: 0.86rem; }
        /* いま見ている側だけ濃くし、下線を引く。もう片方は沈める。 */
        .brand__a, .brand__b {
          color: var(--text-dim);
          border-bottom: 1px solid transparent;
          padding-bottom: 2px;
          transition: color .25s ease, border-color .25s ease;
        }
        .brand[data-on='partner'] .brand__a { color: var(--ink); border-bottom-color: var(--accent); }
        .brand[data-on='chat'] .brand__b { color: var(--accent-text); border-bottom-color: var(--accent); }
        /* 読み上げ専用。目には見えないが「（現在の位置）」を読み上げる。
           ⚠ 書体は明朝から外す（var(--font-body)）。見えない文字のために
             明朝サブセットへ「（現在位置）」の5文字を足すことになるため
             （検査 check-font-subset.mjs が実際に検出した）。 */
        .brand__sr {
          font-family: var(--font-body);
          position: absolute;
          width: 1px; height: 1px;
          margin: -1px; padding: 0; border: 0;
          overflow: hidden; clip-path: inset(50%); white-space: nowrap;
        }
        /* ⚠ 以前は 560px 以下で「／HRチャット」を隠していたが、
           肩がいまは**現在地の表示**を兼ねるので隠さない。字を詰めて残す。 */
        @media (max-width: 560px) {
          .brand { font-size: 0.84rem; gap: 5px; }
          .brand__slash { font-size: 0.72rem; }
        }
        @media (max-width: 380px) {
          .brand { font-size: 0.76rem; }
        }

        .nav-contact {
          display: none;
          font-family: var(--font-body);
          font-size: 0.8rem;
          letter-spacing: 0.04em;
          border-bottom: 1px solid var(--accent);
          padding-bottom: 3px;
          white-space: nowrap;
        }
        /* 2026-08-04: この中に .brand / .brand__slash / .brand__b / @media 560px が
           上と**同じ値のまま丸ごとコピー**されていた（貼り付けの取り残し）。
           挙動は同じなので消した。狭い画面ですることは2つだけ——
           欧文メニューを隠し、Contact だけ残す。 */
        @media (max-width: 980px) {
          .nav-links { display: none !important; }
          .nav-contact { display: inline-block; }
        }
      `}</style>
    </header>
  )
}
