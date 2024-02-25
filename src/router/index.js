import { createRouter, createWebHashHistory } from "vue-router";
import AboutView    from "@/views/About.vue";
import RadioView    from "@/views/Radio.vue";
import ScheduleView from "@/views/Schedule.vue";
import CuratorsView from "@/views/Curators.vue";
import ShopView     from "@/views/Shop.vue";
import TermsView    from "@/views/Terms.vue";
import PrivacyView  from "@/views/Privacy.vue";

const routes = [
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/",
    name: "radio",
    component: RadioView,
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
  {
    path: "/shop",
    name: "shop",
    component: ShopView,
  },
  {
    path: "/terms",
    name: "terms",
    component: TermsView,
  },
  {
    path: "/privacy",
    name: "privacy",
    component: PrivacyView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;