<template>
  <el-table-column :key="item.prop" :type="item.type" :index="item.index" :columnKey="item.columnKey" :label="item.label"
    :prop="item.prop" :width="item.width" :minWidth="item.minWidth" :fixed="item.fixed"
    :renderHeader="item.renderHeader && ((h, obj) => renderHeaderFun(h, obj, item.renderHeader))"
    :sortable="item.sortable" :sortMethod="item.sortMethod" :sortBy="item.sortBy" :sortOrders="item.sortOrders"
    :resizable="item.resizable" :formatter="item.formatter" :showOverflowTooltip="item.showOverfolwTooltip"
    :align="item.align" :headerAlign="item.headerAlign" :className="item.className" :labelClassName="item.labelClassName"
    :selectable="item.selectable" :reserveSelection="item.reserveSelection" :filters="item.filters"
    :filterPlacement="item.filterPlacement" :filterMultiple="item.filterMultiple" :filterMethod="item.filterMethod"
    :filteredValue="item.filteredValue" :slots="slots">
  </el-table-column>
</template>
<script>
import { renderHeader } from './utils'
export default {
  name: 'newTableColumnPlain',
  props: {
    item: {
      type: Object,
      default: () => { }
    },
    slots: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    renderHeaderFun(h, { column }, headerOptions) {
      console.log(column, 'column')
      if (!headerOptions) {
        return column.label
      }
      return renderHeader(h, column, headerOptions)

    },
  }
}
</script>