<script setup>
import { RouterLink } from 'vue-router';

defineProps(['film']);

function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('fr-FR', options);
}
</script>

<template>
    <div>
        <p>{{ film.title }}</p>
        <p>{{ film.description }}</p>
        <p>{{ formatDate(film.releaseDate) }}</p>
        <p>{{ film.duration }} minutes</p>
        <RouterLink :to="{ name: 'movie-file', params: { id: film.id } }">Fiche complète</RouterLink>
    </div>
</template>