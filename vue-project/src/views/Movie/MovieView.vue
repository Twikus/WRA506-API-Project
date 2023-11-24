<script setup lang="ts">
import { onMounted, onBeforeMount, ref, computed } from 'vue'
import axios from 'axios';
import MovieCard from '../../components/MovieCard.vue';

const movies = ref([]);
const search = ref('');

const currentPage = ref(1);
const totalPages = ref(1);

const token = localStorage.getItem('token');

onBeforeMount(() => {
    if (!token) {
        location.href = '/login'
    }
})

onMounted(async () => {
    await fetchMovies(currentPage.value);
})

const fetchMovies = async (page: number) => {
    try {
        // Utilisez le paramètre de recherche dans la requête API
        const response = await axios.get(`https://localhost:8000/api/movies?page=${page}&title=${search.value}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        movies.value = response.data['hydra:member'];

        // Extract total pages information from hydra:view
        const hydraView = response.data['hydra:view'];
        if (hydraView) {
            totalPages.value = extractTotalPages(hydraView);
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

const extractTotalPages = (hydraView) => {
    const lastPageUrl = hydraView['hydra:last'];
    if (!lastPageUrl) {
        return 1;
    }

    // Extract the page number from the last page URL
    const match = lastPageUrl.match(/page=(\d+)$/);
    return match ? parseInt(match[1]) : 1;
}

const nextPage = () => {
    currentPage.value++;
    fetchMovies(currentPage.value);
}

const previousPage = () => {
    currentPage.value--;
    fetchMovies(currentPage.value);
}

const searchMovies = () => {
    currentPage.value = 1;
    fetchMovies(currentPage.value);
}
</script>

<template>
    <div class="container-list-movies">
        <h1>Liste des Films</h1>
        <input type="text" class="searchbar" v-model="search" placeholder="Rechercher par titre">
        <button @click="searchMovies">Rechercher</button>
        <div class="container-movies">
            <div v-if="!movies">Chargement en cours...</div>
            <MovieCard v-else v-for="movie in movies" :key="movie.id" :movie="movie" class="movie" />
        </div>
        <div class="pagination">
            <button @click="previousPage" :disabled="currentPage <= 1">Précédent</button>
            <span>{{ currentPage }} / {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage >= totalPages">Suivant</button>
        </div>
    </div>
</template>
