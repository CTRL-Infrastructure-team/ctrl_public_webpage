# ctrl_public_webpage

東京都市大学コンピュータ技術研究会の公式ホームページです。
投稿された作品や活動報告を見たり、フォームから問い合わせを行ったりすることができます。

URLは[https://home.tcu-ctrl.jp](https://home.tcu-ctrl.jp)です。

## はじめに

このホームページを運用する人は、サイト全体の変更権限を持つ**管理人**、変更権限を持たずにこのリポジトリをクローンして開発を行う**開発者**、作品投稿と活動報告の機能を利用する**部内ユーザ**のいずれかになります。現役の部員の中で1人は管理人をしていただけると助かります。

## 管理人の方へ

このホームページの管理人になった方は、部内で引き継がれる **Windows 運用ツール（`ctrl_web_manager`）** または従来の SSH 手順でサーバへアクセスできるようにしてください。ツールの引き継ぎと bat の使い方は [Windows 運用ツール（ctrl_web_manager）](/docs/ctrl-web-manager.md) を参照してください。歴代の管理人・開発者が入っている Discord サーバがあるので、そちらに入っていただけるとサポートができます。分からないことがあれば、OB のノブチまでお気軽にご連絡ください。

管理者の方は以下の内容も参考にしてください。

- [Windows 運用ツール（ctrl_web_manager）](/docs/ctrl-web-manager.md)（DB 更新を bat で行う場合）
- [進捗スライドの公開](/docs/pubSlide.md)
- [誤って投稿した進捗スライドの削除](/docs/deleteSlide.md)
- [問い合わせ機能をDiscordサーバと連携](/docs/setInquily.md)
- [データベースの操作(サーバ)](/docs/serverDB.md)
- [部内ユーザの新規作成](/docs/createUser.md)
- [サーバの再起動と本番更新](/docs/reboot.md)
- [本番切替（DNS・HTTPS）](/docs/cutover.md)
- [webGLアプリの公開](/docs/webGL.md)

## 開発者の方へ

このリポジトリを開発者の方のPCにクローンすることで、サイトに機能を追加・修正するための開発が行えます。

開発者の方は以下の内容を参考にしてください。

- [必要な基礎知識](/docs/tutorial.md)
- [開発環境構築](/docs/localDev.md)
- [データベースの操作(ローカル)](/docs/localDB.md)
- [リポジトリのディレクトリ構成](/docs/dirStructure.md)
- [開発の流れ](/docs/devFlow.md)

## 部内ユーザの方へ

管理人から割り当てられたIDとパスワードを使って[https://home.tcu-ctrl.jp/login](https://home.tcu-ctrl.jp/login)からログインすることで、部の活動報告やゲームの投稿が行えます。具体的な利用方法は以下の内容を参考にしてください。

- [活動報告](/docs/report.md)
- [作品投稿](/docs/work.md)

## その他

旧バージョンのREADME.mdは[こちら](/docs/README_old.md)をご覧ください。
