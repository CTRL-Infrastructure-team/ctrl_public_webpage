# 問い合わせ機能の移行方法

1. 会長からDiscordの管理者権限をもらいます。
2. 「チャンネルを作成」から「公式HP問い合わせ」というチャンネルを作ります。
3. サーバー設定 > 連携サービス から新しいウェブフックを作成します。
4. お名前：CTRL_HP, チャンネル：公式HP問い合わせ と設定します。
5. 「ウェブフックURLをコピー」をクリックして、メモ帳などにURLを貼り付けて保存しておきます。
6. サーバにアクセスし、ctrl_public_webpageディレクトリにある.envファイルをエディタで開きます。

    ```bash
    cd /home/.../ctrl_public_webpage
    nano .env
    ```

7. DISCORD_URL=""のダブルクオーテーションの中身を5でコピーしたURLに書き換え、変更を保存します。
8. サーバの停止 → yarn build → サーバを再起動 を行います。

    ```bash
    sudo forever stop 0
    yarn build
    sudo forever start server/index.js
    ```

9. 公式HPの問い合わせページに移動して、テスト送信に成功したら移行完了です。
