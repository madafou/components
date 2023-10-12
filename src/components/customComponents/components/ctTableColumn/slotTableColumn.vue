<template>
  <el-table-column v-on="$listeners" v-bind="$attrs">
    <template v-if="item.header" slot="header" slot-scope="{ row, $index }">
      aaaa
      <slot name="header" :row="row" :index="$index"></slot>
    </template>
    <template v-if="item.slot" slot-scope="{ row, $index }">
      aaaa
      <slot v-if="item.slot" :name="item.slot" :row="row" :index="$index"></slot>
      <span v-else> {{ row[item.prop] }}</span>
    </template>
    <template v-if="item.render" slot-scope="{ row, $index }">
      <render-slot v-if="item.render" :render="item.render" :row="row" :index="$index" :column="item" />
      <template v-else> {{ row[item.prop] }}</template>
    </template>
    <template v-else slot-scope="{ row }">
      <span> {{ row[item.prop] }}</span>
    </template>
  </el-table-column>
</template>
<script>
import renderSlot from './el-slot.vue'
export default {
  props: {
    item: {
      type: Object,
    },
  },
  components: {
    renderSlot,
  },
  watch: {
    item: {
      immediate: true,
      deep: true,
      handler: function (item) {
        console.log(item, 'labellabellabellabel')
      }
    }
  }
}
</script>