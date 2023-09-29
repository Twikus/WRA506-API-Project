<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container-primary">
    <header class="header">
      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </header>
  
    <RouterView />
  </div>
</template>

<style scoped>
.container-primary {
  width: 100%;
  height: 100%;

  .header {
    margin-bottom: 200px;
  }
}

</style>

