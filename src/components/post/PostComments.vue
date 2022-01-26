<template>
  <div class="post-comments mt-5">
    <h3>Comments</h3>
    <ol class="list-group list-group-numbered">
      <post-comment
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
      ></post-comment>
    </ol>
  </div>
</template>

<script>
import PostComment from '@/components/post/PostComment.vue'
export default {
  props: ['comments'],
  components: {
    PostComment
  }
}
</script>
