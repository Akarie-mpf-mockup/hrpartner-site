import { useState } from 'react'

// 出所: 【HRC】エイブリッジ.md:69（タグ埋め込みは開発側の権限が律速）,
//       0_メニューと価格_松竹梅_20260731.md:23（3ヶ月単位）, :107-110（含まないもの）, :34（1拠点から）
const ITEMS = [
  {
    q: '今のホームページを作り替える必要がありますか',
    a: 'ありません。別のドメインに採用ページを新しく用意します。現行のサイトは触りません。',
  },
  {
    q: 'タグを入れる作業は誰がやりますか',
    a: 'サイトのソースを触れる方にお願いします。制作会社や社内の開発担当の方の作業が必要になるため、社内で誰が触れるかを先にご確認いただけると進みが早くなります。',
  },
  {
    q: 'どれくらいで応募が増えますか',
    a: '時期をお約束することはできません。毎月数字を見て、効いていない項目は止めて替えます。',
  },
  {
    q: '何拠点から頼めますか',
    a: '1拠点から承ります。',
  },
  {
    q: '契約期間はありますか',
    a: '3ヶ月単位からです。',
  },
  {
    q: '面接や選考もお願いできますか',
    a: '承っておりません。面接・選考の代行、人材紹介は行っていません。',
  },
  {
    q: '媒体の掲載費は含まれますか',
    a: '含まれません。媒体に出す費用は別にお考えください。',
  },
]

export default function Faq() {
  // 先頭2問は開いた状態で出す。全部閉じていると「先にお答えしておきます」と言いながら
  // 画面に答えが1つも見えない（2026-08-03 の指摘）。
  const [open, setOpen] = useState(() => new Set([0, 1]))

  return (
    <section id="faq" className="section section--alt">
      <div className="container">
        <p className="label">FAQ</p>
        <h2 className="section-title">ご検討の前に、よくいただくご質問</h2>

        <div style={{ marginTop: 40, display: 'grid', gap: 12 }}>
          {ITEMS.map((it, i) => {
            const isOpen = open.has(i)
            return (
              <div key={it.q} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <button
                  onClick={() =>
                  setOpen((prev) => {
                    // 複数を同時に開けるようにする（1問開くと前の答えが閉じるのは読みにくい）
                    const next = new Set(prev)
                    next.has(i) ? next.delete(i) : next.add(i)
                    return next
                  })
                }
                  aria-expanded={isOpen}
                  style={{
                    width: '100%', textAlign: 'left', background: 'none', border: 'none',
                    padding: '22px 26px', cursor: 'pointer',
                    font: 'inherit', fontWeight: 700, fontSize: '1rem',
                    display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center',
                  }}
                >
                  <span>{it.q}</span>
                  <span aria-hidden style={{ color: 'var(--accent)', flexShrink: 0, transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform .2s' }}>＋</span>
                </button>
                {isOpen && (
                  <p style={{ padding: '0 26px 24px', color: 'var(--text-muted)', fontSize: '0.96rem' }}>{it.a}</p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
