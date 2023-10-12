import Vue from 'vue'
import VueRouter from 'vue-router'
// 获取原型对象push函数
const originalPush = VueRouter.prototype.push

// 获取原型对象replace函数
const originalReplace = VueRouter.prototype.replace

// 修改原型对象中的push函数
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

// 修改原型对象中的replace函数
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/table'
    
},{
    path: '/table',
    name: 'table',
    meta: {
        title: '表格',
        icon: 'table',
        keepAlive: true,
    },
    component: () =>
        import ('@/docs/table/index.md'),
}]
export default routes