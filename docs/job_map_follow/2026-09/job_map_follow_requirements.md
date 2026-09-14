# 求人マップ（job_map）フォロー・再訪機能 調査報告書兼改修要件定義書

**作成日**: 2026-09-14
**作成者**: Claude
**最終更新日**: 2026-09-14
**バージョン**: 1.0
**ステータス**: ドラフト（§6 の Q1〜Q3 が未回答。実装方針が回答で変わるため着手前に確定が必要）

> **この文書の置き場所について**: 本来の所在は `hrm_project` の
> `docs/job_map_follow/2026-09/job_map_follow_requirements.md`（`docs/DOCUMENT_NAMING_CONVENTION.md` の
> 「機能別フォルダ / YYYY-MM / `[機能名]_requirements.md`」に準拠）。
> 本セッションは `hrm_project` を**読み取りで**クローンしているため、同じ相対パスで
> `hrpartner-site` 側に置いている。移設時はパスをそのまま使える。
> `.claude/skills/README.md` の LL #0537（docs だけの PR を新規に作らない）に従い、
> **本文書のために新しい PR は作っていない**（既存 PR に相乗りしている）。

---

## 0. この文書の位置づけと調査方法

### 0.1 先行文書との関係（置き換えではなく続き）

`hrm_project` に **2026-09-08 付の確定文書**が既にある。

- `docs/job_map/2026-09/job_map_current_spec_and_improvement_requirements.md`
  （job_map 全体の現状仕様と改修候補 C-1〜C-11。C-1 / C-2 / C-3 / C-6 を実装スコープとして確定済み）

**本文書はその置き換えではない。** 先行文書が §4.7 で「本サイクルでは着手しない」とした候補のうち
**C-4（計測イベントの読み出し口）**と、§3.2 の未達項目 **「会員登録促し（保存する / 続きから）の導線なし」**に、
今回の依頼（添付＝日経電子版 Myニュース型のフォロー機能）が正面から重なる。
したがって本文書は **C-4 と「再訪導線の不在」を主題に切り出した続編**として書く。
先行文書と重複する現状記述（システム構成・API 一覧・CI 構成）は繰り返さず、参照にとどめる。

### 0.2 調査方法と検証区分

先行文書 §0.2 の区分をそのまま踏襲する。

| 記号 | 意味 |
|---|---|
| ✅ | 本文書の作成者が該当ファイルを**自分で Read して**確認した |
| 📄 | 先行文書の記述を参照した（作成者による再確認はしていない） |
| ⚠ | 一次確認が取れておらず、推測を含む。断定していない |

引用は `.claude/skills/requirements.md` §0.5-b に従い、**リポジトリルート相対のフルパス**で書く。
パスの起点は `hrm_project` リポジトリのルートである。

### 0.3 本調査で参照できなかったもの

- 実画面のスクリーンショット（本セッションからは `hr-monster.io` への外向き通信が
  egress プロキシで遮断されている。⚠ したがって**実機の見た目は確認していない**）
- 本番 DB（先行文書 §7 と同じ制約。データ件数・分布は未確認）

---

## 1. 概要

### 1.1 依頼内容

添付された 3 枚（日経電子版アプリの「フォロー追加」「おすすめ18時」「最新（Myニュース）」）と
同種の機能を job_map に「簡単につけられるように」したい、というのが依頼である。

### 1.2 添付3枚の分解

| # | 画面 | 読み取れる挙動 |
|---|---|---|
| 1 | フォロー追加 | フォロー対象（企業・業界・トピック）を検索して ⊕ で追加。「話題のトピック」は**フォロワー数の降順ではない**（`イラン軍事衝突 13,884人` と `個人向け国債 1人` が同列）。「登録数の多いトピック」は累計降順 |
| 2 | おすすめ18時 | 「本日分の更新は18時です」＝**1日1回のバッチ生成**。「今日の10本」と本数が固定＝**枠（スロット）先行**。根拠は「日経ID登録情報から」＝**登録属性ベース**（行動履歴が無くても動く＝コールドスタート対策）で、しかも「変更する」で上書きできる |
| 3 | 最新（フィード） | フォロー対象に紐づく記事を時系列降順でマージ。各記事に `◇ カラダづくり` ＝**どのフォローで入ったか**のバッジ（＝重複排除の副産物であり、フォロー解除の導線でもある） |

### 1.3 job_map に写したときの対応

**添付の機能は「フォローできる対象の辞書」＋「コンテンツにその対象を紐付けた表」の 2 つに還元できる。**
job_map ではその 2 つが**既に両方そろっている**（§2.1）。ここが本件の要点である。

