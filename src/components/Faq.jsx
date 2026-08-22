import { useState } from 'react'
import SectionHead from './SectionHead'

// 出所: 【HRC】エイブリッジ.md:69（タグ埋め込みは開発側の権限が律速）,
//       0_メニューと価格_松竹梅_20260731.md:23（3ヶ月単位）, :107-110（含まないもの）, :34（1拠点から）
const ITEMS = [
  {
    q: '無料診断と有料診断は何が違いますか',
    a: '無料診断は公開情報だけで、採用ページ・検索・地図・SNS・応募導線の土台を確認します。有料診断は拠点別の応募数、採用数、媒体費、紹介手数料も確認し、外部依存比率と実行優先順位までまとめます。',
  },
  {
    q: 'InstagramやSNSの運用もお願いできますか',
    a: '可能です。投稿企画、素材制作、投稿運用のどこまでを支援するか、診断結果と社内体制を見て対象範囲を決めます。撮影や大幅な動画制作は別途お見積りします。',
  },
  {
    q: '今のホームページを作り替える必要がありますか',
    a: '必ずしも必要ありません。現行サイトを更新できる場合は今ある資産を活かし、難しい場合は別のドメインに採用ページをご用意します。',
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
        <SectionHead idx="08" en="FAQ" />
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
