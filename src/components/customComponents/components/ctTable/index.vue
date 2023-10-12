<template>
  <el-table ref="tableRef" style="width: 100%" v-on="$listeners" v-bind="$attrs">
    <template v-for="(item, index) in tableHeader">
      <newTableColumnSlotHeader v-if="item.header" :item="item" :slots="slots">
        <template v-for="slotItem in slots" :slot="slotItem" slot-scope="{ row, $index }">
          <slot :name="slotItem" :row="row" :$index="$index"></slot>
        </template>
      </newTableColumnSlotHeader>
      <newTableColumnChildren v-else-if="item.children" :item="item" :slots="slots">
        <template v-for="slotItem in slots" :slot="slotItem" slot-scope="{ row, $index }">
          <slot :name="slotItem" :row="row" :$index="$index"></slot>
        </template>
      </newTableColumnChildren>
      <newTableColumnRender v-else-if="item.render || item.slotColumn" :item="item" :slots="slots">
        <template v-for="slotItem in slots" :slot="slotItem" slot-scope="{ row, $index }">
          <slot :name="slotItem" :row="row" :$index="$index"></slot>
        </template>
      </newTableColumnRender>
      <newTableColumnPlain v-else :slots="slots" :item="item" />
    </template>
    <!-- 第一个为插槽为 append  -->
    <template slot="append" slot-scope="{ row, $index }">
      <slot name="append" :row="row" :$index="$index"></slot>
    </template>
    <!-- 为默认插槽， 如果存在 tableHEader 则不生效 需要使用append -->
    <template v-if="!tableHeader || !tableHeader.length">
      <slot></slot>
    </template>
  </el-table>
</template>
<script>
import newTableColumnPlain from './newTableColumnPlain.vue'
import newTableColumnChildren from './newTableColumnChildren.vue'
import newTableColumnSlotHeader from './newTableColumnSlotHeader.vue'
import newTableColumnRender from './newTableColumnRender.vue'
export default {
  name: 'ctTable',
  components: {
    newTableColumnPlain,
    newTableColumnChildren,
    newTableColumnRender,
    newTableColumnSlotHeader
  },
  props: {
    tableHeader: Array,
  },
  data() {
    return {
      slots: [],
    }
  },
  created() {
    this.slots = Object.keys(this.$slots)
    const scopedSlots = Object.keys(this.$scopedSlots)
    this.slots = scopedSlots.filter(item => {
      if (!item.includes('$')) {
        return item
      }
    })
  },
  mounted() {
    this.extendMethod()

  },
  methods: {
    extendMethod() {
      const refMethod = Object.entries(this.$refs['tableRef'])
      for (const [key, value] of refMethod) {
        if (!(key.includes('$') || key.includes('_'))) {
          this[key] = value
        }
      }
    }
  }
}
</script>
