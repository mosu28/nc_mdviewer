# Md Viewer
Place this app in **nextcloud/apps/**.

## 開発環境のセットアップ
1. https://github.com/nextcloud/server をcloneする。
2. /server/apps/内に本リポジトリをcloneする(※cloneするときはプロジェクト名を`mdviewer`としてcloneしてください)。
```shell
git clone git@github.com:tibimosu/nc_mdviewer.git mdviewer
```

3. npm installする。

4. npm run build -- production する。

5. mysqlのDB上にnextcloud用のtableを作成する。

6. server/で`php -S localhost:8080`でサーバを立ち上げる。

7. http://localhost:8080 にアクセスし、ユーザ作成と5で作成したdbの情報を入力します。

8. nextcloud上でmdviewerのアプリを有効にすればセットアップ完了です。

## MDのドキュメントのルートディレクトリの設定
* 画面上部から`Md Viewer`をクリックし、左下のSettingsから設定することができます。

## MDでのドキュメント作成について
* 現状、MDのドキュメントは下記の構成で作成する形になっています。

```
<ドキュメント名>/
    - README.md     : 表示するMDファイル
```
