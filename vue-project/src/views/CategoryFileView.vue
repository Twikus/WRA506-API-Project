<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios';
import { useRoute } from 'vue-router';

const category = ref()

const $route = useRoute();
const id = $route.params.id;

onMounted(async () => {
    const response = await axios.get(`https://localhost:8000/api/categories/${id}`);
    category.value = response.data;

})
    ;
</script>

<template>
    <div>
        <h1>Fiche de la catégorie</h1>
        <div class="container-movie" v-if="category">
            <p>Nom: {{ category.name }}</p>
            <p>Films: <ul>
                <li v-for="film in category.movies" :key="film.id">
                    <RouterLink :to="{ name: 'movie-file', params: { id: film.id } }">{{ film.title }}</RouterLink>
                </li>
            </ul></p>
        </div>
    </div>
</template>

<style scoped lang="scss">
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