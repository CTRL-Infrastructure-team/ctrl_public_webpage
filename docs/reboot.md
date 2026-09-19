# サーバの再起動と本番更新

対象は ConoHa 上の `home.tcu-ctrl.jp`（ディレクトリ `/var/www/home.tcu-ctrl.jp`）です。SSH は `ssh ctrl`（ユーザ `anna`）です。

GitHub のコードが正です。サーバ上でソースを直接直した内容は、GitHub に無い限り次の `git pull` で消えるか、逆に GitHub 側の修正がサーバに入りません。反映する変更は必ず `feature/...` →（レビュー後）`master` へ push してからサーバで pull します。

サーバにだけ置くもの（git に入れない）:

- `.env`（`DATABASE_URL`、`NUXT_SESSION_SECRET`、問い合わせ用のメール／Discord）
- `server/data/`（作品・活動報告の画像と zip）
- `public/games/`（WebGL。gitignore）

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

    `.env` だけ変えたときも、再ビルドは不要でこの再起動で足ります。

4. OS 再起動が必要なとき

    ```bash
    sudo reboot
    ```

    接続し直し、`mariadb` / `nginx` / `home-tcu-ctrl` が active か確認する。systemd で入れてあれば自動起動する。

## コードを本番に載せる

```bash
cd /var/www/home.tcu-ctrl.jp
git status
git pull --ff-only
yarn install --frozen-lockfile
yarn prisma:deploy
yarn build
sudo systemctl restart home-tcu-ctrl
```

`yarn prisma deploy` は使わないでください。Yarn が prisma を別コマンドと取り違えます。スクリプト名は `yarn prisma:deploy` です。

`git status` でソースが dirty なときは、意図したサーバ独自の変更かを確認してから pull します。scp で当てた一時修正は GitHub にコミットして揃えてください。

アップロードファイルは `server/data/` です。旧サーバから移すときは `api/config/data` をこのディレクトリへコピーします（ファイル名とユーザ名ディレクトリは DB の `/api/images/...` `/api/games/...` と一致している必要があります）。

## 初回構築（sudo が必要な部分）

リポジトリの `deploy/` を使います。

- `sudo bash deploy/sudo-bootstrap.sh` … Node 22 / nginx / MariaDB / ディレクトリ
- clone のあと `sudo bash deploy/sudo-install-site.sh` … nginx と systemd
- DNS 切替後: UFW と ConoHa で 80/443、`sudo certbot --nginx -d home.tcu-ctrl.jp`

カットオーバーまでは `feature/nuxt3-migration` をサーバで動かして確認し、問題なければ `master` へマージして追従ブランチを `master` に切り替えます。ネームサーバは動かさず、`home.tcu-ctrl.jp` の A レコードだけを切り替えます。
