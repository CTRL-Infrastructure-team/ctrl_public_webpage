## Summary

- Nuxt 3 移行、ConoHa 向け deploy（systemd / nginx）、staging での動作確認に伴う修正（ログイン cookie、スライド UI、作品カード、問い合わせ API 等）
- 運用ドキュメント更新と [docs/cutover.md](/docs/cutover.md) による本番切替手順

## Test plan

- [x] staging（160.251.137.35）で公開ページ・zip・スライド・ログイン・問い合わせ（Discord）・部内投稿 UI
- [ ] `master` マージ後、新 VPS で `master` を pull → build → 再起動
- [ ] DNS 切替後 `https://home.tcu-ctrl.jp` で同様の確認
- [ ] certbot 後 HTTPS・問い合わせ再確認
- [ ] 任意: `WHOIS_IMG` を `https://home.tcu-ctrl.jp/og-twitter.jpg` に設定して build

## マージ後（管理人）

旧 foruthia では **pull しない**。切替手順は `docs/cutover.md` を参照。
