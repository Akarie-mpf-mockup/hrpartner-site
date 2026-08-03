import useReveal from '../useReveal'
import { useParallax } from '../motion'

// コピーの出所: 共通スライド/採用の外部活用_4つの進め方.yml:49（立ち位置の一文）
//
// ⚠ 2026-08-03 に見出しを差し替えた。旧「求人にお金をかける前に、求人票のどこが負けているかを。」は
//   yml:133 の**比較表のセル**（＝「どんなときに向いているか」の一例）から作られており、
//   用途の例を主張に昇格させていた。加えて「負けている」は
//   手順①〜⑫.md:521 鉄則5「まず褒めてから入る。塩を塗らない」に反する。
//   提案デッキの表紙は必ず肯定から入る（倉敷「採用の"入口"を、御社と一緒に整える。」／
//   敬寿会「立派な採用サイトを、もう一歩、見つけてもらう形へ。」）。その型に合わせた。
//   なお yml:133 のセル自体は Forms の比較表に本来の用途で残してある。
// 見た目の方向（2026-08-03）: 生成りの地・明朝の大見出し・等幅の小ラベル・広い余白。
// 図版はインライン SVG の線画のみ（画像ファイルを持たない＝転送量を増やさない）。

/**
 * 「求人票のどこが負けているか」を示す線画。
 * 求人票を紙の矩形に見立て、行を細い罫で表し、負けている箇所だけシアンの短い印を置く。
 * 右の縦列の点は「12の観点で測る」を暗示（数は12個）。
 * 塗りを使わず線だけで描く（誌面の挿画に寄せるため）。
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
    // ⚠ height="auto" は SVG 属性として不正（コンソールエラーになる）。高さは CSS 側で auto にする。
    <svg className="draw" viewBox="0 0 340 260" aria-hidden="true" style={{ display: 'block', width: '100%', height: 'auto', maxWidth: 380 }}>
      {/* 紙。周長ぶんの長さを渡して一周描かせる */}
      <rect x="18" y="12" width="212" height="220" fill="none" stroke="var(--rule)" strokeWidth="1"
            style={{ '--len': 864, '--d': '.05s' }} />
      {lines.map((l, i) => (
        <g key={l.y}>
          <line
            x1="38" y1={l.y} x2={38 + l.w} y2={l.y}
            stroke="var(--ink)" strokeWidth="1" opacity={l.mark ? 0.42 : 0.16}
            style={{ '--len': l.w, '--d': `${0.35 + i * 0.07}s` }}
          />
          {l.mark && (
            <line x1="38" y1={l.y + 5} x2={38 + Math.min(l.w, 54)} y2={l.y + 5} stroke="var(--accent)" strokeWidth="1.5"
                  style={{ '--len': Math.min(l.w, 54), '--d': `${0.9 + i * 0.07}s` }} />
          )}
        </g>
      ))}
      {/* 12の観点 */}
      {Array.from({ length: 12 }).map((_, i) => (
        <circle
          key={i}
          cx={278 + (i % 3) * 18}
          cy={40 + Math.floor(i / 3) * 34}
          r="2"
          fill={i % 4 === 0 ? 'var(--accent)' : 'none'}
          stroke="var(--accent)"
          strokeWidth="0.9"
          style={{ '--o': i % 4 === 0 ? 1 : 0.5, '--d': `${1.15 + i * 0.05}s` }}
        />
      ))}
      <line x1="254" y1="26" x2="254" y2="200" stroke="var(--rule-soft)" strokeWidth="1"
            style={{ '--len': 174, '--d': '.9s' }} />
    </svg>
  )
}

export default function Hero() {
  const ref = useReveal()
  const figRef = useParallax(0.05)

  return (
    <section
      id="top"
      style={{
        paddingTop: 'calc(var(--nav-h) + 132px)',
        paddingBottom: 132,
        borderBottom: '1px solid var(--rule-soft)',
      }}
    >
      <div className="container" style={{ position: 'relative' }}>
        {/* 図版は背面に回す。横に並べると見出しの幅が足りず「前／に、」で崩れた（実測）。 */}
        <div ref={figRef} className="hero-figure" aria-hidden="true">
          <Figure />
        </div>

        <div ref={ref} className="reveal" style={{ position: 'relative', zIndex: 1 }}>
          <div>
            <p className="label">HR Partner</p>

            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.05rem, 4.6vw, 3.4rem)',
                fontWeight: 600,
                lineHeight: 1.62,
                letterSpacing: '0.015em',
              }}
            >
              {/* 行ごとに下から立ち上げる。外へはみ出す分は .hero-mask が隠す */}
              <span className="hero-mask hero-line"><span>採用の入口を、</span></span>
              <span className="hero-mask hero-line"><span>御社と一緒に整える。</span></span>
            </h1>

            <p style={{ marginTop: 36, maxWidth: '44ch', fontSize: '0.98rem', color: 'var(--text-muted)', lineHeight: 2.05 }}>
              求人原稿の書き換えから、採用ページのご用意、応募導線の点検まで。
              <br />
              <span style={{ color: 'var(--ink)' }}>助言ではなく、こちらが手を動かします。</span>
            </p>

            {/* CTA は主従をつける。主＝墨のベタ1つ、従＝下線のみ */}
            <div style={{ marginTop: 52, display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center' }}>
              <a href="#contact" className="btn btn--primary">まず採用ページを見てもらう</a>
              <a href="#partner" className="btn btn--ghost">できることを見る</a>
            </div>

            <p
              style={{
                marginTop: 44,
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.14em',
                color: 'var(--text-dim)',
              }}
            >
              月額 30,000円から ／ 初期費用 0円 ／ 3ヶ月単位のご契約から
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .hero-figure {
          position: absolute;
          right: 48px;
          top: 62%;
          transform: translateY(-40%);
          width: 400px;
          opacity: .85;
          z-index: 0;
          pointer-events: none;
        }
        /* 見出しは意図した2行で必ず割る。折り返しに任せると明朝の字幅で崩れる */
        .hero-line { display: block; white-space: nowrap; }
        @media (max-width: 1180px) {
          .hero-figure { opacity: .5; right: 0; width: 360px; }
        }
        @media (max-width: 820px) {
          .hero-figure { display: none; }
          .hero-line { white-space: normal; }
        }
      `}</style>
    </section>
  )
}
