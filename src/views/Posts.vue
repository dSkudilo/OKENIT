<template>
  <h1>Posts</h1>
  <posts-filter
    :users="users"
    v-if="!isLoadingUsers"
    @sortingPostsHandler="sortingPostsHandler"
  ></posts-filter>
  <app-loader v-if="isLoadingPosts"></app-loader>
  <posts-list
    v-else
    :posts="posts"
  ></posts-list>
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'

import PostsList from '@/components/posts/PostsList.vue'
import PostsFilter from '@/components/posts/PostsFilter.vue'
export default {
  setup () {
    const store = useStore()
    const isLoadingPosts = ref(true)
    const isLoadingUsers = ref(true)
    const sortingPostsHandler = async (user) => {
      isLoadingPosts.value = true
      await store.dispatch('post/sortingPostsByUserId', user.id)
      isLoadingPosts.value = false
    }
    onMounted(async () => {
      await store.dispatch('post/getPosts')
      isLoadingPosts.value = false
      await store.dispatch('user/getUsers')
      isLoadingUsers.value = false
    })
    return {
      sortingPostsHandler,
      posts: computed(() => store.getters['post/posts']),
      users: computed(() => store.getters['user/users']),
      isLoadingPosts,
      isLoadingUsers
    }
  },
  components: {
    PostsList,
    PostsFilter
  }
}
</script>
