# 進捗スライド公開手順（サーバ）

通常の管理人作業は [進捗スライド公開手順](/docs/pubSlide.md)（`transfer.bat`）を使ってください。ここでは、サーバ上で同じ処理を直接行う場合の手順です。

スライド本体はサーバ上のファイルではなく、Google スライドの埋め込み URL（`/embed?`）を DB の `pubslides.slide_url` に登録します。

## 公開手順

1. 部員から PowerPoint ファイルを送信してもらう
2. Google Drive に PowerPoint ファイルを保存する
3. サーバ上の `/var/www/home.tcu-ctrl.jp/scripts/publication` で、`topic_data.example.json` と `slide_data.example.json` をコピーし、それぞれ `topic_data.json` と `slide_data.json` にする（gitignore）
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
8. `slide_data.json` の URL の `/pub?` となっている部分をすべて `/embed?` に変更する
9. サイトのディレクトリで順に実行する（`.env` の `DATABASE_URL` が対象 DB）

```bash
cd /var/www/home.tcu-ctrl.jp
node --env-file=.env scripts/publication/create-topic.mjs
node --env-file=.env scripts/publication/create-slide.mjs
```

DB 更新だけなので `yarn build` は不要です。

10. [https://home.tcu-ctrl.jp/publication/recentTopics](https://home.tcu-ctrl.jp/publication/recentTopics) で公開を確認する

## トピックのアーカイブ化

活動期数が変わった場合、トピックを過去の活動期間に設定します。

1. `scripts/publication/term_data.example.json` をコピーして `term_data.json` にする
2. `term_data.json` を書き換える
    - term : 活動期数
    - term_name : "n期 CTRL"
    - explanation : その期の説明
    - start_date : 活動開始日
    - end_date : 活動終了日
3. サイトのディレクトリで実行する

```bash
cd /var/www/home.tcu-ctrl.jp
node --env-file=.env scripts/publication/create-term.mjs
```

## setting.json の仕組み

- `create-topic.mjs` を実行すると `setting.json` が更新され、トピックの id が保存されます。`create-slide.mjs` は `setting.json` の id を参照してトピックとスライドを関連付けます。
- 最新でないトピックにスライドを追加する場合は、データベースのトピックの id を参考に `setting.json` の id を変更したうえで `create-slide.mjs` を実行してください。
