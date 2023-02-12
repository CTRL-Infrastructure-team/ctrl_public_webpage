# ディレクトリ構成

ディレクトリは大まかにapiとclientに分かれています。apiがバックエンド、clientがフロントエンドのコードです。

## api

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

## client

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

## その他

- node_modules
- server : サーバを起動する時はまずこの中のファイルを起動する

## 重要なファイル

- nuxt.config.js : Nuxt.jsの設定を記述
- package.json : 依存するパッケージやスクリプトを記述
- yarn.lock : yarnの設定が保存されたファイル。
- .gitignore : gitで管理したくないファイルの名前を記述
- docker-compose.yml : dockerの設定を記述
- .nmvrc : NVMでNode.jsのバージョン管理を行うためのファイル
