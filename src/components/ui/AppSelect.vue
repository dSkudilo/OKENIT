<template>
  <select class="form-select" size="10" aria-label="size 3 select example">
    <option selected>{{placeholder}}</option>
    <option
      v-for="d in data"
      :key="d"
      :value="d"
      @click="$emit('update:modelValue', d)"
    >{{d}}</option>
  </select>
</template>

<script>
export default {
  name: 'app-select',
  props: {
    data: {
      type: Array
    },
    placeholder: {
      type: String,
      default: 'Выберите значение'
    },
    modelValue: {}
  }
}
</script>
