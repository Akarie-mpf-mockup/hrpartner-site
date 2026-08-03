// 出所: 手順①〜⑫.md の全体マップ（市場①②③／競合④〜⑨／自社⑩⑪⑫）と各項目の「目的」「ツール」
// 規約: 数字には出典と取得日を付ける／取れなかったものは「未取得」と書く
//
// 2026-08-03 に「項目名の羅列」から「やること＋出所」に書き換えた。
// 提案デッキ（案件/ほほえみ…/デッキ.yml の kind: method）が
// 「6社を特定／30件超を個別に開いて転記／4通りで実測／通知3本で確認」のように
// **動作と出所**で示しているのに対し、サイト側は項目名だけで中身が空だったため。
//
// ⚠ 具体的な件数は載せない。実案件の数字を書くと導入事例になり規約7に触れる。
//    代わりに「何を見て、どこから取るか」で具体性を出す。
// ⚠ ツール名（AIリサーチ / Claude in Chrome 等）は書かない。
//    出所として意味があるのはデータ源（政府統計・媒体・Googleマップ）の側で、
//    かつ「こちらが手を動かします」という立ち位置と噛み合わないため。
const PHASES = [
  {
    name: '市場',
    sub: 'そもそも、その土地に働ける人がいるか',
    items: [
      {
        n: '①',
        t: '商圏の人口動態・労働供給',
        d: '拠点から通える範囲に、対象となる年齢層が何人いるかを数えます。母集団が細いのに募集の出し方だけ直しても届きません。',
        s: '政府統計（e-Stat）',
      },
      {
        n: '②',
        t: '需給のバランス',
        d: '有効求人倍率と、媒体に出ている同職種の掲載件数を突き合わせます。応募が来ない理由が供給不足なのか、見つかっていないだけなのかを切り分けます。',
        s: '厚生労働省 職業安定業務統計／求人媒体の掲載件数',
      },
      {
        n: '③',
        t: '実際に検索されている言葉',
        d: '求職者が打つ言葉を、エリア・業態・職種・こだわりの4分類で洗い出します。想像で決めません。',
        s: 'キーワードプランナー／Googleトレンド／サジェスト',
      },
    ],
  },
  {
    name: '競合',
    sub: '誰と、何で取り合っているか',
    items: [
      {
        n: '④',
        t: '取り合う相手の特定',
        d: '「同業」ではなく「同じ求職者を取り合う相手」を、求職者が実際に見る検索画面から特定します。ここを外すと以降が全部ずれます。',
        s: '求人媒体の検索結果',
      },
      {
        n: '⑤',
        t: '競合の条件',
        d: '競合の求人票を1件ずつ開き、給与・休日・手当・保証を同じ表に転記します。条件で負けていれば、露出を増やしても応募は来ません。',
        s: '求人媒体／各社の採用ページ／ハローワーク',
      },
      {
        n: '⑥',
        t: '競合の原稿の書き方',
        d: '⑤で集めた求人票の書き方を比べます。タイトルに地名や数字が入っているか、働く人の言葉があるか。条件を変えずに勝てる唯一の領域です。',
        s: '⑤で開いた求人票そのもの',
      },
      {
        n: '⑦',
        t: '競合の情報発信',
        d: '求職者が社名で調べたときに何が出てくるかを、実際にブラウザで開いて見ます。公式サイト・採用ページ・動画・SNSの量と更新状況。',
        s: '各社の実画面',
      },
      {
        n: '⑧',
        t: '競合の MEO・口コミ',
        d: 'Googleマップの星と口コミ件数を並べます。応募直前に効くため、地域密着の業種では意思決定が変わります。',
        s: 'Googleマップ／口コミサイト',
      },
      {
        n: '⑨',
        t: '検索露出の比較',
        d: '③で出した言葉で実際に検索し、御社が何番目に出るかを数えます。順位は取得日・地域・ログイン状態を添えて記録します。',
        s: '実検索（Google／しごと検索／求人媒体）',
      },
    ],
  },
  {
    name: '自社',
    sub: '土台が、そもそも見られる形になっているか',
    items: [
      {
        n: '⑩',
        t: '採用ページが検索に認識される形か',
        d: '求人情報の構造化データ、ページごとのタイトル、クロールの導線を確認します。1ページで早合点せず、拠点や職種ごとに分かれていないかまで見ます。',
        s: '御社サイトの実データ／Googleの検証ツール',
      },
      {
        n: '⑪',
        t: '自社の MEO・口コミ',
        d: '⑧と同じ物差しで御社を並べます。自社だけ甘く見ないためです。',
        s: 'Googleマップ／Googleビジネスプロフィール',
      },
      {
        n: '⑫',
        t: '流入と応募の実測',
        d: '①〜⑪は外から見た話です。ここで初めて「実際に何人来て、何人応募したか」と突き合わせます。御社の解析データの閲覧権限が必要です。',
        s: 'Search Console／GA4／応募管理',
      },
    ],
  },
]

