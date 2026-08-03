/**
 * セクションの頭。参考 lab/05 の「02 —— Company」型。
 *
 * 等幅の番号 → シアンの短い罫 → 大きな欧文セリフ、の順に並べる。
 * ⚠ 欧文は装飾なので aria-hidden にし、意味は下の <h2>（日本語）が持つ。
 *   見出しを欧文に置き換えると、検索にも読み上げにも日本語が残らない。
 */
export default function SectionHead({ idx, en }) {
  return (
    <div className="shead" aria-hidden="true">
      <span className="shead__idx">{idx}</span>
      <span className="shead__rule" />
      <span className="shead__en">{en}</span>
    </div>
  )
}