| 日経 | job_map での対応物 | 実在するか |
|---|---|---|
| フォロー対象（企業・業界・キーワード） | 職種 / 都道府県 / 市区町村 / 未経験歓迎・リモート可・正社員 | ✅ ある（§2.1-A） |
| 記事 | 求人（`RecruitJobIndex`）と企業拠点 | ✅ ある |
| 記事⇔対象の紐付け | `RecruitJobIndex` の列そのもの（`occupation_code` / `prefecture` / `municipality` / `is_remote_ok` / `experience_level` / `employment_type`） | ✅ ある（§2.1-B） |
| ユーザー識別 | 匿名 `visitor_key`（localStorage） | ✅ ある（§2.1-C） |
| フォロー（user × 対象） | — | ❌ **無い**（§2.2） |
| 保存記事 | — | ❌ **無い**（§2.2） |
| 閲覧履歴 | `MapDiscoveryEvent` に**溜まっているが読み出し口が無い** | △（§2.1-D） |
| おすすめ | `NavigatorRecommendation`（決定論ルール）が会社選択後にだけ存在 | △（§2.1-E） |

**したがって本件は「一から作る」話ではなく、「既にある辞書と索引の上に、user×対象の1テーブルを載せる」話である。**

---

## 2. 現状調査

### 2.1 既にあるもの（＝今回作らなくてよい部品）

#### A. フォロー対象の辞書は配布 API まで完成している ✅

`back/recruit_index/views.py:452-457` の `CompanyDiscoveryConfigView` が、
`prefectures` / `municipalities` / `occupations` を返している。しかも
`back/recruit_index/views.py:442-446` は**実際に使われている職種だけ**を
（`occupation_code` が `unknown` の行を除外し、`OccupationCode.is_active` で絞って）返す。

職種マスタ自体も存在する。`back/recruit_index/models.py:17-33` の `OccupationCode` は
`code` / `label` / `keywords`（別名。カンマ区切り）/ `is_active` / `sort_order` を持ち、
`back/recruit_index/models.py:29-30` の `keyword_list()` が別名を配列で返す。

> **これは日経でいう「フォローできる対象の一覧」そのものである。** 表記揺れの吸収（別名辞書）まで
> 設計に入っている。フォロー機能を足すうえで**最も重い部分が既に終わっている**。

一方、絞り込みのトグル語彙は 3 つに固定されている（✅ `front-react-recruit/src/lib/bboxQuery.js:6-10`
`FILTER_DEFS` = `未経験歓迎` / `リモート可` / `正社員`）。

#### B. 「求人 ⇔ 対象」の紐付けは索引テーブルの列として存在する ✅

`back/recruit_index/models.py:55-60` と `:78-83` により、1 行の求人が
`occupation_code` / `employment_type` / `prefecture` / `municipality` / `is_remote_ok` /
`experience_level` を**それぞれ db_index 付き**で持つ。
日経が NLP でやっている「記事へのタグ付け」に相当する処理は、job_map では
索引ビルド時に既に済んでいる。

#### C. 匿名の利用者識別子が既にあり、サーバへも送られている ✅

- `front-react-recruit/src/lib/locationSearchState.js:141` が
  `VISITOR_KEY_STORAGE_KEY = 'hrm-map-visitor-v1'` を定義
- `front-react-recruit/src/lib/locationSearchState.js:146` が
  `VISITOR_KEY_PATTERN = /^[A-Za-z0-9_-]{1,64}$/` で文字種を固定（サーバ側と同じ形にそろえる旨のコメント付き）
- `front-react-recruit/src/lib/apiClient.js:136` / `:144` が
  `visitor_key` を**クエリに載せてサーバへ送っている**（履歴の取得・削除）
- サーバ側の受け皿も `back/recruit_index/models.py:207` の
  `LocationSearchHistory.visitor_key`（`max_length=64`）として存在し、
  `back/recruit_index/models.py:222` に `visitor_key + -searched_at` の複合インデックスがある

**つまり「ログインなしで、この端末の人の設定をサーバに持つ」経路は既に本番で動いている。**
フォロー機能に新しい認証基盤は要らない。

`back/recruit_index/models.py:197` は `visitor_key` について
「端末の localStorage で生成する匿名の識別子。氏名・メール・生住所は持たない」と明記している。

#### D. 閲覧・操作イベントは溜まっているが、読む口が無い ✅📄

