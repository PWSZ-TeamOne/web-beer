import Vue from "vue";
import store from "@/store";
import Router from "vue-router";
import Login from "@/components/Login";
import Register from "@/components/Register";
import MeetingsIndex from "@/components/Meetings/Index";
import MeetingsCreate from "@/components/Meetings/Create";
import MeetingsEdit from "@/components/Meetings/Edit";
import MeetIndex from "@/components/Meetings/Item";
import BeersCreate from "@/components/Beers/Create";
import BeersEdit from "@/components/Beers/Edit";
import MeetingStats from "@/components/Rates/Index";

Vue.use(Router);


const router = new Router({
  //mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/meetings",
      name: "MeetingsIndex",
      component: MeetingsIndex
    },
    {
      path: "/meetings/create",
      name: "MeetingsCreate",
      component: MeetingsCreate
    },
    {
      path: "/meetings/edit",
      name: "MeetingsEdit",
      component: MeetingsEdit
    },
    {
      path: "/beer/create",
      name: "BeersCreate",
      component: BeersCreate
    },
    {
      path: "/beer/edit",
      name: "BeersEdit",
      component: BeersEdit
    },
    {
      path: "/meet",
      name: "MeetIndex",
      component: MeetIndex
    },
    {
      path: "/stats",
      name: "MeetingStats",
      component: MeetingStats
    }
    // {
    //   path: "/register",
    //   name: "Register",
    //   component: Register
    // }
  ]
});

router.beforeEach((to, from, next) => {
  if ((to.name !== 'Login' && to.name !== 'Register')  && store.state.logged !== true) next({ name: 'Login' })
  else next()
});

export default router;
