# ユーザの作成方法

`api/manualControllers/users`配下に`user_data.json`を作成してください。

ファイルを開いて以下の通り記載します。

```bash
[
    {
      "username": "hoge",
      "password": "hoge",
      "twitter_id": "@hoge"
    }
]
```

保存後、`api/manualControllers/users`にて以下のコマンドを実行します。

```bash
node createUser.js
```
