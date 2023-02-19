# データベースの操作方法（サーバ）

## 起動方法

1. コマンドプロンプトからサーバにアクセスする

    ```bash
    //【部外秘】[1]を参照
    ```

2. サーバで以下を実行する

    ```bash
    mysql -u root -p
    //【部外秘】[3]を参照
    USE ctrlPublicSite;
    ```

## MySQLの操作方法

基本的なmysqlの操作方法はネットで調べて確認しましょう。
[【初心者向け】MySQL　CRUDとは - Qiita](https://qiita.com/kt103/items/42878f30236364ad2f66)

## その他

- SELECT \* FROM でテーブルの中身を見るとき、内容が???で表示されることがあります。その場合はmysqlのコマンドラインで`set names utf8;`を実行してからSELECT \* FROMを実行すると解消されるかもしれません。[(参考元)](https://ameblo.jp/takaemon626/entry-11089864364.html)
- データベースの設計は、prisma/schema.prismaを確認してください。
