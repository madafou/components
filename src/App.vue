<template>
  <div id="app">
    <el-container>
      <el-aside width="200px">
        <sideMenu />
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
    <!-- 下面操作页面 -->
    <!-- <page-demo /> -->
  </div>
</template>

<script>
import sideMenu from '@/components/nav';
import pageDemo from './views/pageDemo.vue'
export default {
  name: 'App',
  components: {
    sideMenu,
    pageDemo
  }
}
</script>

<style></style>
