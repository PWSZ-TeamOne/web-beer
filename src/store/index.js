import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    user: {
      userId: null,
      email: null,
      firstName: null,
      lastName: null,
    },
    logged:null,
    meetingId:null,
    meetingUserId:null
  },
  getters: {
    getUser: state => state.admin,
  },
  mutations: {
    storeUser(state, data) {
      state.user = data;
      state.logged = true;
    },
    logoutUser(state, data) {
      state.admin = data;
      state.logged = null;
    },
    setMeetingId(state, data) {
      state.meetingId = data;
    },
    setMeetingUserId(state, data) {
      state.meetingUserId = data;
    },
  },
  actions: {
    setSession({
      commit
    }, data) {
      commit('storeUser', data)
    },
    setMeetingId({
      commit
    }, data) {
      commit('setMeetingId', data)
    },
    setMeetingUserId({
      commit
    }, data) {
      commit('setMeetingUserId', data)
    },
    logout({
      commit
    }, data) {
      commit('logoutUser', data)
    }
  }
})
