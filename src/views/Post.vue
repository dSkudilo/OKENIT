<template>
  <h1>Post</h1>
  <p>post:{{post}}</p>
  <p>user:{{user}}</p>
  <p>comments:{{comments}}</p>
  <button
    @click="addCommentHandler"
  >add comment</button>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed, onMounted } from '@vue/runtime-core'
export default {
  setup () {
    const store = useStore()
    const route = useRoute()
    const post = computed(() => store.getters['post/post'])
    const addCommentHandler = async (id) => {
      await store.dispatch('comment/addComment', {
        postId: route.params.id,
        body: 'suci suci'
      })
    }
    onMounted(async () => {
      await store.dispatch('post/getPostById', route.params.id)
      await store.dispatch('user/getUserById', post.value.userId)
      await store.dispatch('comment/getCommentsByPostId', route.params.id)
    })
    return {
      post,
      addCommentHandler,
      user: computed(() => store.getters['user/user']),
      comments: computed(() => store.getters['comment/comments'])
    }
  }
}
</script>
