import { createRouter, createWebHashHistory } from "vue-router";
import { deslugify } from '@/utils/slugify';
import { nextTick } from 'vue';
import AboutView    from "@/views/About.vue";
import RadioView    from "@/views/Radio.vue";
import ScheduleView from "@/views/Schedule.vue";
import CuratorsView from "@/views/Curators.vue";
import ArchiveVue   from "@/views/Archive.vue";
import ArchiveShowVue from "@/views/ArchiveShow.vue";
import ShopView     from "@/views/Shop.vue";
import TermsView    from "@/views/Terms.vue";
import PrivacyView  from "@/views/Privacy.vue";
import CuratorView  from "@/views/Curator.vue";
import Event101024View from "@/views/Event-10-10-24.vue";

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
    props: route => ({ name: deslugify(route.params.name) }),
    meta: {
      title: "ROVR - 1"
    }
  },
  {
    path: "/archive",
    name: "archive",
    component: ArchiveVue,
    props: (route) => ({ curator: route.query.curator }),
    meta: {
      title: "ROVR - Archive"
    }
  },
  {
    path: "/show/:publisher_id",
    name: "show",
    component: ArchiveShowVue,
    props: route => ({ publisher_id: route.params.publisher_id }),
    meta: {
      title: "ROVR - Archive show"
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
    path: "/privacy",
    name: "privacy",
    component: PrivacyView,
    meta: {
      title: "ROVR - Privacy Notice"
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
    path: "/event-10-10-24",
    name: "event-10-10-24",
    component: Event101024View,
    meta: {
      title: "ROVR - Terms & Conditions"
    }
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === 'curator' && to.params.name) {
    const curatorName = deslugify(to.params.name);
    document.title = `ROVR - ${curatorName}`;
  } else {
    document.title = to.meta?.title ?? "ROVR - Radio Reinvented";
  }

  if (from.name === 'curators') {
    sessionStorage.setItem('scrollPosition', parseInt(document.querySelector('.main').scrollTop));
  }

  next();
});


router.afterEach((to, from) => {
  if (to.name === 'curators' && from.name === 'curator') {
    const savedPosition = sessionStorage.getItem('scrollPosition');
    if (savedPosition) {
      const restoreScroll = () => {
        const mainElement = document.querySelector('.main');
        if (mainElement) {
          mainElement.scrollTop = parseInt(savedPosition);
          sessionStorage.removeItem('scrollPosition');
        } else {
          requestAnimationFrame(restoreScroll);
        }
      };
      nextTick(() => {
        requestAnimationFrame(restoreScroll);
      });
    }
  }
});


export default router;