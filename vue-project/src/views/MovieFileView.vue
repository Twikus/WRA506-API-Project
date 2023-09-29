<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios';
import { useRoute } from 'vue-router';

const film = ref()

const $route = useRoute();
const id = $route.params.id;

onMounted(async () => {
    const response = await axios.get(`https://localhost:8000/api/movies/${id}`);
    film.value = response.data;

})

function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('fr-FR', options);
}
    ;
</script>

<template>
    <div>
        <h1>Fiche du film</h1>
        <div class="container-movie" v-if="film">
            <p>Catégorie:  <RouterLink :to="{ name: 'category-file', params: { id: film.category.id } }">{{ film.category.name }}</RouterLink></p>
            <br>
            <p>Titre: {{ film.title }}</p>
            <p>Description: {{ film.description }}</p>
            <p>Date de sortie: {{ formatDate(film.releaseDate) }}</p>
            <p>Durée: {{ film.duration }} minutes</p>
            <br>
            <p>Acteurs: <ul>
                <li v-for="actor in film.actors">
                    <RouterLink :to="{ name: 'actor-file', params: { id: actor.id } }">{{ actor.firstName }} {{ actor.lastName }}</RouterLink>
                </li>
            </ul></p>
        </div>
    </div>
</template>

<style scoped>
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
</style>