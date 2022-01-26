<template>
    <router-link
      :to="{name:'Post', params: {id: post.id}}"
      custom
      v-slot="{href, navigate}"
    >
      <a
        :href="href"
        class="list-group-item list-group-item-action"
        aria-current="true"
        @click="navigate"
      >
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{post.title}}</h5>
          <small class="text-muted">Id пользователя {{post.userId}}</small>
        </div>
        <p class="mb-1">{{post.body}}</p>
      </a>
    </router-link>
</template>
<script>
export default {
  props: ['post']
}
</script>
