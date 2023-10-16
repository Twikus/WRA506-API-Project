<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container-primary">
    <header class="header">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/movie">Films</RouterLink>
        <RouterLink to="/actor">Acteurs</RouterLink>
        <RouterLink to="/category">Categories</RouterLink>
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
      }
    }
  }
}

</style>

