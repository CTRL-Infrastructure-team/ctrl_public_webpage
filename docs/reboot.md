# サーバの再起動と本番更新

対象は ConoHa 上の `home.tcu-ctrl.jp`（ディレクトリ `/var/www/home.tcu-ctrl.jp`）です。

## 応答がない・502 のとき

1. `ssh ctrl` で接続する
2. 状態を見る

    ```bash
    sudo systemctl status home-tcu-ctrl nginx mariadb
    sudo journalctl -u home-tcu-ctrl -n 80 --no-pager
    ```

3. 必要ならサービスだけ再起動する（OS 全体の reboot は最後の手段）

    ```bash
    sudo systemctl restart home-tcu-ctrl
    ```

4. OS 再起動が必要なとき

    ```bash
    sudo reboot
    ```

    接続し直し、`mariadb` / `nginx` / `home-tcu-ctrl` が active か確認する。systemd で入れてあれば自動起動する。

## コードを本番に載せる

GitHub の `master` が正です。サーバ上では編集しません。

```bash
cd /var/www/home.tcu-ctrl.jp
git pull --ff-only
yarn install --frozen-lockfile
yarn prisma deploy
yarn build
sudo systemctl restart home-tcu-ctrl
```

アップロードファイルは `server/data/` です。git には入りません。旧サーバから移すときは `api/config/data` をこのディレクトリへコピーします。

## 初回構築（sudo が必要な部分）

リポジトリの `deploy/` を使います。詳細は会話で渡した手順を参照してください。

- `sudo bash deploy/sudo-bootstrap.sh` … Node 22 / nginx / MariaDB / ディレクトリ
- clone のあと `sudo bash deploy/sudo-install-site.sh` … nginx と systemd
- DNS 切替後: UFW と ConoHa で 80/443、`sudo certbot --nginx -d home.tcu-ctrl.jp`
