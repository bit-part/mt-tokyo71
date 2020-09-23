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
                        type: 'radio', label: 'リンクの種類', data: 'url', options: [
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
