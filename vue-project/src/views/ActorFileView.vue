<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios';
import { useRoute } from 'vue-router';

const actor = ref()

const $route = useRoute();
const id = $route.params.id;

onMounted(async () => {
    const response = await axios.get(`https://localhost:8000/api/actors/${id}`);
    actor.value = response.data;

})
    ;
</script>

<template>
    <div>
        <h1>Fiche de l'acteur</h1>
        <div v-if="actor">
            <p>Prénom: {{ actor.firstName }}</p>
            <p>Nom: {{ actor.lastName }}</p>
            <p>Films: <ul>
                <li v-for="movie in actor.movies">
                    <RouterLink :to="{ name: 'movie-file', params: { id: movie.id } }">{{ movie.title }}</RouterLink>
                </li>
            </ul></p>
        </div>
    </div>
</template>