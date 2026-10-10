# ユーザの作成方法

管理人の `ctrl_web_manager` ディレクトリで行います。引き継ぎと初回の SSH 設定は [Windows 運用ツール](/docs/ctrl-web-manager.md) を参照してください。

サーバにログインしてスクリプトを直接実行する場合は [ユーザの作成方法（サーバ）](/docs/createUserServer.md) です。

## 手順

1. `ctrl_web_manager/user_registration/example/` の例をコピーし、同じ階層に `user_data.json` を作る。（既に `user_data.json` があればそれを編集してOK）
2. 内容を書き換える

```json
[
  {
    //ログインに使う名前。部員のハンドルネームなどを記載。
    "username": "hoge",
    //ログイン用パスワード。管理人がパスワードを考えてここに記載し、後で部員へ個別に通知
    "password": "hoge",
    //X（Twitter）の ID（`@` 付き）。アカウントを持っていなければ空 "" にして設定
    "twitter_id": "@hoge"
  }
]
```


3. `user_registration/transfer.bat` を実行する
4. 黒い画面が「ユーザー作成が完了しました」で終われば成功

同じ `username` を何度も実行するとユーザが重複しますので注意してください。

`user_data.json` にはパスワードが入ります。bat はサーバ上のコピーを削除しますが、PC 上のファイルは自分で削除してください。
