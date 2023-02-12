# データベースの起動方法

## 起動方法

1. docker desktopを起動する
2. コマンドプロンプトでプロジェクトディレクトリに移動し、以下を実行する

```
docker-compose up -d
docker-compose exec db bash
mysql -u root -p
pwd
USE ctrlPublicSite;
```

## MySQLの操作方法

基本的なmysqlの操作方法はネットで調べて確認しましょう。
[【初心者向け】MySQL　CRUDとは - Qiita](https://qiita.com/kt103/items/42878f30236364ad2f66)

## その他

- SELECT * FROM でテーブルの中身を見るとき、内容が???で表示されることがあります。その場合はmysqlのコマンドラインで`set names utf8;`を実行してからSELECT * FROMを実行すると解消されるかもしれません。https://ameblo.jp/takaemon626/entry-11089864364.html
- データベースの設計は、[prisma/schema.prisma](prisma/schema.prisma)を確認してください。
