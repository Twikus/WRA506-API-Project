<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue'
import axios from 'axios';
import { useRoute } from 'vue-router';

const category = ref()

const $route = useRoute();
const id = $route.params.id;

const token = localStorage.getItem('token');

onBeforeMount(() => {
    if (!token) {
        location.href = '/login'
    }
})

const fetchMovieDetails = async (movieIri: string) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}${movieIri}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch movie details:', error)
    }
}

onMounted(async () => {
    fetchCategory(id)
})

async function fetchCategory(id: number) {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/categories/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        category.value = response.data;

        // Fetch movie details
        category.value.movies = await Promise.all(category.value.movies.map(fetchMovieDetails));
    } catch (error) {
        console.error('Failed to fetch category:', error)
    }
}

const openUpdate = () => {
    location.href = `/category/${id}/update`
}

const deleteCategory = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/categories/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 204) {
                location.href = '/categories'
            }
        } catch (error) {
            console.error(error);
        }
    }
</script>

<template>
    <div>
        <h1>Fiche de la catégorie</h1>
        <div class="container-movie" v-if="category">
            <p>Nom: {{ category.name }}</p>
            <p>Films: 
                <ul>
                    <li v-for="film in category.movies" :key="film.id">
                        <RouterLink :to="{ name: 'movie-file', params: { id: film.id } }">{{ film.title }}</RouterLink>
                    </li>
                </ul>
            </p>
        </div>
        <button @click="openUpdate">Modifier</button><br>
        <button @click="deleteCategory">Supprimer</button><br><br>
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