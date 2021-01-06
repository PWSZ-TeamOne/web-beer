import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    user: {
      userId: null,
      email: null
    },
    logged:null,
    meetingId:null,
    editedBeerId:null,
    editedMeetingId:null,
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
    setEditedMeetingId(state, data) {
      state.editedMeetingId = data;
    },
    setEditedBeerId(state, data) {
      state.editedBeerId = data;
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
    setEditedMeetingId({
      commit
    }, data) {
      commit('setEditedMeetingId', data)
    },
    setEditedBeerId({
      commit
    }, data) {
      commit('setEditedBeerId', data)
    },
    logout({
      commit
    }, data) {
      commit('logoutUser', data)
    }
  }
});

export default store;
