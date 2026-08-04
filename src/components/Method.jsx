import { useState } from 'react'
import SectionHead from './SectionHead'
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

/**
 * 2026-08-04: 「文字数が多過ぎる／わかりづらい」（ご指示）への対応。
 *
 * 旧版は12項目の説明文を全部開いて置いており、このセクションだけで **1,529字・4,318px**
 * （ページ全体 4,610字 の 33%）を占めていた。読ませる前に量で負けている状態。
 * → 既定は **項目名＋出所だけ**にし、説明文は押したときだけ開く。
 *
 * ⚠ FAQ と同じ挙動に揃える（`Faq.jsx`）。複数同時に開ける／閉じると項目名は残る。
 *   ただし FAQ と違い**初期状態は全部閉じる**。ここは「何を見るか」の一覧が本体で、
 *   説明文は補足だから（FAQ は答えが見えないと意味が無いので先頭2問を開けている）。
 *
 * 2026-08-04（第2段・ご指示「Method の12項目を折りたたむ」）:
 *   ブロック（市場／競合／自社）自体も閉じられるようにし、**既定は3ブロックとも閉じる**。
 *   既定で見えるのは「市場・競合・自社 ＋ 各ブロックの項目数」の3行だけになる。
 *   → 12項目の一覧を出したいときは押して開く。
 *   ⚠ ただし**先頭の「市場」だけは開いた状態で出す**（2026-08-04 追記）。
 *     3ブロックとも閉じると「12の実測」と見出しで言いながら、画面に実測の項目が
 *     1つも見えない状態になる。これは Faq.jsx で一度指摘された失敗と同じ形
 *     （「先にお答えしておきます」と書いてあるのに答えが1つも見えない → 先頭2問を開いた）。
 *     全部閉じたい場合は初期値を `new Set()` に戻す（1行）。
 */
