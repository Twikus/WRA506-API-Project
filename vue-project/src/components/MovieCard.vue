<script setup lang="ts">
import { RouterLink } from 'vue-router';

defineProps(['movie']);

function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('fr-FR', options);
}
</script>

<template>
    <div>
        <p>{{ movie.title }}</p>
        <p>{{ movie.description }}</p>
        <p>{{ formatDate(movie.releaseDate) }}</p>
        <p>{{ movie.duration }} minutes</p>
        <RouterLink :to="{ name: 'movie-file', params: { id: movie.id } }">Fiche complète</RouterLink>
    </div>
</template>

<style lang="scss">
    .container-list-movies {
        text-align: center;
        .container-movies {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
        }

        .movie {
            width: 300px;
            height: 300px;
            border: 1px solid rgb(35, 35, 35);
            background-color: rgb(35, 35, 35);
            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.35);
            border-radius: 5px;
            margin: 10px;
            padding: 10px;
        }
    }
</style>