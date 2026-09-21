#!/usr/bin/env bash
# 新 VPS（Ubuntu 26.04）の土台。root 相当（sudo）で実行する。
# 使い方: sudo bash deploy/sudo-bootstrap.sh
set -euo pipefail

APP_USER="${APP_USER:-anna}"
APP_DIR="${APP_DIR:-/var/www/home.tcu-ctrl.jp}"
DB_NAME="${DB_NAME:-ctrlPublicSite}"
DB_USER="${DB_USER:-ctrlhp}"

if [[ "$(id -u)" -ne 0 ]]; then
  echo "root で実行してください: sudo bash $0" >&2
  exit 1
fi

export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get install -y --no-install-recommends \
  ca-certificates curl gnupg \
  nginx mariadb-server \
  certbot python3-certbot-nginx

if ! command -v node >/dev/null 2>&1; then
  need_node=1
else
  node_major="$(node -p 'process.versions.node.split(".")[0]')"
  if [[ "${node_major}" -lt 22 ]]; then
    need_node=1
  else
    need_node=0
  fi
fi
if [[ "${need_node}" -eq 1 ]]; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y nodejs
fi

corepack enable
corepack prepare yarn@1.22.22 --activate

install -d -o "$APP_USER" -g "$APP_USER" -m 0755 "$APP_DIR"

systemctl enable --now nginx mariadb

if [[ ! -f /root/ctrlhp-db.secret ]]; then
  DB_PASS="$(openssl rand -base64 24 | tr -d '\n/=+' | head -c 24)"
  umask 077
  printf '%s\n' "$DB_PASS" > /root/ctrlhp-db.secret
  mysql --protocol=socket <<SQL
CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS '${DB_USER}'@'localhost' IDENTIFIED BY '${DB_PASS}';
GRANT ALL PRIVILEGES ON \`${DB_NAME}\`.* TO '${DB_USER}'@'localhost';
FLUSH PRIVILEGES;
SQL
  echo "MariaDB ユーザー ${DB_USER} を作成しました。パスワードは /root/ctrlhp-db.secret"
else
  echo "既存の /root/ctrlhp-db.secret を使います（DB 作成はスキップしません。冪等 SQL を再実行します）"
  DB_PASS="$(tr -d '\n' < /root/ctrlhp-db.secret)"
  mysql --protocol=socket <<SQL
CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS '${DB_USER}'@'localhost' IDENTIFIED BY '${DB_PASS}';
GRANT ALL PRIVILEGES ON \`${DB_NAME}\`.* TO '${DB_USER}'@'localhost';
FLUSH PRIVILEGES;
SQL
fi

install -d -o "$APP_USER" -g "$APP_USER" -m 0700 "/home/${APP_USER}/.secrets"
if [[ ! -f "/home/${APP_USER}/.secrets/database_url" ]]; then
  printf 'mysql://%s:%s@localhost:3306/%s\n' "$DB_USER" "$DB_PASS" "$DB_NAME" \
    > "/home/${APP_USER}/.secrets/database_url"
  chown "$APP_USER:$APP_USER" "/home/${APP_USER}/.secrets/database_url"
  chmod 600 "/home/${APP_USER}/.secrets/database_url"
fi

echo
echo "完了。"
echo "  Node: $(node -v)  Yarn: $(yarn -v)"
echo "  アプリディレクトリ: ${APP_DIR}（所有者 ${APP_USER}）"
echo "  DATABASE_URL 控え: /home/${APP_USER}/.secrets/database_url"
echo "次: GitHub の Deploy key 登録と clone（sudo 不要）"
echo "clone 後: sudo bash ${APP_DIR}/deploy/sudo-install-site.sh"
