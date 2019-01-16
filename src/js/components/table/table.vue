<template>
  <div>
    <h2>Table page</h2>
    <custom-hot-table
      :mysettings="mysettings"></custom-hot-table>
  </div>
</template>
<script>
import CustomHotTable from "./CustomHotTable";
export default {
  data() {
    return {
      filepath: '',
      mysettings: {
        data: [
          ["2016", 10, 11, 12, 13],
          ["2017", 20, 11, 14, 13],
          ["2018", 30, 15, 12, 13],
          ["2019", 30, 15, 12, 13]
        ],
        colHeaders: ["Year", "Ford", "Volvo", "ToyotaNissan", "Honda"],
        column: [
          {
            type: 'number',
            allowEmpty: false,
          },
          {
            type: 'string',
          },
          {
            name: "Volvo",
            type: 'number',
          },
          {
            name: "ToyotaNissan",
            type: 'number',
          },
          {
            name: "Honda",
            type: 'number',
            numericFormat: '$ 0.0',
          },
        ]
      },
    }
  },
  components: {
    CustomHotTable
  }
};
</script>
<style src="../../../../node_modules/handsontable/dist/handsontable.full.css"></style>
<style lang="scss">
.handsontable {
  td,th {
    &.yellow, &.noticeColor {
      background-color: yellow;
    }
    &.red, &.warningColor {
      background-color: darkred;
    }
    &.orange {
      background-color: orange;
    }
    &.cyan, &.pastDiffColor {
      background-color: cyan; 
    }
  }
}
</style>