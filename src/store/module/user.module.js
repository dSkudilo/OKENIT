import axios from '@/axios/api'
export default {
  namespaced: true,
  state () {
    return {
      users: [],
      user: {}
    }
  },
  mutations: {
    setUsers (state, users) {
      state.users = users
    },
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
    async getUsers ({ commit, dispatch }) {
      try {
        const { data } = await axios.get('/users')
        commit('setUsers', data)
      } catch (error) {
        dispatch('setMessage', {
          value: error.message,
          type: 'danger'
        }, { root: true })
      }
    },
    async getUserById ({ commit, dispatch }, userId) {
      try {
        const { data } = await axios.get(`/users?id=${userId}`)
        commit('setUser', ...data)
      } catch (error) {
        dispatch('setMessage', {
          value: error.message,
          type: 'danger'
        }, { root: true })
      }
    }
  },
  getters: {
    users (state) {
      return state.users
    },
    user (state) {
      return state.user
    }
  }
}