`back/recruit_index/models.py:167-180` に `MapDiscoverySession` / `MapDiscoveryEvent`
（`event_type` / `company_hash` / `location_key` / `metadata_json` / `occurred_at`）がある。
フロントからも実際に送られている（✅ `front-react-recruit/src/App.jsx:661`
`track('company_jobs_open', …)`、`:710` `track('filter_change', …)`、`:780` `track('company_compare', …)`）。

📄 先行文書 §3 問題4 が「`NavigatorEvent` / `MapDiscoveryEvent` / `NavigatorRecommendation` を読む
本番コードが `back/` 全体に無く、Django 管理画面からも見られない。イベントは溜まる一方で、誰も見られない」と記録している。
これは C-4 として §4.7 で**着手見送り**になっている。

> **本件との関係**: 「最近見た会社」「続きから」は、この溜まっているイベントの
> **最初の読み出し用途**になる。C-4 を単体の分析基盤として作るより、
> 求職者向けの機能として先に読み出す方が、費用対効果の説明がつく。

#### E. 決定論の推薦ロジックは既にある（ただし会社選択後にだけ） ✅

`back/recruit_index/models.py:141-154` の `NavigatorRecommendation` は
`score` / `rule_version` / `reason_json` / `rank` を保存する。
`:144` のコメントが「決定論ルールの出力をそのまま保存する」と明記している。

ただしこれは `NavigatorSession`（`back/recruit_index/models.py:102-122`）に紐づき、
セッションは `company_hash` を必須で持つ（`:113`）。**会社を選んだ後の機能**であり、
「まだ会社を選んでいない人へのおすすめ」には現状使えない。

#### F. 端末に閉じた「条件の記憶」は既にある ✅📄

`front-react-recruit/src/components/FutureProfilePanel.jsx:97` は画面上で
「保存するのは上の選択だけです。住所・氏名・健康・家族情報は保存しません。
このブラウザを使う人に見える可能性があります。」と告知している。
📄 先行文書 §2.2.2 によれば、未来条件プロファイル・比較選択・訪問者キー・コーチマーク既読は
localStorage、表示条件（フィルタ・選択会社・中心/zoom）は URL クエリに置かれている。

**注意**: `front-react-recruit/src/App.jsx:750-758` の「条件を共有」は
`history.replaceState` で URL を書き換えてクリップボードへコピーする。
**条件の持ち出しは URL 経由でできるが、「この端末に名前を付けて残す」手段は無い。**

### 2.2 無いもの（根拠の grep と件数）

`.claude/skills/README.md` 禁止事項13 に従い、否定形の主張には grep コマンドと結果件数を併記する。
検索は `hrm_project` のルートで実行した。

```
$ grep -rniE "follow|favorite|bookmark|watchlist|subscribe" front-react-recruit/src \
    --include=*.js --include=*.jsx | grep -v "__tests__" | wc -l
0

$ grep -rniE "follow|favorite|bookmark|subscribe" back/recruit_index --include=*.py | wc -l
8

$ grep -rnE "お気に入り|フォロー|保存する|あとで" front-react-recruit/src | grep -v "__tests__" | wc -l
3
```

**ヒットの中身を確認した結果、いずれもフォロー機能ではない**（件数だけで判断していない）。

| 検索 | 件数 | 実際の中身 |
|---|---|---|
| 英語（front） | **0 件** | — |
| 英語（back/recruit_index） | 8 件 | 全て `back/recruit_index/tests/test_navigator_linking.py:31-38` の `subscribe_required_name` 等＝**応募フォームの項目設定**。購読機能ではない ✅ |
| 日本語（front） | 3 件 | `front-react-recruit/src/components/FutureProfilePanel.jsx:97` / `front-react-recruit/src/lib/apiClient.js:130` / `front-react-recruit/src/lib/locationSearchState.js:138` の**プライバシー注記の「保存する」**。機能名ではない ✅ |

また、公開 API のエンドポイント一覧（`back/recruit_index/urls.py:38-63`）に
フォロー・保存・履歴閲覧に相当するものは無い（`location-searches/` は場所検索語の履歴で、
求人・会社の閲覧履歴ではない）。

**結論**: フォロー・保存（お気に入り）・閲覧履歴の閲覧・おすすめ一覧は、
求職者向け画面（`front-react-recruit`）にも公開 API にも**存在しない**。

### 2.3 現在の画面（実ラベル）

Artifact（画面イメージ）と要件の用語をそろえるため、実装から実ラベルを抜き出す。
以下は全て ✅（Read 済み）。

