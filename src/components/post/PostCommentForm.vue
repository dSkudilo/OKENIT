<template>
  <form @submit.prevent="onSubmit" class="mt-5">
    <h4>Create comment</h4>
    <div class="mb-3">
      <label
        for="exampleFormControlInput1"
        class="form-label"
      >Email address</label>
      <input
        type="email"
        class="form-control"
        id="exampleFormControlInput1"
        v-model="email"
        placeholder="name@example.com">
    </div>
    <div class="mb-3">
      <label
        for="exampleFormControlInput1"
        class="form-label"
      >Title</label>
      <input
        type="text"
        class="form-control"
        id="exampleFormControlInput1"
        v-model="name"
        placeholder="name@example.com">
    </div>
    <div class="mb-3">
      <label
        for="exampleFormControlTextarea1"
        class="form-label"
      >Text</label>
      <textarea
        class="form-control"
        id="exampleFormControlTextarea1"
        rows="3"
        v-model="body"
      ></textarea>
    </div>
    <button
      type="submit"
      class="btn btn-primary"
      @click="onSubmit"
    >send</button>
  </form>
</template>

<script>
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
export default {
  emits: ['send'],
  setup (_, { emit }) {
    const { handleSubmit } = useForm()
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
        .required('Пожалуйста введите пароль')
        .min(MIN_LENGTH_TITLE, `Пароль не может быть меньше ${MIN_LENGTH_TITLE} символов`)
    )
    const MIN_LENGTH_BODY = 10
    const { value: body, errorMessage: bError, handleBlur: bBlur } = useField(
      'body',
      yup
        .string()
        .trim()
        .required('Пожалуйста комментарий пароль')
        .min(MIN_LENGTH_BODY, `Комментарий не может быть меньше ${MIN_LENGTH_BODY} символов`)
    )
    const onSubmit = handleSubmit(values => {
      emit('send', values)
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
      onSubmit
    }
  }
}
</script>
