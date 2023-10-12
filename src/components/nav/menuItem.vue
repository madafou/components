<template>
  <div>
    <template v-if="item.children && item.children.length && !item.display">
      <template slot="title"><span>{{ item.meta && item.meta.title }}</span></template>
      <subMenuPage v-for="(menuItem, index) in item.children" :key="index" :item="menuItem" />
    </template>
    <template v-else-if="!item.display">
      <el-menu-item :index="item.path" @click="toPath(item.path)">
        <template slot="title"><span>{{ item.meta && item.meta.title }}</span></template>
      </el-menu-item>
    </template>
  </div>
</template>
<script>
export default {
  name: 'menuItemPage',
  components: { subMenuPage: () => import('./submenu.vue'), },
  props: {
    item: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {

    }
  },

  methods: {
    toPath(path) {
      this.$router.push(path)
    }
  }
}
</script>