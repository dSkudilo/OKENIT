import axios from '@/axios/api'
export default {
  namespaced: true,
  state () {
    return {
      comments: []
    }
  },
  mutations: {
    setComments (state, comments) {
      state.comments = comments
    },
    addComment (state, comment) {
      state.comments.push(comment)
    }
  },
  actions: {
    async getCommentsByPostId ({ commit, dispatch }, postId) {
      try {
        const { data } = await axios.get(`/comments?postId=${postId}`)
        commit('setComments', data)
      } catch (error) {
        dispatch('setMessage', {
          value: error.message,
          type: 'danger'
        }, { root: true })
      }
    },
    async addComment ({ commit, dispatch }, comment) {
      try {
        const { data } = await axios.post('/comments', comment)
        commit('addComment', data)
        console.log(data)
        dispatch('setMessage', {
          value: 'Комментарий отправлен !',
          type: 'primary'
        }, { root: true })
      } catch (error) {
        dispatch('setMessage', {
          value: error.message,
          type: 'danger'
        }, { root: true })
      }
    }
  },
  getters: {
    comments (state) {
      return state.comments
    }
  }
}