| 位置 | 実ラベル | 出典 |
|---|---|---|
| ヘッダー | `HRモンスター` + `Recruit` | `front-react-recruit/src/App.jsx:628` |
| 見出し | `会社・勤務地から探す` | `front-react-recruit/src/App.jsx:630` |
| ピル | `絞り込み` | `front-react-recruit/src/App.jsx:695` |
| 絞り込み | `地域` / `職種` / `市区町村`、既定値は `全国` / `すべて` / `すべて` | `front-react-recruit/src/App.jsx:707-726` |
| トグル | `未経験歓迎` / `リモート可` / `正社員` | `front-react-recruit/src/lib/bboxQuery.js:6-10` |
| 表示切替 | `一覧で見る` / `地図で見る` | `front-react-recruit/src/App.jsx:748` |
| 共有 | `条件を共有` → 通知 `URLをコピーしました` | `front-react-recruit/src/App.jsx:756-758` |
| 地図下 | `この範囲を検索` | `front-react-recruit/src/App.jsx:768` |
| カード | `募集中の求人 {n}件` / `主な職種：{…}` | `front-react-recruit/src/components/CompanyList.jsx:92` / `:95` |
| カード CTA | `この会社の求人を見る` / `希望条件から案内してもらう` / `比較する`（押下時 `比較から外す`）/ `💬 応募前に相談する` | `front-react-recruit/src/components/CompanyList.jsx:110` / `:123` / `:126` / `:136` |
| ロボ | `案内ロボ {name}` / `{name}がご案内` | `front-react-recruit/src/components/CompanyList.jsx:73` / `:82-83` |
| 会社の回答 | `この会社の回答（会社が公開）` / 90日超は `要確認` | `front-react-recruit/src/components/CompanyList.jsx:27` / `:34` |
| 使い方 | `この地図の使い方` → `働きたい地域・職種で探す` / `会社と勤務地を比べて理解する` / `求人を見る、または応募前に相談する` | `front-react-recruit/src/App.jsx:808-813` |
| フッター | `運営：株式会社robottte` | `front-react-recruit/src/App.jsx:821` |

配色（✅ Read 済み。`front-react-recruit/src/App.css`）:

| 用途 | 実値 | 出典 |
|---|---|---|
| ヘッダー背景 | `linear-gradient(110deg, #f4fbfa, #fff8ef)` | `front-react-recruit/src/App.css:29` |
| ブランド文字 / `Recruit` | `#0b594f` / `#e8710a` | `front-react-recruit/src/App.css:32-33` |
| 主色（ピル枠・塗り） | `#0b7668`、文字色 `#0b665b` | `front-react-recruit/src/App.css:46` / `:60` |
| カード | 枠 `#e0e0e0` / 角 8px / 13px | `front-react-recruit/src/App.css:387-391` |
| 選択中カード | 枠 `#c5221f` + 内側1px | `front-react-recruit/src/App.css:396-397` |
| 主 CTA | 枠・文字とも `#e8710a`、角 4px | `front-react-recruit/src/App.css:455-457` |
| 副導線 | `#0b665b` の下線リンク、最低高さ 44px | `front-react-recruit/src/App.css:473-479` |
| 本文 / 補助 / ヒント | `#333` / `#555` / `#888` | `front-react-recruit/src/App.css:12` / `:434` / `:444` |
| フォント | `'Hiragino Kaku Gothic ProN', 'Noto Sans JP', Meiryo, sans-serif` | `front-react-recruit/src/App.css:11` |

---

## 3. 問題点

### 3.1 再訪の動機が構造的に無い 📄✅

📄 先行文書 §3.2-3 が「会員登録促し（保存する / 続きから）の導線なし」を未達として挙げている。
✅ 本調査でも `front-react-recruit/src/App.jsx:622-841` の描画部に、
再訪を促す要素（保存・通知・続きから）は 1 つも無いことを確認した。

現状の持ち帰り手段は `条件を共有`（URL コピー）だけで、
これは**利用者が自分で URL を保管する**ことを前提にしている。

**求人は「見た時点では出会っていない」ことが多い。** 探した週に条件に合う求人が無ければ、
その人は二度と戻ってこない。日経の「フォロー」が解いているのは、まさにこの
「良いものが出るまで待てない」問題である。

### 3.2 溜めているイベントを誰も読めない 📄

§2.1-D のとおり。放置期間が延びるほど「見られないデータ」だけが増える
（📄 先行文書 §4.7 の C-4 欄が同じ懸念を明記している）。

### 3.3 空白時の逃がし先が無い ⚠

