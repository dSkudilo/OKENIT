<template>
  <h1>Post</h1>
  <app-loader
    v-if="isLoadingData"
  ></app-loader>
  <div
    v-else
    class="post-info"
  >
    <post-card
      :post="post"
    ></post-card>
    <post-user-card
      :user="user"
    ></post-user-card>
  </div>
  <post-comment-form
    @send="sendCommentHandler"
  >
  </post-comment-form>
  <post-comments
    :comments="comments"
  ></post-comments>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed, onMounted, ref } from '@vue/runtime-core'

import PostCard from '@/components/post/PostCard.vue'
import PostUserCard from '@/components/post/PostUserCard.vue'
import PostComments from '@/components/post/PostComments.vue'
import PostCommentForm from '@/components/post/PostCommentForm.vue'
export default {
  setup () {
    const store = useStore()
    const route = useRoute()
    const isLoadingData = ref(true)
    const isLoadingComments = ref(true)
    const post = computed(() => store.getters['post/post'])
    const sendCommentHandler = async (comment) => {
      await store.dispatch('comment/addComment', {
        postId: route.params.id,
        ...comment
      })
    }
    onMounted(async () => {
      await store.dispatch('post/getPostById', route.params.id)
      await store.dispatch('user/getUserById', post.value.userId)
      isLoadingData.value = false
      await store.dispatch('comment/getCommentsByPostId', route.params.id)
      isLoadingComments.value = false
    })
    return {
      post,
      sendCommentHandler,
      isLoadingData,
      isLoadingComments,
      user: computed(() => store.getters['user/user']),
      comments: computed(() => store.getters['comment/comments'])
    }
  },
  components: {
    PostCard,
    PostUserCard,
    PostComments,
    PostCommentForm
  }
}
</script>
