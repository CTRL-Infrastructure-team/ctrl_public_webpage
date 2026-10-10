# ユーザの作成方法（サーバ）

通常の管理人作業は [ユーザの作成方法](/docs/createUser.md)（`transfer.bat`）を使ってください。ここでは、サーバ上で同じ処理を直接行う場合の手順です。

`scripts/user_data.example.json` をコピーして `scripts/user_data.json` を作成します。この JSON は gitignore です。パスワードをコミットしないでください。

```json
[
  {
    "username": "hoge",
    "password": "hoge",
    "twitter_id": "@hoge"
  }
]
```

保存後、プロジェクトルートで実行します。`.env` の `DATABASE_URL` が必要です。

```bash
node --env-file=.env scripts/create-user.mjs
```

本番サーバでは、サイトのディレクトリに `scripts/user_data.json` を置いてから同じコマンドを実行します。

```bash
cd /var/www/home.tcu-ctrl.jp
node --env-file=.env scripts/create-user.mjs
```

DB に行が増えるだけなので、`yarn build` は不要です。同じ `username` を何度も実行するとユーザが重複します。作業後はサーバ上の `scripts/user_data.json` を削除してください。
