# データベースの起動方法 (ローカル)

## 起動方法

1. Docker Desktop を起動する
2. プロジェクトディレクトリで MariaDB を起動する

    ```bash
    docker compose up -d
    docker compose exec db bash
    mysql -u root -p
    ```

    パスワードは `docker-compose.yml` の `MYSQL_ROOT_PASSWORD`（初期値 `pwd`）です。データベース名は `ctrlPublicSite` です。

    ```sql
    USE ctrlPublicSite;
    ```

3. テーブルはアプリ側で作ります。プロジェクトルートで:

    ```bash
    yarn prisma migrate dev
    ```

## MySQLの操作方法

基本的なmysqlの操作方法はネットで調べて確認しましょう。
[【初心者向け】MySQL　CRUDとは - Qiita](https://qiita.com/kt103/items/42878f30236364ad2f66)

## その他

- SELECT \* FROM でテーブルの中身を見るとき、内容が???で表示されることがあります。その場合はmysqlのコマンドラインで`set names utf8mb4;`を実行してからSELECT \* FROMを実行すると解消されることがあります。
- データベースの設計は、[/prisma/schema.prisma](/prisma/schema.prisma)を確認してください。
- ローカルの接続文字列は `.env.example` の `DATABASE_URL` を `.env` にコピーしたものです。
