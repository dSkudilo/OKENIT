<template>
  <main class="container">
    <app-message></app-message>
    <router-view
      v-cloak
    />
  </main>
</template>
<style lang="scss">
  [v-cloak] {
    display: none;
  }
  body {
    overflow-y: scroll;
  }
</style>
