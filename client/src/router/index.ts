import { createRouter, createWebHistory } from 'vue-router';
// import homeView from '@/views/HomeView.vue';
// import MemberAreaView from '@/views/MemberAreaView.vue';
import LoginView from '@/views/LoginView.vue';
import TestingAreaView from '@/views/TestingAreaView.vue';
// import AdministratorAreaView from '@/views/AdministratorView.vue';
// import Register from '@/modules/Register/Register.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginView,
      meta: {
        title: 'Technical Testing Area || Hashmicro Recruitment',
        description:
          'Aplikasi ini dibuat khusus untuk memenuhi technical testing yang diberikan oleh Hashmicro dalam rangka proses rekrutmen calon karyawan. Platform ini digunakan untuk menguji kemampuan teknis peserta, termasuk pengembangan fitur, manipulasi data, dan pemahaman framework modern seperti Vue 3 dan Node.js. Semua data yang ada bersifat simulasi dan aplikasi ini tidak untuk penggunaan umum atau komersial.',
      },
    },
    {
      path: '/testing-area',
      name: 'admin-testing-login',
      component: TestingAreaView,
      meta: {
        title: 'Admin Testing Area || Hashmicro Technical Test',
        description:
          'Area khusus untuk peserta technical testing Hashmicro. Digunakan untuk menguji kemampuan teknis peserta dalam pengembangan fitur, manipulasi data, dan penggunaan framework modern. Semua data bersifat simulasi dan aplikasi ini hanya untuk tujuan rekrutmen internal.',
      },
    },
  ],
});

export default router;
