<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios';
import MovieCard from '../components/MovieCard.vue';

const movies = ref([]);

onMounted(async () => {
    const response = await axios.get('https://localhost:8000/api/movies?page=1');
    movies.value = response.data['hydra:member'];
})
    ;
</script>

<template>
    <div class="container-list-movies">
        <h1>Liste des Films</h1>
        <div class="container-movies">
            <div v-if="!movies">Chargement en cours...</div>
            <MovieCard v-else v-for="movie in movies" :key="movie.id" :movie="movie" class="movie"/>
        </div>
    </div>
</template>