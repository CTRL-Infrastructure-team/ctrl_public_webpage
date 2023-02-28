# webGLアプリの公開

UnityやSiv3Dで制作したゲームは、WebGLという形式で出力することで、ブラウザ上で遊べるゲームとして公開することができます。WebGLファイル群の出力方法は次の記事を参照してください。

- [OpenSiv3D for Web](https://siv3d.kamenokosoft.com/ja/index)
- [WebGL - Unity マニュアル](https://docs.unity3d.com/ja/2021.2/Manual/webgl.html)

出力したファイル群をサーバに置いてゲームを公開しましょう。手順は以下の通りです。

1. サーバへ入り、サイトの公開を停止する。

    ```bash
    //サーバで実行
    cd /home/...(中略).../ctrl_public_webpage
    sudo forever stop 0
    ```

2. サーバを抜け、WebGLファイル群をまとめたフォルダをscpコマンドで転送する。転送先は`/client/static/games`

    ```bash
    //自分のPCで実行
    scp -r [自分のPC上のフォルダパス] [転送先のパス]
    ```

3. 再びサーバに入り、サイトのビルドを行う。

    ```bash
    cd /home/.../ctrl_public_webpage
    sudo yarn build
    ```

4. サイトを公開し、サーバから抜ける。

    ```bash
    sudo forever start server/index.js
    exit
    ```

5. ブラウザからゲームページへアクセスする

    ```bash
    https://home.tcu-ctrl.jp/games/[フォルダ名]/[ファイル名].html
    ```