export default function Method() {
  const [open, setOpen] = useState(() => new Set())
  const [openPhase, setOpenPhase] = useState(() => new Set(['市場']))
  const toggle = (k) =>
    setOpen((prev) => {
      const next = new Set(prev)
      next.has(k) ? next.delete(k) : next.add(k)
      return next
    })
  const togglePhase = (k) =>
    setOpenPhase((prev) => {
      const next = new Set(prev)
      next.has(k) ? next.delete(k) : next.add(k)
      return next
    })

  return (
    <section id="method" className="section section--alt">
      <div className="container">
        <SectionHead idx="03" en="Method" />
        <h2 className="section-title">ご提案の前に行う、12の実測</h2>
        <p className="section-sub">
          原因が市場・競合・自社のどこにあるかで、打ち手が変わります。押すと、実際に見る項目が開きます。
        </p>

        <div style={{ marginTop: 48, display: 'grid', gap: 24 }}>
          {PHASES.map((p) => {
            const pOpen = openPhase.has(p.name)
            return (
              <div key={p.name}>
                <button className="mphase" onClick={() => togglePhase(p.name)} aria-expanded={pOpen}>
                  <span className="mphase__n">{p.name}</span>
                  <span className="mphase__s">{p.sub}</span>
                  <span className="mphase__c">{p.items.length}項目</span>
                  <span aria-hidden className="mphase__p" data-open={pOpen ? '1' : '0'}>＋</span>
                </button>

                {pOpen && (
                  <ol style={{ listStyle: 'none', display: 'grid', gap: 0 }}>
                    {p.items.map((it) => {
                      const isOpen = open.has(it.n)
                      return (
                        <li key={it.n} style={{ borderBottom: '1px solid var(--rule-soft)' }}>
                          <button
                            onClick={() => toggle(it.n)}
                            aria-expanded={isOpen}
                            className="mrow"
                          >
                            <span className="mrow__n">{it.n}</span>
                            <span className="mrow__t">{it.t}</span>
                            <span className="mrow__s">{it.s}</span>
                            <span aria-hidden className="mrow__p" data-open={isOpen ? '1' : '0'}>＋</span>
                          </button>
                          {isOpen && (
                            <p className="mrow__d">{it.d}</p>
                          )}
                        </li>
                      )
                    })}
                  </ol>
                )}
              </div>
            )
          })}
        </div>

        <div className="note">
          数字には<strong>出典と取得日</strong>を付けます。取れなかったものは「未取得」と書きます。埋めません。
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
            何を見て、どこから取ったかを必ず添えます。
          </p>

          <div className="samples">
            {/* ⚠ パスは相対（'./'）。vite.config.js の base: './' と揃える。
                絶対パス '/images/…' だと、確認用のサブパス配信
                （akarie-mpf-mockup.github.io/hrpartner-site/）でだけ 404 になる。 */}
            {[
              { src: './images/sample-method.webp', cap: '1枚目に「調べ方」と、その出所を置きます。' },
              { src: './images/sample-table.webp', cap: 'バラバラの表記を同じ単位に直し、同じ表に並べます。' },
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

          /* ブロックの1行（市場／競合／自社）。既定は閉じており、ここだけが見えている。
             ⚠ 見出しの体裁（明朝1.5rem）は旧 <div> のときと同じに保つ。button の既定を打ち消す。 */
          .mphase {
            width: 100%;
            display: grid;
            grid-template-columns: minmax(0, auto) minmax(0, 1fr) minmax(0, auto) 1.4rem;
            align-items: baseline;
            gap: 20px;
            padding: 0 0 16px;
            background: none;
            border: none;
            border-bottom: 1px solid var(--rule);
            text-align: left;
            font: inherit;
            cursor: pointer;
          }
          .mphase__n { font-family: var(--font-display); font-size: 1.5rem; font-weight: 600; }
          .mphase__s { font-size: 0.9rem; color: var(--text-dim); }
          .mphase__c {
            font-family: var(--font-mono);
            font-size: 0.66rem;
            letter-spacing: 0.12em;
            color: var(--accent-text);
            white-space: nowrap;
          }
          .mphase__p { color: var(--accent-text); font-size: 1.1rem; transition: transform .2s; justify-self: end; }
          .mphase__p[data-open='1'] { transform: rotate(45deg); }
          @media (max-width: 620px) {
            .mphase { grid-template-columns: minmax(0, 1fr) 1.4rem; gap: 4px 12px; }
            .mphase__n { grid-column: 1; grid-row: 1; }
            .mphase__p { grid-column: 2; grid-row: 1; }
            .mphase__s { grid-column: 1; grid-row: 2; }
            .mphase__c { grid-column: 1; grid-row: 3; }
          }

          /* 12項目の1行。既定は「番号・項目名・出所」だけを出し、説明文は押したら開く。
             ⚠ button の既定スタイル（背景・枠・中央寄せ・小さい文字）を全部打ち消す。
               font: inherit を忘れると Chrome の 13.333px 系フォントに落ちる（Faq.jsx と同じ作法）。 */
          .mrow {
            width: 100%;
            display: grid;
            grid-template-columns: 2.4rem minmax(0, 1fr) minmax(0, auto) 1.4rem;
            align-items: baseline;
            gap: 20px;
            padding: 22px 0;
            background: none;
            border: none;
            text-align: left;
            font: inherit;
            cursor: pointer;
          }
          .mrow__n { font-family: var(--font-display); font-size: 1.1rem; color: var(--accent-ink); }
          .mrow__t { font-family: var(--font-display); font-size: 1.12rem; font-weight: 600; line-height: 1.7; }
          .mrow__s {
            font-family: var(--font-mono);
            font-size: 0.64rem;
            letter-spacing: 0.1em;
            color: var(--text-dim);
            text-align: right;
            line-height: 1.9;
          }
          .mrow__p { color: var(--accent-text); transition: transform .2s; justify-self: end; }
          .mrow__p[data-open='1'] { transform: rotate(45deg); }
          .mrow__d {
            margin: 0 0 24px;
            padding-left: calc(2.4rem + 20px);
            max-width: 62ch;
            font-size: 0.94rem;
            color: var(--text-muted);
          }
          /* 狭い画面では出所を項目名の下へ落とす（横に4列は入らない）。
             ⚠ 位置は grid-row / grid-column で**明示**する。自動配置に任せると
               ＋ が2行目に回り込む（列を跨いだ要素の後ろは自動カーソルが進む）。 */
          @media (max-width: 760px) {
            .mrow { grid-template-columns: 2.2rem minmax(0, 1fr) 1.4rem; gap: 0 16px; }
            .mrow__n { grid-column: 1; grid-row: 1; }
            .mrow__t { grid-column: 2; grid-row: 1; }
            .mrow__p { grid-column: 3; grid-row: 1; }
            .mrow__s { grid-column: 2; grid-row: 2; text-align: left; margin-top: 4px; }
            .mrow__d { padding-left: calc(2.2rem + 16px); }
          }
        `}</style>
      </div>
    </section>
  )
}
