const MAIL = 'support@robottte.com'

function link(type) {
  const subject = encodeURIComponent(`HRパートナー ${type}のお申し込み`)
  const body = encodeURIComponent([
    `希望する診断：${type}`, '会社名：', 'お名前：', '対象拠点：',
    '採用したい職種：', '採用ページのURL：', '現在お使いの求人媒体・人材紹介：',
  ].join('\n'))
  return `mailto:${MAIL}?subject=${subject}&body=${body}`
}

export default function Contact() {
  return (
    <section id="contact" className="section section--ink">
      <div className="container">
        <div style={{ padding: 'clamp(20px, 4vw, 48px) 0', textAlign: 'center' }}>
          <p className="label" style={{ justifyContent: 'center' }}>Choose</p>
          <h2 className="section-title" style={{ maxWidth: '28ch', margin: '0 auto' }}>どちらの診断から始めますか</h2>
          <p style={{ marginTop: 24, color: 'var(--text-muted)', maxWidth: '60ch', margin: '24px auto 0' }}>
            公開情報から土台を見る無料診断と、拠点別の外部依存比率・原因・実行計画まで調べる有料診断からお選びください。
          </p>
          <div style={{ marginTop: 36, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 28 }}>
            <a href={link('無料診断')} className="btn btn--primary">無料診断を選ぶ</a>
            <a href={link('有料診断')} className="btn btn--ghost">有料診断を選ぶ</a>
          </div>
          <p style={{ marginTop: 20, fontSize: '0.84rem', color: 'var(--text-dim)' }}>
            {MAIL} ／ 会社名・対象拠点・採用したい職種をお知らせください
          </p>
        </div>
      </div>
    </section>
  )
}
