import { createRouter, createWebHistory } from 'vue-router'

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

export default router
