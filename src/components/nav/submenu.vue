<template>
  <div>
    <template v-if="item.children && item.children.length && !item.display">
      <el-submenu :index="item.path">
        <template slot="title"><span>{{ item.meta && item.meta.title }}</span></template>
        <menuItemCom v-for="(menuItem, index) in item.children" :key="index" :item="menuItem" />
      </el-submenu>
    </template>
    <template v-else>
      <menuItemCom :item="item" />
    </template>
  </div>
</template>
<script>
import menuItemCom from './menuItem.vue';
export default {
  name: 'submenuPage',
  components: { menuItemCom },
  props: {
    item: {
      type: Object,
      default: () => { }
    }
  },
  methods: {

  }
}

</script>
