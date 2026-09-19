# ユーザの作成方法

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

本番サーバで作る場合も同じです。

```bash
ssh ctrl
cd /var/www/home.tcu-ctrl.jp
# scripts/user_data.json を置いてから
node --env-file=.env scripts/create-user.mjs
```

DB に行が増えるだけなので、`yarn build` は不要です。同じ `username` を何度も実行するとユーザが重複します。