⚠ 先行文書 §3.3(a) は「初期表示が全国か、結果のある範囲か」が文書間で食い違っており
**未解決**であると記録している（同 §6.2 Q2 が未回答）。
どちらであっても、**初回訪問者に見せるべき「最初の 1 件」を決める仕組みは無い**。
日経が「今日の10本」で埋めている枠が、job_map には存在しない。

### 3.4 添付の仕組みをそのまま持ち込むと過剰になる点（設計上の注意）

- 日経の **18 時バッチ**は、計算コストだけでなく**編集部が中身を点検できる**ことが理由と読める。
  job_map には編集者がいないため、**決定論ルールならリクエスト時に計算してよい**。
  バッチ生成を模倣すると、運用対象（失敗時の再実行・監視）が増えるだけになる。
- 日経の**フォロワー数表示**は社会的証明として効くが、job_map の母数は桁が違う。
  `1人` と出る状態は逆効果になりうる。**件数を出すなら「この条件の求人◯件」（在庫数）**に置き換える方が
  意味を持つ。⚠ ただし実データの分布は未確認（§7）。

---

## 4. 改修要件（推奨3案）

### 4.1 3案の一覧

3 案は独立して実装できる。依存関係は「A ⊃ 通知」「B は A の前提を作る」程度で、順序の強制はない。

| 案 | 内容 | 日経での対応 | 新規テーブル | 求職者にとっての価値 | 主なコスト |
|---|---|---|---|---|---|
| **A** | 条件フォロー（保存した条件）＋新着通知 | フォロー追加 / 最新 | 1〜2 | 「良い求人が出たら教えてくれる」 | 通知経路（メール本人確認） |
| **B** | 続きから（最近見た会社・比較の永続化） | 閲覧履歴 / 保存記事 | 0〜1 | 「前回の続きから探せる」 | 小（既存資産の読み出し） |
| **C** | 条件プロファイル起点のおすすめ | 今日の10本 | 0 | 「最初の1件が出てくる」 | 中（ルール設計） |

**優先の推奨は A → B → C。** 理由は §4.5 の照合表に書く。

---

### 4.2 案A: 条件フォロー（保存した条件）＋新着通知

#### 狙い
探した条件を名前付きで残し、新しい求人が入ったときに知らせる。§3.1 に直接効く。

#### FR-A1: 条件を保存する（サーバ保存・匿名のまま）

- 保存する内容は**現在の絞り込みの値そのもの**
  （`prefecture` / `municipality` / `occupation` と `FILTER_DEFS` の 3 トグル）。
  これは `front-react-recruit/src/lib/bboxQuery.js:12-27` の `buildBboxQuery` が
  組み立てているクエリと**同じ語彙**にする。**新しい語彙を発明しない**。
- 識別子は既存の `visitor_key` を使う（`front-react-recruit/src/lib/locationSearchState.js:141`）。
  **新しい ID 体系を作らない。**
- 保存先は新規テーブル `SavedSearch`（`visitor_key` / `filters_json` / `label` /
  `created_at` / `last_notified_at`）。既存 `LocationSearchHistory`
  （`back/recruit_index/models.py:183-226`）と**同じ流儀**（`visitor_key` + 複合インデックス）にそろえる。
- ⚠ 地図の表示範囲（bbox）を保存対象に含めるかは**未確定**（§6 Q2）。
  含めると「見ていた範囲」を再現できるが、範囲は連続値なので新着判定の条件に使いにくい。

#### FR-A2: 保存した条件を出す

- 置き場所はシート内の最上部（比較バーと同じ面）。
  `front-react-recruit/src/components/CompanyList.jsx:258` の `{compareBar}` と同じ位置に、
  同じ `sticky` の作りで置く（`front-react-recruit/src/App.css:96` の `.jm-compare-bar` が手本）。
  **地図の上に浮かせない**——`front-react-recruit/src/App.jsx:671-675` のコメントが
  「帯として積むと地図が下へ押し出される」ことを実測付きで戒めている。
- 各条件には**その条件で今ヒットする件数**を添える（フォロワー数ではない。§3.4）。

#### FR-A3: 新着を知らせる

- 判定は `RecruitJobIndex.indexed_at`（`back/recruit_index/models.py:89`）が
  `last_notified_at` より新しく、保存条件に一致する行があるか。
  **`indexed_at` は索引の再構築でも動く**ため、⚠ 「新着」の定義を
  「索引に入った日時」にしてよいかは要確認（§6 Q3）。求人の公開日そのものではない。
