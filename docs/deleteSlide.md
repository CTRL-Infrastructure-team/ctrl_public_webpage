# 誤って投稿した進捗発表資料の削除

進捗資料を公開する操作を誤った場合は、データベースを操作して修正してください。
接続方法は [データベースの操作方法（サーバ）](/docs/serverDB.md) を参照してください。本番の DB 名は `ctrlhp` です。

## スライドを公開する Topic を間違えた場合

1. トピック一覧から、間違ってスライドを載せた行の `id` と `created_at` を確認する。

    ```sql
    USE ctrlhp;
    SET NAMES utf8mb4;
    SELECT id, name, created_at FROM pubtopics ORDER BY created_at DESC;
    ```

2. そのトピックに紐づくスライドを確認する（`トピックID` を置き換える）。

    ```sql
    SELECT id, contributor, created_at, slide_url
    FROM pubslides
    WHERE pubtopics_id = 'トピックID';
    ```

3. 消したい行だけを条件で削除する。日付で切る例:

    ```sql
    DELETE FROM pubslides
    WHERE pubtopics_id = 'トピックID'
      AND created_at >= '2024-03-06 00:00:00';
    ```

    `id` が分かっているときは `DELETE FROM pubslides WHERE id = 'スライドID';` の方が安全です。

## 不要な Topic を作成した場合

トピックを消す前に、紐づくスライドを先に消してください（外部キー）。

```sql
USE ctrlhp;
SELECT id, name, created_at FROM pubtopics;
DELETE FROM pubslides WHERE pubtopics_id = '削除したいトピックのID';
DELETE FROM pubtopics WHERE id = '削除したいトピックのID';
```
