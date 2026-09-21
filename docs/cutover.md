# 本番切替（home.tcu-ctrl.jp → ConoHa VPS）

新 VPS（`/var/www/home.tcu-ctrl.jp`）への移行手順です。ネームサーバは **変更しません**。`home.tcu-ctrl.jp` の **A レコードだけ** を切り替えます。

## staging で確認済みであること（2026-09 時点）

- 公開ページ（News、作品、活動報告、進捗スライド、画像・zip）
- 問い合わせ → Discord（`NUXT_DISCORD_URL`）
- ログイン後（作品投稿・活動報告・管理画面）

## `.env` の方針（本番）

| 変数 | 切替前 | 切替後 |
|------|--------|--------|
| `DATABASE_URL` | 済（サーバのみ） | そのまま |
| `NUXT_SESSION_SECRET` | 済 | そのまま |
| `NUXT_DISCORD_URL` | 済 | そのまま |
| `NUXT_SENDER_EMAIL_*` | **空で可**（自動返信メール未使用） | 使う場合のみ Gmail アプリパスワード |
| `WHOIS_IMG` | **空で可** | **DNS + HTTPS 後**に設定（下記） |
| `NUXT_DATA_DIR` | 空（`server/data`） | そのまま |

`.env` を変えたら **`yarn build` は不要**（`WHOIS_IMG` だけ例外）。`sudo systemctl restart home-tcu-ctrl` で足ります。

---

## フェーズ A — GitHub（Cursor / 開発者）

1. `feature/nuxt3-migration` を GitHub に push 済みであることを確認
2. **`master` 向け PR** を作成（レビュー: `polyester-CTRL` または `rin-ctrl`）
3. 問題なければ **`master` にマージ**
4. **旧 foruthia では `git pull` しない**（本番は Nuxt 2 のまま残す）

---

## フェーズ B — DNS（管理人・ドメイン権限）

1. 切替直前: 旧サーバと新 VPS で **DB / `server/data/` のバックアップ**（念のため）
2. DNS で **`home.tcu-ctrl.jp` の A レコード** を新 VPS の IPv4（`160.251.137.35`）へ変更
3. 伝播を待つ（数分〜最大 48h）。`dig home.tcu-ctrl.jp +short` で確認

---

## フェーズ C — 新 VPS（sudo が必要）

```bash
ssh ctrl
cd /var/www/home.tcu-ctrl.jp
git fetch origin
git checkout master
git pull --ff-only
yarn install --frozen-lockfile
yarn prisma:deploy
yarn build
sudo systemctl restart home-tcu-ctrl
```

HTTPS:

```bash
sudo certbot --nginx -d home.tcu-ctrl.jp
```

ブラウザで `https://home.tcu-ctrl.jp` を開き、公開ページ・問い合わせ・ログインを再確認。

---

## フェーズ D — `WHOIS_IMG`（DNS + HTTPS 後）

Twitter（X）カード用画像。サイト動作には必須ではありません。

リポジトリに **`public/og-twitter.jpg`** があります（ビルドに依存しない URL）。

```bash
ssh ctrl
cd /var/www/home.tcu-ctrl.jp
nano .env
```

```env
WHOIS_IMG="https://home.tcu-ctrl.jp/og-twitter.jpg"
```

`WHOIS_IMG` は **build 時に HTML に埋め込まれる**ため:

```bash
yarn build
sudo systemctl restart home-tcu-ctrl
```

---

## フェーズ E — 旧サーバ

- **ホームページ**（Nuxt 2 / forever）だけ停止
- **Gitea、フォーラム、DNS（foruthia）** はそのまま

---

## 切り戻し

1. `home.tcu-ctrl.jp` の A レコードを旧 IP に戻す
2. 旧サーバでサイトプロセスを再開
3. 新 VPS は止めても止めなくてもよい（DNS が向いていなければ影響小）

---

## 参考

- 日常の更新: [reboot.md](/docs/reboot.md)
- 問い合わせ Discord: [setInquily.md](/docs/setInquily.md)
- 機能一覧: [migration-inventory.md](/docs/migration-inventory.md)
