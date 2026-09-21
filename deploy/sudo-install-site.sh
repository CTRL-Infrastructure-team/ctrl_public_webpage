#!/usr/bin/env bash
# clone 後に nginx と systemd を入れる。sudo bash deploy/sudo-install-site.sh
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/home.tcu-ctrl.jp}"

if [[ "$(id -u)" -ne 0 ]]; then
  echo "root で実行してください: sudo bash $0" >&2
  exit 1
fi

if [[ ! -f "${APP_DIR}/deploy/home-tcu-ctrl.service" ]]; then
  echo "${APP_DIR} にリポジトリがありません。先に clone してください。" >&2
  exit 1
fi

install -m 0644 "${APP_DIR}/deploy/home-tcu-ctrl.service" /etc/systemd/system/home-tcu-ctrl.service
install -m 0644 "${APP_DIR}/deploy/nginx-home.tcu-ctrl.jp.conf" /etc/nginx/sites-available/home.tcu-ctrl.jp
ln -sfn /etc/nginx/sites-available/home.tcu-ctrl.jp /etc/nginx/sites-enabled/home.tcu-ctrl.jp
rm -f /etc/nginx/sites-enabled/default

nginx -t
systemctl daemon-reload
systemctl enable home-tcu-ctrl.service
systemctl reload nginx

echo "nginx 設定を入れました。アプリ本体は anna で yarn build したあと:"
echo "  sudo systemctl start home-tcu-ctrl"
echo "80/443 は DNS 切替直前に UFW と ConoHa セキュリティグループで開けてください。"
