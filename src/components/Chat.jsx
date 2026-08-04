import SectionHead from './SectionHead'
// HRチャット＝「従」。単体サービスとして売る書き方にしない。専用CTAは置かない。
// 出所: 【HRC】エイブリッジ.md:35-39（ペイン）, :62-63（タグ1行・FAQ案の提供）
//       ★2026-08-04 追加: Vault `HRチャット.md` が指す製品概要
//       `HRチャット製品概要20260209.pdf`（サクセスサポート部・2026-02-08）の
//       p2「実装済み機能 ALL IN ONE」／p3 常設のフローティングボタン／
//       p4 AIは汎用と社内情報ベースの2種・参照URL指定（Webクロール型RAG）・バナー文言設定／
//       p5 スタッフのオンライン／オフライン切替と留守番フォーム（名前・メール・メッセージ）／
//       p7 管理画面の数値（パネル開閉回数・アクションボタンクリック数・UU・よく見られた質問・流入元）。
// 禁止: 離脱率などの効果数値は手元に無いので書かない（00_素材棚卸 §3-6）。
//       「効果が出ます」ではなく「まず何人来ているかが分かる」に倒す。
//       p8 の他社比較（一般的なFAQページ／チャットボットとの対比）は**使わない**
//       ＝ライティング規約1「他社をネガティブに書かない」に触れるため。
//       p9 のトライアル（最大3ヶ月・無料）も**書かない**＝規約5「無料/有料を露骨に出さない」。
const POINTS = [
  { k: '設置', v: 'タグを1行入れるだけ。全ページの右下に常に出ます。管理画面でオン／オフと、質問と回答の編集ができます' },
  { k: '中身', v: '同じパネルの中に4つ。よくある質問／AIの案内／担当者との会話／その場で応募' },
  { k: '答え方', v: 'AIは、一般的な回答と、御社サイトの内容に基づく回答を切り替えられます（読み込む URL を指定します）。担当者が対応できない時間は、お名前と連絡先を受け付けて後から返せます' },
  { k: '分かること', v: '何人が開いたか、どのボタンが押されたか、よく見られた質問、どのページから来たか' },
]

export default function Chat() {
  return (
    <section id="chat" className="section">
      <div className="container">
        <SectionHead idx="04" en="Chat" />
        <h2 className="section-title">採用ページに来た方への、その場の応答</h2>
        {/* 2026-08-04: lead は下の4枚のカード（設置・答え方・準備・分かること）と同内容だったので落とした。 */}
        <p className="section-sub">タグ1行から始められます。管理画面でオンにするまで表示されません。</p>

        {/* ⚠ minmax(240px,1fr) だと本文幅 984px では3列になり、4枚目だけが次の行に
            ぽつんと残って間延びする（実測のスクショで判明）。2×2 に固定する。
            min(100%, 380px) は、狭い画面で 380px を要求して溢れるのを防ぐ書き方。 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: 20, marginTop: 40 }}>
          {POINTS.map((p) => (
            <div key={p.k} className="card">
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.76rem', fontWeight: 700, letterSpacing: '.1em', color: 'var(--accent)', marginBottom: 10 }}>
                {p.k}
              </p>
              <p style={{ fontSize: '0.95rem' }}>{p.v}</p>
            </div>
          ))}
        </div>

        <div className="note">
          御社サイトをこちらで読み込み、質問と回答の案を20〜30問お作りしてお渡しします。
          答える材料はこちらで用意しますので、まずは<strong>何人来ているかが分かるようになる</strong>ところからです。
        </div>
      </div>
    </section>
  )
}
