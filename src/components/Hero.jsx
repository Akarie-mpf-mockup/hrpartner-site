import useReveal from '../useReveal'
import { useParallax } from '../motion'

// コピーの出所: 共通スライド/採用の外部活用_4つの進め方.yml:49（立ち位置の一文）
//
// ⚠ 見出しの出所について（2026-08-03）
//   旧「求人にお金をかける前に、求人票のどこが負けているかを。」は yml:133 の**比較表のセル**
//   （＝「どんなときに向いているか」の一例）から作られており、立ち位置の一文ではなかった。
//   加えて「負けている」は 手順①〜⑫.md:521 鉄則5「まず褒めてから入る。塩を塗らない」に反する。
//   提案デッキの表紙は必ず肯定から入る（倉敷「採用の"入口"を、御社と一緒に整える。」）。その型に合わせた。
//   yml:133 のセル自体は Forms の比較表に本来の用途で残してある。
//
// ■ 構図（2026-08-03 改訂）
//   参考 lab/03・04・05 の骨格に合わせた：画面いっぱい（100vh）／中央寄せ／
//   **文字が図の上に重なる**／四隅にメタ情報／下端に SCROLL の合図。
//   旧版は左寄せで図を右に分離しており、参考サイトの構図とは無関係だった。

/**
 * 「求人票のどこを見るか」を示す線画。
 * 参考 lab/04 が魚を見出しの背面中央に置いているのと同じ扱いにする（横に並べない）。
 */
function Figure() {
  const lines = [
    { y: 34, w: 116, mark: false },
    { y: 52, w: 168, mark: false },
    { y: 70, w: 138, mark: true },
    { y: 88, w: 176, mark: false },
    { y: 106, w: 96, mark: true },
    { y: 124, w: 162, mark: false },
    { y: 142, w: 128, mark: false },
    { y: 160, w: 150, mark: true },
    { y: 178, w: 108, mark: false },
  ]
  return (
    // ⚠ height="auto" は SVG 属性として不正（コンソールエラーになる）。高さは CSS 側で。
    <svg className="draw" viewBox="0 0 340 260" aria-hidden="true" style={{ display: 'block', width: '100%', height: 'auto' }}>
      <rect x="18" y="12" width="212" height="220" fill="none" stroke="var(--rule)" strokeWidth="1"
            style={{ '--len': 864, '--d': '.05s' }} />
      {lines.map((l, i) => (
        <g key={l.y}>
          <line x1="38" y1={l.y} x2={38 + l.w} y2={l.y}
                stroke="var(--ink)" strokeWidth="1" opacity={l.mark ? 0.42 : 0.16}
                style={{ '--len': l.w, '--d': `${0.35 + i * 0.07}s` }} />
          {l.mark && (
            <line x1="38" y1={l.y + 5} x2={38 + Math.min(l.w, 54)} y2={l.y + 5}
                  stroke="var(--accent)" strokeWidth="1.5"
                  style={{ '--len': Math.min(l.w, 54), '--d': `${0.9 + i * 0.07}s` }} />
          )}
        </g>
      ))}
      {Array.from({ length: 12 }).map((_, i) => (
        <circle key={i} cx={278 + (i % 3) * 18} cy={40 + Math.floor(i / 3) * 34} r="2"
                fill={i % 4 === 0 ? 'var(--accent)' : 'none'} stroke="var(--accent)" strokeWidth="0.9"
                style={{ '--o': i % 4 === 0 ? 1 : 0.5, '--d': `${1.15 + i * 0.05}s` }} />
      ))}
      <line x1="254" y1="26" x2="254" y2="200" stroke="var(--rule-soft)" strokeWidth="1"
            style={{ '--len': 174, '--d': '.9s' }} />
    </svg>
  )
}

export default function Hero() {
  const ref = useReveal()
  const figRef = useParallax(0.04)

  return (
    <section id="top" className="hero">
      {/* 四隅のメタ情報。参考サイトはいずれも本文の外側に索引・章番号・欧文の副題を置く */}
      <div className="hero-meta hero-meta--tr" aria-hidden="true">HR PARTNER ／ 採用の入口</div>
      <div className="hero-meta hero-meta--left" aria-hidden="true">
        <span className="hero-meta__cap">SCOPE</span>
        <span className="hero-meta__num">12</span>
        <span className="hero-meta__bar" />
      </div>
      <div className="hero-meta hero-meta--br" aria-hidden="true">
        <span className="hero-meta__idx">01</span>
        <span className="hero-meta__ja">採用の入口</span>
        <span className="hero-meta__lat">a quiet fix at the entrance.</span>
      </div>

      {/* 図は見出しの背面中央。lab/04 の魚と同じ扱い */}
      <div className="hero-figure" aria-hidden="true">
        <div ref={figRef} className="hero-figure__in">
          <Figure />
        </div>
      </div>

      <div ref={ref} className="reveal hero-inner">
        <p className="hero-kicker">HR PARTNER ／ 採用支援</p>

        <h1 className="hero-h1">
          <span className="hero-mask hero-line"><span>採用の入口を、</span></span>
          <span className="hero-mask hero-line"><span>御社と一緒に整える。</span></span>
        </h1>

        <p className="hero-lead">
          求人原稿の書き換えから、採用ページのご用意、応募導線の点検まで。
          <br />
          <span style={{ color: 'var(--ink)' }}>助言ではなく、こちらが手を動かします。</span>
        </p>

        <div className="hero-cta">
          <a href="#contact" className="btn btn--primary">まず採用ページを見てもらう</a>
          <a href="#partner" className="btn btn--ghost">できることを見る</a>
        </div>

        <p className="hero-terms">月額 30,000円から ／ 初期費用 0円 ／ 3ヶ月単位のご契約から</p>
      </div>

      <a href="#forms" className="hero-scroll" aria-label="次のセクションへ">
        <span>SCROLL</span>
        <span className="hero-scroll__line" />
      </a>
    </section>
  )
}
