# ローカル開発環境構築

## 1. ソフトウェアのインストール

### VSCode

以下のリンクからインストール
[https://azure.microsoft.com/ja-jp/products/visual-studio-code/](https://azure.microsoft.com/ja-jp/products/visual-studio-code/)

### Source Tree

以下のリンクからインストール
[https://www.sourcetreeapp.com/](https://www.sourcetreeapp.com/)
※ 途中でGitをダウンロードするかどうかチェックボックスで確認されるので、インストールする（既に入っいれば必要なし）

### Docker Desktop (windows)

以下のリンクからwindows版をインストール
[https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)
※ install required windows components for WSL2 には必ずチェック入れる（既にWSL2が使えれば必要なし）

### nvm (Node.jsのバージョン管理ツール)

- 以下のリンク先のREADME.mdに書かれている[download now!] という青いボタンをクリックする
[https://github.com/coreybutler/nvm-windows](https://github.com/coreybutler/nvm-windows)
- nvm-setup.exe というファイルをダウンロードしてインストールを行う。

## 2. コマンドプロンプトによる操作

1. 自分のPCでコマンドプロンプトを開く
2. デスクトップなど好きなフォルダにwebサイトのリポジトリをクローンする

```
cd C:/Users/hoge/Desktop
git clone https://github.com/CTRL-Infrastructure-team/ctrl_public_webpage.git
```

3. クローンしたフォルダのルートディレクトリに移動する  
※ 以降、C:/Users/hoge/Desktop/ctrl_public_webpage をプロジェクトのルートディレクトリとする

```
cd C:/Users/hoge/Desktop/ctrl_public_webpage
```

4. nvmでNode.jsをインストール&有効化

```
//うまくいかなければコマンドプロンプトを管理者権限で開きなおす
nvm install
nvm use
```

5. yarn (JavaScriptパッケージマネージャ) をインストール

```
npm install -g yarn
yarn install
```

6. scpコマンドで環境変数が記載された.envファイルをルートディレクトリにダウンロードし、ファイル内容を変更する

```
//【部外秘】[2]を参照
```

7. dockerによるデータベースの起動

```
//あらかじめDocker desktopを起動しておく
docker-compose up -d
prisma inin -name
```

12. ローカル用ユーザの作成

```
cd api\manualControllers\users
copy user_data_example.json user_data.json
node createUser.js
```

13. yarn dev で ローカル開発

```
yarn dev
```

14. ChromeなどのブラウザのURLから、`localhost:3000`を開いてサイトのトップ画面が正常に表示されるかを確認

15. ctrl-cで終了
