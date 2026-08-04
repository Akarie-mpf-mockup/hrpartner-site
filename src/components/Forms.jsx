import SectionHead from './SectionHead'
// 出所: 共通スライド/採用の外部活用_4つの進め方.yml:74-82（4つの進め方の表）, :126-135（向いている場面）
// 規約: ◎○△×を使わない／他社の金額・契約条件は載せない（0_メニューと価格_松竹梅_20260731.md:158-163）
// 2026-08-04: 表のセルを短くした（16セルが全部「〜したいとき」の長文で、
// 横に並べて見比べる表なのに読み下さないと差が分からなかった）。意味は変えていない。
const ROWS = [
  { form: '採用代行（アウトソース）', who: '代行会社', rest: '期間中の実行力（仕組みは社外）', fit: '期限が決まった大量採用' },
  { form: '採用顧問・コンサル', who: '御社', rest: '進め方の考え方', fit: '社内に知見を貯めたい' },
  { form: '採用システム', who: '御社', rest: '応募管理の仕組み', fit: '応募対応の作業を減らしたい' },
  { form: 'HR パートナー', who: '当方（素材は御社）', rest: '仕組みと、回し方の型', fit: '媒体費を増やす前に原稿を見直したい', self: true },
]

export default function Forms() {
  return (
    <section id="forms" className="section section--alt">
      <div className="container">
        <SectionHead idx="01" en="Approaches" />
        <h2 className="section-title">採用を外に頼む、4つの形</h2>
        {/* 2026-08-04: section-sub と section-lead が**同じ文**だった（強調の有無だけの違い）。
            初見の情報量を増やさずに縦を食っていたので lead を落とし、強調を sub に寄せた。 */}
        <p className="section-sub">
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
          記号での採点はしていません。困っていることで、選ぶものが変わります。
          HRパートナーは、<strong>現行のサイトを触らずに露出と応募導線を直したいとき</strong>に向いています。
        </div>

        {/* ライティング規約2（他社の金額・契約条件は載せない）の理由書き。
            規約由来なので削除はしないが、1文に詰めた。 */}
        <p style={{ marginTop: 18, fontSize: '0.84rem', color: 'var(--text-dim)' }}>
          ※ 他社の費用は、出典の取れた数字を持っていないため載せていません。
        </p>
      </div>
    </section>
  )
}
