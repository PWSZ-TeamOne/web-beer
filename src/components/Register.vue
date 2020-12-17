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
        <router-link to="/">
          <button id="login" class="btn-sm btn-info">Zaloguj się!</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import alert from "../mixins/alert";
import store from "../store";
export default {
  name: "Register",
  mixins: [alert],
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
              firstName: "Kamil",
              lastName: "Piech",
              avatar: "https://scontent-atl3-2.xx.fbcdn.net/v/t1.30497-1/c29.0.100.100a/p100x100/84628273_176159830277856_972693363922829312_n.jpg?_nc_cat=1&ccb=2&_nc_sid=12b3be&_nc_ohc=5zieHBn2lfEAX9c-AJw&_nc_ht=scontent-atl3-2.xx&tp=27&oh=d4bfe4bc86ddf5eff4cb54254d8bfc57&oe=5FECAC75",
            })
            .then((docRef) => {
              let loginData = {
                userId: result.user.uid,
                email: result.user.email,
                role: result.user.role,
              };
              store.dispatch("setSession", loginData);
              this.$router.push({ path: "/users" });
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
