// コピーの出所: 共通スライド/採用の外部活用_4つの進め方.yml:49（立ち位置の一文）, :133（向いている場面）
export default function Hero() {
  return (
    <section
      id="top"
      style={{
        paddingTop: 'calc(var(--nav-h) + 96px)',
        paddingBottom: 96,
        background: 'linear-gradient(180deg, var(--accent-light) 0%, #fff 78%)',
      }}
    >
      <div className="container">
        <p className="label">HR パートナー</p>

        <h1
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(2.1rem, 5vw, 3.4rem)',
            fontWeight: 800,
            lineHeight: 1.32,
            letterSpacing: '-0.02em',
            maxWidth: '22ch',
          }}
        >
          求人にお金をかける前に、<br />
          求人票のどこが負けているかを。
        </h1>

        <p style={{ marginTop: 28, maxWidth: '52ch', fontSize: '1.08rem', color: 'var(--text-muted)' }}>
          市場・競合・自社を実際に測ってから、求人原稿の書き換え、採用ページの用意、
          応募導線の点検までを行います。<strong style={{ color: 'var(--text)' }}>助言ではなく、こちらが手を動かします。</strong>
        </p>

        <div style={{ marginTop: 40, display: 'flex', flexWrap: 'wrap', gap: 14 }}>
          <a href="#contact" className="btn btn--primary">まず採用ページを見てもらう</a>
          <a href="#partner" className="btn btn--ghost">できることを見る</a>
        </div>

        <p style={{ marginTop: 22, fontSize: '0.86rem', color: 'var(--text-dim)' }}>
          月額 30,000円から ／ 初期費用 0円 ／ 3ヶ月単位のご契約から
        </p>
      </div>
    </section>
  )
}
