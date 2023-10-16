<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import axios from 'axios';
import MovieCard from '../components/MovieCard.vue';

const movies = ref([]);
const search = ref('');

onMounted(async () => {
    const response = await axios.get('https://localhost:8000/api/movies?page=1');
    movies.value = response.data['hydra:member'];
})

const moviesFiltered = computed(() => {
    return movies.value.filter((movie) => {
        return movie.title.toLowerCase().includes(search.value.toLowerCase());
    });
})
</script>

<template>
    <div class="container-list-movies">
        <h1>Liste des Films</h1>
        <input type="text" class="searchbar" v-model="search">
        <div class="container-movies">
            <div v-if="!movies">Chargement en cours...</div>
            <MovieCard v-else v-for="movie in moviesFiltered" :key="movie.id" :movie="movie" class="movie"/>
        </div>
    </div>
</template>