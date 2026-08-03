// HRチャット＝「従」。単体サービスとして売る書き方にしない。専用CTAは置かない。
// 出所: 【HRC】エイブリッジ.md:35-39（ペイン）, :62-63（タグ1行・FAQ案の提供）
// 禁止: 離脱率などの効果数値は手元に無いので書かない（00_素材棚卸 §3-6）。
//       「効果が出ます」ではなく「まず何人来ているかが分かる」に倒す。
const POINTS = [
  { k: '設置', v: 'タグを1行入れるだけ。管理画面でオン／オフ、質問と回答の編集ができます' },
  { k: '答え方', v: 'よくある質問への回答に加え、サイトに書かれている内容を根拠にお答えします' },
  { k: '準備', v: '御社サイトをこちらで読み込み、質問と回答の案を20〜30問お作りしてお渡しします' },
  { k: '分かること', v: '何人が見て、何人が開いて、どこまで会話が進んだか' },
]

export default function Chat() {
  return (
    <section id="chat" className="section">
      <div className="container">
        <p className="label">Chat</p>
        <h2 className="section-title">採用ページに来た方への、その場の応答</h2>
        <p className="section-sub">タグ1行から始められます。ご準備が整うまで表示されません。</p>
        <p className="section-lead">
          採用ページに1行のタグを入れると、来た方の疑問にその場で答えるようになります（HRチャット）。
          管理画面でオンにするまで表示されないので、準備が終わってから公開できます。
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginTop: 40 }}>
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
          サイトの情報がまだ薄い、という場合でも始められます。答える材料はこちらで用意します。
          まずは<strong>何人来ているかが分かるようになる</strong>ところからです。
        </div>
      </div>
    </section>
  )
}
