# 使用するツール

## 開発（ローカル）

- Git
- Node.js 22（`.nvmrc`。nvm 推奨）
- Yarn 1.22
- Docker Desktop（MariaDB 10.9）

## 本番サーバ

- Ubuntu + nginx（リバースプロキシ）
- systemd ユニット `home-tcu-ctrl`（`NITRO_HOST=127.0.0.1` ポート 3000）
- MariaDB（アプリ用ユーザ。root では接続しない）
- Node.js 22 / Yarn 1.22
