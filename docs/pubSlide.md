# 進捗スライド公開手順

## こちらの作業を初めて行う方へ

まずはこのリポジトリの内容をご自身のPC（ローカル環境）にダウンロードしてください。[トップページ](https://github.com/CTRL-Infrastructure-team/ctrl_public_webpage)から Code > Download ZIP を押していただくと、zip形式でダウンロードできます。こちらを解凍したフォルダの中に `scripts/publication` というフォルダがあることを確認してください。

## 公開手順

1. 部員からPowerPointファイルを送信してもらう
2. Google DriveにPowerPointファイルを保存
3. ローカル環境で `scripts/publication` に移動
4. `topic_data.example.json` と `slide_data.example.json` をコピーし、それぞれファイル名を `topic_data.json` と `slide_data.json` に変更する
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
9. `slide_data.json` のURLの `/pub?` となっている部分をすべて `/embed?` に変更してファイルを保存（ctrl+Hの置換を使うと便利）
10. scpコマンドで `topic_data.json` と `slide_data.json` をサーバに転送

```bash
scp \[ ローカル環境のファイルパス \] ctrlhp:/var/www/home.tcu-ctrl.jp/scripts/publication
```

11. SSHでサーバにアクセスして以下のコマンドを順に実行する

```bash
cd /var/www/home.tcu-ctrl.jp
node --env-file=.env scripts/publication/create-topic.mjs
node --env-file=.env scripts/publication/create-slide.mjs
```

12. サーバの接続を切って[https://home.tcu-ctrl.jp/publication/recentTopics](https://home.tcu-ctrl.jp/publication/recentTopics)にアクセスし、進捗スライドが公開されているかを確認

## トピックのアーカイブ化

活動期数が変わった場合、トピックを過去の活動期間に設定します。

1. ローカルプロジェクトの`scripts/publication`に移動
2.  `term_data.example.json` をコピーして、ファイル名を `term_data.json` に変更
3.  `term_data.json` の内容を以下のように書き換え
    - term : 活動期数
    - term_name : "n期 CTRL"
    - start_date : 活動開始日
    - end_date : 活動終了日
4. scpコマンドで `term_data.json` をサーバに転送

```bash
scp \[ ローカル環境のファイルパス \] ctrlhp:/var/www/home.tcu-ctrl.jp/scripts/publication
```

5. SSHでサーバにアクセスして以下のコマンドを順に実行する

```bash
cd /var/www/home.tcu-ctrl.jp
node --env-file=.env scripts/publication/create-term.mjs
```

## setting.json の仕組み

- `create-topic.mjs` を実行すると `setting.json` が更新され、トピックの id が保存されます。`create-slide.mjs` は `setting.json` の id を参照してトピックとスライドを関連付けます。
- 最新でないトピックにスライドを追加する場合は、データベースのトピックのidを参考に `setting.json` のidを変更したうえで `create-topic.mjs` を実行してください。
