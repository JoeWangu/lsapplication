import { RouteRecordRaw } from 'vue-router';
// import CustomerPage from 'pages/CustomerPage.vue';
// import ProjectPage from 'pages/ProjectPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      // { path: 'customers', component: () => import('pages/CustomerPage.vue') },
      { path: 'projects', component: () => import('pages/ProjectPage.vue') },
      { path: 'settings', component: () => import('pages/SettingsPage.vue') },
      // { path: '', component: () => import('pages/ProjectPage.vue') },
      // {
      //   path: '/customers',
      //   component: CustomerPage, // Route to Customer Page
      // },
      // {
      //   path: '/projects',
      //   component: ProjectPage, // Route to Project Page
      // }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
