# 【MT東京-71】MTAppjQuery サマーセミナー

## プラグインのインストール

下記のリンクから zip ファイルをダウンロードして展開します。  
https://www.dropbox.com/t/5HDopilyB4bBV2m5

`plugins` ディレクトリ内の `MTAppjQuery` `DataAPIProxy` `PlainTextField` プラグインをアップロードします。

`mt-static/plugins` ディレクトリ内の `MTAppjQuery` プラグインをアップロードします。


## DataAPIProxy プラグインのパーミッションの設定

アップロードした `DataAPIProxy` ディレクトリの中に `dataapiproxy.cgi` というファイルがあります。

このファイルのパーミッションを `755` など `mt.cgi` と同じパーミションに変更します。

> 【参考】MTAppjQuery と Data API proxy を組み合わせて管理画面で Data API を快適に使う   
> https://tinybeans.net/blog/2017/07/21-120008

## システムメニューの MTAppjQuery プラグインの設定

1. システムメニューを表示
1. 左サイドメニューの `設定 > プラグイン` に移動
1. `MTAppjQuery 2.5.2` の `設定` を開く
1. `管理画面での DataAPI の利用` を `有効` `Data API バージョン : v4` を選択
1. PSGI モードで運用している場合は `baseUrl` を「 `mt.cgi を除く管理画面のURL + dataapiproxy.cgi` 」となるように変更

##　サイトの作成

今回は下記のようなサイトを作成します。既存のサイトを利用する場合はわざわざ作る必要はありません。

```
# サイト名
【MT東京-71】MTAppjQuery サマーセミナー

# サイトURL
http://movabletype.vagrant/mt-tokyo-71/

# サイトパス
/var/www/html/mt-tokyo-71

# タイムゾーン
UTC+9(日本標準時)

# 使用言語
日本語
```

## Webサービス設定

該当サイトの左サイドメニューの `設定 > Webサービス` に移動し、 `Data API のアクセスを許可する。` にチェックを入れて保存します。

## コンテンツタイプの作成

1. 左サイドメニューの `コンテンツタイプ > 新規` に移動
1. 名前に `サンプル` と入力
1. 「テキスト（複数行）」フィールドをドラッグ・アンド・ドロップ
    - 名前に `カスタムリンク` と入力
    - 「入力フォーマット」で `なし` を選択
1. 保存
1. 左サイドメニューの `コンテンツデータ > サンプル` に移動
1. 「サンプルを作成」をクリック
1. 「カスタムリンク」フィールドが存在するのを確認

![](images/01-min.png)

## user.js のインストール

1. 左サイドメニューの `デザイン > テンプレート` に移動
1. 右サイドメニューの `user.jsとuser.cssをインストール` をクリック
1. インデックステンプレートにインストールされた `user.css` `user.js` を選択して「公開」をクリック

## user.js の編集

1. `user.js` の編集画面を開く
1. 右サイドメニューの「コンテンツタイプ」で「サンプル」を選択
1. 右サイドメニューの「コンテンツフィールド」で「カスタムリンク」を選択し ID の数字をコピー
1. 下記の内容の `id` の数字を上でコピーした数字に変更して、コードを `user.js` 編集画面にコピペして「保存と再構築」をクリック

```
(function($){
  'use strict';
  
  mtapp.multiField({
    label: 'カスタムリンク',
    id: 20
  });
  
})(jQuery);
```

先程の「サンプルを作成」ページに移動し「カスタムリンク」フィールドが下図のようになっていれば成功

![](images/02-min.png)

## マルチフィールドで利用できるフィールドブロックの定義の構造

マルチフィールドで利用できるフィールドブロックの定義は、 `fieldGroups` オプションで定義します。
その `fieldGroups` オプションの構造は下記の用になっています。

- 「フィールドを追加」をクリックして表示されるボタングループ全体が配列（赤）
- その中に各行のフィールドブロックグループを定義する配列（オレンジ）
- その中に各フィールドブロックを定義するオブジェクト（緑）

![](images/fieldGroups-min.png)

![](images/03-min.png)

## 作成するフィールドの定義を追加

