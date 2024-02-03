<script setup lang="ts">
import MovieCard from '../components/MovieCard.vue';
import ActorCard from '../components/ActorCard.vue';
import { onMounted, ref } from 'vue'
import axios from 'axios';

const movies = ref([]);
const actors = ref([]);

const token = localStorage.getItem('token');

onMounted(async () => {
    const responseMovies = await axios.get('https://localhost:8000/api/movies?page=1', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    movies.value = responseMovies.data['hydra:member'].map((movie: any) => {
        return {
            id: movie.id,
            title: movie.title,
            description: movie.description,
            releaseDate: movie.releaseDate,
            duration: movie.duration,
            category: movie.category,
            actors: movie.actors,
            mediaObjects: movie.mediaObjects,
        }
    }).slice(0, 4);

    const responseActors = await axios.get('https://localhost:8000/api/actors?page=1', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    actors.value = responseActors.data['hydra:member'].map((actor: any) => {
        return {
            id: actor.id,
            firstName: actor.firstName,
            lastName: actor.lastName,
            movies: actor.movies,
        }
    }).slice(0, 4);
})
</script>

<template>
    <div class="container-home">
        <h1>Accueil</h1>

        <div class="container-list-movies">
            <h2>Films du moment</h2>
            <div class="container-movies">
                <div v-if="!movies">Chargement en cours...</div>
                <MovieCard v-else v-for="movie in movies" :key="movie.id" :movie="movie" class="movie"/>
            </div>
        </div>

        <div class="container-list-actors">
            <h2>Acteurs du moment</h2>
            <div class="container-actors">
                <div v-if="!actors">Chargement en cours...</div>
                <ActorCard v-else v-for="actor in actors" :key="actor.id" :actor="actor" class="actor" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .container-home {
        text-align: center;

        .container-list-movies {
            margin-top: 30px;
        }
    }

</style>