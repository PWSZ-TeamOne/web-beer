import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login";
import Register from "@/components/Register";
import MeetingsIndex from "@/components/Meetings/Index";
import MeetingsCreate from "@/components/Meetings/Create";
import MeetIndex from "@/components/Meetings/Item";
import BeersCreate from "@/components/Beers/Create";
import MeetingStats from "@/components/Rates/Index";

Vue.use(Router);

export default new Router({
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
      path: "/beer/create",
      name: "BeersCreate",
      component: BeersCreate
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
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    }
  ]
});
