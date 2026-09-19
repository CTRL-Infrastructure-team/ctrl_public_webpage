# ユーザの作成方法

`scripts/user_data.example.json` をコピーして `scripts/user_data.json` を作成します。

```json
[
  {
    "username": "hoge",
    "password": "hoge",
    "twitter_id": "@hoge"
  }
]
```

保存後、プロジェクトルートで実行します。

```bash
node --env-file=.env scripts/create-user.mjs
```
