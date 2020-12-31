<template>
  <div id="app" data-app>
    <flash-message
      transitionIn="animated swing"
      class="alert-box"
    ></flash-message>
    <div class="main-wrapper">
      <div class="navbar-bg"></div>
      <b-navbar
        toggleable="lg"
        type="dark"
        variant="info"
        v-if="this.$store.state.logged !== null"
      >
        <b-navbar-brand>Menu</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item>
              <router-link class="nav-link" to="/meetings">Mettings</router-link>
            </b-nav-item >
            <b-nav-item @click="logout" class="nav-link">Logout</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <div class="main-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
import store from "./store";
export default {
  name: "App",
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          store.dispatch("logout", null);
          this.info = "nie zalogowany";
          console.log("logged out" + this.$store.state.admin);
          this.$router.push("/");
        });
    },
  },
  created: function () {
    if (this.$store.state.logged !== null) {
      this.$router.push("/users").catch(()=>{});;
    } else {
      this.$router.push("/");
    }
  },
};
</script>

<style>
@import 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900';
@import 'https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css';
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
button {
  background-color: #2c3e50;
  border: 1px solid #2c3e50;
  padding: 15px;
  color: white;
  cursor: pointer;
  transition: background-color 300ms cubic-bezier(0.785, 0.135, 0.15, 0.86);
}
button:hover {
  background-color: white;
  color: black;
}
html {
  overflow-x: hidden;
}
body {
  background-color: white !important;
  font-family: "Montserrat", sans-serif !important;
  min-height: 100vh;
}
.mobile-close {
  display: none;
}
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  width: 5px;
  background: #f5f5f5;
}
::-webkit-scrollbar-thumb {
  width: 1em;
  background-color: #ddd;
  outline: 1px solid slategrey;
  border-radius: 1rem;
}
.text-small {
  font-size: 0.9rem;
}
.messages-box,
.chat-box {
  height: 95vh;
  overflow-y: scroll;
}
.rounded-lg {
  border-radius: 0.5rem;
}
input::placeholder {
  font-size: 0.9rem;
  color: #999;
}
.button-div {
  display: none !important;
  position: absolute;
  top: 0;
  right: 0;
  padding: 1rem;
  z-index: 1001;
}
a {
  cursor: pointer;
}
.list-group-item-light.list-group-item-action.active {
  color: #fff;
  background-color: black !important;
  border-color: black !important;
}
.alert-box {
  position: fixed;
  z-index: 1051;
  right: 10px;
  top: 10px;
}
.alert-box .danger {
  background: #a94442 !important;
}
@media (max-width: 991px) {
  .chat-box {
    height: 90vh;
    overflow-y: scroll;
  }
  .mobile-close {
    display: block;
    position: absolute;
    right: 20px;
  }
  .messages-div {
    display: none;
    z-index: 1002;
  }
  .messages-div.active {
    max-width: 100% !important;
    width: 100vw !important;
    flex: 100% !important;
    display: block;
  }
  .chat-div {
    max-width: 100% !important;
  }
  .button-div {
    display: block !important;
  }
  .flash__message {
    position: fixed !important;
    z-index: 10001;
    right: 10px !important;
    top: 10px !important;
    display: flex;
    align-items: center;
    color: white;
    padding: 10px;

  }
}
</style>
