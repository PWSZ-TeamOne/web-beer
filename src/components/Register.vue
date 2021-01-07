<template>
  <div>
    <flash-message
      transitionIn="animated swing"
      class="alert-box"
    ></flash-message>
    <div class="d-flex align-items-center login-box">
      <div class="m-auto">
        <h2>{{ this.text }}</h2>
        <p class="text-danger">{{ this.info }}</p>
        <br />
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
        <button @click="register" id="register" class="btn-lg">
          Zarejestruj
        </button>
        <br />
        <br />
        <router-link to="/login">
          <button id="login" class="btn-sm btn-info">Zaloguj się!</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import store from "../store";
export default {
  name: "Register",
  data() {
    return {
      text: "Rejestracja",
      info: "",
      password: null,
      email: null,
    };
  },
  methods: {
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(async (result) => {
          firebase
            .firestore()
            .collection("users")
            .doc(result.user.uid)
            .set({
              userId: result.user.uid,
              email: this.email,
              active: 1,
            })
            .then(() => {
              let user = {
                userId: result.user.uid,
                email: result.user.email,
              };
              store.dispatch("setSession", user);
              this.$router.push({ path: "/meetings" });
            })
            .catch(() => {
              this.alert("Rejestracja nie prawidłowa!", "error");
            });
        })
        .catch(() => {
          this.alert("Rejestracja nie prawidłowa!", "error");
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-box {
  height: 100vh;
}
</style>
