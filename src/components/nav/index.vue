<template>
  <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
    <submenu v-for="(menuItem, index) in menus" :key="index" :item="menuItem" />
  </el-menu>
</template>
<script>
import routes from '@/route/index'
import submenu from './submenu.vue'
export default {
  name: 'sideMenus',
  components: {
    submenu
  },
  computed: {
    menus() {
      return routes.filter(item => {
        return item.meta
      })
    }
  },
  methods: {
    handleOpen() {

    },
    handleClose() {

    },
  }
}

</script>
<style lang="scss" scoped>
.el-menu-vertical-demo {
  border: none;
}
</style>