- 通知先メールの取得は**既存の応募前相談と同じ本人確認フロー**を使う。
  `back/recruit_index/models.py:254-283` の `ConsultationThread` が
  `STATUS_AWAITING_VERIFICATION` / `verification_token_digest` /
  `verification_token_expires_at` を既に持っている。**同じ形にそろえ、新方式を作らない。**
- メール未登録でも FR-A1 / FR-A2 は成立する（再訪時に自分で見に来る形）。
  **通知は付加価値であり、保存機能の前提条件にしない。**

#### 非機能
- 保存件数の上限を決める（⚠ 未確定・§6 Q2）。上限が無いとフィードも通知も破綻する。
  参考: 日経の公開情報上の実例はキーワード 10 件・保存記事 3,000 件。
- throttle は既存方針にそろえる。📄 先行文書 §3 問題5 が
  「`NavigatorAnonThrottle`（60/min）を地図イベント・検索履歴・ロボプレビューが共有していて
  枠を食い合う」と記録しているため、**保存 API を既存 scope に相乗りさせない**。

---

### 4.3 案B: 続きから（最近見た会社・比較の永続化）

#### 狙い
すでに溜めているものを読み出すだけで、再訪時の初手が変わる。§3.2 に効く。

#### FR-B1: 「前回の続きから」を出す
- 2 回目以降の訪問時、シート最上部に直近に見た会社拠点を数件出す。
- 第一段階はサーバ不要（localStorage）で成立する。
  比較選択が既に localStorage に置かれている（📄 先行文書 §2.2.2）ので**同じ置き場に足す**。

#### FR-B2: サーバ側の読み出し口（C-4 の最小実装）
- `MapDiscoveryEvent`（`back/recruit_index/models.py:173-180`）を
  `visitor_key` 単位で読み出す API を足す。
- ⚠ **現状 `MapDiscoveryEvent` に `visitor_key` 列は無い**
  （✅ `back/recruit_index/models.py:173-180` を Read して確認。`session` FK と
  `company_hash` / `location_key` / `metadata_json` / `occurred_at` のみ）。
  端末をまたいで読むには列追加かセッション経由の解決が要る。
  **既存テーブルへの列追加は `.claude/skills/README.md` が言及する P22 の対象**であり、
  移行手順を要件に含める必要がある。

#### FR-B3: 比較の永続化
- `front-react-recruit/src/App.jsx:776-785` の `compareKeys` は現状ページ内 state として扱われている。
  再訪時に復元する。⚠ 復元してよいかは判断が要る（前回の比較を勝手に復活させると
  「消したはずのものが戻る」と読まれうる）。**§6 Q2 に含める。**

---

### 4.4 案C: 条件プロファイル起点のおすすめ

#### 狙い
初回訪問・0 件時の空白を埋める。§3.3 に効く。

#### FR-C1: 「最初の1件」を決める
- 入力は既存の未来条件プロファイル（§2.1-F）と、あれば FR-A1 の保存条件。
- ルールは決定論。`NavigatorRecommendation`（`back/recruit_index/models.py:141-154`）が
  `rule_version` / `reason_json` を持つのと**同じ形**で理由を残す。
- **AI を呼ばない。** ✅ 先行文書 §2.4 が「`back/recruit_index/` 配下に `send_to_ai` /
  `IntentGateway` / `pii_masker` / `TrustLevel` は 1 件も無い（grep 実測 0 件）」と記録しており、
  ここに AI を持ち込むと `CLAUDE.md` の AI 機能ルール一式（Intent 契約・TrustLevel・PII・監査ログ）が
  丸ごと必要になる。**決定論で足りる要件に AI を入れない。**

#### FR-C2: 提示のしかた
- 日経の「注目記事1本＋見出しリスト」に相当する**枠（スロット）方式**にする。
  枠ごとに違うロジック（在庫が多い / 新着 / 条件に近い）を混ぜられる。
- **バッチ生成にしない**（§3.4）。リクエスト時に決定論で計算する。
- 根拠を必ず添える（「◯◯市 × 介護 で ◯件」）。
  日経が「日経ID登録情報から」と根拠を出し「変更する」を置いているのと同じ構造にする。

---

### 4.5 調査の順位表 ⇔ 要件での扱い（照合表）

`.claude/skills/requirements.md`「要件定義完了条件 6」に従い、調査で評価した項目の
**全件**に要件での扱いを割り当てる（空欄が 1 つでもあれば未完成）。

