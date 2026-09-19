# ローカル開発環境構築

Windows / macOS / Linux 共通です。Node.js 22 を使います。

## 1. 必要なソフトウェア

- Git
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)（MariaDB 用）
- Node.js 22（[nvm](https://github.com/nvm-sh/nvm) または [nvm-windows](https://github.com/coreybutler/nvm-windows)）
- Yarn: `npm install -g yarn`

## 2. セットアップ

```bash
git clone https://github.com/CTRL-Infrastructure-team/ctrl_public_webpage.git
cd ctrl_public_webpage
nvm install
nvm use
cp .env.example .env
```

`.env` の `NUXT_SESSION_SECRET` は32文字以上のランダム文字列に変更してください。

```bash
docker compose up -d
yarn install
yarn prisma migrate dev
```

ローカル用ユーザを作成します。

```bash
cp scripts/user_data.example.json scripts/user_data.json
# scripts/user_data.json を編集
node --env-file=.env scripts/create-user.mjs
```

開発サーバ:

```bash
yarn dev
```

ブラウザで `http://localhost:3000` を開きます。
