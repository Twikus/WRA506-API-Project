import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import MovieView from '../views/Movie/MovieView.vue'
import MovieFileView from '../views/Movie/MovieFileView.vue'
import ActorView from '../views/Actor/ActorView.vue'
import ActorFileView from '../views/Actor/ActorFileView.vue'
import ActorUpdateView from '../views/Actor/CRUD/ActorUpdateView.vue'
import CategoryView from '../views/Category/CategoryView.vue'
import CategoryFileView from '../views/Category/CategoryFileView.vue'
import CategoryUpdateView from '../views/Category/CRUD/CategoryUpdateView.vue'

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
      path: '/actor/:id/update',
      name: 'actor-update',
      component: ActorUpdateView
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
    {
      path: '/category/:id/update',
      name: 'category-update',
      component: CategoryUpdateView
    },
  ]
})

export default router
