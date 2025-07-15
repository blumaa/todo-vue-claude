import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Root',
    redirect: '/list-pending',
    children: [
      {
        path: '/list-pending',
        component: () => import('./PageListPendingItems.vue'),
      },
      {
        path: '/list-done',
        component: () => import('./PageListDoneItems.vue'),
      },
      {
        path: '/create',
        // TODO: Create page to make new items
        component: () => import('./PageCreateItem.vue'),
      },
      {
        path: '/edit/:id',
        // TODO: Create page to edit items
        // component: () => import('./*.vue')
      },
    ],
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