| 調査での項目 | 調査での評価 | 要件での扱い |
|---|---|---|
| 再訪の動機が無い（§3.1） | 最優先。先行文書も未達として明記 | **案A（FR-A1〜A3）** |
| イベントが読めない（§3.2） | 放置するほど損が増える | **案B（FR-B2）**。C-4 の最小実装として合流 |
| 空白時の逃がし先が無い（§3.3） | 効果は大きいが前提（初期表示の食い違い）が未解決 | **案C（FR-C1〜C2）**。⚠ 先行文書 §6.2 Q2 の回答に依存 |
| フォロワー数の表示 | 母数が桁違いで逆効果になりうる | **スコープ外**（理由: §3.4。件数を出すなら在庫数に置換） |
| 18時バッチ生成 | 日経の事情（編集の点検）に依存 | **スコープ外**（理由: §3.4。決定論ならリクエスト時計算で足りる） |
| 「話題のトピック」（急上昇） | `LocationSearchHistory` の集計で作れる | **スコープ外**（理由: 母数が読めず、算出式の妥当性を検証できない。§7 の実測後に再評価） |
| 表記揺れの吸収 | 必要 | **作らない**。`OccupationCode.keywords`（`back/recruit_index/models.py:25`）が既にある |
| 認証基盤 | 必要に見えた | **作らない**。既存 `visitor_key` を使う（§2.1-C） |

### 4.6 検証設計（FR ⇔ テスト ⇔ 壊れ方）

| FR | 検証するテスト | FR が壊れたときの落ち方 |
|---|---|---|
| FR-A1 | `back/recruit_index/tests/` に保存 API のテストを追加 | 保存語彙が `buildBboxQuery` とずれると、保存した条件で再検索した件数が保存時と一致せず落ちる |
| FR-A2 | `front-react-recruit/src/lib/__tests__/` に純関数テスト | 件数の算出が絞り込みと別経路になると、表示件数と実際のカード数が食い違って落ちる |
| FR-A3 | 新着判定の単体テスト | `indexed_at` の意味を取り違えると、**再構築のたびに全件が新着になり**通知が全条件へ飛ぶ。境界（再構築直後に新着 0 件）で落とす |
| FR-B1 | 純関数テスト（並び・件数の上限） | 上限が効かないと履歴が無限に伸びる。11 件目を入れて 10 件のままであることで落とす |
| FR-B2 | API テスト | `visitor_key` の絞りが抜けると**他人の閲覧履歴が返る**。別 `visitor_key` の行を混ぜて件数が増えることで落とす |
| FR-C1 | ルールの単体テスト | 決定論でなくなると同入力で順位が変わる。同一入力 2 回で同一出力を検査する |
| 全 FR（フロント） | `.github/workflows/react-apps-build.yml` の `recruit-unit` **明示列挙**への追記 | 📄 先行文書 §4.2 のとおり、列挙漏れのテストは**存在しても CI で 1 件も実行されず緑のまま素通り**する |

---

## 5. 影響範囲・リスク

### 5.1 変更対象（案A を実装する場合の想定）

| # | ファイル | 変更理由 | 種別 |
|---|---|---|---|
| 1 | `back/recruit_index/models.py` | `SavedSearch` 追加 | 修正 |
| 2 | `back/recruit_index/views.py` | 保存 API | 修正 |
| 3 | `back/recruit_index/urls.py` | ルート追加（`back/recruit_index/urls.py:38-63` の並びに合わせる） | 修正 |
| 4 | `front-react-recruit/src/lib/apiClient.js` | 保存 API クライアント。**裸の `fetch(` を書かない**（既存ラッパー経由） | 修正 |
| 5 | `front-react-recruit/src/components/CompanyList.jsx` | 保存した条件の行（`{compareBar}` と同じ面） | 修正 |
| 6 | `front-react-recruit/src/App.jsx` | 保存ボタンの配置と state | 修正 |
| 7 | `.github/workflows/react-apps-build.yml` | 追加テストの**明示列挙** | 修正 |

⚠ この表は案A のみ・想定である。案の確定後に `grep` で全使用箇所を再特定する
（`.claude/skills/README.md` 禁止事項10）。

### 5.2 リスク

