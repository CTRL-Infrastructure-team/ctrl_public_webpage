# サーバの再起動

次のケースでは、サーバの再起動を推奨します。

- サイトの応答が遅い
- サイトが開けず502 Bad Gatewayと表示される

以下の手順でサーバを再起動し、サイトを動かしてください。

1. サーバに接続する

    ```bash
    //【部外秘】[1]を参照
    ```

2. サーバを再起動する

    ```bash
    sudo reboot
    ```

3. 接続が切れるのでもう一度サーバに接続

    ```bash
    //【部外秘】[1]を参照
    ```

4. カレントディレクトリを変更

    ```bash
    cd /home/.../ctrl_public_webpage
    ```

5. データベースを起動

    ```bash
    service mysqld start
    ```

6. サイトを動かす

    ```bash
    sudo forever start server/index.js
    ```
