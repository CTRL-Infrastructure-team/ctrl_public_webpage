# 問い合わせ機能を Discord / メールと連携する

1. 会長から Discord の管理者権限をもらいます。
2. 「チャンネルを作成」から「公式HP問い合わせ」というチャンネルを作ります。
3. サーバー設定 > 連携サービス から新しいウェブフックを作成します。
4. お名前：CTRL_HP, チャンネル：公式HP問い合わせ と設定します。
5. 「ウェブフックURLをコピー」をクリックして、メモ帳などに URL を貼り付けて保存しておきます。
6. サーバへ入り、サイトディレクトリの `.env` を編集します。

    ```bash
    ssh ctrl
    cd /var/www/home.tcu-ctrl.jp
    nano .env
    ```

7. 次を設定して保存します。

    - `NUXT_DISCORD_URL` … 5 でコピーしたウェブフック URL
    - `NUXT_SENDER_EMAIL_ADDRESS` / `NUXT_SENDER_EMAIL_PASSWORD` … 問い合わせメールを送るアカウント（使う場合）

8. 環境変数はプロセス起動時に読まれるので、再ビルドは不要です。サービスを再起動します。

    ```bash
    sudo systemctl restart home-tcu-ctrl
    ```

9. 公式 HP の問い合わせページからテスト送信し、Discord（とメール）に届けば完了です。

# ノブチ備忘録

問い合わせのチャンネルは役員しか閲覧できない
