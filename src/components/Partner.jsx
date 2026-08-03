// 出所: 共通スライド/…yml:52-66（当方で持つこと／御社にお願いすること）, :97-112（月額に含む）
//       0_メニューと価格_松竹梅_20260731.md:81-91（梅・竹の作業）, :85（ATS内包）, :107-110（含まないもの）
const OURS = [
  '求人原稿の書き換えと、掲載後の手入れ',
  '競合の条件・書き方の定点観測（1社が動けば順位が変わるため）',
  '応募データの整理と、月次のご報告',
  '採用ページ・応募フォームなど、仕組みの用意と運用',
]

const YOURS = [
  '写真・実績・働く方の声などの素材のご提供',
  '応募・採用の実績と、解析（Search Console／GA4）の閲覧権限',
  '給与・応募資格・勤務条件に関する経営判断',
]

const MONTHLY = [
  '求人原稿の書き換えと手入れ（対象拠点の求人すべて）',
  '競合の条件・書き方の定点観測（毎月、比較表を更新）',
  '応募データの整理と月次のご報告',
  'Google しごと検索に出る形の維持と、不具合の修正',
  '応募フォーム・応募導線の点検',
  '応募者管理（HRモンスター）の利用・設定・保守',
]

function List({ items, mark }) {
  return (
    <ul style={{ display: 'grid', gap: 12 }}>
      {items.map((t) => (
        <li key={t} style={{ display: 'flex', gap: 12, fontSize: '0.97rem' }}>
          <span aria-hidden style={{ color: mark, fontWeight: 700, flexShrink: 0 }}>—</span>
          <span>{t}</span>
        </li>
      ))}
    </ul>
  )
}

export default function Partner() {
  return (
    <section id="partner" className="section">
      <div className="container">
        <p className="label">Scope</p>
        <h2 className="section-title">当方が持つ範囲と、御社にお願いする範囲</h2>
        <p className="section-sub">助言をお伝えするだけでも、システムをお渡しするだけでもありません。</p>
        <p className="section-lead">
          システムをお渡しするだけでも、助言をお伝えするだけでもなく、求人原稿の書き換え・競合条件の比較・
          数字の整理まで当方が手を動かします。御社に残るのは、素材のご提供と条件に関する経営判断です。
        </p>

        <div className="cols">
          <div className="card card--accent">
            <h3 style={{ fontSize: '1.05rem', marginBottom: 20 }}>当方で持つこと</h3>
            <List items={OURS} mark="var(--accent)" />
          </div>
          <div className="card" style={{ background: 'var(--warn-light)', borderColor: 'rgba(180,83,9,0.18)' }}>
            <h3 style={{ fontSize: '1.05rem', marginBottom: 20 }}>御社にお願いすること</h3>
            <List items={YOURS} mark="var(--warn)" />
          </div>
        </div>

        <div className="note">
          <strong>手を動かすところまで当方が持つ代わりに、判断は御社に残ります。</strong>
          条件をどこまで動かせるかで打ち手が変わるため、そこだけは代わりに決めることができません。
          逆に、原稿の書き換えや比較表の更新、データの整理をお願いすることはありません。
        </div>

        <div style={{ marginTop: 64 }}>
          <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.4rem', fontWeight: 800 }}>毎月やること</h3>
          <div className="cols" style={{ marginTop: 24 }}>
            <div className="card">
              <List items={MONTHLY.slice(0, 3)} mark="var(--accent)" />
            </div>
            <div className="card">
              <List items={MONTHLY.slice(3)} mark="var(--accent)" />
            </div>
          </div>
          <div className="note">
            境目は<strong>毎月の手入れか、仕組みを増やすか</strong>です。仕組みを増やすものは別途ご相談になります。<br />
            <strong>含まないもの</strong>＝面接・選考の代行／人材紹介／給与そのものの決定／媒体の掲載費／
            日々の応募者対応そのもの（連絡・面接調整・選考判断）。
          </div>
        </div>
      </div>
    </section>
  )
}
