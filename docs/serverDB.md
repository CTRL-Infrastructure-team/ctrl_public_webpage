# データベースの操作方法（サーバ）

本番の MariaDB はアプリと同じマシンで動いています。接続情報は `/var/www/home.tcu-ctrl.jp/.env` の `DATABASE_URL` です。パスワードを docs や git に書かないでください。

## 起動方法

1. `ssh ctrl` でサーバへ入る

2. `.env` の `DATABASE_URL` を確認する（形式は `mysql://ユーザ:パスワード@127.0.0.1:3306/DB名`）

    ```bash
    cd /var/www/home.tcu-ctrl.jp
    grep '^DATABASE_URL=' .env
    ```

3. そのユーザと DB 名で入る。本番はユーザ・DB 名とも `ctrlhp` です。root では入りません。

    ```bash
    mysql -u ctrlhp -p
    USE ctrlhp;
    ```

    パスワードを聞かれたら `DATABASE_URL` のパスワードを入力します。

## MySQLの操作方法

基本的なmysqlの操作方法はネットで調べて確認しましょう。
[【初心者向け】MySQL　CRUDとは - Qiita](https://qiita.com/kt103/items/42878f30236364ad2f66)

## その他

- SELECT \* FROM でテーブルの中身を見るとき、内容が???で表示されることがあります。その場合はmysqlのコマンドラインで`set names utf8mb4;`を実行してからSELECT \* FROMを実行すると解消されることがあります。
- データベースの設計は、prisma/schema.prismaを確認してください。
- スキーマ変更は手で ALTER せず、`yarn prisma:migrate`（ローカル）/ `yarn prisma:deploy`（サーバ）を使います。
