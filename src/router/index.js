import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
const routes = [
  {
    path: '/',
    name: 'Posts',
    component: () => import('@/views/Posts.vue')
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: () => import('@/views/Post.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.afterEach((to, from) => {
  store.dispatch('setMessage', {
    value: 'Вы перешли на страницу' + to.name,
    type: 'primary'
  })
})
export default router
