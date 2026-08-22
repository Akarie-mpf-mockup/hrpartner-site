import SectionHead from './SectionHead'

const AREAS = [
  ['見つけてもらう', 'SEO／Googleしごと検索／MEOで、職種名・地域名から届く経路を整えます。'],
  ['知ってもらう', 'Instagram・SNS、写真、動画、社員の声で、働く姿を継続的に伝えます。'],
  ['選ばれる', '採用ページ、求人原稿、口コミ・職場情報を、求職者が比較しやすい形にします。'],
  ['応募につなげる', '応募フォーム、HRチャット、応募者管理をつなぎ、迷いや取りこぼしを減らします。'],
  ['良くする', 'GA4、Search Console、応募・採用データを見て、効かない施策を入れ替えます。'],
]

export default function Partner() {
  return (
    <section id="partner" className="section">
      <div className="container">
        <SectionHead idx="02" en="Owned Route" />
        <h2 className="section-title">自社の採用経路をつくる、5つの領域</h2>
        <p className="section-sub">すべてを一度に行うのではなく、診断で詰まりを確認し、必要な領域から始めます。</p>
        <div className="service-areas">
          {AREAS.map(([title, detail], i) => (
            <article className="card" key={title}>
              <p className="service-areas__n">0{i + 1}</p>
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
        <div className="note">
          最初は当方が手を動かします。ただし、ドメイン、コンテンツ、管理権限、計測データ、改善履歴は<strong>御社に残る形</strong>で進めます。
        </div>
        <p style={{ marginTop: 18, fontSize: '0.84rem', color: 'var(--text-dim)' }}>
          ※ SNSは投稿企画・素材制作・運用のうち、対象範囲を拠点ごとに決めます。媒体掲載費、撮影、大幅な制作は別途お見積りします。
        </p>
        <style>{`
          .service-areas { margin-top: 44px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
          .service-areas article:last-child { grid-column: 1 / -1; }
          .service-areas__n { font-family: var(--font-mono); color: var(--accent-text); font-size: .68rem; letter-spacing: .16em; }
          .service-areas h3 { margin-top: 8px; font-size: 1.08rem; }
          .service-areas article > p:last-child { margin-top: 8px; color: var(--text-muted); font-size: .94rem; }
          @media (max-width: 720px) { .service-areas { grid-template-columns: 1fr; } .service-areas article:last-child { grid-column: auto; } }
        `}</style>
      </div>
    </section>
  )
}
