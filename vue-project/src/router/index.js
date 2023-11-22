import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import MovieView from '../views/MovieView.vue'
import MovieFileView from '../views/MovieFileView.vue'
import ActorView from '../views/ActorView.vue'
import ActorFileView from '../views/ActorFileView.vue'
import CategoryView from '../views/CategoryView.vue'
import CategoryFileView from '../views/CategoryFileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/movie',
      name: 'movie',
      component: MovieView
    },
    {
      path: '/movie/:id',
      name: 'movie-file',
      component: MovieFileView
    },
    {
      path: '/actor',
      name: 'actor',
      component: ActorView
    },
    {
      path: '/actor/:id',
      name: 'actor-file',
      component: ActorFileView
    },
    {
      path: '/category',
      name: 'category',
      component: CategoryView
    },
    {
      path: '/category/:id',
      name: 'category-file',
      component: CategoryFileView
    },
  ]
})

export default router
