// TODO: 会社概要・プライバシーポリシー・特商法の原文が未確定。
//       robottte.com から流用できるかを確認してからリンクを張る（01_… 第4部 #6）。
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
              運営：robottte 株式会社
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

        <p style={{ marginTop: 44, fontSize: '0.78rem', color: 'var(--text-dim)' }}>
          © robottte Inc.
        </p>
      </div>
    </footer>
  )
}
