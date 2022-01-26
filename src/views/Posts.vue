<template>
  <h1>Posts</h1>
  <button
    @click="sortingPostsHandler(3)"
  >sort</button>
  {{users}}
  <app-message></app-message>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'
export default {
  setup () {
    const store = useStore()
    const sortingPostsHandler = async (user) => {
      await store.dispatch('post/sortingPostsByUserId', user)
    }
    onMounted(async () => {
      await store.dispatch('post/getPosts')
      await store.dispatch('user/getUsers')
    })
    return {
      sortingPostsHandler,
      posts: computed(() => store.getters['post/posts']),
      users: computed(() => store.getters['user/users'])
    }
  }
}
</script>
