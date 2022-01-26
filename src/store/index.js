import { createStore } from 'vuex'
import post from './module/post.module'
import comment from './module/comment.module'
import user from './module/user.module'

export default createStore({
  state () {
    return {
      message: null
    }
  },
  mutations: {
    setMessage (state, message) {
      state.message = message
    },
    clearMessage (state) {
      state.message = null
    }
  },
  actions: {
    setMessage ({ commit }, message) {
      commit('setMessage', message)
      setTimeout(() => commit('clearMessage'), 1000)
    }
  },
  modules: {
    post,
    comment,
    user
  }
})
