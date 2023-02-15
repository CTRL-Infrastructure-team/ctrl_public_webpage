# 進捗スライド公開手順

## 公開手順

1. 部員からPowerointファイルを送信してもらう
2. GoogleDriveにPowerPointファイルを保存する
3. ローカルプロジェクトの`/api/manualControllers/publication`に移動する
4. `topic_data_example.json`と`slide_data_example.json`をコピーして、それぞれファイル名を`topic_data.json`と`slide_data.json`に変更する。

```
copy topic_data_example.json topic_data.json
copy slide_data_example.json slide_data.json
```

5. `topic_data.json`の内容を以下のように書き換える。
    - date : 部会を行った日時に書き換える。（月や日が1桁の場合は数字の頭に0を付ける）
    - title : 部会のテーマ（第n回進捗発表、芸術プログラミン具コンテスト、etc...）
    - explanation : 部会テーマについての説明を書く
6. `slide_data.json`の内容を以下のように書き換える。
    - name : 部員のハンドルネーム
    - grade : 部員の学年
    - slide : （後述）
7. Googleドライブに保存したPowerPointファイルをダブルクリックしてGoogleスライドで開く
8. ファイル > WEBに公開 > 公開 を選択し、表示されたURLを`slide_data.json`の`slide`にコピーする。これをすべての部員・スライドに対して行う。
9. `slide_data.json`のURLの`/pub?`となっている部分をすべて`/embed?`に変更する。（ctrl+Fの置換を使うと便利）
10. `slide_data.json`を保存する。
11. scpコマンドで`topic_data.json`と`slide_data.json`をサーバに転送する。
(この作業は後でbatファイルを作ると便利)
12. サーバにアクセスし、`/home/.../ctrl_public_webpage/api/manualControllers/publication`に移動し、
createTopic.jsとcreateSlide.jsを順に実行する
13. サーバの接続を切って[https://home.tcu-ctrl.jp/publication/recentTopics](https://home.tcu-ctrl.jp/publication/recentTopics)にアクセスし、進捗スライドが公開されているか確認する。

## トピックのアーカイブ化

coming soon...

## setting.jsonの仕組み

coming soon...
