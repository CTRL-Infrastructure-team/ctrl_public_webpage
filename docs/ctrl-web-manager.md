# Windows 運用ツール（ctrl_web_manager）

部のサイト管理人が、**日常的な DB 更新**（部内ユーザ作成・活動期・進捗スライド公開）を、Windows 上で **bat を実行するだけ**で行うためのツール群です。

ツール本体は **`ctrl_web_manager/`** ディレクトリに置きますが、**この Git リポジトリには含めません**（鍵・作業用 JSON・個人メモが混ざるため）。前任・後任の管理人の間で直接このディレクトリを引き継いでください。

## このツールでできること・できないこと

| できること（bat） | できないこと（別途ターミナル・開発手順） |
|-------------------|------------------------------------------|
| 部内ユーザの新規作成 | サイトのソース変更・`git pull`・`yarn build` |
| 活動期（term）の更新 | nginx / systemd / DNS の変更 |
| 進捗スライドの DB 登録 | 問い合わせ Discord 設定など `.env` の編集 |

**サイト自体の改修**は [開発の流れ](/docs/devFlow.md) を参照し、管理人（ターミナル操作ができる人）が行います。

## ディレクトリ構成（引き継ぎパッケージ）

```text
ctrl_web_manager/
├── set_ssh/
│   ├── config              # ctrl_hp 用（リポジトリ外で配布）
│   ├── set_my_ssh.bat      # 後任 PC：鍵生成・config 配置
│   └── set_junior_ssh.bat  # 後任 PC：前任の .pub をサーバ登録
├── user_registration/
│   ├── transfer.bat
│   ├── example/
│   └── user_data.json      # 作業用（git に入れない）
├── update_term/
│   ├── transfer.bat
│   ├── example/
│   └── term_data.json
└── update_slide/
    ├── transfer.bat
    ├── example/
    ├── topic_data.json
    └── slide_data.json
```

`example/` から各 JSON をコピーして編集し、同じフォルダの `transfer.bat` を実行します。

## 初回セットアップ（後任の PC）

### 前提

- Windows に **OpenSSH クライアント**（`ssh` / `scp` / `ssh-keygen`）が使えること。Windows 10/11 では「オプション機能」から追加できます。
- 前任がサーバにログインできること（公開鍵登録のため）。

### 手順

1. 前任が、持っている `ctrl_web_manager/set_ssh/` の内に保存されている公開鍵 `*.rsa` をすべて削除する。
1. **前任**が持っている `ctrl_web_manager` をzipファイルに圧縮し、後任へ渡す。discordのDMやUSBなど、両者以外が触れられないよう渡し方に注意する。
1. 後任が、前任から渡されたzipを展開する。
1. **後任**が `set_ssh/set_my_ssh.bat` を実行する。
   - 黒い画面に、英数字8文字の**パスフレーズ** が表示されるので、ここで入力した内容を忘れないように記録しておく。このパスフレーズは今後進捗スライドの公開などでも使用する。
   - （`%USERPROFILE%\.ssh\ctrl_hp\` に秘密鍵、`set_ssh/` に `%USERNAME%_rsa.pub` ができる。）
1. 後任が、`%USERNAME%_rsa.pub` を前任へ渡す。
1.  **前任**が、後任から渡された `%USERNAME%_rsa.pub` を `set_ssh/` に配置する。
1. 前任が、 `set_ssh/set_junior_ssh.bat` を実行する。  
   - 前任者のパスフレーズの入力が複数回要求されるため、必要に応じて入力する。
   - （後任の `.pub` が、サーバの `~/.ssh/authorized_keys.d/` にコピーされる。）
4. 後任が、コマンドプロンプトを開き、 `ssh ctrl_hp` と入力してサーバに入れることを確認する。

### 引き継ぎチェックリスト

- [ ] 後任が前任から`ctrl_web_manager` をで受け取った
- [ ] 後任が `ssh ctrl_hp` でログインできる

## 日常作業（bat の使い方）

各 `transfer.bat` は共通して **JSON の構文が正しいか検証 → JSONをサーバへ転送 → サーバでJSONの内容を読み込み、データベースへ反映** を行います。うまく動かなくなったり、誤ったデータを送信してしまった場合は、 [誤って投稿した進捗スライドの削除](/docs/deleteSlide.md) を参照するか、DiscordからOBのノブチまでご連絡ください。

| フォルダ | 編集する JSON | サーバ処理 | 詳細ドキュメント |
|----------|---------------|------------|------------------|
| `user_registration/` | `user_data.json` | `scripts/create-user.mjs` | [ユーザの作成](/docs/createUser.md) |
| `update_term/` | `term_data.json` | `scripts/publication/create-term.mjs` | [進捗スライド公開手順](/docs/pubSlide.md)（活動期） |
| `update_slide/` | `topic_data.json`, `slide_data.json` | `create-topic.mjs` → `create-slide.mjs` | [進捗スライド公開手順](/docs/pubSlide.md) |

スライドの Google 埋め込み URL（`/embed?`）の準備は [pubSlide.md](/docs/pubSlide.md) の手順どおりです。bat は **DB 登録まで**を自動化します。

公開確認: [https://home.tcu-ctrl.jp/publication/recentTopics](https://home.tcu-ctrl.jp/publication/recentTopics)
