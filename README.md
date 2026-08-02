# hrpartner-site

HRパートナーのサービスサイト。公開先 **https://hrpartner.robottte.com/**

## 構成

React 18 + Vite 5（プレーンCSS）。`Akarie-mpf-mockup/robottte-site` の構成に合わせています
（`src/components/` にセクション単位で分割、`public/` に CNAME・robots.txt・sitemap.xml・.nojekyll）。
CSS のトークン（配色・フォント）は `robottte-site/src/index.css` を踏襲。

```
src/
├── App.jsx              セクションの並び
├── index.css            トークンと共通クラス
└── components/
    ├── Nav.jsx          追従ナビ
    ├── Hero.jsx         ファーストビュー
    ├── Forms.jsx        採用を外に頼む4つの形
    ├── Partner.jsx      できること（当方が持つ／御社にお願いする・毎月やること）
    ├── Method.jsx       調べ方①〜⑫
    ├── Chat.jsx         併せて：HRチャット（※従の扱い）
    ├── Flow.jsx         進め方
    ├── Pricing.jsx      費用（月額3万円〜のみ表示）
    ├── Faq.jsx          よくある質問
    ├── Contact.jsx      お問い合わせ
    └── Footer.jsx
```

## 開発

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ を生成
```

## デプロイ

`main` に push すると `.github/workflows/deploy.yml` が走り、GitHub Pages へ自動反映されます。
**プレビュー環境はありません。** 下書きは別ブランチで持ち、完成してから `main` に入れてください。

## DNS（お名前.com）

| レコード | ホスト名 | 値 |
|---|---|---|
| CNAME | `hrpartner` | `akarie-mpf-mockup.github.io.` |

`robottte.com` の apex の A レコードは触りません（コーポレートサイト用）。

## 文言のルール（守ること）

Vault の `0_メニューと価格_松竹梅_20260731.md:158-163` と共通スライドの規律をそのまま適用しています。

1. ◎○△×を使わない。他社をネガティブに書かない
2. 他社の金額・契約条件は載せない（出典が取れていないため）
3. 効果を保証しない
4. 数字には出典と取得日を付ける
5. 「Googleに載らない」と断定しない
6. **導入事例・お客様の声は書かない**（契約実績がまだないため）
7. 価格は「月額30,000円から」だけ。松竹梅の全表・オプション・上限額は出さない

## 未決（コード内の TODO と対応）

- GA4 の測定ID（`index.html`）
- HRチャット ウィジェットの ndrkey（`index.html`）
- 問い合わせフォームの送信先（`Contact.jsx`／暫定で mailto）
- 会社概要・プライバシーポリシー・特商法（`Footer.jsx`）
- HRチャットの費用を出すか（`Pricing.jsx`）

設計の正典は Vault の
`💦A.実務/HRP.HRパートナー/サービスサイト/01_コンセプトとページ構成_20260802.md`。
