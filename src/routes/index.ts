import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Root',
    redirect: '/list-pending',
    children: [
      {
        path: 'list-pending',
        component: () => import('./PageListPendingItems.vue'),
      },
      {
        path: 'list-done',
        component: () => import('./PageListDoneItems.vue'),
      },
      {
        path: 'create',
        component: () => import('./PageCreateItem.vue'),
      },
      {
        path: 'edit/:id',
        component: () => import('./PageEditItem.vue'),
      },
    ],
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
