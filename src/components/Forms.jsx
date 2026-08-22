import SectionHead from './SectionHead'

const ROWS = [
  { route: '求人媒体', now: '掲載中だけ露出が増える', rest: '掲載を止めると応募も止まりやすい' },
  { route: '人材紹介', now: '候補者を紹介してもらう', rest: '採用のたびに紹介料が発生する' },
  { route: '自社の採用経路', now: '検索・地図・SNSから直接届く', rest: 'コンテンツとデータが自社に積み上がる', self: true },
]

export default function Forms() {
  return (
    <section id="forms" className="section section--alt">
      <div className="container">
        <SectionHead idx="01" en="Dependency" />
        <h2 className="section-title">外部に頼るほど、採用が積み上がらない</h2>
        <p className="section-sub">
          媒体や人材紹介を否定するのではありません。依存先から、<strong style={{ color: 'var(--text)' }}>必要に応じて選べる手段</strong>へ変えます。
        </p>
        <div className="tablewrap">
          <table>
            <thead><tr><th>採用経路</th><th>応募の集まり方</th><th>使ったあとに残るもの</th></tr></thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.route} className={r.self ? 'self' : undefined}>
                  <td>{r.route}</td><td>{r.now}</td><td>{r.rest}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="note">
          HRパートナーは、<strong>求人媒体・人材紹介からの応募や採用の比率が高く、自社経路が育っていない拠点</strong>を支援します。
        </div>
        <p style={{ marginTop: 18, fontSize: '0.84rem', color: 'var(--text-dim)' }}>
          ※ 目標は外部利用をゼロにすることではなく、自社経路の応募・採用比率を高めることです。
        </p>
      </div>
    </section>
  )
}
