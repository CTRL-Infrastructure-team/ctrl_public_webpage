# 進捗スライド公開手順

## 公開手順

1. 部員からPowerointファイルを送信してもらう
2. GoogleDriveにPowerPointファイルを保存
3. ローカルプロジェクトの`/api/manualControllers/publication`に移動
4. `topic_data_example.json`と`slide_data_example.json`をコピーし、それぞれファイル名を`topic_data.json`と`slide_data.json`に変更
5. `topic_data.json`の内容を以下のように書き換え
    - date : 部会を行った日時（月や日が1桁の場合は数字の頭に0を付ける）
    - title : 部会のテーマ（第n回進捗発表、芸術プログラミングコンテスト、etc...）
    - explanation : 部会テーマについての説明
6. `slide_data.json`の内容を以下のように書き換え
    - name : 部員のハンドルネーム
    - grade : 部員の学年
    - slide : （後述）
7. Googleドライブに保存したPowerPointファイルをダブルクリックしてGoogleスライドで開く
8. ファイル > WEBに公開 > 公開 を選択し、表示されたURLを`slide_data.json`の`slide`にコピーする。これをすべての部員・スライドに対して行う
9. `slide_data.json`のURLの`/pub?`となっている部分をすべて`/embed?`に変更する（ctrl+Fの置換を使うと便利）
10. `topic_data.json`、`slide_data.json`を保存
11. scpコマンドで`topic_data.json`と`slide_data.json`をサーバに転送（この作業はbatファイルを作ると便利）
12. サーバにアクセスし、`/home/.../ctrl_public_webpage/api/manualControllers/publication`に移動し、`createTopic.js`と`createSlide.js`を順に実行
13. サーバの接続を切って[https://home.tcu-ctrl.jp/publication/recentTopics](https://home.tcu-ctrl.jp/publication/recentTopics)にアクセスし、進捗スライドが公開されているかを確認

## トピックのアーカイブ化

活動期数が変わった場合、トピックを過去の活動期間に設定します。

1. ローカルプロジェクトの`/api/manualControllers/publication`に移動
2. `term_data_example.json`をコピーし、ファイル名を`term_data.json`に変更
3. `term_data.json`の内容を以下のように書き換え
    - term : 活動期数
    - term_name : "n期 CTRL"
    - start_date : 活動開始日
    - end_date : 活動終了日
4. scpコマンドで`term_data.json`をサーバに転送
5. サーバにアクセスし、`/home/.../ctrl_public_webpage/api/manualControllers/publication`に移動し、`createTerm.js`を実行

## setting.jsonの仕組み

- `createTopic.js`を実行すると`seting.json`が更新され、トピックのidが保存されます。`createSlide.js`では、`setting.json`のidを参考にしてトピックとスライドを関連付けます。
- 最新でないトピックにスライドを追加する場合は、データベースのトピックのidを参考に`setting.json`のidを変更したうえで`createSlide.js`を実行してください。
