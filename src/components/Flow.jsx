import SectionHead from './SectionHead'
// 出所: 0_メニューと価格_松竹梅_20260731.md:74-77（初期費用0円の範囲）, 共通スライド/…yml:116（脚注）
const STEPS = [
  {
    when: '初回',
    what: '無料診断または有料診断を選ぶ',
    detail: 'まず土台を見るか、外部依存比率と原因まで測るかをお選びいただきます。',
  },
  {
    when: '〜2週間',
    what: '拠点の現在地と優先順位を決める',
    detail: '市場・競合・自社を測り、検索・地図・SNS・応募導線のどこから着手するかを決めます。',
  },
  {
    when: '着手時',
    what: '必要な採用経路を整える',
    detail: 'SEO・MEO・SNS、採用ページ、求人原稿、応募フォームから必要な施策だけを実行します。',
  },
  {
    when: '毎月',
    what: '自社経路の比率を測り、改善する',
    detail: '応募・採用経路を毎月確認し、効かない施策を止め、動いた施策へ寄せます。',
  },
]

export default function Flow() {
  return (
    <section id="flow" className="section section--alt">
      <div className="container">
        <SectionHead idx="06" en="Process" />
        <h2 className="section-title">診断から、拠点の自走化まで</h2>
        <p className="section-sub">診断し、優先順位を決め、必要な経路を整え、外部依存比率の変化を見ます。</p>

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
          ※ 着手時の作業（実測・採用ページのご用意・求人の取り込み・原稿整備）は初期費用に含めていません。
        </p>
      </div>
    </section>
  )
}
