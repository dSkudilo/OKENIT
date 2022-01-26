<template>
  <div class="list-group">
    <posts-item
      v-for="post in posts"
      :post="post"
      :key="post.id"
    ></posts-item>
  </div>
</template>

<script>
import PostsItem from '@/components/posts/PostsItem.vue'
export default {
  props: ['posts'],
  components: {
    PostsItem
  }
}
</script>
