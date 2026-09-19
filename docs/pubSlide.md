# 進捗スライド公開手順

スライド本体はサーバ上のファイルではなく、Google スライドの埋め込み URL（`/embed?`）を DB の `pubslides.slide_url` に登録します。

## 公開手順

1. 部員からPowerPointファイルを送信してもらう
2. Google DriveにPowerPointファイルを保存
3. ローカルまたは本番サーバのプロジェクトで `scripts/publication` に移動
4. `topic_data.example.json` と `slide_data.example.json` をコピーし、それぞれ `topic_data.json` と `slide_data.json` にする（gitignore）
5. `topic_data.json` の内容を以下のように書き換え
    - date : 部会を行った日時（月や日が1桁の場合は数字の頭に0を付ける）
    - title : 部会のテーマ（第n回進捗発表、芸術プログラミングコンテスト、etc...）
    - explanation : 部会テーマについての説明
6. `slide_data.json` の内容を以下のように書き換え
    - name : 部員のハンドルネーム
    - grade : 部員の学年
    - slide : （後述）
7. Googleドライブに保存したPowerPointファイルをダブルクリックしてGoogleスライドで開く
8. ファイル > WEBに公開 > 公開 を選択し、表示されたURLを `slide_data.json` の `slide` にコピーする。これをすべての部員・スライドに対して行う
9. `slide_data.json` のURLの `/pub?` となっている部分をすべて `/embed?` に変更する
10. プロジェクトルートで順に実行する（`.env` の `DATABASE_URL` が対象 DB）

```bash
node --env-file=.env scripts/publication/create-topic.mjs
node --env-file=.env scripts/publication/create-slide.mjs
```

本番に載せるときは `/var/www/home.tcu-ctrl.jp` で実行します。DB 更新だけなので `yarn build` は不要です。

11. [https://home.tcu-ctrl.jp/publication/recentTopics](https://home.tcu-ctrl.jp/publication/recentTopics) で公開を確認する

## トピックのアーカイブ化

1. `scripts/publication/term_data.example.json` をコピーして `term_data.json` にする
2. term / term_name / start_date / end_date を書き換える
3. 実行する

```bash
node --env-file=.env scripts/publication/create-term.mjs
```

## setting.json の仕組み

`create-topic.mjs` を実行すると `setting.json` が更新され、トピックの id が保存されます。`create-slide.mjs` はこの id でスライドを関連付けます。`setting.json` も gitignore です。
