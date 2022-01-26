<template>
  <form
    @submit.prevent="sortingPostsHandler"
    class="Posts-filter">
    <h4>Найти посты, добавленные {{selectedEmail}}</h4>
    <app-select
      :data="usersEmails"
      v-model="selectedEmail"
    ></app-select>
    <button
      type="submit"
      class="btn btn-primary m-2"
    >Найти</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
  props: ['users'],
  emits: ['sortingPostsHandler'],
  setup (props, { emit }) {
    const propsUsers = ref(props.users)
    const usersEmails = propsUsers.value.map(e => e.email)
    const selectedEmail = ref('')
    const sortingPostsHandler = () => {
      const currentUser = propsUsers.value.find(u =>
        u.email === selectedEmail.value)
      emit('sortingPostsHandler', currentUser)
    }
    return {
      usersEmails,
      selectedEmail,
      sortingPostsHandler
    }
  }
}
</script>
