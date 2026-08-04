import { useCountUp } from '../motion'
import SectionHead from './SectionHead'
// 出所: 0_メニューと価格_松竹梅_20260731.md:34（単一拠点3万・初期0円）, :23（3ヶ月単位）,
//       :139-140（課金対象拠点は名前で列挙）, :107-110（含まないもの）
// 方針: 松竹梅の全表・オプション・上限額は載せない（2026-08-02 決定＝「月額3万円〜」だけ）。
// TODO(★要判断): HRチャットの費用を出すか（月10,000円〜／非表示）。現状は非表示にしている。
const STATS = [
  { k: '月額', v: '30,000', u: '円から', n: '対象拠点1つあたり' },
  // 「通常10万円」という打ち消し表示を削除（2026-08-03）。
  // 正典 0_メニューと価格_松竹梅_20260731.md:34 は「初期0円」であり、**10万円という参照価格の出所が無い**。
  // 出所のない参照価格の併記は二重価格表示にあたる恐れがあり、
  // ライティング規約4「数字には出典と取得日を付ける」にも反する。
  { k: '初期費用', v: '0', u: '円', n: '' },
  { k: 'ご契約', v: '3', u: 'ヶ月単位から', n: '' },
]

function Stat({ s }) {
  const [ref, shown] = useCountUp(s.v)
  return (
    <div className="card card--accent">
      <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)', marginBottom: 4 }}>{s.k}</p>
      <p ref={ref} style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '2.9rem', lineHeight: 1.2, letterSpacing: '0.01em' }}>
        {shown}
        <span style={{ fontSize: '0.9rem', fontWeight: 500, marginLeft: 6, color: 'var(--text-muted)' }}>{s.u}</span>
      </p>
      {s.n && <p style={{ marginTop: 8, fontSize: '0.8rem', color: 'var(--text-dim)' }}>{s.n}</p>}
    </div>
  )
}

export default function Pricing() {
  return (
    <section id="pricing" className="section">
      <div className="container">
        <SectionHead idx="06" en="Pricing" />
        <h2 className="section-title">対象拠点の数で決まる費用</h2>
        <p className="section-sub">支援の対象に含める事業所を、ご契約のときに名前で挙げて数えます。</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginTop: 40 }}>
          {STATS.map((s) => <Stat key={s.k} s={s} />)}
        </div>

        {/* 2026-08-04: 1文目が section-sub の言い直しだったので落とし、見積りの条件だけ残した。 */}
        <div className="note">
          対象の範囲によって作業量が変わるため、<strong>拠点数と職種数</strong>を伺ったうえでお見積りします。
        </div>

        <p style={{ marginTop: 18, fontSize: '0.84rem', color: 'var(--text-dim)' }}>
          ※ 面接・選考の代行、人材紹介、給与そのものの決定、媒体の掲載費、SMS の通信料は含みません。<br />
          ※ 効果をお約束することはできません。毎月数字を見て、効いていない項目は止めて替えます。
        </p>
      </div>
    </section>
  )
}
