# ctrl_public_webpage
東京都市大学コンピュータ技術研究会の公式ホームページです。
投稿された作品や活動報告を見たり、フォームから問い合わせを行ったりすることができます。

URLは[https://home.tcu-ctrl.jp](https://home.tcu-ctrl.jp)です。

## 使用するツール

- docker
- node.js

## setup

### Node.js導入

Node.jsを直接インストールしても大丈夫ですが、nvm（Node.jsのバージョン管理ツール）を通してもらった方が後々楽かもしれないです。

本サイトで使用するNode.jsのバージョンは`.nvmrc`に記載されています。以下nvmでの導入手順です。

windows版

[https://github.com/coreybutler/nvm-windows](https://github.com/coreybutler/nvm-windows)

mac版

```bash
brew install nvm
```

各環境でnvmの導入が完了したら以下コマンドをプロジェクトのルートディレクトリで実行することで指定されたバージョンのnode.jsに環境が切り替わります。

```bash
nvm use
```

アプリケーションの起動に`yarn`が必要となるため、インストールします。

```bash
npm install -g yarn
```

### MongoDB導入

本サイトはデータベースにMongoDBを使用しています。

`docker-compose.yml`を用意してあるので、これを使ってもらえれば大丈夫です。

以下コマンドを実行してください。実行させるだけで、DBの中での作業は必要ありません。

```bash
docker-compose up -d # MongoDBを起動
```

### アプリケーション起動

```bash
yarn install # 初回のみ
yarn build
yarn start
```

開発時は以下コマンドで起動するとホットリロードされるので楽です。

```bash
yarn dev
```

起動後、各ブラウザにて`localhost:3000`を開いてサイトのトップ画面が正常に表示されるか確認してください。

## ユーザの作成方法

`api/test`配下に`user_data.json`を作成してください。

ファイルを開いて以下の通り記載します。

```bash
[
    {
      "username": "hoge",
      "password": "hoge",
      "twitter_id": "@hoge",
      "works": [],
      "situations": [],
      "rentingBooks": []
    }
]
```

保存後、`api/test`にて以下のコマンドを実行します。

```bash
node create.js
```

## dev flow

`develop`ブランチより`feature`ブランチを切ってから作業をしてください。（今のところブランチ名に決まりはありませんが、`feature/<作業内容>`という形式にしてもらえると後から見ても分かりやすいと思います。）

作業が完了したら`develop`、`master`ブランチへマージしてください。

変更内容に不安がある場合は`develop`ブランチに向けてPRを作成してください。（レビュワーには`polyester-CTRL`か`rin-ctrl`を指定してください。）

## ディレクトリ構成
ディレクトリは大まかにapiとclientに分かれています。apiがバックエンド、clientがフロントエンドのコードです。
### api
coming soon...

### client
coming soon...

### その他
coming soon...

## DB設計

coming soon...

## Slackとの連携

coming soon...