export default function Method() {
  return (
    <section id="method" className="section section--alt">
      <div className="container">
        <p className="label">Method</p>
        <h2 className="section-title">ご提案の前に行う、12の実測</h2>
        <p className="section-sub">打ち手は、原因が市場・競合・自社のどこにあるかで変わります。</p>
        <p className="section-lead">
          「応募が来ない」の理由は、そもそも人がいないのか、見つかっていないのか、条件で負けているのかで違います。
          どこに原因があるかを先に確かめてから、打ち手を選びます。
        </p>

        <div style={{ marginTop: 72, display: 'grid', gap: 72 }}>
          {PHASES.map((p) => (
            <div key={p.name}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 20,
                  paddingBottom: 18,
                  borderBottom: '1px solid var(--rule)',
                }}
              >
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600 }}>{p.name}</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>{p.sub}</span>
              </div>

              <ol style={{ listStyle: 'none', display: 'grid', gap: 0 }}>
                {p.items.map((it) => (
                  <li
                    key={it.n}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '2.4rem 1fr',
                      gap: 20,
                      padding: '28px 0',
                      borderBottom: '1px solid var(--rule-soft)',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.1rem',
                        color: 'var(--accent-ink)',
                        lineHeight: 1.6,
                      }}
                    >
                      {it.n}
                    </span>
                    <div>
                      <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.12rem', fontWeight: 600, lineHeight: 1.7 }}>
                        {it.t}
                      </p>
                      <p style={{ marginTop: 10, fontSize: '0.94rem', color: 'var(--text-muted)', maxWidth: '62ch' }}>
                        {it.d}
                      </p>
                      <p
                        style={{
                          marginTop: 12,
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.66rem',
                          letterSpacing: '0.12em',
                          color: 'var(--text-dim)',
                        }}
                      >
                        出所 —— {it.s}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        <div className="note">
          数字には<strong>出典と取得日</strong>を付けます。順位や検索ボリュームは、いつ・どこから調べたかで変わるためです。
          取れなかったものは「未取得」と書きます。埋めません。
        </div>

        {/* ご報告の見本。
            00_素材棚卸_20260802.md:96「サイトに載せる見本は…匿名化して使うのが最短」への対応。
            ただし実在案件の匿名化ではなく**架空データで新規に組んだ**（実物 PDF は社名・実測値が
            全面に入っており塗り潰しでは残留を見落とす）。生成: _sample/デッキ_見本.yml を
            /root/hrp-case/deck_build.py で HTML 化 → スライドを撮影 → WebP。
            ⚠ loading="lazy" と width/height を必ず付ける。初期表示の転送量を増やさず、
              読み込み時のレイアウトずれも防ぐため。 */}
        <div style={{ marginTop: 88, paddingTop: 56, borderTop: '1px solid var(--rule)' }}>
          <p className="label">Sample</p>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.6 }}>
            お持ちするものの見本
          </h3>
          <p className="section-sub">
            数字だけをお渡しすることはありません。何を見て、どこから取ったかを必ず添えます。
          </p>

          <div className="samples">
            {[
              { src: '/images/sample-method.webp', cap: '1枚目に「調べ方」を置きます。件数と、その出所を並べます。' },
              { src: '/images/sample-table.webp', cap: 'バラバラの表記を同じ単位に直し、同じ表に並べます。' },
            ].map((s) => (
              <figure key={s.src} style={{ margin: 0 }}>
                <img
                  src={s.src}
                  alt=""
                  width={1600}
                  height={979}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    border: '1px solid var(--rule)',
                    background: '#fff',
                  }}
                />
                <figcaption style={{ marginTop: 14, fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                  {s.cap}
                </figcaption>
              </figure>
            ))}
          </div>

          <p style={{ marginTop: 24, fontFamily: 'var(--font-mono)', fontSize: '0.66rem', letterSpacing: '0.12em', color: 'var(--text-dim)' }}>
            架空の例 —— 実在の企業・実測値は含みません
          </p>
        </div>

        <div style={{ marginTop: 56, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 32 }}>
          <p style={{ fontSize: '1.0rem', maxWidth: '46ch' }}>
            このうち⑩は、お申し込みいただければ、ご商談の前に一枚にしてお持ちします。
          </p>
          <a href="#contact" className="btn btn--ghost">採用ページを見てもらう</a>
        </div>

        <style>{`
          .samples { margin-top: 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
          @media (max-width: 820px) { .samples { grid-template-columns: 1fr; gap: 40px; } }
        `}</style>
      </div>
    </section>
  )
}
