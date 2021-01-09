import firebase from "firebase";
import store from "@/store";
export default {
  methods: {
    logoutUser() {
      this.logout();
      this.infoAndRedirectAfterLogout();
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          store.dispatch("logout", null);
        });
    },
    infoAndRedirectAfterLogout() {
      this.alert('Logged out!', 'success')
      this.$router.push("/login");
    }
  }
}
