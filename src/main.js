import Vue from 'vue'
import App from './App.vue'
import DemoBlock from '@/components/markdown-block.vue'
Vue.component('demo-block', DemoBlock)
Vue.config.productionTip = false
import routes from './route'
import VueRouter from 'vue-router'
import '@/styles/layout.scss'
import '@/styles/common.scss'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import ctment from '@/components/customComponents/index'
Vue.use(Element)
Vue.use(ctment)
let router = null
router = new VueRouter({
    routes
})
new Vue({
    render: h => h(App),
    router
}).$mount('#app')