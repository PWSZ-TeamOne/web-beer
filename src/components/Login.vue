<template>
  <div>
    <div class="d-flex align-items-center login-box">
      <div class="m-auto">
        <h2>{{ this.text }}</h2>
        <br />
        <section id="firebaseui-auth-container"></section>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import * as firebaseui from "firebaseui";
import logoutUser from "@/mixins/logoutUser";
import "firebaseui/dist/firebaseui.css";
import store from "../store";
export default {
  name: "Login",
  mixins: [logoutUser],
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
                this.$router.push("/meetings").catch(() => {});
              });
          }
        })
        .catch(() => {
          this.alert("Logowanie nie prawidłowe, złe dane!", "error");
        });
    },
    async checkUser(data) {
      const userRef = firebase.firestore().collection("users").doc(data.userId);
      const doc = await userRef.get();
      if (doc.exists) {
        this.checkActivityUser(doc.data().active, data);
      } else {
        this.storeUser(data);
        this.dispatchAndRedirect(data);
      }
    },
    checkActivityUser(active, data) {
      if (active === true) {
        this.dispatchAndRedirect(data);
      } else {
        this.alert(
          "Your account is not active, contact with administrator!",
          "error"
        );
        this.logout();
      }
    },
    storeUser(data) {
      firebase.firestore().collection("users").doc(data.userId).set({
        userId: data.userId,
        email: data.email,
        active: true,
      });
    },
    dispatchAndRedirect(data) {
      store.dispatch("setSession", data).then(() => {
        this.alert("Logged in!", "success");
        this.$router.push("meetings");
      });
    },
  },
  mounted() {
    const uiConfig = {
      signInOptions: [firebase.auth.FacebookAuthProvider.PROVIDER_ID],
    };
    if (firebaseui.auth.AuthUI.getInstance()) {
      const ui = firebaseui.auth.AuthUI.getInstance();
      ui.start("#firebaseui-auth-container", uiConfig);
    } else {
      const ui = new firebaseui.auth.AuthUI(firebase.auth());
      ui.start("#firebaseui-auth-container", uiConfig);
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userData = {
          email: user.email,
          userId: user.uid,
        };
        this.checkUser(userData);
      }
    });
  },
};
</script>

<style scoped>
.login-box {
  height: 100vh;
}
</style>
