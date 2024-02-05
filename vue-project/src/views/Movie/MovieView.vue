<script setup lang="ts">
import { onMounted, onBeforeMount, ref, watch } from 'vue'
import axios from 'axios';
import MovieCard from '../../components/MovieCard.vue';

const movies = ref([]);
const categories = ref([]);
const category = ref('');
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
    await fetchCategories();
})

const fetchMovies = async (page: number) => {
    movies.value = [];

    try {
        // Utilisez le paramètre de recherche dans la requête API
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/movies?page=${page}&title=${search.value}&category.id=${category.value}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        console.log(`${import.meta.env.VITE_API_URL}/movies?page=${page}&title=${search.value}&category=${category.value}`);

        movies.value = response.data['hydra:member'];

        console.log(movies.value.length);

        // Extract total pages information from hydra:view
        const hydraView = response.data['hydra:view'];
        if (hydraView) {
            totalPages.value = extractTotalPages(hydraView);
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

const fetchCategories = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/categories`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        categories.value = response.data['hydra:member'];
    } catch (error) {
        console.error('Error fetching categories:', error);
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

watch(category, () => {
    currentPage.value = 1;
    fetchMovies(currentPage.value);
})
</script>

<template>
    <div class="container-list-movies">
        <h1>Liste des Films</h1>
        <input type="text" class="searchbar" v-model="search" placeholder="Rechercher par titre">
        <button @click="searchMovies">Rechercher</button><br>
        <select v-model="category">
            <option value="">Toutes les catégories</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
        <div class="container-movies" v-if="movies.length > 0">
            <div v-if="!movies">Chargement en cours...</div>
            <MovieCard v-else v-for="movie in movies" :key="movie.id" :movie="movie" class="movie" />
        </div>
        <div class="container-movies" v-else>
            <p>Aucuns films</p>
        </div>
        <div class="pagination">
            <button @click="previousPage" :disabled="currentPage <= 1">Précédent</button>
            <span>{{ currentPage }} / {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage >= totalPages">Suivant</button>
        </div>
    </div>
</template>
