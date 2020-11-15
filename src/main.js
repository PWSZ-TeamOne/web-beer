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
  apiKey: "AIzaSyD_leXc0RXQiANmSNPUHj5x6Snk-RCYIg4",
  authDomain: "web-beer-8373c.firebaseapp.com",
  databaseURL: "https://web-beer-8373c.firebaseio.com",
  projectId: "web-beer-8373c",
  storageBucket: "web-beer-8373c.appspot.com",
  messagingSenderId: "453391520452",
  appId: "1:453391520452:web:a6871718bee92faa4faf91",
  measurementId: "G-ZPQJR1BY67"
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
