<template>
  <transition name="fade">
    <div v-if="message" :class="['alert', `alert-${message.type}`]">
      <p class="alert-title" v-if="title">{{title}}</p>
      {{message.value}}
      <span class="alert-close" @click="close">&times;</span>
    </div>
  </transition>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'app-message',
  setup () {
    const store = useStore()
    const TITLE_MAP = {
      primary: 'Успешно!',
      danger: 'Ошибка!',
      warning: 'Внимание!'
    }
    const message = computed(() => store.state.message)
    const title = computed(() => message.value ? TITLE_MAP[message.value.type] : null)
    return {
      message,
      title,
      close: () => store.commit('clearMessage')
    }
  }
}
</script>
<style lang="scss">
  .alert{
    position: fixed;
    right: 5%;
    top: 100%;
    z-index: 1000;
    transform: translateY(-100%);
  }
  .alert-close{
    position: absolute;
    top: 0px;
    right: 5px;
    cursor: pointer;
    padding: 5px;
  }
  .fade-enter-active {
    transition: all 0.3s ease-out;
  }
  .fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
