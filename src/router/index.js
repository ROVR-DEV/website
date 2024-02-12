import { createRouter, createWebHashHistory } from "vue-router";
import AboutView from "@/views/About.vue";
import RadioView from "@/views/Radio.vue";
import ScheduleView from "@/views/Schedule.vue";
import CuratorsView from "@/views/Curators.vue";

const routes = [
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/radio",
    name: "radio",
    component: RadioView,
    alias: "/"
  },
  {
    path: "/schedule",
    name: "schedule",
    component: ScheduleView,
  },
  {
    path: "/curators",
    name: "curators",
    component: CuratorsView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;