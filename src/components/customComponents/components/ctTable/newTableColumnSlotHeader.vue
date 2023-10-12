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
    <template slot="header" slot-scope="{ row, $index }">
      <slot :name="item.header" :row="row" :$index="$index"></slot>
    </template>
    <template slot-scope="{ row, $index }">
      <slot v-if="item.slotColumn" :name="item.slotColumn" :row="row" :$index="$index"></slot>
      <render-slot v-if="item.render" :render="item.render" :row="row" :$index="$index" :column="item" />
      <template v-else>{{ row[item.prop] }}</template>
    </template>
    <!-- 需要修改 -->
    <template v-if="item.children">
      <template v-for="headerChildren in item.children">
        <newTableColumnSlotHeader v-if="headerChildren.header" :item="headerChildren" :slots="slots">
          <template v-for="slotItem in slots" :slot="slotItem" slot-scope="{ row, $index }">
            <slot :name="slotItem" :row="row" :$index="$index"></slot>
          </template>
        </newTableColumnSlotHeader>
        <newTableColumnChildren v-else-if="headerChildren.children" :item="headerChildren" :slots="slots">
          <template v-for="slotItem in slots" :slot="slotItem" slot-scope="{ row, $index }">
            <slot :name="slotItem" :row="row" :$index="$index"></slot>
          </template>
        </newTableColumnChildren>
        <newTableColumnRender v-else-if="headerChildren.render || childrenItem.slotColumn" :item="headerChildren"
          :slots="slots">
          <template v-for="slotItem in slots" :slot="slotItem" slot-scope="{ row, $index }">
            <slot :name="slotItem" :row="row" :$index="$index"></slot>
          </template>
        </newTableColumnRender>
        <newTableColumnPlain v-else :item="headerChildren" />
      </template>
    </template>
  </el-table-column>
</template>
<script>
import { renderHeader } from './utils'
import renderSlot from './el-slot.vue'
import newTableColumnPlain from './newTableColumnPlain.vue'
export default {
  name: 'newTableColumnSlotHeader',
  components: {
    renderSlot,
    newTableColumnChildren: () => import('./newTableColumnChildren.vue'),
    newTableColumnRender: () => import('./newTableColumnRender.vue'),
    newTableColumnPlain,
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