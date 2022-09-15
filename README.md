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

### MariaDB導入

本サイトはデータベースにMariaDBを使用しています。

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

`api/manualControllers/users`配下に`user_data.json`を作成してください。

ファイルを開いて以下の通り記載します。

```bash
[
    {
      "username": "hoge",
      "password": "hoge",
      "twitter_id": "@hoge"
    }
]
```

保存後、`api/manualControllers/users`にて以下のコマンドを実行します。

```bash
node createUser.js
```

## dev flow

`develop`ブランチより`feature`ブランチを切ってから作業をしてください。（今のところブランチ名に決まりはありませんが、`feature/<作業内容>`という形式にしてもらえると後から見ても分かりやすいと思います。）

作業が完了したら`develop`、`master`ブランチへマージしてください。

変更内容に不安がある場合は`develop`ブランチに向けてPRを作成してください。（レビュワーには`polyester-CTRL`か`rin-ctrl`を指定してください。）

## ディレクトリ構成
ディレクトリは大まかにapiとclientに分かれています。apiがバックエンド、clientがフロントエンドのコードです。
### api
- config
  - cache : キャッシュ
  - data : 作品、活動報告のファイルを保存
  - key : 外部サービスのapiキーなど
  - passport : ユーザ認証のためのコード
- controllers : リクエストに応じた処理を実装する
- manualControllers
  - publication : 進捗スライドの公開ツール
  - show : データベースの閲覧ツール
  - users : 新規ユーザの作成ツール


### client
- assets
  - data : 作品、活動報告のデータ
  - img : 画像データ
  - scss : グローバルCSSのファイル
  - text : テキストデータ
- components : コンポーネントファイルを入れる
  - publication : 進捗スライド用
  - ui : cardやheadlineなどの汎用的なUIのコンポーネント
- layouts : 全体のレイアウトをまとめるVueファイルがある
- middleware : ミドルウェアを入れる
- pages : Viewファイル、ルーティングファイルを入れる
- plugins : axiosやelement-uiなどのプラグインを入れる
- static : faviconなど変更頻度の低いファイルを入れる
- store : Vuexストアのファイル
- test : テスト用コード



### その他
- node_modules 
- server : サーバを起動する時はまずこの中のファイルを起動する

### 重要なファイル
- nuxt.config.js : Nuxt.jsの設定を記述
- package.json : 依存するパッケージやスクリプトを記述
- yarn.lock : yarnの設定が保存されたファイル。
- .gitignore : gitで管理したくないファイルの名前を記述
- docker-compose.yml : dockerの設定を記述
- .nmvrc : NVMでNode.jsのバージョン管理を行うためのファイル

## DB設計

`prisma/schema.prisma`を確認してください。

## Slackとの連携

coming soon...
