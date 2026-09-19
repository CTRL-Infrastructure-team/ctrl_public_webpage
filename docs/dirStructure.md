# ディレクトリ構成

Nuxt 3 標準のディレクトリです。ページは `pages/`、API は `server/api/` にあります。

## フロント

- `pages/` … ファイルベースルーティング
- `components/` … UI・フォーム・進捗発表コンポーネント
- `layouts/` … 共通ヘッダ/フッタ
- `assets/` … 画像、SCSS、FAQ テキスト
- `public/` … favicon、SNS アイコン、WebGL（`public/games/`）
- `middleware/auth.ts` … 管理画面のログイン必須

## サーバ

- `server/api/` … Nitro API
- `server/utils/` … Prisma、認証、ファイル保存
- `server/data/` … アップロードファイル（gitignore）

## その他

- `prisma/` … データベース定義とマイグレーション
- `scripts/` … ユーザ作成、進捗スライド投入、DB閲覧
- `docs/` … 運用・開発ドキュメント
- `nuxt.config.ts` … Nuxt 設定
- `package.json` / `yarn.lock` … 依存関係
- `docker-compose.yml` … ローカル MariaDB
- `.nvmrc` … Node 22
