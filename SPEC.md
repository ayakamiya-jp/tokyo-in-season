# SPEC: Tokyo in Season — Visual Redesign

参照元:
- レイアウト全体の型: [coffeecollective.dk](https://coffeecollective.dk/)（split hero / product grid / footer構成）
- フォント: [sakazuki.io](https://sakazuki.io/)（Adobe Fonts経由。Hagrid-black / Neue Haas Grotesk / Futura PTを使用。Google Fontsに存在しないため、下記「フォント」節で無料の近似フォントに置き換える）
- 記事カードの並び方: [assemblycoffee.co.uk/blogs/news](https://assemblycoffee.co.uk/blogs/news)（フィーチャー記事1点＋グリッドの構成、画像上の日付/タグ重ね表示）

**確定した方向性:「Bold Editorial」**（3案のモックアップから採用）。全面写真に極太タイポグラフィを重ねる sakazuki 寄りの大胆な表現を軸に、Price Index のデータを大きな数字で見せる「data spread」、Compare Table を色面ブロックで見せる構成、Decision guides は写真フルブリード＋グラデーションスクリム＋テキストオーバーレイで統一する。以下のセクション構成はこの確定案（モックアップB）の仕様であり、実装時はこの通りに作る。

このファイルは実装者（AI）向けの実装粒度の仕様書。既存の色トークン名（`sumi` / `matcha` / `sakura` / `warm-white` / `warm-gray` など、`tailwind.config.mjs`）は流用し、値のみ調整する。既存コンポーネント（`HeroImage.astro` / `EmailCapture.astro` / `ComparisonTable.astro` / `AffiliateButton.astro` 等）は再利用し、スタイルのみ更新する。新規ページ・新規コンテンツの追加は範囲外（`PROJECT_SPEC.md` のコンテンツ計画に従う）。

---

## 1. Design Direction

### コンセプト
**「Product-Grade Editorial」** — 情報ブログではなく、上質なプロダクトブランドのECサイトのように見せる。1つ1つの茶道体験を「厳選された商品」として扱い、太い見出しタイポグラフィと大判写真の対比だけで「今すぐ選びたくなる」確信を演出する。装飾は足さず、レイアウトの余白とグリッドの規律で高級感を作る。

### トーン（〜ではなく〜）
- 「かわいい和風」ではなく「静かな高級感」
- 「セリフ体の伝統的な上品さ」ではなく「太いサンセリフの現代的な確信」
- 「情報の羅列」ではなく「編集されたプロダクトのような自信」
- 「真っ白な清潔感」ではなく「グレーがかった落ち着いた余白」
- 「装飾的な和柄・罫線」ではなく「写真とタイポグラフィの対比だけで魅せる抑制」

### カラースキーム
ベースは白／ベージュ／グレー、アクセントはピンク（sakura系）と緑（matcha系）。ベースは現行の `warm-white`（#FAF8F4、クリーム寄り）から、よりグレーに寄せた値へ調整する。

ピンクは複数回の調整を経て現在の形になっている: ①現行の `sakura-deep`（#B87068、オレンジ寄りのテラコッタ）→クールトーン化で#AD6B84（色相337°）に変更したが「紫すぎる」と指摘 →②色相345°付近まで戻した#BD6E82に調整 →③この段階でCTAボタンの黒文字が見えづらいと指摘され、塗り背景専用に暗くした#A14C68(sakura-cta)を新設し白文字に統一 →④それでも「まだ紫っぽい」と再度指摘があり、ayaka自身の提案で**塗り背景を思い切って明るいパステルピンクにし、文字を黒に戻す**方向へ転換。最終的に塗り背景(`sakura-cta`)は淡いパステルピンク(#F2A8BC)+黒文字、テキスト用途(`sakura-deep`)は彩度を保った濃いめのローズ(#BC5C6F、色相348°)、という二層構成に決着した。パステルは明度が高いため紫に見えにくく、黒文字とのコントラストも非常に高い(12:1程度)。

```js
// tailwind.config.mjs — colors を以下の値で更新
colors: {
  sumi: '#2A2A27',            // 現行 #1A1A1A から一段柔らかいウォームグレー寄りの黒に変更
  'sumi-soft': 'rgb(42 42 39 / 0.7)', // 本文用（現行の text-sumi/70 相当を明示トークン化）

  matcha: '#3D5A3E',          // 変更なし（グリーンアクセント・主）
  'matcha-light': '#7A9E7E',  // 変更なし（グリーンアクセント・副）

  'warm-white': '#F4F3EF',    // ベース背景。クリーム(#FAF8F4)からグレー寄りに変更
  surface: '#FFFFFF',         // 新規: カード・フォームの前景面
  'warm-gray': '#ECEAE4',     // セクション区切り・淡い背景。わずかにグレー寄りに調整
  'warm-gray-mid': '#6B655C', // メタ情報・キャプション（現行より気持ち濃く、可読性維持）
  border: '#D9D5CC',          // 新規: カード枠線・罫線専用トークン

  sakura: '#E8C9D0',          // 変更: クールトーンのダスティピンクに変更（旧 #E8BFB8）。バッジ・タグの文字色やラベルなど「地の上のテキスト」用
  'sakura-light': '#FCF2F5',  // 変更: クールトーンの淡いピンクに変更（旧 #FDF0ED）。カード背景アクセント
  'sakura-deep': '#BC5C6F',   // 変更: クールトーンのローズピンクに変更（旧 #B87068、色相348°）。テキスト・下線・アイコンなど「塗りではない」ピンク用
  'sakura-cta': '#F2A8BC',    // 新規: CTAボタン・バッジなど「塗り背景」専用の明るいパステルピンク（下記ルール参照）
  'sakura-cta-ink': '#1D1C19', // 新規: sakura-cta の上に乗せる文字色（常に黒に近い暗色）

  'legal-gray': '#727272',    // 変更なし（WCAG AA確保のフッター法務文言用）
}
```

ダークモード用の値（`prefers-color-scheme: dark` / `[data-theme="dark"]`）も同じ方向でクールトーンに統一する:
```
--pink (dark):        #DE8698  (旧 #E39089 — 暗背景での視認性を保ちつつローズ寄りに。テキスト用)
--pink-soft (dark):    #4B3035  (旧 #4A3330 — バッジ背景の下地に使う淡いトーン)
--pink-tint (dark):    #302128  (旧 #33241F — カード背景アクセント)
--pink-cta (dark):     #F2A8BC  (ライトモードと同じ値。パステルは明度が高いため、暗いページ背景の上でもはっきり浮き上がる)
--pink-cta-ink (dark): #1D1C19  (ライトモードと同じ、常に暗色)
```

**使い分けルール:**
- ピンク（sakura系）＝「予約・行動喚起」専用。CTAボタン、価格・バッジ、フォーム送信ボタン。
- 緑（matcha系）＝「情報・信頼」専用。テキストリンク、hover状態、著者・データ関連の強調。
- ベース（白・ベージュ・グレー）が画面面積の9割を占める。1セクション内でピンクと緑を同時に主役にしない（どちらか一方のみをアクセントにする）。
- `sumi` は地の黒として1色のみ使用し、階調は opacity（`sumi-soft` = 70%）で表現する。グレーを別途新規で足さない。
- **ピンクの「塗り背景」トークン（`sakura-cta`）と「テキスト用」トークン（`sakura-deep`）を分ける。** CTAボタン・バッジなど、ピンクを面として塗る要素は必ず `sakura-cta`（明るいパステルピンク）+ `sakura-cta-ink`（暗色文字）の組み合わせを使う。ラベル・下線・アイコンなど、ピンクを文字色や線として使う要素は `sakura-deep`（濃いめのローズ、地の背景や写真の上でも視認できる濃度）を使う。
  - 経緯: 当初 `sakura-deep` 1色を塗り背景と文字色の両方に流用しようとしたが、「黒文字だとやや見えづらい」というフィードバックを受けて検証したところ、中明度のピンクは黒文字5.7:1・白文字3.7:1とどちらの文字色でも決定打に欠けた。塗り背景専用に暗くした`#A14C68`+白文字へ一度切り替えたが、「まだ紫っぽい」という指摘を受け、方針を転換: 塗り背景を思い切って明るいパステル（`sakura-cta` #F2A8BC）にして黒文字（`sakura-cta-ink`）に戻したところ、コントラストが12:1程度まで上がり、色味も紫に見えにくくなった。CTAボタンのhoverは `sakura-cta` → `sakura-deep`（濃いめのローズ、文字色は黒のまま）で、はっきりした変化を出す。
  - 今後ピンク塗りの新規要素を追加する際は、必ず `sakura-cta` + 暗色文字の組み合わせに従う（塗り背景に白文字を使わない）。

### フォント
sakazuki.io は Adobe Fonts（Typekit kit `kjx0ubx`）経由で `hagrid-black`（weight 900の極太見出し）／`neue-haas-grotesk-display` `neue-haas-grotesk-text`（本文〜サブ見出し）／`futura-pt` `futura-pt-bold`（ラベル・ナビ）を使用しており、**セリフ体は一切使われていない**。これらは有料フォントでGoogle Fontsには存在しないため、無料フォントで近い質感を再現する。

| 役割 | フォント | ウェイト | 参照元の代替対象 |
|---|---|---|---|
| ページ／セクション見出し（H1・H2、hero大見出し） | **Bricolage Grotesque** | 800 | `hagrid-black` (900) |
| カード見出し（H3） | **Bricolage Grotesque** | 700 | `hagrid` / `neue-haas-grotesk-display` |
| 本文・説明文 | **Inter**（現状維持） | 400 / 500 | `neue-haas-grotesk-text` |
| ラベル・ナビ・バッジ・メタ情報（日付等） | **Jost**（全て大文字＋字間） | 500 | `futura-pt` |
| 和文（ロゴの補助漢字表記のみ。本文は英語のみのため和文本文フォントは不要） | **Zen Kaku Gothic New** | 700 | — |

**使い分けルール:**
- `font-serif`（Cormorant Garamond）ユーティリティは全面撤去し、`font-display`（Bricolage Grotesque）に置き換える。サイト内にセリフ体は残さない。
- H1: Bricolage Grotesque 800、字間 `-0.01em`、行間 `1.05`。
- H2: Bricolage Grotesque 800、字間 `-0.005em`、行間 `1.1`。
- H3（カードタイトル）: Bricolage Grotesque 700、行間 `1.2`。
- 本文: Inter 400、行間 `1.6`。
- ボタン・ナビ・バッジ・日付/更新頻度などのメタ情報: Jost 500、`letter-spacing: 0.08em`、`text-transform: uppercase`。
- Google Fonts の読み込みを `BaseLayout.astro` の `<link href="https://fonts.googleapis.com/css2?...">` で以下に更新:
  `family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Inter:wght@400;500;600&family=Jost:wght@500`

---

## 2. セクション構成

### グローバル: ヘッダー
```
┌──────────────────────────────────────────────────────────────────┐
│  TOKYO IN SEASON                     Compare   Price Index  About │
│  (Bricolage 800, 18px)               (Jost 500, 13px, uppercase,  │
│                                        letter-spacing .08em)       │
└──────────────────────────────────────────────────────────────────┘
```
- **コピー:** ロゴ文言「Tokyo in Season」（変更なし）。ナビ「Compare」「Price Index」「About」（変更なし、表記のみ大文字トラッキングに変更）。
- **インタラクション:** ナビ項目hoverで下線が左から右に描画（`transform: scaleX(0)` → `scaleX(1)`、200ms ease-out、色は `sakura-deep`）。現行のunderline常時表示はやめ、hover時のみ描画に変更。
- **実装注意:** `sticky top-0` は維持。スクロール後に `bg-warm-white/90 backdrop-blur` に切り替え、下に `border-border` を1px。モバイルはハンバーガー不要（項目3つのみのため）、横並びのまま `text-xs` に縮小して維持（現行の `hidden sm:flex` は廃止し常時表示）。

---

### Section 1: Hero
全面写真＋巨大タイポの重ね表現。Coffee Collective の split hero 案は不採用。sakazuki の極太見出しの確信度を、写真の上に直接載せることで最大化する。

```
┌──────────────────────────────────────────────────────────────────┐
│ [ index-hero.jpg フルブリード背景、object-fit:cover ]               │
│ karuta cards on tatami                                              │
│                                                                       │
│                                                                       │
│                                                                       │
│                    (下方向へのグラデーションスクリム:                 │
│                     transparent 8% → rgba(20,19,16,.5) 52%           │
│                     → rgba(20,19,16,.88) 100%)                       │
│                                                                       │
│  JAPANESE CULTURE, IN ITS RIGHT SEASON                               │
│  (Jost 500, 12px, uppercase, tracked, color: sakura-soft)            │
│                                                                       │
│  Tokyo                                                                │
│  in Season                                                            │
│  (Bricolage Grotesque 800, 42px→102px 可変, leading:.94,             │
│   letter-spacing:-.015em, color: #F9F7F2)                            │
│                                                                       │
│  Tea ceremony experiences in Tokyo,   [ Compare experiences → ]      │
│  compared and priced by an Urasenke   Price Index →                  │
│  practitioner who actually practices. (テキストリンク, 白, 下線)      │
│  (Inter 400, 17px, color: rgba(249,247,242,.88))                     │
└──────────────────────────────────────────────────────────────────┘
```
- **レイアウト構造:** `height: 58vh`（`min-height: 340px`、`max-height: 620px`）のフルブリードセクション。当初 `min-height: 88vh` で画面のほとんどを覆っていたところ「1/3くらいにしてほしい」→ 実際には「1/3じゃなくて2/3」と訂正があり、旧88vhの約2/3にあたる58vhに調整した。画像は `position:absolute; inset:0; object-fit:cover`。見出し・本文・CTAは画像下部に重ねて配置(`display:flex; align-items:flex-end`)。heroが低くなった分、見出しの文字サイズも比例して縮小: 640px以上で4.6rem、1024px以上で6.4rem まで段階的に拡大(旧: 6.2rem/8.4rem)。本文とCTA行はH1の下、`flex-wrap`で狭い画面では折り返す。
- **コピー（確定文言）:**
  - Eyebrow: `Japanese culture, in its right season`
  - H1: `Tokyo` 改行 `in Season`（2行に分けて大きく見せる）
  - Body: `Tea ceremony experiences in Tokyo, compared and priced by an Urasenke practitioner who actually practices.`
  - Primary CTA: `Compare experiences →`（リンク先 `/tokyo-tea-ceremony-compared`、塗りボタン: 背景 `sakura-cta`(パステルピンク)、文字は暗色 `sakura-cta-ink`）
  - Secondary link: `Price Index →`（リンク先 `/tokyo-tea-ceremony-price-index`、白文字、下線）
- **インタラクション:** ページロード時、画像は静止(パララックスなし)。テキストブロックは `opacity 0→1` + `translateY(12px)→0`、400ms、ease-out、遅延なし。IntersectionObserver対象外(heroは常に即表示)。CTAボタンhoverで背景が `sakura-cta`(パステル) → `sakura-deep`(濃いめのローズ)に変化、200ms。文字色は暗色のまま変えない。
- **実装注意:** 現行 `<h1 class="font-serif ...">` を `font-display font-extrabold` に置換。グラデーションスクリムは `::after` 疑似要素で実装し、画像そのものにフィルターをかけない(画像の色調を保つため)。heroが低くなった分、スクリムの開始位置も8%からと早め、終了濃度も.88とやや強めにして、短い縦幅でもテキストの可読性を確保する。ダークモード(`prefers-color-scheme: dark` / `[data-theme="dark"]`)でもスクリムの色は変更不要(常に暗い方向のグラデーションのため、そのままで機能する)。
  - **クロップ位置の調整経緯:** heroを58vh→88vhから縮小した際、`object-fit: cover`が横長の箱を埋めるために縦方向を強くクロップし、「拡大しすぎ」に見える状態になった。加えて埋め込み画像が長辺1000px・quality68まで圧縮されていたため画質も甘かった。対策として (1) 画像を長辺1800px・quality82で再書き出しし、(2) heroの高さを64vhへ少し戻してクロップ量自体を緩和し、(3) `object-position: center 78%` を指定した。78%という値は、`index-hero.jpg`内の「清少納言」の札(画面下寄り中央、縦位置およそ48〜84%の範囲)が枠内にしっかり収まるよう、実際に複数のクロップ位置(42%/65%/80%)を書き出して目視確認した上で選定したもの。今後この画像や同種の全面写真セクションの構図を調整する際は、同様に候補を複数出力して確認してから`object-position`を決める。

---

### Section 2: メール登録バー
現行の中央寄せカード（`EmailCapture.astro`）を、hero直下に置く高コントラストな薄い帯に変更。淡いピンクではなく、地の黒に近い `ink` 背景で hero からの余韻を受け止める。

```
┌──────────────────────────────────────────────────────────────────┐
│ 背景: var(--ink)（ライトモードは #2A2A27 相当、ダークモードは更に  │
│ 暗い #0F0E0C）                                                     │
│                                                                      │
│  FREE GUIDE (sakura-soft)                                           │
│  Tea Ceremony Etiquette for First-Time Guests                       │
│  (Bricolage 800, 21.6px ← 旧16pxから拡大)                            │
│  The exact do's and don'ts I teach first-time guests — as a         │
│  practising Urasenke student.        [ your@email.com___________ ]  │
│  (すべて生成り色 #F4F3EF系)          [ Send me the guide ]          │
│                                        (Inter 700, 15.2px、          │
│                                         padding大きめ ← 旧13.6px)     │
└──────────────────────────────────────────────────────────────────┘
```
- **コピー:** 見出しは現行より短縮し `Tea Ceremony Etiquette for First-Time Guests`（「Get the free guide:」の接頭辞はラベル「FREE GUIDE」に役割を譲るため省略）。本文・ボタン文言・fine printは現行 `EmailCapture.astro` の文言を流用。
- **レイアウト構造:** 背景 `ink`（暗色）の全幅帯。内側テキストは白文字(`#F4F3EF`前後)。左にコピー、右にフォームの横並び(`md:`以上)、モバイルは縦積み。角丸なし、フルブリード。
  - **サイズ調整の経緯:** 初期モックでは見出し16px・ボタン13.6pxと控えめすぎ、「Free guideの字が小さすぎてCVRが下がりそう」というフィードバックを受けた。見出しを21.6px・font-weight 800に、ボタンを15.2px・paddingも拡大(`.6rem 1.2rem`→`.8rem 1.5rem`)して視認性を上げた。このEmailバーはトップページ・記事ページ・Aboutページの全てで共通利用するため、この調整は3ページ全てに反映する。
- **インタラクション:** input は `border: 1px solid rgba(244,243,239,.25)`、focus時にボーダーを `sakura` に変更。ボタンhoverで背景が `sakura-cta`(パステル) → `sakura-deep`(濃いめのローズ)へ変化、200ms。文字色は暗色のまま変えない。
- **実装注意:** `EmailCapture.astro` の背景色・文字色をダーク版に切り替えるバリアント(`variant="dark"`のようなprops追加、または直接この用途専用にスタイルを差し替え)が必要。フォーム送信ロジック(Buttondown連携)は変更しない。この帯は暗色のため、サイト内で唯一 `ink` を背景として使うセクションになる — 多用しない(hero直下のみ)。

---

### Section 3: The Index（データスプレッド）＋ Compare block
Price Index（サイトの中核データ資産）を、カードに収めず「大きな数字そのもの」で見せる。写真は主役ではなく小さな添え物に格下げし、データの説得力をタイポグラフィで作る。Compare Table はその下に、写真なしの色面ブロックとして対比的に配置する。

```
── THE INDEX ─────────────────────────  UPDATED QUARTERLY · Q3 2026

┌────────────────────────────────────┬────────────────────────────┐
│ MEDIAN PRICE, TRACKED ACROSS        │  ¥850–¥20k   30%            │
│ 20 VENUES (Jost, sakura-deep)       │  Full range  Offer chairs   │
│                                       │  (Bricolage 800, 32px each, │
│ ¥6,300                               │   tabular-nums)             │
│ (Bricolage Grotesque 800,            │                              │
│  56px→88px 可変, tabular-nums)       │  80%         ¥4,620         │
│                                       │  English     Asakusa median │
│ Prices range from ¥850 for a garden  │  [ price-index-hero.jpg ]   │
│ teahouse bowl of matcha to ¥20,000   │  横長サムネイル(16:7)、       │
│ for a private ceremony — the only    │  茶筅・茶碗側(右寄り)を表示   │
│ public dataset of its kind.          │                              │
│ (Inter 400, 16px)                    │                              │
│                                       │                              │
│ [ View the full Index → ]            │                              │
│ (sakura-cta 塗りボタン、暗色文字)      │                              │
└────────────────────────────────────┴────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ 背景: sakura-tint の色面ブロック(写真なし)                          │
│ BEST FIRST STOP  (バッジ: 塗りsakura-cta背景、暗色文字)              │
│ All Tokyo Experiences Compared  (Bricolage 800, 34px)               │        [ Open the table → ]
│ Side-by-side table: price, area, chairs available, kimono add-on,   │        (sakura-cta 塗りボタン、暗色文字)
│ group vs private.  (Inter 400, 16px)                                 │
└──────────────────────────────────────────────────────────────────┘
```
- **コピー（確定文言、実データより算出）:**
  - セクション見出し: `The Index` / メタ `Updated quarterly · Q3 2026`
  - ラベル: `Median price, tracked across 20 venues`
  - 大数字: `¥6,300`(現行ロジックの `median` 変数をそのまま大きく表示。数値は四半期ごとに動的更新)
  - 本文: `Prices range from ¥850 for a garden teahouse bowl of matcha to ¥20,000 for a private ceremony — the only public dataset of its kind.`
  - サブ統計4つ: `¥850–¥20k`(Full price range) / `30%`(Offer chairs) / `80%`(English support) / `¥4,620`(Asakusa median) — いずれも `tokyo-tea-ceremony-price-index.astro` の既存計算ロジック(`minPrice`/`maxPrice`/`pctChairs`/`pctEnglish`/`areaMedians`)から取得する動的値。
    - **表記についての経緯(最終的に元の表記へ差し戻し):** 一時的に「20kという省略表記をやめ、`¥850 ~ ¥20,000`のように両方に¥を付けて`~`の両側にスペースを入れる」表記を試した。しかし文字数が増えた分、(a) フォントサイズを縮小すると他の3統計と大きさが揃わなくなり、(b) サイズを2remのまま`<br>`で2行に折り返すと今度は2×2グリッドの行の高さが揃わなくなる、という2つの対応がいずれも「気になる」と指摘され、最終的に**元の`¥850–¥20k`という1行・省略形の表記に戻した**。4統計とも1行に収まり2remで揃うことを、表記の厳密さより優先する。今後この統計セルに長い値を入れる場合は、まず値そのものを短く保てないか(省略表記や単位変更)を検討し、`<br>`による2行化や個別フォントサイズ縮小には頼らない。
  - CTA: `View the full Index →`
  - Compareブロック: バッジ `Best first stop` / 見出し `All Tokyo Experiences Compared` / 本文 `Side-by-side table: price, area, chairs available, kimono add-on, group vs private.` / ボタン `Open the table →`
- **レイアウト構造:** `lg:` で2カラム(1.3fr / 1fr)。左に大数字+説明+CTA、右にサブ統計2×2グリッド+サムネイル画像(`price-index-hero.jpg`、フッター帯と同じ高解像度素材を再利用)。`lg:`未満は1カラムに積む(数字→サブ統計→サムネイルの順)。Compareブロックは全幅の色面ボックス(`sakura-tint`背景、`border-radius:4px`、`padding:2.75rem`)、`md:`以上でテキストとボタンを横並び、それ未満は縦積み。
  - **サムネイルの形状:** 当初9rem四方の正方形にしていたところ、「中心ではなく茶筅など右側の道具が見えるように」というフィードバックがあった。正方形×中央クロップでは画面中央の鉄瓶(黒く地味な部分)しか映らないため、横長の長方形(`aspect-ratio: 16/7`、`max-width: 18rem`、右カラム幅いっぱいまで伸びる`width: 100%`)に変更し、`object-position: 82% 55%` で茶筅・茶碗・棗のある右側にフレームを寄せた。
- **インタラクション:** セクション全体、画面内に入ったタイミングで fade-up。大数字・サブ統計にホバーインタラクションは付けない(データは静的な事実として提示、装飾しない)。CTAボタンは共通のホバー仕様(背景色遷移)に従う。
- **実装注意:** 大数字表示には `font-variant-numeric: tabular-nums` を必須指定(桁揃え)。現行の `IndexBadge.astro` はこのセクションの「Updated quarterly · Q3 2026」メタ表記に統合できないか確認し、重複表示を避ける。Compareブロックは画像を使わないため、既存の `compared-hero.jpg` はこのセクションでは不使用になる(Decision guidesなど他箇所での再利用を検討)。
  - **サイズ調整の経緯:** 当初 `¥6,300` を56px→88pxよりさらに大きい80px→128pxで表示していたが、「大きすぎる」というフィードバックで56px→88pxへ縮小した。記事ページの質問番号(3.75rem=60px)と近いスケール感になり、サイト全体で「大きな数字」の強さが均一になった。

---

### Section 4: Decision guides（記事グリッド）
Assembly Coffee の「フィーチャー記事1点＋グリッド」という構成の骨格は踏襲しつつ、カードの見せ方は Section 1 の hero と同じ語彙（写真フルブリード＋グラデーションスクリム＋テキストオーバーレイ）に統一する。画像の上にバッジを乗せるのではなく、画像そのものにテキストを溶け込ませる。

```
── DECISION GUIDES ──────────────────────────────  5 guides

┌──────────────────────────────────────────────────────────────────┐
│ [ wagashi-trio.jpeg フルブリード、height:22rem ]                    │
│                        (下方向グラデーションスクリム)                │
│                                                                       │
│                                        SWEETS (Jost, sakura-soft)   │
│                                        Wagashi 101: The Sweets       │
│                                        Served at Tea                 │
│                                        (Bricolage 800, 32px, 白)     │
│                                        Namagashi vs higashi,         │
│                                        kōhaku-tō, and how to eat     │
│                                        them properly.                │
│                                        Read the guide →              │
└──────────────────────────────────────────────────────────────────┘

┌─────────────────────┬─────────────────────┬─────────────────────┐
│ [questions-hero]      │ [area-comp-hero]      │ [private-vs-group]   │
│ aspect 4:5, スクリム   │ aspect 4:5             │ aspect 4:5            │
│                        │                        │                       │
│           BOOKING      │           AREAS       │           GROUPS      │
│           10 Questions │           Asakusa vs   │           Private vs  │
│           to Ask       │           Ginza vs     │           Group:      │
│           Before You   │           Omotesando   │           Which to    │
│           Book         │                        │           Book?       │
│           The questions│           Price,       │           When the    │
│           behind almost│           atmosphere,  │           extra cost  │
│           every bad    │           and depth    │           is worth it │
│           review.      │           compared.    │           — and when  │
│           Read the     │           Read the     │           it isn't.   │
│           guide →      │           guide →      │           Read the    │
│                        │                        │           guide →     │
└─────────────────────┴─────────────────────┴─────────────────────┘
┌─────────────────────┐
│ [seiza-hero]           │
│ aspect 4:5             │
│           SEATING      │
│           Best         │
│           Ceremonies   │
│           If You Can't │
│           Sit Seiza    │
│           Chair-friendly│
│           options for  │
│           knee or back │
│           issues.      │
│           Read the     │
│           guide →      │
└─────────────────────┘
```
- **コピー:** 各カードのタイトル・本文は現行 `index.astro` の文言を流用。新規追加は各カードの一言タグのみ、内容に即した実在のトピック名を使う(連番やジャンル外の飾りラベルにしない):
  - Wagashi 101 → `Sweets`
  - 10 Questions to Ask Before You Book → `Booking`
  - Asakusa vs Ginza vs Omotesando → `Areas`
  - Private vs Group → `Groups`
  - Best Ceremonies If You Can't Sit Seiza → `Seating`
  - 各カード末尾に `Read the guide →`（テキストリンク、白文字）
- **レイアウト構造:** 5件中「Wagashi 101」を全幅フィーチャーカード（`height: 22rem`、テキストは右寄せ・下寄せ）として単独表示。残り4件は `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` のグリッド(3列)に流し込む — 4件を3列グリッドに入れると1行目3件・2行目1件になる(4列グリッドにはしない。3列の方が個々のカードの写真を大きく見せられるため)。全カード共通でアスペクト比4:5、`position:relative`、画像は `position:absolute; inset:0; object-fit:cover`、テキストは `position:absolute; bottom; left; right` でスクリムの上に重ねる。
- **インタラクション:**
  - カード画像: hoverで `scale(1.05)`、400ms ease-out。
  - グリッド全体はスクロールで画面に入った時点でfade-up、カードごとに60msずつ遅延(stagger)。
  - `Read the guide →` テキストリンク: hoverで矢印が4px右に移動(150ms)。
- **実装注意:** 現行の `grid sm:grid-cols-3`(等価3枚グリッド)を「フィーチャー1件＋3列グリッド」に変更するため、`index.astro` 内の配列を `[featured, ...rest]` に分割するロジックを追加する。各カードのグラデーションスクリムは hero と同じ `::after` 疑似要素パターンを共通化し、コンポーネント化する(例: `src/components/PhotoCard.astro` として新規切り出しを検討)。写真の被写体が暗すぎる/明るすぎる場合、スクリム濃度をカードごとに微調整できるようCSS変数化しておく。

---

### Section 5: About the author（プルクオート）
現行の引用ストリップを、大きな引用符＋太字の一言に絞ったプルクオート形式に変更。Bold Editorialのトーンに合わせ、著者の言葉そのものを見出し級の扱いにする。

```
────────────────────────────────────────────────────────────────────
  "
  (Bricolage Grotesque 800, 64px, color: sakura-deep)

  Most "best tea ceremony" lists are written by people who
  went once. Every experience I recommend is one I'd send
  my own guests to.
  (Bricolage Grotesque 700, 24px, line-height:1.3, max-width:44rem,
   color: sumi)

  — Suzu, Urasenke practitioner in Tokyo · More about me →
  (Inter 600, 14px, color: matcha, hover:underline)
────────────────────────────────────────────────────────────────────
```
- **コピー:** 現行の文章から、事実説明的な前半（"This site is run by Suzu, a Tokyo-based Urasenke tea ceremony student. I started this because..."）を落とし、引用として力のある後半二文だけを抜き出す: `Most "best tea ceremony" lists are written by people who went once. Every experience I recommend is one I'd send my own guests to.` 著者情報とリンクは引用の下に小さく `— Suzu, Urasenke practitioner in Tokyo · More about me →` としてまとめる。
- **レイアウト構造:** `border-top` と `border-bottom` で挟んだ帯（`padding: 3rem 0`）。引用符は装飾ではなく最初の行として大きく表示し、続けて太字のプルクオート本文。
- **インタラクション:** 追加なし（静的テキスト）。
- **実装注意:** このセクションのみ本文を `font-display`（Bricolage Grotesque 700）で組む——他の本文はInterだが、ここは「著者の肉声」を見出し級の説得力で見せるための例外。引用符のカラーはピンク（`sakura-deep`）を使い、ページ内で唯一「ピンク＝装飾的アクセント」として使う箇所にする（他は原則ピンク=CTA専用というルールの例外だが、装飾要素が引用符1文字のみのため許容する）。

---

### Section 6: フッター画像帯
初期案では `index-footer.jpg`（茶碗のアップ、丸い被写体）を280〜320px高の帯で使っていたが、横に極端に長い帯で丸い被写体をobject-fit:coverすると被写体が判別しづらくなる（「画像がよくわからない」というフィードバック）。既存4案＋Unsplashで新たに探した3案、計7案（A〜G）を実際の帯の比率でクロップした比較ページを作って提示し、ayakaが選定。**採用: 候補D = `price-index-hero.jpg`**（鉄瓶・茶筅・茶碗のフラットレイ、tatami上）。この写真はもともと横長（実測比率 約3:1）で、鉄瓶が中央左、茶筅・茶碗・棗が右側にバランス良く配置された構図のため、帯へのクロップに強い。

```
┌──────────────────────────────────────────────────────────────────┐
│  [ price-index-hero.jpg を高解像度で再書き出ししたもの — 全幅、       │
│    height: 26vw（min 280px, max 440px）、object-fit:cover,          │
│    object-position: center 55% ]                                    │
│  An iron kettle, bamboo whisk, and chawan bowls arranged on tatami  │
└──────────────────────────────────────────────────────────────────┘
```
- **コピー:** 追加テキストなし（alt文言のみ）。
- **レイアウト構造:** 角丸なし、左右フルブリード。高さはビューポート幅に対して可変(`height: 26vw`、`min-height: 280px`、`max-height: 440px`)。この写真はすでに横長構図で被写体が画面全体にバランス良く分布しているため、`object-position` は `center 55%`（ほぼ中央）で十分。
- **画像選定基準（今後の差し替え時にも適用）:** 円形・正方形に近い被写体（茶碗のアップなど）単体は避け、水平方向に伸びる構図の写真を選ぶ——横長の帯でクロップされても主題が判別できることを優先する。
- **実装注意:** `price-index-hero.jpg` は元々カード用に長辺900px程度へ圧縮していたため、フルブリードの帯で使うには解像度不足。帯専用に長辺1500px・quality74程度で書き出し直した素材を使う（Astro実装時は `astro:assets` の `<Image>` に `widths`/`sizes` を設定し、レスポンシブ対応する）。同じ素材をSection 3のIndexサムネイルでも使い回しているため、参照する`<Image>`インスタンスを共通化できないか検討する。
- **インタラクション:** なし（静的画像）。

---

### グローバル: フッター
Coffee Collective のマルチカラム構成を、このサイトの規模に合わせて3カラムに縮小して採用。

```
┌──────────────────────────────────────────────────────────────────┐
│  TOKYO IN SEASON          EXPLORE            LEGAL                 │
│  (Bricolage 700, 16px)    (Jost 500, 11px,    (Jost 500, 11px,     │
│                             uppercase)          uppercase)          │
│  Japanese culture, in     Compare              Disclaimer           │
│  its right season —       Price Index          Privacy              │
│  from inside the tea      About                Sitemap              │
│  room.                                                               │
│  (Inter 400, 13px)                                                  │
│                                                                       │
│  ──────────────────────────────────────────────────────────────    │
│  © 2026 Tokyo in Season · Written by Suzu, an Urasenke              │
│  practitioner in Tokyo                                               │
│  Some links are affiliate links — we may earn a small commission    │
│  at no extra cost to you.                                            │
│  (Inter 400, 11px, color: legal-gray)                                │
└──────────────────────────────────────────────────────────────────┘
```
- **コピー:** 全文言、現行 `BaseLayout.astro` の値をそのまま使用。新規追加は「EXPLORE」「LEGAL」の列見出しラベルのみ。
- **レイアウト構造:** `grid-cols-1 sm:grid-cols-3` の3カラム。1列目にロゴ＋タグライン、2列目にサイト内ナビ、3列目に法務系リンク。下部に区切り線＋著作権・アフィリエイト開示文を横幅いっぱいに配置（現行の縦積みリストから変更）。
- **インタラクション:** リンクhoverで `color: sakura-deep`（Bold Editorial方向に合わせ、フッターのアクセントは緑ではなくピンクに統一。ヘッダーナビも同様に hover色を `sakura-deep` に揃える）。
- **実装注意:** `BaseLayout.astro` の `<footer>` 内マークアップを3カラムgridに再構成。ニュースレター再掲は行わない（Section 2で既に登録導線があるため、フッターでの重複CTAは追加しない）。

---

## 3. 記事ページテンプレート
既存の `ArticleLayout.astro` を使う全ての記事(decision guide / pillar記事)に適用する共通テンプレート。実データとして「10 Questions to Ask Before You Book a Tea Ceremony in Tokyo」の内容でモックアップ済み。

```
┌──────────────────────────────────────────────────────────────────┐
│ [ questions-hero.jpg フルブリード、height:42vh(min280/max440px) ]   │
│                    (下方向グラデーションスクリム、hero節と同じ設計) │
│  BOOKING GUIDE (Jost, sakura-soft)                                  │
│  10 Questions to Ask Before You Book a Tea Ceremony in Tokyo        │
│  (Bricolage 800, 30px→42px可変, 白)                                 │
└──────────────────────────────────────────────────────────────────┘
                    (以下 max-width: 42rem, 中央寄せの読み物カラム)

  July 11, 2026 · Some links are affiliate links — we may earn a
  small commission at no extra cost to you.  (Inter 400, 13px, legal-gray)

┌──────────────────────────────────────────────────────────────────┐
│ QUICK ANSWER (Jost, sakura-deep)                                    │
│ Before booking, confirm seating, what's included, solo pricing,     │
│ group size, and tea room vs. studio.                                │
│ (Bricolage Grotesque 700, 1.35rem — 太字の要点)                      │
│ Most disappointments trace back to one of these ten questions       │
│ nobody asked. All ten below — with data from all 18 venues in our   │
│ Tokyo Tea Ceremony Price Index.                                      │
│ (Inter 400, .92rem, ink-70 — 補足情報として一段小さく)                │
│ (背景 sakura-tint、border: 1px solid border、border-radius: 4px、    │
│  左罫線なし — ホームページのCompareブロックと同じ色面ブロック仕様)    │
└──────────────────────────────────────────────────────────────────┘

  I've reviewed every bookable tea ceremony in Tokyo, and here's the
  pattern behind bad reviews...  (Inter 400, 16px, line-height 1.75)

  ┌──────┬─────────────────────────────────────────────────────────┐
  │  01  │ Are chairs available — and do I need to request them?    │
  │      │ (Bricolage 800, 24px→26px可変)                            │
  │(Brico│ Only 4 of 18 Tokyo venues publicly confirm chairs, but    │
  │ lage │ most can arrange them if you ask at booking, not on      │
  │ 800, │ arrival. ...                                              │
  │ 44px→│                                                            │
  │ 60px,│                                                            │
  │sakura│                                                            │
  │-deep,│                                                            │
  │tabula│                                                            │
  │r-nums│                                                            │
  └──────┴─────────────────────────────────────────────────────────┘
  ...(02〜05まで同じ2カラム構成で繰り返し)...

  ──────────────────────────────────────────────────────────────
  Data from the Tokyo Tea Ceremony Price Index, checked July 2026,
  updated quarterly.  (Inter 400, 14px, 上に罫線)

┌──────────────────────────────────────────────────────────────────┐
│ FREE GUIDE (sakura-soft)               [ your@email.com_______ ]    │
│ Tea Ceremony Etiquette for First-Time  [ Send me the guide ]        │
│ Guests                                                               │
│ (背景 ink の帯、hero直下の帯と同じデザイン言語。ただしここでは       │
│  角丸4pxの独立ブロックとして記事幅に収める)                          │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ (S)  WRITTEN BY (Jost, ink-mid)                                     │
│      Suzu  (Bricolage 800, 18px)                                    │
│      Urasenke-trained tea ceremony practitioner based in Tokyo. ...│
│      Learn more about my practice →  (matcha)                       │
└──────────────────────────────────────────────────────────────────┘
```
- **コピー:** 各記事の実文言をそのまま使用(タイトル・本文・FAQ等は記事ごとに異なる、確定文言は各記事の既存原稿に従う)。共通要素のラベルのみ新規: `Quick Answer`、著者カードの `Written by`。
- **レイアウト構造:**
  - Hero: セクション1(トップページhero)と同じ設計(全面写真+グラデーションスクリム+テキストオーバーレイ)だが、高さは46vh(min320/max480px)とトップページの64vhよりさらに低い——記事ページは読み物であり、heroは「今何の記事か」を一目で示す役割に留める。見出しサイズは640px以上で3.4rem(=約54px)、640px未満で2.2rem。
  - 本文カラムは `max-width: 48rem` に固定し、中央寄せ。
    - **初回モックでは42remにしていたが、「もう少し横幅広い方が良い」というフィードバックで48remへ拡大した。** 併せて「路線に違和感はないが参考サイトのテイストが十分反映されていない」という指摘もあり、単なる横幅調整に留めず、後述の質問リストへ太い数字を導入するなど参照元(sakazuki)の確信度をより強く持ち込む変更を行った。
  - Quick Answerブロック: `sakura-tint`背景+`border: 1px solid border`+`border-radius: 4px`。**左太罫線(アクセントバー)は使わない** — 一度左罫線付きのカード(左に4px→6pxの`sakura-deep`罫線)にしたところ「雰囲気がずれている」と指摘され、ホームページのCompareブロック(Section 3)と同じ「色面ブロック、罫線なし」の語彙に統一した。中身も「回答の要点だけを`Bricolage Grotesque 700, 1.35rem`の太字1〜2文で見せ、補足情報は`.fine`クラス(`Inter 400, .92rem`)で一段小さく続ける」という構成にし、GEO用の要約ブロックとしての役割と、太字見出し的な視覚的インパクトを両立させる。
    - コピー例: 太字部分 `Before booking, confirm seating, what's included, solo pricing, group size, and tea room vs. studio.` / fine部分 `Most disappointments trace back to one of these ten questions nobody asked. All ten below — with data from all 18 venues in our Tokyo Tea Ceremony Price Index.`
  - **質問リストは大きな数字(sakazuki寄り)で見せる。** 当初は普通の`<h2>1. Are chairs available...</h2>`という地味な見出しだったが、これが「参考サイトのテイストが反映されていない」と感じられた一因。2カラムグリッド(`.q-item`: 数字5rem幅 / 本文1fr)に変更し、`01`〜`05`を`Bricolage Grotesque 800`・`sakura-deep`色・`tabular-nums`で3.75remの大きさで表示、本文側にH2(見出し。数字を含まない)+説明文を置く。この記事は実際に「10の質問」という順序を持つ内容のため、数字を大きく見せることはデータ性の高さを演出する正当な表現であり、単なる装飾的な連番ではない——順序性のないコンテンツ(Wagashi 101等)では、この大数字パターンを流用しない。
  - 著者カード: `AuthorBio.astro`を再デザイン。現行の`/favicon.svg`プレースホルダー方式を踏襲しつつ(実在しない著者の顔写真は使わない、既存方針通り)、円形のモノグラムバッジ("S"、`sakura-cta`塗り+暗色文字)に置き換えてBold Editorialのタイポグラフィシステムに合わせる。**このモノグラムは変更しない**(既存の合意事項)。
- **インタラクション:** 本文中のリンク(`<a>`)は`matcha`色+下線、hoverで`sakura-deep`に変化。他は Section 1/4 と同じグローバル仕様(fade-up、ボタンhover等)に準拠。
- **実装注意:** `ArticleLayout.astro`のフロントマター(`title`/`description`/`publishDate`/`tags`)はそのまま使い、内部のマークアップのみ更新する。Quick Answerブロックは記事ごとに手動で書いている(`questions-before-booking...astro`独自の実装)ため、共通コンポーネント化を検討してもよい(例: `<QuickAnswer>{...}</QuickAnswer>`)。大数字の質問リストパターンも同様に `<NumberedSection num="01">...</NumberedSection>` のようなコンポーネント化を検討する。FAQブロックがある記事(`FaqBlock.astro`使用ページ)は、質問をdt/dd並びではなく、Quick Answerと似た罫線区切りのリストに統一する。

---

## 4. Aboutページ
`about.astro`。実データ(Suzuの人物エッセイ)でモックアップ済み。記事テンプレートと基本構造は共通だが、対談的な一人称エッセイという性質上、いくつかの点で差別化する。

```
┌──────────────────────────────────────────────────────────────────┐
│ [ about-hero.jpg フルブリード、height:48vh、着物の刺繍が中心に      │
│   来るよう object-position: 60% 45% ]                                │
│  ABOUT (Jost, sakura-soft)                                          │
│  Suzu  (Bricolage 800, 54px→80px可変、白)                           │
└──────────────────────────────────────────────────────────────────┘
                    (max-width: 44rem、記事ページより少し狭い中央カラム)

  My first bowl of matcha was whisked for me when I was in
  kindergarten. ...  (Inter 400, 17px)

  Why this site exists  (Bricolage 800, 27px)
  ...

  How I review  (Bricolage 800, 27px)
  ...

                                              — Suzu
                              (Bricolage 800, 26px, sakura-deep,
                               右揃え、本文末尾の署名)

  ──────────────────────────────────────────────────────────────
  Compare all Tokyo tea ceremonies →    Price Index →
  (matcha、横並びリンク2つ)

┌──────────────────────────────────────────────────────────────────┐
│ FREE GUIDE ...  (記事ページと同じEmailバー)                          │
└──────────────────────────────────────────────────────────────────┘
```
- **コピー:** 現行`about.astro`の本文をそのまま使用(変更なし)。見出しは「About」(hero eyebrow)+「Suzu」(hero H1、現行の"About"というH1をやめて、より人物にフォーカスした見せ方に変更)。
- **レイアウト構造:** 記事テンプレートとほぼ共通(48vh hero、48rem本文カラムだが、Aboutは一人称エッセイのため`max-width`を44remと記事ページより少し狭くし、より読み物として親密な印象にする)。署名「— Suzu」は本文末尾に右揃え・`sakura-deep`色・Bricolage Grotesqueで、記事ページの著者カードとは異なる「本人が書いている」という体裁を強調する。heroの見出し・本文見出し・署名はいずれも記事ページより一段大きいサイズにしており、これも記事ページと同様「参考サイトのテイストをもっと強く」というフィードバックを受けた調整。
- **画像:** `about-hero.jpg`(ピンクの振袖と刺繍帯のクローズアップ、ayaka自身の実写、ストック写真ではない)。刺繍のモチーフ(菖蒲・牡丹・蝶)が48vhの帯の中に収まるよう`object-position: 60% 45%`を指定——本文で語られる「母の着物」というエピソードと画像を直接結びつける、サイト内で最も個人的な写真。
- **著者カードは置かない:** このページ自体が著者紹介なので、`AuthorBio`コンポーネントは表示しない(記事ページとの明確な違い)。
- **インタラクション:** 記事ページと同一の仕様に準拠。
- **実装注意:** 現行の`about.astro`はH1を独立して"About"としているが、新デザインではhero内に統合するため、ページ本文側の重複するH1/pタグ(現行の14-15行目)は削除する。Person schema(JSON-LD)は変更なしでそのまま維持。

---

## 5. グローバルなインタラクション仕様

### スクロールアニメーション
- 手法: `IntersectionObserver`（Astro は静的出力のため、フレームワークを使わずvanilla JSで実装。`BaseLayout.astro` 末尾に1つの `<script>` を追加し、`[data-reveal]` 属性を持つ要素を監視する）。
- 発火条件: `threshold: 0.15`、要素の15%が画面内に入った時点で発火。一度発火したら `unobserve`（スクロールで上下しても再発火・逆再生はしない）。
- アニメーション内容: `opacity: 0 → 1` かつ `transform: translateY(16px) → translateY(0)`。`transition-duration: 500ms`、`transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1)`。
- スタガー: グリッド内の複数要素（Decision guidesのカード群など）は `transition-delay` を `index * 60ms` で付与。
- 例外: Hero セクション（Section 1）は `data-reveal` を付けず、ページロード時に即座にフェードインする専用アニメーションとする（上記Section 1のインタラクション仕様参照）。
- アクセシビリティ: `prefers-reduced-motion: reduce` の場合、`transition` と `transform` を無効化し、要素は常に最終状態（`opacity: 1`, `translateY(0)`）で表示する。

### ホバーエフェクト
- カード画像（Decision guides・data spreadのサムネイル以外の写真要素）: `transform: scale(1.04〜1.05)`、`transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1)`。親要素に `overflow: hidden` を必須設定。
- カードタイトル: Decision guidesのカードは写真の上に白文字で乗っているため、タイトル自体の色は変えない（背景の画像が拡大されることで「反応した」感を出す）。
- テキストリンク（`Read the guide →` 等）: 矢印文字を `<span class="inline-block transition-transform group-hover:translate-x-1">→</span>` として分離し、hover時に4px右へ移動、150ms。
- ボタン（塗りつぶしCTA、背景 `sakura-cta`、文字は常に `sakura-cta-ink` の暗色）: hoverで背景色を `sakura-cta`(パステル) → `sakura-deep`(濃いめのローズ) に `transition: background-color 200ms`。文字色は暗色のまま変えない(黒文字は`sakura-deep`上でも約4.9:1のコントラストを確保できるため)。
- ナビリンク: 下線を `border-bottom` の `scaleX(0)→scaleX(1)` で左→右に描画、200ms ease-out、色は `sakura-deep`。

### ページ遷移
- Astro の View Transitions（`astro:transitions` の `<ClientRouter />`）を `BaseLayout.astro` の `<head>` に追加。
- ヘッダーとフッターには `transition:persist` を付与し、ページ間で再マウントさせない（ちらつき防止）。
- ページ本体（`<main>`）はデフォルトの `fade` トランジション、`duration: 150ms`。
- 新規ページ遷移時、上記スクロールアニメーション用の `IntersectionObserver` は `astro:page-load` イベントで再初期化する（View Transitions使用時はDOMが差し替わるため、`DOMContentLoaded` 単体では発火しない点に注意）。

### レスポンシブの方針
- ブレークポイントは Tailwind デフォルトを使用: `sm: 640px` / `md: 768px` / `lg: 1024px`。新規ブレークポイントは追加しない。
- モバイルファースト。全ての split レイアウト（Hero, Price Indexカード）は `lg:` 未満で「画像→テキスト」の縦積みに変更する。
- Decision guides のグリッドは `grid-cols-1`（〜639px）→ `sm:grid-cols-2`（640〜1023px）→ `lg:grid-cols-3`（1024px〜）。フィーチャーカードは常に全幅1カラム。
- フッターは `grid-cols-1`（モバイルは3ブロック縦積み）→ `sm:grid-cols-3`。
- 画像は全て Astro `<Image>` の `widths` / `sizes` を維持し、レイアウト変更に合わせて再設定する（例: Hero画像は 4:5 トリミング用に新しい `widths` セットを用意）。