| # | リスク | 対策 |
|---|---|---|
| R-1 | **匿名 ID にメールを結び付けると、`visitor_key` が「匿名」でなくなる** | `back/recruit_index/models.py:197` は `visitor_key` を「氏名・メール・生住所は持たない」と定義している。通知メールは別テーブルに置き、**この定義を壊さない**。壊す設計にするなら定義側のコメントも同時に直す |
| R-2 | 端末をまたげない（localStorage 前提） | 仕様として明示する。`front-react-recruit/src/components/FutureProfilePanel.jsx:97` と**同じ調子の告知文**を出す（新しい言い回しを作らない） |
| R-3 | 通知が「求人が無いのに飛ぶ / 大量に飛ぶ」 | FR-A3 の `indexed_at` の意味を確定させる（§6 Q3）。頻度上限を要件に含める |
| R-4 | 📄 jsdom に映らないレイアウト崩れ（先行文書 R-2 が過去 6 件の実例を記録） | 見た目に触る変更は実ブラウザ検査（`recruit-map-layout`）で見る。⚠ 対象ルートは `#/` のみ |
| R-5 | 追加テストが CI に登録されず走らない | `grep -n "<追加したテスト名>" .github/workflows/*.yml` が 0 件でないことを確認 |
| R-6 | 外部オリジンを増やすと本番だけ無音でブロックされる | 📄 先行文書 §5.1 のとおり `nginx/default.conf` の CSP は `connect-src` が `'self'` と `api.maptiler.com` のみ。**通知メール等で外部 SaaS を足すなら CSP 追記が必須** |

### 5.3 耐障害性（Fool Proof / Fail Safe）

- 保存の取り消し（削除）を必ず用意する。`back/recruit_index/models.py:183-226` の
  検索履歴には既に削除 API がある（`front-react-recruit/src/lib/apiClient.js:144`
  `deleteLocationSearchHistory`）。**同じ形にそろえる。**
- 二重送信防止（保存ボタンの連打）を入れる。
- 保存に失敗したときに**無音にしない**。📄 先行文書 §2.3.3 のとおり、この領域は
  「無音フォールバック禁止」（P9d）が hook で機械強制されている。
- ⚠ 通知メールの配信失敗時に利用者へ何を見せるかは未設計（§7）。

---

## 6. 質問事項（ユーザー確認）

> `.claude/skills/README.md`「質問の出し方」に従い、以下は**会話本文でも `AskUserQuestion` として提示する**。
> 本章だけに書いて回答待ちにしない。

| # | 質問 | 何が決まらないと困るか |
|---|---|---|
| **Q1** | 3 案のうちどれを実装するか（複数可・順序） | 対象ファイル・新規テーブルの有無が変わる。**回答まで実装に入らない** |
| **Q2** | 案A の細目: ①保存に地図の範囲(bbox)を含めるか ②保存件数の上限 ③案B の比較選択を再訪時に復元してよいか | ①はデータ構造、②は API とフィードの設計、③は「消したものが戻る」体験の可否 |
| **Q3** | 「新着」の定義を `RecruitJobIndex.indexed_at` としてよいか。索引の夜間再構築でも更新される値である | 通知の発火条件そのもの。取り違えると再構築のたびに全通知が飛ぶ |

**Q1〜Q3 の回答を待たずに進められるもの**: 本文書の §2（現状調査）は確定済みで、
どの案を選んでも再利用できる。

---

## 7. 未確認事項（本文書が断定していないこと）

- **実画面の見た目・実機挙動**。本調査はコードの読解のみ。⚠ `hr-monster.io` への
  外向き通信が本セッションの egress プロキシで遮断されており、スクリーンショットは取得していない
- 本番データの分布（保存条件に何件ヒットするか、職種・エリアの偏り）。
  📄 先行文書 §3.3(c) のとおり、首都圏データ充足率の SQL は**未実行**のまま
- `MapDiscoveryEvent` に実際どの `event_type` が何件溜まっているか（DB 未参照）
- 通知メールの送信基盤に何を使うか（既存の応募・相談のメール経路を流用できるかは未調査）
- `front-react-recruit/src/App.css` のうち Read で確認したのは 1-100 / 380-479 行。
  それ以外の値（チップ・シート・ロボ顔・相談 CTA・ピルバー）は **grep で内容を確認したが Read していない**

---

## 8. 出典一覧

**コード（✅ Read 済み）**
`back/recruit_index/models.py`（全体）/ `back/recruit_index/views.py:405-459` /
`back/recruit_index/urls.py:38-63` / `front-react-recruit/src/App.jsx:600-842` /
`front-react-recruit/src/lib/bboxQuery.js`（全体）/
`front-react-recruit/src/components/CompanyList.jsx`（全体）/
`front-react-recruit/src/App.css:1-100, 380-479`

**先行文書（📄）**
`docs/job_map/2026-09/job_map_current_spec_and_improvement_requirements.md`（2026-09-08・確定）

**適用スキル**
`.claude/skills/README.md` / `.claude/skills/requirements.md` / `docs/DOCUMENT_NAMING_CONVENTION.md`
