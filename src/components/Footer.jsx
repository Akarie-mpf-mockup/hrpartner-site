// 会社概要：robottte-site の About.jsx（companyInfo）から流用。2026-08-03 時点。
// 投資家向けの項目（累計調達額・メンバー数）はサービスサイトには載せない。
// TODO: プライバシーポリシー・特商法は robottte.com にも原文が無い（/privacy /tokushoho とも 404）。
//       新規に用意する必要がある。GA4 を入れたのでプライバシーポリシーは公開前に要る（01_… 第4部 #6）。
const companyInfo = [
  ['会社名', '株式会社robottte'],
  ['設立', '2021年8月'],
  ['代表取締役', '高橋 健一'],
  ['資本金', '66,090,100円'],
  ['所在地', '〒107-0062 東京都港区南青山二丁目2番15号 ウィン青山942'],
  ['お問い合わせ', 'support@robottte.com'],
]

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border-light)', padding: '56px 0 40px', background: 'var(--bg2)' }}>
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: '1.05rem' }}>
              HR<span style={{ color: 'var(--accent)' }}>パートナー</span>
            </p>
            <p style={{ marginTop: 10, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              運営：株式会社robottte
            </p>
            <p style={{ marginTop: 4, fontSize: '0.88rem' }}>
              <a href="https://www.robottte.com/" style={{ color: 'var(--accent-dark)' }}>www.robottte.com</a>
            </p>
          </div>

          <ul style={{ display: 'grid', gap: 10, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            <li><a href="#partner">できること</a></li>
            <li><a href="#method">調べ方</a></li>
            <li><a href="#pricing">費用</a></li>
            <li><a href="#contact">お問い合わせ</a></li>
          </ul>
        </div>

        <div style={{ marginTop: 44, paddingTop: 28, borderTop: '1px solid var(--border-light)' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '0.9rem' }}>会社概要</p>
          <dl
            style={{
              marginTop: 14,
              display: 'grid',
              gridTemplateColumns: 'max-content 1fr',
              gap: '8px 20px',
              fontSize: '0.82rem',
              color: 'var(--text-muted)',
            }}
          >
            {companyInfo.map(([label, value]) => (
              <div key={label} style={{ display: 'contents' }}>
                <dt style={{ color: 'var(--text-dim)', whiteSpace: 'nowrap' }}>{label}</dt>
                <dd style={{ margin: 0 }}>{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <p style={{ marginTop: 32, fontSize: '0.78rem', color: 'var(--text-dim)' }}>
          © robottte Inc.
        </p>
      </div>
    </footer>
  )
}
