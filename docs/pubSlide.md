# 進捗スライド公開手順

Windows の `ctrl_web_manager` で行います。引き継ぎと初回の SSH 設定は [Windows 運用ツール](/docs/ctrl-web-manager.md) を参照してください。

サーバにログインしてスクリプトを直接実行する場合は [進捗スライド公開手順（サーバ）](/docs/pubSlideServer.md) です。

スライド本体はサーバ上のファイルではなく、Google スライドの埋め込み URL（`/embed?`）をデータベースに登録します。

## 公開手順

1. 部員から PowerPoint ファイルを送信してもらう
2. Google Drive に PowerPoint ファイルを保存する
3. `ctrl_web_manager/update_slide/example/` の `topic_data_example.json` と `slide_data_example.json` を、`update_slide/` 直下にコピーし、ファイル名を `topic_data.json` と `slide_data.json` にする。（既にファイルがあればそれを編集してOK）
4. `topic_data.json` を書き換える
    - date : 部会を行った日時（月や日が1桁の場合は数字の頭に0を付ける）
    - title : 部会のテーマ（第n回進捗発表、芸術プログラミングコンテスト、etc...）
    - explanation : 部会テーマについての説明
5. `slide_data.json` を書き換える
    - name : 部員のハンドルネーム
    - grade : 部員の学年
    - slide : （後述）
6. Google ドライブに保存した PowerPoint ファイルをダブルクリックして Google スライドで開く
7. ファイル > WEB に公開 > 公開 を選択し、表示された URL を `slide_data.json` の `slide` にコピーする。これをすべての部員・スライドに対して行う
8. `slide_data.json` の URL の `/pub?` となっている部分をすべて `/embed?` に変更して保存する（Ctrl+Hの置換を使うと便利）
9. `update_slide/transfer.bat` を実行する
10. [https://home.tcu-ctrl.jp/publication/recentTopics](https://home.tcu-ctrl.jp/publication/recentTopics) で進捗スライドが公開されているか確認する

## トピックのアーカイブ化

活動期数が変わった場合、トピックを過去の活動期間に設定します。

1. `ctrl_web_manager/update_term/example/` の例をコピーし、`update_term/` 直下に `term_data.json` を作る（既にファイルがあればそれを編集してOK）
2. `term_data.json` を書き換える
    - term : 活動期数
    - term_name : "n期 CTRL"
    - explanation : その期の説明
    - start_date : 活動開始日
    - end_date : 活動終了日
3. `update_term/transfer.bat` を実行する

誤って公開した場合は [誤って投稿した進捗スライドの削除](/docs/deleteSlide.md) を参照してください。
