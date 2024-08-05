import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './views/LoginPage.vue';
import MainPage from './views/MainPage.vue';
import RegisterPage from './views/RegisterPage.vue';

const routes = [
  { path: '/', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/main', name: 'main', component: MainPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;
