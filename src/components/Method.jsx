// 出所: 手順①〜⑫.md の全体マップ（市場①②③／競合④〜⑨／自社⑩⑪⑫）
// 規約: 数字には出典と取得日を付ける／取れなかったものは「未取得」と書く（同ファイル 記入のルール）
const PHASES = [
  {
    name: '市場',
    sub: 'そもそも、その土地に働ける人がいるか',
    items: [
      '① 商圏の人口動態・労働供給',
      '② 需給バランス（有効求人倍率・媒体の掲載数）',
      '③ 実際に検索されている言葉',
    ],
  },
  {
    name: '競合',
    sub: '誰と、何で取り合っているか',
    items: [
      '④ 誰と取り合うかの特定',
      '⑤ 競合の条件',
      '⑥ 競合の原稿の書き方',
      '⑦ 競合の情報発信',
      '⑧ 競合の MEO・口コミ',
      '⑨ 競合との検索露出の比較',
    ],
  },
  {
    name: '自社',
    sub: '土台が、そもそも見られる形になっているか',
    items: [
      '⑩ 採用ページの技術診断',
      '⑪ 自社の MEO・口コミ',
      '⑫ 流入と応募の実測',
    ],
  },
]

export default function Method() {
  return (
    <section id="method" className="section section--alt">
      <div className="container">
        <p className="label">調べ方</p>
        <h2 className="section-title">決める前に、測る</h2>
        <p className="section-lead">
          「応募が来ない」の原因は、そもそも人がいないのか、見つかっていないのか、条件で負けているのかで違います。
          提案の前に、12の観点で実際に測ります。
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginTop: 44 }}>
          {PHASES.map((p) => (
            <div key={p.name} className="card">
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6 }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--accent)' }}>
                  {p.name}
                </span>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-dim)', marginBottom: 20 }}>{p.sub}</p>
              <ul style={{ display: 'grid', gap: 10, fontSize: '0.95rem' }}>
                {p.items.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div className="note">
          数字には<strong>出典と取得日</strong>を付けます。順位や検索ボリュームは、いつ・どこから調べたかで変わるためです。
          取れなかったものは「未取得」と書きます。埋めません。
        </div>

        <div
          className="card card--accent"
          style={{ marginTop: 32, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}
        >
          <p style={{ fontSize: '1.02rem', fontWeight: 700, maxWidth: '46ch' }}>
            このうち⑩は、お申し込みいただければ、ご商談の前に一枚にしてお持ちします。
          </p>
          <a href="#contact" className="btn btn--primary">採用ページを見てもらう</a>
        </div>
      </div>
    </section>
  )
}
