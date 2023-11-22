<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

const token = localStorage.getItem('token')

const logout = () => {
  localStorage.removeItem('token')
  location.href = '/login'
}
</script>

<template>
  <div class="container-primary">
    <header class="header">
      <nav>
        <RouterLink to="/">Accueil</RouterLink>
        <RouterLink to="/movie" v-if="token">Films</RouterLink>
        <RouterLink to="/actor" v-if="token">Acteurs</RouterLink>
        <RouterLink to="/category" v-if="token">Categories</RouterLink>
        <RouterLink to="/login" v-if="!token">Connexion</RouterLink>
        <a data-v-7a7a37b1 @click="logout" v-if="token">Déconnexion</a>
      </nav>
    </header>
  
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
.container-primary {
  width: 100%;
  height: 100%;

  .header {
    margin-bottom: 200px;

    nav {
      a {
        margin-right: 20px;
        cursor: pointer;
      }
    }
  }
}

</style>

