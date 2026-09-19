# 開発の流れ

1. 最新のコードを取り入れるためにプルしてください。
1. `master`（または運用中なら `develop`）から `feature/<作業内容>` ブランチを切って作業してください。
1. 作業が完了したら GitHub へ push し、必要なら PR を作成してください。レビュワーには `polyester-CTRL` か `rin-ctrl` を指定してください。
1. `master` にマージされたら、本番サーバ `/var/www/home.tcu-ctrl.jp` で次を実行すると反映されます。

    ```bash
    git pull --ff-only
    yarn install --frozen-lockfile
    yarn prisma:deploy
    yarn build
    sudo systemctl restart home-tcu-ctrl
    ```

    詳細は [サーバの再起動と本番更新](/docs/reboot.md) を見てください。サーバ上でソースを直接直さないでください。`.env` と `server/data/` だけがサーバ固有です。

# 作業時のお願い

- コメントとコミットメッセージは多めに書いてください。後から見た人が分かりやすいように、ご協力をお願いします。
