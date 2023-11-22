<script setup lang="ts">
import { onMounted, onBeforeMount, ref, computed } from 'vue'
import axios from 'axios';
import MovieCard from '../../components/MovieCard.vue';

const movies = ref([]);
const search = ref('');

const currentPage = ref(1);
const totalPages = ref(0);
const itemsPerPage = 30;

const token = localStorage.getItem('token');

onBeforeMount(() => {
    if (!token) {
        location.href = '/login'
    }
})

onMounted(async () => {
    await fetchMovies(currentPage.value);
})

const fetchMovies = async (page) => {
    const response = await axios.get(`https://localhost:8000/api/movies?page=${page}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    movies.value = response.data['hydra:member'];

    // Pagination
    const totalCount = response.data['hydra:totalItems'];
    totalPages.value = Math.ceil(totalCount / itemsPerPage);
    currentPage.value = page;
}

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        fetchMovies(currentPage.value);
    }
}

const previousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
        fetchMovies(currentPage.value);
    }
}

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
        <div class="pagination">
            <button @click="previousPage" :disabled="currentPage <= 1">Précédent</button>
            <span>{{ currentPage }} / {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage >= totalPages">Suivant</button>
        </div>
        <div class="container-movies">
            <div v-if="!movies">Chargement en cours...</div>
            <MovieCard v-else v-for="movie in moviesFiltered" :key="movie.id" :movie="movie" class="movie"/>
        </div>
    </div>
</template>