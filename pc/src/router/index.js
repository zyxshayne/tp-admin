import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    name: 'Vr',
    path: '/vr/:mineId',
		meta: {
			title: '展示',
		},
    component: () => import('@/views/index.vue')
  },
  {
    name: 'Cim',
    path: '/cim',
		meta: {
			title: '客户端',
		},
    component: () => import('@/views/cim.vue')
  },
  {
    name: 'Sim',
    path: '/sim',
		meta: {
			title: '客服端',
		},
    component: () => import('@/views/sim.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
