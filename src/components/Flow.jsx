// 出所: 0_メニューと価格_松竹梅_20260731.md:74-77（初期費用0円の範囲）, 共通スライド/…yml:116（脚注）
const STEPS = [
  {
    when: '初回',
    what: '採用ページを見て、気づいたことのご報告',
    detail: '求人が検索で認識される形になっているかを、実際のページで確認してご報告します。',
  },
  {
    when: '〜2週間',
    what: '市場・競合・自社の実測',
    detail: '商圏の労働供給、競合の条件と書き方、自社の露出をまとめてお持ちします。',
  },
  {
    when: '着手時',
    what: '採用ページのご用意',
    detail: '別のドメインに採用ページを新設します（現行のサイトは触りません／約1〜2ヶ月）。求人の取り込み設定と、着手時の原稿整備まで行います。',
  },
  {
    when: '毎月',
    what: '手入れとご報告',
    detail: '原稿の書き換え、競合の定点観測、応募データの整理と月次のご報告を続けます。',
  },
]

export default function Flow() {
  return (
    <section id="flow" className="section section--alt">
      <div className="container">
        <p className="label">Process</p>
        <h2 className="section-title">はじめのご報告から、月次の手入れまで</h2>
        <p className="section-sub">初回のご報告から、ご契約後の運用までの流れです。</p>

        <ol style={{ display: 'grid', gap: 20, marginTop: 44, listStyle: 'none' }}>
          {STEPS.map((s, i) => (
            <li key={s.what} className="card" style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
              <div style={{ flexShrink: 0, textAlign: 'center', minWidth: 76 }}>
                <div
                  style={{
                    width: 40, height: 40, margin: '0 auto 8px',
                    borderRadius: '50%', background: 'var(--accent)', color: '#fff',
                    display: 'grid', placeItems: 'center',
                    fontFamily: 'var(--font-sans)', fontWeight: 800,
                  }}
                >
                  {i + 1}
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>{s.when}</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', marginBottom: 6 }}>{s.what}</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>{s.detail}</p>
              </div>
            </li>
          ))}
        </ol>

        <p style={{ marginTop: 26, fontSize: '0.84rem', color: 'var(--text-dim)' }}>
          ※ 着手時の作業（市場・競合・自社の実測、採用ページのご用意、求人の取り込み設定、原稿の整備）は初期費用に含めていません。
        </p>
      </div>
    </section>
  )
}
