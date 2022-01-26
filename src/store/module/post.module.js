import axios from '@/axios/api'
export default {
  namespaced: true,
  state () {
    return {
      posts: [],
      post: {}
    }
  },
  mutations: {
    setPosts (state, posts) {
      state.posts = posts
    },
    setPost (state, post) {
      state.post = post
    }
  },
  actions: {
    async getPosts ({ commit, dispatch }) {
      try {
        const { data } = await axios.get('/posts')
        commit('setPosts', data)
        dispatch('setMessage', {
          value: 'Посты загружены',
          type: 'primary'
        }, { root: true })
      } catch (error) {
        dispatch('setMessage', {
          value: error.message,
          type: 'danger'
        }, { root: true })
      }
    },
    async sortingPostsByUserId ({ commit, dispatch }, userId) {
      try {
        const { data } = await axios.get(`/posts?userId=${userId}`)
        commit('setPosts', data)
        dispatch('setMessage', {
          value: 'Посты успешно отсортированы',
          type: 'primary'
        }, { root: true })
      } catch (error) {
        dispatch('setMessage', {
          value: error.message,
          type: 'danger'
        }, { root: true })
      }
    },
    async getPostById ({ commit, dispatch }, postId) {
      try {
        const { data } = await axios.get(`/posts?id=${postId}`)
        commit('setPost', ...data)
      } catch (error) {
        dispatch('setMessage', {
          value: error.message,
          type: 'danger'
        }, { root: true })
      }
    }
  },
  getters: {
    posts (state) {
      return state.posts
    },
    post (state) {
      return state.post
    }
  }
}
