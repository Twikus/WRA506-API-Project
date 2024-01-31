<script setup lang="ts">
import { RouterLink } from 'vue-router';

defineProps(['category']);
</script>

<template>
    <div>
        <p>{{ category.name }}</p>
        <RouterLink :to="{ name: 'category-file', params: { id: category.id } }">Fiche complète</RouterLink>
    </div>
</template>