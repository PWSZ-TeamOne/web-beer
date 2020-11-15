import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import { sync } from 'vuex-router-sync'
import VueFlashMessage from 'vue-flash-message'

const firebaseConfig = {
  apiKey: "###",
  authDomain: "###",
  databaseURL: "###",
  projectId: "###",
  storageBucket: "###",
  messagingSenderId: "###",
  appId: "###",
  measurementId: "###"
};

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
window.db = db;

var database = firebase.database();
window.database = database;

sync(store, router);

Vue.config.productionTip = false
Vue.use(VueFlashMessage);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
