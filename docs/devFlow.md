# 開発フロー

`master`（または運用中なら `develop`）から `feature/<作業内容>` ブランチを切って作業してください。ブランチ名に厳密な規則はありませんが、この形式だと後から追いやすいです。

作業が完了したら GitHub へ push し、`master` へマージします。変更に不安がある場合は PR を作成してください。レビュワーには `polyester-CTRL` か `rin-ctrl` を指定してください。

本番反映は GitHub が正です。サーバ `/var/www/home.tcu-ctrl.jp` で `git pull --ff-only` → `yarn install --frozen-lockfile` → `yarn prisma:deploy` → `yarn build` → `sudo systemctl restart home-tcu-ctrl` します。手順の詳細は [reboot.md](/docs/reboot.md) です。
