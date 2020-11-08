import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: () => import('@/views/HelloWorld.vue')
    },
    {
      path: '/jsx',
      name: 'jsx',
      component: () => import('@/views/Jsx')
    }
  ]
})
export default router