```
(function($){
    'use strict';

    mtapp.multiField({
        label: 'カスタムリンク',
        id: 20,
        // fieldGroups は配列
        fieldGroups: [
            // フィールドブロックグループ（ボタングループの1行）
            [
                // フィールドブロック
                {
                    type: 'text', label: 'セクション見出し'
                },
                // フィールドブロック
                {
                    // 独自のフィールドタイプを定義
                    type: 'customLink',
                    // フィールドブロックのラベル
                    label: 'リンク',
                    // customLinkType というフィールドハンドルの1行テキスト
                    customLinkTitle: {type: 'text', label: 'リンクタイトル'},
                    // customLinkType というフィールドハンドルのラジオボタン
                    customLinkType: {
                        type: 'radio', label: 'リンクの種類', options: [
                            {label: 'URL', data: 'url'},
                            {label: 'PDF', data: 'pdf'}
                        ]
                    },
                    // customLinkAssetId というフィールドハンドルのアセットフィールド
                    customLinkAssetId: {type: 'asset', label: 'PDF', url: ''},
                    // customLinkUrl というフィールドハンドルのURLフィールド
                    customLinkUrl: {type: 'url', label: 'URL'}
                }
            ]
        ]
    });

})(jQuery);
```

`user.js` を書き換えて「保存と再構築」をするとカスタムリンクフィールドが下図のようになます。

- 「セクション見出し」をクリックすると1行テキストフィールドブロックが追加されます。
- 「リンク」をクリックすると空っぽのフィールドブロックが追加されます。

![](images/04-min.png)

## `VueComponents` というグローバルテンプレートモジュールを作成

- ブラウザの別タブでシステムメニューを表示
- システムメニューの左サイドメニューの `デザイン > グローバルテンプレート` に移動
- 画面右上のドロップダウンリストで `テンプレートモジュール` を選択したまま `新規作成` をクリック
- テンプレート名とテンプレート本体に `VueComponents` と入れて保存
- 画面左上に `VueComponents` と表示されれば成功

![](images/05-min.png)

## `VueComponents` グローバルテンプレートモジュールを編集

カスタムリンク・フィールドブロックの大枠を定義した下記の内容をコピペして保存

```
<mt:Ignore>VueCustomLink というコンポーネントのテンプレートを定義 = 「リンク」ボタンをクリックしたときに追加されるフィールドブロックのテンプレート</mt:Ignore>
<script type="text/x-template" id="mf-component-customLink">
    <div>VueCustomLink</div>
</script>

<mt:Ignore>VueCustomLink というコンポーネントを定義（Vue.js）</mt:Ignore>
<script>
    Vue.component('VueCustomLink', {
        props: { item: Object },
        template: '#mf-component-customLink'
    });
</script>

<mt:Ignore>type: 'customLink' のときに上記フィールドブロックが表示されるように MTAppjQuery に追加</mt:Ignore>
<mt:SetVarBlock name="mtapp_mf_additional_fields" append="1">
    <template v-else-if="item.type === 'customLink'">
        <VueCustomLink :item="item"></VueCustomLink>
    </template>
</mt:SetVarBlock>
```

![](images/06-min.png)

ポイントは下記の項目を間違えないようにすることです。

- `type` で指定する値と同じものを入れる（赤）
- 上記の `type` で指定する値の先頭に `Vue` をつけてパスカルケースにする（オレンジ）
- `v-else-if` にする（緑）

![](images/07-min.png)

## `VueCustomLink` コンポーネントの中身を作成

```
<script type="text/x-template" id="mf-component-customLink">
    <div>
        <div class="mb-4">
            <label class="d-block">{{ item.customLinkTitle.label }}</label>
            <VueText :item="item.customLinkTitle"></VueText>
        </div>
        <div class="mb-4">
            <label class="d-block">{{ item.customLinkType.label }}</label>
            <VueRadio :item="item.customLinkType"></VueRadio>
        </div>
        <div class="mb-4" v-if="item.customLinkType.data === 'pdf'">
            <label class="d-block">{{ item.customLinkAssetId.label }}</label>
            <VueAsset :item="item.customLinkAssetId"></VueAsset>
        </div>
        <div class="mb-4" v-else>
            <label class="d-block">{{ item.customLinkUrl.label }}</label>
            <VueText :item="item.customLinkUrl"></VueText>
        </div>
    </div>
</script>
```

![](images/08-min.png)
