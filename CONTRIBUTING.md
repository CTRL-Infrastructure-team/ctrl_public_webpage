# 開発の流れ
1. 最新のコードを取り入れるためにプルしてください。
1. `develop`ブランチより`feature`ブランチを切ってから作業をしてください。（今のところブランチ名に決まりはありませんが、`feature/<作業内容>`という形式にしてもらえると後から見ても分かりやすいと思います。）
1. 作業が完了したら`develop`、`master`ブランチへマージしてください。
    1. 変更内容に不安がある場合は`develop`ブランチに向けてPRを作成してください。（レビュワーには`polyester-CTRL`か`rin-ctrl`を指定してください。）
1. 変更した内容を`master`ブランチにマージし、サーバ上でプルして再起動すると、実際のWebページに反映されます。

# 作業時のお願い

- コメントとコミットメッセージは多めに書いてください。後から見た人が分かりやすいように、ご協力をお願いします。