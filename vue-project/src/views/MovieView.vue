<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios';
import MovieCard from '../components/MovieCard.vue';

const films = ref([]);

onMounted(async () => {
    const response = await axios.get('https://localhost:8000/api/movies?page=1');
    films.value = response.data['hydra:member'];
})
    ;
</script>

<template>
    <div class="container-list-movies">
        <h1>Liste des films</h1>
        <div class="container-movies">
            <div v-if="!films">Chargement en cours...</div>
            <MovieCard v-else v-for="film in films" :key="film.id" :film="film" class="movie"/>
        </div>
    </div>
</template>

<style scoped>
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