import SectionHead from './SectionHead'
// 出所: 共通スライド/採用の外部活用_4つの進め方.yml:74-82（4つの進め方の表）, :126-135（向いている場面）
// 規約: ◎○△×を使わない／他社の金額・契約条件は載せない（0_メニューと価格_松竹梅_20260731.md:158-163）
const ROWS = [
  { form: '採用代行（アウトソース）', who: '代行会社', rest: '期間中の実行力（仕組みは社外に残る）', fit: '新規開設や大量採用など、期限が決まっているとき' },
  { form: '採用顧問・コンサル', who: '御社', rest: '進め方の考え方', fit: '社内に採用の知見を貯めたいとき' },
  { form: '採用システム', who: '御社', rest: '応募管理の仕組み', fit: '応募対応の作業そのものを減らしたいとき' },
  { form: 'HR パートナー', who: '当方（素材は御社）', rest: '仕組みと、回し方の型', fit: '媒体費を増やす前に、求人票のどこが負けているかを知りたいとき', self: true },
]

export default function Forms() {
  return (
    <section id="forms" className="section section--alt">
      <div className="container">
        <SectionHead idx="01" en="Approaches" />
        <h2 className="section-title">採用を外に頼む、4つの形</h2>
        <p className="section-sub">どれが優れているかではなく、手を動かすのが誰かと、終わったあとに何が残るかが違います。</p>
        <p className="section-lead">
          どれが優れているかではなく、<strong style={{ color: 'var(--text)' }}>手を動かすのが誰か</strong>と
          <strong style={{ color: 'var(--text)' }}>終わったあとに何が残るか</strong>が違います。
        </p>

        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>進め方</th>
                <th>手を動かすのは</th>
                <th>終わったあとに残るもの</th>
                <th>向いている場面</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.form} className={r.self ? 'self' : undefined}>
                  <td>{r.form}</td>
                  <td>{r.who}</td>
                  <td>{r.rest}</td>
                  <td>{r.fit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="note">
          記号での採点はしていません。4つは優劣ではなく性格の違いです。
          期限の決まった大量採用なら代行、社内に知見を貯めたいなら顧問、応募対応の作業を減らしたいならシステム——
          困っていることで選ぶものが変わります。<br />
          HRパートナーは、<strong>現行のサイトを触らずに露出と応募導線を直したいとき</strong>にも向いています。
        </div>

        <p style={{ marginTop: 18, fontSize: '0.84rem', color: 'var(--text-dim)' }}>
          ※ 他社の費用は載せていません。代行・顧問・システムの一般的な金額は、出典の取れた数字を持っていないためです。
          ご検討中のサービスがあれば、条件を伺ったうえで同じ並びに置いてご説明します。
        </p>
      </div>
    </section>
  )
}
