<template>
  <hot-table :settings="settings" ref="hotComponent"></hot-table>
</template>
 
<script>
  import { HotTable } from '@handsontable/vue';
 
  export default {
    props: [
      'mysettings'
    ],
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
          /**
           * セルの判定時に発火する
           * createdの後
           * mountedの後
           */
          cells: (row, col, prop) => {
            console.log("cells:", row, col, prop, this.hotCore);
            if (this.hotCore) {
              console.log("cells core:", this.hotCore, this.hotCore.getDataAtCell(row, col));
            }
          },
          beforeRender: (isForced) => {
            console.log("beforeRender", isForced);
          },
          afterRender: (isForced) => {
            console.log("afterRender", isForced);
          },
          beforeRenderer: (TD, row, col, prop, value, cellProperties) => {
            console.log("beforeRenderer:", TD, row, col, prop, value, cellProperties);
          },
          afterRenderer: (TD, row, col, prop, value, cellProperties) => {
            console.log("afterRenderer:", TD, row, col, prop, value, cellProperties);
          },
          afterSelection: (row, col, row2, col2, preventScrolling, selectionLayerLevel) => {
            console.log("afterSelection:", row, col, row2, col2, preventScrolling, selectionLayerLevel);
          },
          modifyData: (row, col, valueHolder, ioMode) => {
            console.log("modifyData:", row, col, valueHolder, ioMode);
          },
          modifyData: (row, col, valueHolder, ioMode) => {
            console.log("modifyData:", row, col, valueHolder, ioMode);
          },
          modifyRow: (row) => {
            console.log("modifyRow:", row);
          },
          modifyRowData: (row) => {
            console.log("modifyRowData:", row);
          },
          modifyCol: (row) => {
            console.log("modifyCol:", row);
          },
          modifyColHeader: (row) => {
            console.log("modifyColHeader:", row);
          },
          // かなり早いタイミング. 行数を判定した直後くらい
          afterLoadData: (initialLoad) => {
            console.log("afterLoadData:", initialLoad);
          },
          // 初回ロード時は検出されず
          // 手入力した後に一度だけ発火
          // Undoでは発火せず
          afterSetDataAtCell: (changes, source) => {
            console.log("afterSetDataAtCell:", changes, source);
            for (let index = 0; index < changes.length; index++) {
              const change = changes[index];
              const r = change[0];
              const c = change[1];
              const before = change[2];
              const after  = change[3];
              // 変更内容のチェックはここで？
              if(this.hotCore){
                console.log("afterSetDataAtCell.validation start");
                this.hotCore.validateCells((valid) => {
                  console.log("validateCells:", valid);
                });
                this.hotCore.validateColumns([c], (valid) => {
                  console.log("validateColumns:", valid);
                });
                this.hotCore.validateRows([r],(valid) => {
                  console.log("validateRows:", valid);
                });
                console.log("afterSetDataAtCell.validation end");
              }
              // パラメータを強制的に上書きする場合
              changes[index][3] = "hey";
            }
            return changes;
          },
        },
        hotCore: null,
        originData: [
          ["", "Ford", "Volvo", "Toyota", "Honda"],
          ["2016", 10, 11, 12, 13],
          ["2017", 20, 11, 14, 13],
          ["2018", 30, 15, 12, 13]
        ],
      };
    },
    created(){
      this.settings = this.createCustomSettings(this.mysettings);
      console.log("created:", this, this.$refs, this.$refs.hotComponent);
    },
    mounted(){
      this.hotCore = this.$refs.hotComponent.hotInstance || null;
      console.log("mounted:", this.hotCore);
    },
    computed: {
    },
    methods: {
      createCustomSettings(customSettings = {}){
        let settings = this.settings;
        for (const key in customSettings) {
          if (customSettings.hasOwnProperty(key)) {
            const setting = customSettings[key];
            settings[key] = setting;
          }
        }
        return settings;
      },
      addRow(insertRowIndex){
        this.$refs.hotComponent.hotInstance.createRow(insertRowIndex);
      }
    },
    components: {
      HotTable
    }
  }
</script>
 