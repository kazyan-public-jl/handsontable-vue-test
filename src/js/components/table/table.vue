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
          ["", "Ford", "Volvo", "Toyota", "Honda"],
          ["2016", 10, 11, 12, 13],
          ["2017", 20, 11, 14, 13],
          ["2018", 30, 15, 12, 13],
          ["2019", 30, 15, 12, 13]
        ],
      }
    }
  },
  components: {
    CustomHotTable
  }
};
</script>
<style src="../../../../node_modules/handsontable/dist/handsontable.full.css"></style>
<style scoped>

</style>