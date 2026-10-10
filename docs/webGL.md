# webGLアプリの公開

UnityやSiv3Dで制作したゲームは、WebGLという形式で出力することで、ブラウザ上で遊べるゲームとして公開することができます。WebGLファイル群の出力方法は次の記事を参照してください。

- [OpenSiv3D for Web](https://siv3d.kamenokosoft.com)
- [WebGL - Unity マニュアル](https://docs.unity3d.com/ja/2021.2/Manual/webgl.html)

出力したファイル群をサーバに置いてゲームを公開しましょう。手順は以下の通りです。

1. 自分の PC から、WebGL ファイル群をまとめたフォルダを `public/games/` へ転送する。サイトを止める必要はありません。

    ```bash
    scp -r [自分のPC上のフォルダパス] ctrl_hp:/var/www/home.tcu-ctrl.jp/public/games/
    ```

    `public/games/` は gitignore です。SSH ホスト名は `ctrl_hp` です。

2. サーバでビルドして反映する。Nuxt は `public/` を `.output/public/` へコピーするため、置きっぱなしでは公開されません。

    ```bash
    ssh ctrl_hp
    cd /var/www/home.tcu-ctrl.jp
    yarn build
    sudo systemctl restart home-tcu-ctrl
    ```

3. ブラウザからゲームページへアクセスする。

    ```text
    https://home.tcu-ctrl.jp/games/[フォルダ名]/[ファイル名].html
    ```
