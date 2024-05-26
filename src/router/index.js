import { createRouter, createWebHashHistory } from "vue-router";
import AboutView    from "@/views/About.vue";
import RadioView    from "@/views/Radio.vue";
import ScheduleView from "@/views/Schedule.vue";
import CuratorsView from "@/views/Curators.vue";
import ShopView     from "@/views/Shop.vue";
import TermsView    from "@/views/Terms.vue";
import PrivacyView  from "@/views/Privacy.vue";
import CuratorView  from "@/views/Curator.vue";

const routes = [
  {
    path: "/about",
    name: "about",
    component: AboutView,
    meta: {
      title: "ROVR - About"
    }
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
    meta: {
      title: "ROVR - Schedule"
    }
  },
  {
    path: "/curators",
    name: "curators",
    component: CuratorsView,
    meta: {
      title: "ROVR - Curators"
    }
  },
  {
    path: "/curator/:name",
    name: "curator",
    component: CuratorView,
    props: route => ({ name: route.params.name.replace(/-/g, ' ') }),
    meta: {
        title: route => `ROVR - ${route.params.name.replace(/-/g, ' ')}`
    }
  },
  {
    path: "/shop",
    name: "shop",
    component: ShopView,
    meta: {
      title: "ROVR - Shop"
    }
  },
  {
    path: "/terms",
    name: "terms",
    component: TermsView,
    meta: {
      title: "ROVR - Terms & Conditions"
    }
  },
  {
    path: "/privacy",
    name: "privacy",
    component: PrivacyView,
    meta: {
      title: "ROVR - Privacy Notice"
    }
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to) => {
  if (to.name === 'curator' && to.params.name) {
    const curatorName = to.params.name.replace(/-/g, ' ');
    document.title = `ROVR - ${curatorName}`;
  } else {
    document.title = to.meta?.title ?? "ROVR - Radio Reinvented";
  }
});


export default router;