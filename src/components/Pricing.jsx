// 出所: 0_メニューと価格_松竹梅_20260731.md:34（単一拠点3万・初期0円）, :23（3ヶ月単位）,
//       :139-140（課金対象拠点は名前で列挙）, :107-110（含まないもの）
// 方針: 松竹梅の全表・オプション・上限額は載せない（2026-08-02 決定＝「月額3万円〜」だけ）。
// TODO(★要判断): HRチャットの費用を出すか（月10,000円〜／非表示）。現状は非表示にしている。
const STATS = [
  { k: '月額', v: '30,000', u: '円から', n: '対象拠点1つあたり' },
  { k: '初期費用', v: '0', u: '円', n: '通常10万円' },
  { k: 'ご契約', v: '3', u: 'ヶ月単位から', n: '' },
]

export default function Pricing() {
  return (
    <section id="pricing" className="section">
      <div className="container">
        <p className="label">費用</p>
        <h2 className="section-title">対象拠点の数で決まります</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginTop: 40 }}>
          {STATS.map((s) => (
            <div key={s.k} className="card card--accent">
              <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)', marginBottom: 4 }}>{s.k}</p>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: '2.4rem', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                {s.v}
                <span style={{ fontSize: '0.9rem', fontWeight: 500, marginLeft: 6, color: 'var(--text-muted)' }}>{s.u}</span>
              </p>
              {s.n && <p style={{ marginTop: 8, fontSize: '0.8rem', color: 'var(--text-dim)' }}>{s.n}</p>}
            </div>
          ))}
        </div>

        <div className="note">
          費用は<strong>対象拠点の数</strong>で決まります。支援の対象に含める事業所を、ご契約のときに名前で挙げて数えます。
          対象の範囲によって作業量が変わるため、拠点数と職種数を伺ったうえでお見積りします。
        </div>

        <p style={{ marginTop: 18, fontSize: '0.84rem', color: 'var(--text-dim)' }}>
          ※ 面接・選考の代行、人材紹介、給与そのものの決定、媒体の掲載費、SMS の通信料は含みません。<br />
          ※ 効果をお約束することはできません。毎月数字を見て、効いていない項目は止めて替えます。
        </p>
      </div>
    </section>
  )
}
