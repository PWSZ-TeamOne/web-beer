import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      userId: null,
      email: null,
      role: null
    },
  },
  getters: {
    getUser: state => state.user,
    getPeerUser: state => state.currentPeerUser,
    getPeerUserNickanme: state => state.currentPeerUserNickname,
    getChatId: state => state.chatId,
  },
  mutations: {
    storeUser(state, data) {
      state.user = data
    },
    logoutUser(state, data) {
      state.notification = data;
      state.user = data;
    },
  },
  actions: {
    setSession({
      commit
    }, data) {
      commit('storeUser', data)
    },
    logout({
      commit
    }, data) {
      commit('logoutUser', data)
    }
  }
})