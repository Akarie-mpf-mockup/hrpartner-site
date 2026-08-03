// CTA は1本に絞る（01_コンセプトとページ構成 §2-1 の注記）。
// ⚠ 「診断」という語は客先で使わない（手順①〜⑫.md:521 鉄則5）。「見て気づいたこと」「ご報告」と言う。
// 送信先は support@robottte.com に決定（2026-08-03）。
// robottte-site の Contact.jsx も外部フォームではなくメールリンク（kiban@robottte.com）で、方式は揃っている。
const MAIL = 'support@robottte.com'

export default function Contact() {
  const subject = encodeURIComponent('採用ページについてのご相談')
  const body = encodeURIComponent(
    [
      '会社名：',
      'お名前：',
      '採用ページの URL：',
      'お困りのこと：',
      '',
      '（採用したい職種・拠点の数が分かれば、あわせてご記入ください）',
    ].join('\n')
  )

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="card card--accent" style={{ padding: 'clamp(36px, 6vw, 72px)', textAlign: 'center' }}>
          <p className="label" style={{ justifyContent: 'center' }}>Contact</p>
          <h2 className="section-title" style={{ maxWidth: '28ch', margin: '0 auto' }}>
            まずは、採用ページを見せていただくところから
          </h2>
          <p style={{ marginTop: 24, color: 'var(--text-muted)', maxWidth: '56ch', margin: '24px auto 0' }}>
            URL をいただければ、求人が検索で認識される形になっているかを確認して、一枚にまとめてお返しします。
            ご商談の前に、お読みいただくだけで構いません。
          </p>

          <div style={{ marginTop: 36 }}>
            <a href={`mailto:${MAIL}?subject=${subject}&body=${body}`} className="btn btn--primary">
              メールで相談する
            </a>
          </div>

          <p style={{ marginTop: 20, fontSize: '0.84rem', color: 'var(--text-dim)' }}>
            {MAIL} ／ 会社名・お名前・採用ページの URL をお知らせください
          </p>
        </div>
      </div>
    </section>
  )
}
