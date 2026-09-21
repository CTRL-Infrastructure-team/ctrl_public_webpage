# Nuxt 3 移行インベントリ

カットオーバー前の機能固定とバックアップ手順。検索バーは現行どおり移行対象外。

## 公開ページ（URL維持）

| URL | 権限 | データ | 備考 |
|---|---|---|---|
| `/` | 公開 | `/api/situations`、FAQ固定文 | ヒーロー4枚 + News + Twitter |
| `/report` | 公開 | `/api/situations` | 9件ページネーション |
| `/currentSituations/:id` | 公開 | `/api/situations/:id` | 画像・本文 |
| `/progress` | 公開 | `/api/pastworks` | 9件ページネーション |
| `/pastWorks/:id` | 公開 | `/api/pastworks/:id` | 旧IDリダイレクトあり |
| `/inquiry` | 公開 | `POST /api/mail` | メール + Discord |
| `/login` | 公開 | `POST /api/login` | 成功後 `/edit/management` |
| `/publication/recentTopics` | 公開 | `/api/publication/recent-topics` | |
| `/publication/pastTerms` | 公開 | `/api/publication/past-terms` | |
| `/publication/pastTopicList/:id` | 公開 | term + term topics | |
| `/publication/slideList/:id` | 公開 | topic + slides | 空URLスライドは非表示 |

## 部内ページ（要ログイン）

| URL | 操作 |
|---|---|
| `/edit/management` | 投稿・管理への導線、ログアウト |
| `/edit/createReport` | 活動報告作成（画像1枚必須） |
| `/edit/createWork` | 作品作成（トップ1・その他2・zip1） |
| `/edit/reportList` | 自分の活動報告の編集・削除 |
| `/edit/workList` | 自分の作品の編集・削除 |
| `/edit/situations/:id` | 活動報告更新（ファイル未選択なら既存維持） |
| `/edit/works/:id` | 作品更新（ファイル未選択なら既存維持） |

未ログインのページアクセスは `/login`、投稿APIは 401。

## API

公開（GET）

- `/api/situations`, `/api/situations/:id`
- `/api/pastworks`, `/api/pastworks/:id`
- `/api/publication/recent-topics`, `/api/publication/past-terms`
- `/api/publication/terms/:id`, `/api/publication/terms/:id/topics`
- `/api/publication/topics/:id`, `/api/publication/topics/:id/slides`
- `/api/images/:user/:file`, `/api/games/:user/:file`（DBに保存済みURLのためパス維持）

認証

- `POST /api/login`, `POST /api/logout`, `GET /api/me`

要ログイン

- `POST /api/situations`, `PUT|DELETE /api/situations/:id`, `GET /api/user/situations`
- `POST /api/pastworks`, `PUT|DELETE /api/pastworks/:id`, `GET /api/user/pastworks`

問い合わせ

- `POST /api/mail`（バリデーション・レート制限）

移行しない: `/api/pastworksearch`

## CLI（`scripts/`）

- `create-user.mjs` … `user_data.json` からユーザ作成
- `publication/create-topic.mjs` / `create-slide.mjs` / `create-term.mjs`
- `publication/export-json.mjs` / `import-json.mjs`
- `show-users.mjs` / `show-situations.mjs` / `show-pastworks.mjs`

## カットオーバー

staging で主要機能の確認が終わったら [cutover.md](/docs/cutover.md) に従って進めます。概要:

1. `feature/nuxt3-migration` を **`master` へマージ**（PR）
2. **`home.tcu-ctrl.jp` の A レコードだけ** 新 VPS へ（ネームサーバは変更しない）
3. 新 VPS で **`master`** を pull → build → **certbot**
4. **`WHOIS_IMG`** は DNS + HTTPS 後（`public/og-twitter.jpg` 推奨）
5. 旧 foruthia で **ホームページのみ停止**

環境変数（`.env`、git に入れない）:

- `NUXT_SESSION_SECRET`（32文字以上）
- `DATABASE_URL`
- `NUXT_DISCORD_URL`（問い合わせ。staging で確認済み想定）
- `NUXT_SENDER_EMAIL_ADDRESS` / `NUXT_SENDER_EMAIL_PASSWORD` … **未使用なら空**
- `WHOIS_IMG` … **切替後**。空でもサイトは動作する
- `NUXT_DATA_DIR`（空なら `server/data`）

切り戻し: DNS の A レコードを旧サーバへ戻す。旧サーバは Nuxt 2 の `master` と `forever` のまま残しておく。新 VPS のコードは GitHub が正なので、サーバ独自のソース修正は残さない。
