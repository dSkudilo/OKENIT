<template>
  <form @submit.prevent="onSubmit" ref="commentForm" class="mt-5">
    <h4>Create comment</h4>
    <div class="mb-3">
      <label
        class="form-label"
      >Email address</label>
      <input
        type="email"
        :class="['form-control', {'is-invalid':eError}]"
        @blur="eBlur"
        v-model="email"
        placeholder="name@example.com">
        <div class="invalid-feedback" v-if="eError">
          {{eError}}
        </div>
    </div>
    <div class="mb-3">
      <label
        class="form-label"
      >Title</label>
      <input
        type="text"
        :class="['form-control', {'is-invalid':nError}]"
        @blur="nBlur"
        v-model="name"
        placeholder="title...">
        <div class="invalid-feedback" v-if="nError">
          {{nError}}
        </div>
    </div>
    <div class="mb-3">
      <label
        class="form-label"
      >Text</label>
      <textarea
        :class="['form-control', {'is-invalid':bError}]"
        @blur="bBlur"
        rows="3"
        v-model="body"
      ></textarea>
      <div class="invalid-feedback" v-if="bError">
        {{bError}}
      </div>
    </div>
    <button
      type="submit"
      class="btn btn-primary"
      @click="onSubmit"
      :disabled="isSubmitting || isTooManyAttempts"
    >send</button>
    <div class="text-danger" v-if="isTooManyAttempts">
      Вы слишком часто пытаетесь войти в систему. Попробуйте позже
    </div>
  </form>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
export default {
  emits: ['send'],
  setup (_, { emit, context }) {
    const { handleSubmit, isSubmitting, submitCount } = useForm()
    const { value: email, errorMessage: eError, handleBlur: eBlur } = useField(
      'email',
      yup
        .string()
        .trim()
        .required('Пожалуйста введите email')
        .email('Необходимо ввести корректный email')
    )
    const MIN_LENGTH_TITLE = 6

    const { value: name, errorMessage: nError, handleBlur: nBlur } = useField(
      'name',
      yup
        .string()
        .trim()
        .required('Пожалуйста укажите название')
        .min(MIN_LENGTH_TITLE, `Название не может быть меньше ${MIN_LENGTH_TITLE} символов`)
    )
    const MIN_LENGTH_BODY = 10
    const { value: body, errorMessage: bError, handleBlur: bBlur } = useField(
      'body',
      yup
        .string()
        .trim()
        .required('Пожалуйста введите комментарий')
        .min(MIN_LENGTH_BODY, `Комментарий не может быть меньше ${MIN_LENGTH_BODY} символов`)
    )
    const isTooManyAttempts = computed(() => submitCount.value >= 3)

    watch(isTooManyAttempts, val => {
      if (val) {
        setTimeout(() => {
          submitCount.value = 0
        }, 1500)
      }
    })
    const commentForm = ref(null)
    const onSubmit = handleSubmit((values, { resetForm }) => {
      emit('send', values)
      resetForm()
    })
    return {
      email,
      name,
      body,
      eError,
      bError,
      eBlur,
      bBlur,
      nError,
      nBlur,
      onSubmit,
      isSubmitting,
      isTooManyAttempts,
      commentForm
    }
  }
}
</script>
