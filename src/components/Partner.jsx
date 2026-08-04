import SectionHead from './SectionHead'
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

// 2026-08-04: 旧 MONTHLY は6項目のうち3項目が OURS の言い直しだった
// （原稿の書き換え／競合の定点観測／応募データの整理）。同じことを2枚のカードで
// 2回読ませていたので、**重複しない3つだけ**に絞り、見出し側で「上の4つに加えて」と繋ぐ。
// 月額に含む範囲（正典 :81-91）は OURS ＋ 本リストの和で変わらない。
const MONTHLY_EXTRA = [
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
        <SectionHead idx="02" en="Scope" />
        <h2 className="section-title">当方が持つ範囲と、御社にお願いする範囲</h2>
        {/* 2026-08-04: sub と lead が同じことを2回言っていたので lead を落とした
            （下の2枚のカードが同じ内容を項目で示しているため、散文は不要）。 */}
        <p className="section-sub">助言をお伝えするだけでも、システムをお渡しするだけでもありません。</p>

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
          原稿の書き換えや比較表の更新、データの整理をお願いすることはありません。
        </div>

        <div style={{ marginTop: 64 }}>
          <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.4rem', fontWeight: 800 }}>毎月やること</h3>
          <p className="section-sub" style={{ marginTop: 16 }}>
            上の4つを毎月続けます。あわせて、次のものも月額に含みます。
          </p>
          <div className="card" style={{ marginTop: 24 }}>
            <List items={MONTHLY_EXTRA} mark="var(--accent)" />
          </div>
          {/* 「含まないもの」は誤解を防ぐ実質条項なので短くしても必ず残す（正典 :107-110）。 */}
          <div className="note">
            <strong>含まないもの</strong>＝面接・選考の代行／人材紹介／給与そのものの決定／媒体の掲載費／
            日々の応募者対応（連絡・面接調整・選考判断）。仕組みを増やすものは別途ご相談になります。
          </div>
        </div>
      </div>
    </section>
  )
}
