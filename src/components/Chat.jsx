import SectionHead from './SectionHead'

const JOURNEY = [
  ['01', 'FAQで読む', 'まずはすぐ確認したい', '残業時間、福利厚生、選考の流れなど、企業が用意した回答を短時間で確認できます。'],
  ['02', 'AIに聞く', '自分の条件で聞きたい', '自由文で質問し、登録済みの会社情報から関連箇所を参照した案内を受けられます。'],
  ['03', '担当者に相談', '個別の事情を相談したい', '在席中はリアルタイムで会話。不在時は氏名・連絡先と相談内容を残せます。'],
  ['04', '応募へ進む', '納得して次へ進みたい', '別のページを探し直さず、同じ窓口から応募などの次の行動へ進めます。'],
]

const INSIGHTS = [
  ['よく読まれた質問', 'テーマ別・質問別の閲覧から、求職者が知りたかったことを確認します。'],
  ['次の行動への進み方', 'FAQ、AI、担当者チャットの利用と、応募などのアクションクリックを集計します。'],
  ['いつ・どこで開かれたか', '日次推移、曜日・時間帯、起動ページ、流入元を案内改善の材料にします。'],
]

export default function Chat() {
  return (
    <section id="chat" className="section">
      <div className="container">
        <SectionHead idx="05" en="HR Chat" />
        <h2 className="section-title">採用サイトを、「読む場所」から「相談できる場所」へ</h2>
        <p className="section-sub">よくある質問、AI、採用担当者への相談から応募までを、1つの窓口でつなぎます。</p>

        <div className="chat-journey">
          {JOURNEY.map(([n, title, need, detail]) => (
            <article className="card" key={n}>
              <p className="chat-journey__n">{n}</p>
              <h3>{title}</h3>
              <p className="chat-journey__need">「{need}」</p>
              <p className="chat-journey__detail">{detail}</p>
            </article>
          ))}
        </div>

        <div className="chat-detail">
          <article className="card card--accent">
            <p className="label">AI with company context</p>
            <h3>登録済みの会社情報を参照して回答</h3>
            <ul>
              <li>— 質問に関係する箇所を検索し、会話の流れと併せて参照</li>
              <li>— 回答の根拠として使った参照元を表示可能</li>
              <li>— AIが参照できるURLパターンを企業側で設定</li>
              <li>— メールアドレス・電話番号などの入力をマスク</li>
            </ul>
            <p className="chat-caveat">生成AIの回答は正確でない場合があります。重要な条件や個別事情は、担当者への確認導線と組み合わせます。</p>
          </article>

          <article className="card">
            <p className="label">Human handoff</p>
            <h3>AIだけで決めにくい相談は、人へ</h3>
            <ul>
              <li>— 担当者がオンラインならリアルタイムで会話</li>
              <li>— 不在時は伝言フォームへ自動で切り替え</li>
              <li>— 氏名・連絡先・相談内容を保存</li>
              <li>— メール通知と対応状況の管理</li>
            </ul>
          </article>
        </div>

        <div className="chat-insights">
          <div>
            <p className="label">Learn from behavior</p>
            <h3>求職者が知りたかったことを、案内の改善材料に</h3>
            <p>ウィジェットを開いた後の閲覧とアクションを、主に匿名セッション単位で把握します。</p>
          </div>
          <div className="chat-insights__list">
            {INSIGHTS.map(([title, detail]) => (
              <div key={title}><h4>{title}</h4><p>{detail}</p></div>
            ))}
          </div>
        </div>

        <p className="chat-footnote">※ 利用できる機能は設定・ご契約内容によります。サイトの全訪問者を特定する機能ではありません。</p>

        <style>{`
          .chat-journey { margin-top: 48px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
          .chat-journey__n { font-family: var(--font-mono); color: var(--accent-text); font-size: .68rem; letter-spacing: .14em; }
          .chat-journey h3 { margin-top: 8px; font-size: 1.06rem; }
          .chat-journey__need { margin-top: 10px; color: var(--ink); font-weight: 700; font-size: .88rem; }
          .chat-journey__detail { margin-top: 10px; color: var(--text-muted); font-size: .86rem; }
          .chat-detail { margin-top: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
          .chat-detail h3, .chat-insights h3 { font-family: var(--font-display); font-size: 1.35rem; line-height: 1.6; }
          .chat-detail ul { margin-top: 22px; display: grid; gap: 10px; color: var(--text-muted); font-size: .9rem; }
          .chat-caveat { margin-top: 22px; padding-top: 16px; border-top: 1px solid var(--rule-soft); color: var(--text-dim); font-size: .78rem; }
          .chat-insights { margin-top: 24px; padding: clamp(28px, 5vw, 52px); border: 1px solid var(--rule); display: grid; grid-template-columns: .8fr 1.2fr; gap: 52px; background: rgba(252,250,246,.7); }
          .chat-insights > div:first-child > p:last-child { margin-top: 14px; color: var(--text-muted); font-size: .9rem; }
          .chat-insights__list { display: grid; gap: 18px; }
          .chat-insights__list > div { padding-bottom: 18px; border-bottom: 1px solid var(--rule-soft); }
          .chat-insights__list > div:last-child { border-bottom: 0; padding-bottom: 0; }
          .chat-insights__list h4 { font-size: .94rem; }
          .chat-insights__list p { margin-top: 5px; color: var(--text-muted); font-size: .84rem; }
          .chat-footnote { margin-top: 18px; color: var(--text-dim); font-size: .78rem; }
          @media (max-width: 900px) { .chat-journey { grid-template-columns: 1fr 1fr; } }
          @media (max-width: 680px) {
            .chat-journey, .chat-detail, .chat-insights { grid-template-columns: 1fr; }
            .chat-insights { gap: 32px; }
          }
        `}</style>
      </div>
    </section>
  )
}
