<template>
    <li class="list-group-item d-flex justify-content-between align-items-start">
      <div class="ms-2 me-auto">
        <div class="fw-bold">{{comment.name}}</div>
        {{comment.body}}
      </div>
      <span class="badge bg-primary rounded-pill">{{comment.email}}</span>
    </li>
</template>

<script>
export default {
  props: ['comment']
}
</script>
