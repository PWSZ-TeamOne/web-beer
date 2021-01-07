<template>
  <div>
    <div class="d-flex align-items-center login-box">
      <div class="m-auto">
        <h2>{{ this.text }}</h2>
        <br /><!--
        <div class="md-form mb-5 text-left">
          <i class="fas fa-user prefix grey-text"></i>
          <label for="nickname">Email</label>
          <input
            type="email"
            ref="email"
            id="email"
            class="form-control"
            v-model="email"
            required
          />
        </div>
        <div class="md-form mb-5 text-left">
          <i class="fas fa-user prefix grey-text"></i>
          <label for="nickname">Hasło</label>
          <input
            type="password"
            ref="password"
            id="password"
            class="form-control"
            v-model="password"
            required
          />
        </div>
        <button @click="login" id="login" class="btn-lg">Zaloguj</button><br><br>
        <router-link to="/register">
          <button id="login" class="btn-sm btn-info">Rejestracja</button>
        </router-link> -->
        <section id="firebaseui-auth-container"></section>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import store from "../store";
export default {
  name: "Login",
  data() {
    return {
      text: "Login with Facebook",
      password: null,
      email: null,
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(async (result) => {
          let user = result.user;
          if (user) {
            firebase
              .firestore()
              .collection("users")
              .where("userId", "==", user.uid)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach(function (doc) {
                  const userData = doc.data();
                  store.dispatch("setSession", userData);
                });
                this.alert("Logowanie prawidłowe!", "success");
                this.$router.push("/meetings").catch(()=>{});
              });
          }
        })
        .catch(() => {
          this.alert("Logowanie nie prawidłowe, złe dane!", "error");
        });
    },
  },
  mounted() {
      const uiConfig = {
        signInOptions: [
          firebase.auth.FacebookAuthProvider.PROVIDER_ID
        ]
      }

      if(firebaseui.auth.AuthUI.getInstance()) {
        const ui = firebaseui.auth.AuthUI.getInstance()
        ui.start('#firebaseui-auth-container', uiConfig)
      } else {
        const ui = new firebaseui.auth.AuthUI(firebase.auth())
        ui.start('#firebaseui-auth-container', uiConfig)
      }
  },
  created() {
      firebase.auth().onAuthStateChanged(user => {
           if (user) {
              const userData = {
                email:user.email,
                userId:user.uid
              }
              store.dispatch("setSession", userData).then(() =>{
                this.$router.push("meetings");
              });
           }
      })
  }
};
</script>

<style scoped>
.login-box {
  height: 100vh;
}
</style>
