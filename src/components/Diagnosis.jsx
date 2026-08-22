import SectionHead from './SectionHead'

const MAIL = 'support@robottte.com'

function mailto(type) {
  const subject = encodeURIComponent(`HRパートナー ${type}のお申し込み`)
  const body = encodeURIComponent([
    `希望する診断：${type}`,
    '会社名：', 'お名前：', '対象拠点：', '採用したい職種：',
    '採用ページのURL：', '現在お使いの求人媒体・人材紹介：',
  ].join('\n'))
  return `mailto:${MAIL}?subject=${subject}&body=${body}`
}

const PLANS = [
  {
    name: '無料診断', lead: 'まず、自走の土台を確認する',
    scope: ['採用ページと求人情報', 'Google検索・しごと検索', 'Googleマップ・口コミ', 'Instagram・SNSの発信状況', '応募までの導線'],
    result: '公開情報から、最初に見直す場所を1枚でご報告', price: '0円', cta: '無料診断を選ぶ', featured: true,
  },
  {
    name: '有料診断', lead: '外部依存の原因と、打ち手を決める',
    scope: ['拠点別・経路別の応募と採用', '媒体費・紹介手数料', '市場の労働供給と検索需要', '競合の条件・発信・露出', '90日間の実行優先順位'],
    result: '外部依存比率、詳細レポート、実行計画をご提出', price: '対象範囲に応じてお見積り', cta: '有料診断を選ぶ',
  },
]

export default function Diagnosis() {
  return (
    <section id="diagnosis" className="section diagnosis">
      <div className="container">
        <SectionHead idx="04" en="Diagnosis" />
        <h2 className="section-title">採用の現在地を、どこまで調べますか</h2>
        <p className="section-sub">「診断するか」ではなく、必要な深さに合わせて2つからお選びください。</p>
        <div className="diagnosis-grid">
          {PLANS.map((plan) => (
            <article key={plan.name} className={`diagnosis-card${plan.featured ? ' diagnosis-card--featured' : ''}`}>
              <p className="diagnosis-card__label">{plan.name}</p>
              <h3>{plan.lead}</h3>
              <ul>{plan.scope.map((item) => <li key={item}>— {item}</li>)}</ul>
              <p className="diagnosis-card__result">{plan.result}</p>
              <p className="diagnosis-card__price">{plan.price}</p>
              <a className={plan.featured ? 'btn btn--primary' : 'btn btn--ghost'} href={mailto(plan.name)}>{plan.cta}</a>
            </article>
          ))}
        </div>
        <p className="diagnosis-note">無料診断では社内データを扱わないため、実際の外部依存比率は算出しません。有料診断では応募・採用・費用データを拠点別に確認します。</p>
      </div>
    </section>
  )
}
