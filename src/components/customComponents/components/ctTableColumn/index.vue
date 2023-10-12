
<template>
  <el-table-column v-on="$listeners" v-bind="$attrs">
    <template slot="header">
      <slot name="header"></slot>
    </template>
    <template>
      <slot></slot>
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: 'ctTableColumn',
  props: {
    slots: {
      type: Array,
      default: () => []
    },
    item: {
      type: Object,
      default: () => { }
    },
  }
}


</script>

