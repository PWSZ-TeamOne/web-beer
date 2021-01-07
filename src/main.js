import Vue from "vue";
import App from "./App";
import vuetify from '@/plugins/vuetify' // path to vuetify export
import router from "./router";
import store from "./store";
import firebase from "firebase";
import VueFlashMessage from 'vue-flash-message';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import moment from 'moment';

Vue.prototype.moment = moment;

require("firebase/firestore");
require('vue-flash-message/dist/vue-flash-message.min.css');
Vue.use(BootstrapVue);

var config = {
  apiKey: "AIzaSyBWMwv2we-I2SKMTssF8skuIsJdO1la1Tw",
  authDomain: "beer-app-a75df.firebaseapp.com",
  databaseURL: "https://beer-app-a75df.firebaseio.com",
  projectId: "beer-app-a75df",
  storageBucket: "beer-app-a75df.appspot.com",
  messagingSenderId: "840267988533",
  appId: "1:840267988533:web:c0bc65418d1bf61ca3bb7c"
};

Vue.mixin({
  methods: {
    alert(info, type) {
        this.flash(info, type, {
            timeout: 3000,
        });
    }
  }
})

firebase.initializeApp(config);

var db = firebase.firestore();
window.db = db;


Vue.config.productionTip = false;
Vue.use(VueFlashMessage);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
