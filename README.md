# handsontable-vue test

## 概要

handsontable-vue を理解するためのテストページ

```
# リポジトリ取得
git clone https://github.com/kazyan-public-jl/handsontable-vue-test.git

# リポジトリに移動
cd handsontable-vue-test

# 必要モジュールのインストール
yarn

#画面確認用のサーバーを起動する
yarn start
```

ブラウザで以下にアクセス
```
#win
localhost:8080

#mac
127.0.0.1:8080
```


## 目的

- handsontable-vue を色々試して、使えるようになること
- 使い方がいつでも参照できるようにすること

## Goal

以下の項目が達成できること。

1. 初期値と変更されていたら色を変える
1. primary key の行は「重複しない」
1. primary key の行は「空を入力できない」
1. 行が追加されたら、idは自動加算して登録される
1. カラム名に補足説明をつける
1. カラムに入力できる型を限定する。外れたら通知する。
1. カラムに入力できる値リストを指定できる。


## 参考

- [npm @handsontable/vue](https://www.npmjs.com/package/@handsontable/vue)

## handsontableのセットアップ

### handsontable-vueのインストール

```
yarn add handsontable @handsontable/vue
```

### vue component を用意する

src/js/components/table/CustomHotTable.vue
```js
<template>
  <hot-table :settings="settings"></hot-table>
</template>
 
<script>
  import { HotTable } from '@handsontable/vue';
 
  export default {
    data: function() {
      return {
        settings: {
          data: [
            ["", "Ford", "Volvo", "Toyota", "Honda"],
            ["2016", 10, 11, 12, 11],
            ["2017", 20, 11, 15, 13],
            ["2018", 40, 25, 12, 13],
            ["2019", 50, 22, 25, 15]
          ],
          colHeaders: true,
          rowHeaders: true,

        },
        originData: [
          ["", "Ford", "Volvo", "Toyota", "Honda"],
          ["2016", 10, 11, 12, 13],
          ["2017", 20, 11, 14, 13],
          ["2018", 30, 15, 12, 13]
        ],
      };
    },
    methods: {
      addRow(rowId, pk){
        this.$refs.handson
      }
    }
    components: {
      HotTable
    }
  }
</script>
 
<style src="../node_modules/handsontable/dist/handsontable.full.css"></style>
```

### table ページを追加

1. src/js/components/table/table.vue を作成
2. CustomHotTable.vue を import, htmlに記述
3. route/index.js に table へのルートを追加
4. src/App.vue に table への導線を追加

### イベント発火タイミングを調査

#### 読み込み時

Vue:created

HT:modifyRow (0-4を6周)

begin
  HT:modifyCol n
  HT:modifyRow m
  HT:modifyCol n
  HT:cells m n
end

HT:modifyRow (0-3,0-4を1回ずつ)

HT:modifyCol 0
HT:modifyRow 0
HT:modifyCol 0
HT:cells 0 0

begin m:0-4, n:0
  HT:modifyCol n
  HT:modifyRow m
  HT:modifyCol n
  HT:cells m n
  HT:modifyCol n
  HT:modifyRow m
  HT:modifyRowData m
  HT:modifyData m n
  HT:cells m n
end

HT:modifyColHeader 0
HT:modifyCol 0
HT:modifyColHeader 0

begin m:0-4, n:0
  HT:modifyCol n
  HT:modifyRow m
  HT:modifyCol n
  HT:cells m n
  HT:modifyCol n
  HT:modifyRow m
  HT:modifyCol n
  HT:cells m n
  HT:modifyCol n
  HT:modifyRow m
  HT:modifyRowData m
  HT:modifyData m n
end

HT:modifyCol 0

begin m:0-4, n:1
  HT:modifyCol n
  HT:modifyRow m
  HT:modifyCol n
  HT:cells m n
end

※とにかく modify, cells の発火量が多すぎる
before/afterRendererはレンダリング時のみっぽい

HT:beforeRender
  HT:cells
    HT:beforeRenderer 各セルのHTML描画
    HT:afterRenderer
  HT:cells
HT:afterRender

Vue:mounted

HT:cells

#### セル選択時

HT:afterSelection
HT:cells
  1. Header行のセルを実行(何回も行っていた, 4〜5回)
  2. 選択したセルを実行(1回だけ)
  3. Header行のセルを実行？(たまにカラム数-1のが混じっている)
HT:cells

#### 値の変更時

HT: