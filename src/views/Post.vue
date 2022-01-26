<template>
  <div class="not-found mt-5" v-if="!post">
    <h2 class="text-center">Поста c таким {{routeId}} id нету :(</h2>
  </div>
  <div class="post-content" v-else>
    <h1>Post</h1>
    <app-loader
      v-if="isLoadingData"
    ></app-loader>
    <div
      v-else
    >
      <post-card
        :post="post"
      ></post-card>
      <post-user-card
        :user="user"
      ></post-user-card>
      <post-comment-form
      @send="sendCommentHandler"
      >
      </post-comment-form>
      <post-comments
        :comments="comments"
      ></post-comments>
    </div>
  </div>
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
    const routeId = route.params.id
    const isLoadingData = ref(true)
    const post = computed(() => store.getters['post/post'])
    const sendCommentHandler = async (comment) => {
      await store.dispatch('comment/addComment', {
        postId: route.params.id,
        ...comment
      })
    }
    onMounted(async () => {
      await store.dispatch('post/getPostById', routeId)
      await store.dispatch('user/getUserById', post.value.userId)
      await store.dispatch('comment/getCommentsByPostId', routeId)
      isLoadingData.value = false
    })
    return {
      routeId,
      post,
      sendCommentHandler,
      isLoadingData,
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
