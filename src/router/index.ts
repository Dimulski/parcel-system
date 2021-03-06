import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/parcel/create',
    name: 'CreateParcel',
    component: () => import('@/views/CreateParcel.vue')
  },
  {
    path: '/parcel/:id',
    name: 'Parcel',
    component: () => import('@/views/Parcel.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
    meta: {
      layout: 'BlankBanshee'
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
