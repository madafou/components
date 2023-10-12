<template>
  <el-table-column :type="item.type" :index="item.index" :columnKey="item.columnKey" :label="item.label" :prop="item.prop"
    :width="item.width" :minWidth="item.minWidth" :fixed="item.fixed"
    :renderHeader="item.renderHeader && ((h, obj) => renderHeaderFun(h, obj, item.renderHeader))"
    :sortable="item.sortable" :sortMethod="item.sortMethod" :sortBy="item.sortBy" :sortOrders="item.sortOrders"
    :resizable="item.resizable" :formatter="item.formatter" :showOverflowTooltip="item.showOverfolwTooltip"
    :align="item.align" :headerAlign="item.headerAlign" :className="item.className" :labelClassName="item.labelClassName"
    :selectable="item.selectable" :reserveSelection="item.reserveSelection" :filters="item.filters"
    :filterPlacement="item.filterPlacement" :filterMultiple="item.filterMultiple" :filterMethod="item.filterMethod"
    :filteredValue="item.filteredValue" :slots="slots">
    <template v-for="(childrenItem, index) in item.children">
      <newTableColumnSlotHeader v-if="childrenItem.header" :item="childrenItem" :slots="slots">
        <template v-for="slotItem in slots" :slot="slotItem" slot-scope="{ row, $index }">
          <slot :name="slotItem" :row="row" :$index="$index"></slot>
        </template>
      </newTableColumnSlotHeader>
      <newTableColumnChildren v-else-if="childrenItem.children" :item="childrenItem" :slots="slots">
        <template v-for="slotItem in slots" :slot="slotItem" slot-scope="{ row, $index }">
          <slot :name="slotItem" :row="row" :$index="$index"></slot>
        </template>
      </newTableColumnChildren>
      <newTableColumnRender v-else-if="childrenItem.render || childrenItem.slotColumn" :item="childrenItem"
        :slots="slots">
        <template v-for="slotItem in slots" :slot="slotItem" slot-scope="{ row, $index }">
          <slot :name="slotItem" :row="row" :$index="$index"></slot>
        </template>
      </newTableColumnRender>
      <newTableColumnPlain v-else :item="childrenItem" />
    </template>
  </el-table-column>
</template>
<script>
import { renderHeader } from './utils'
import newTableColumnPlain from './newTableColumnPlain.vue'
import newTableColumnSlotHeader from './newTableColumnSlotHeader.vue'
import newTableColumnRender from './newTableColumnRender.vue'
export default {
  name: 'newTableColumnChildren',
  components: {
    newTableColumnChildren: () => import('./newTableColumnChildren.vue'),
    newTableColumnPlain,
    newTableColumnSlotHeader,
    newTableColumnRender
  },
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
      if (!headerOptions) {
        return column.label
      }
      return renderHeader(h, column, headerOptions)

    },
  }
}
</script>