<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const movie = ref()

const $route = useRoute()
const id = $route.params.id

const token = localStorage.getItem('token')

onBeforeMount(() => {
    if (!token) {
        location.href = '/login'
    }
})

onMounted(async () => {
    const response = await axios.get(`https://localhost:8000/api/movies/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    movie.value = response.data
})

function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(date).toLocaleDateString('fr-FR', options)
}

const openUpdate = () => {
        location.href = `/movie/${id}/update`
    }
</script>

<template>
    <div>
        <h1>Fiche du Film</h1>
        <div class="container-movie" v-if="movie">
            <p>Catégorie:  <RouterLink :to="{ name: 'category-file', params: { id: movie.category.id } }">{{ movie.category.name }}</RouterLink></p>
            <br>
            <img :src="'https://127.0.0.1:8000/' + movie.mediaObjects[0].contentUrl.replace('/public', '')" :alt="movie.title" v-if="movie.mediaObjects?.length">
            <img src="https://via.placeholder.com/300x300.png?text=No+image" :alt="movie.title" v-else>
            <p>Titre: {{ movie.title }}</p>
            <p>Description: {{ movie.description }}</p>
            <p>Date de sortie: {{ formatDate(movie.releaseDate) }}</p>
            <p>Durée: {{ movie.duration }} minutes</p>
            <br>
            <p>Acteurs: <ul>
                <li v-for="actor in movie.actors" :key="actor.id">
                    <RouterLink :to="{ name: 'actor-file', params: { id: actor.id } }">{{ actor.firstName }} {{ actor.lastName }}</RouterLink>
                </li>
            </ul></p>
        </div>
        <button @click="openUpdate">Modifier</button><br><br>
    </div>
</template>

<style lang="scss" scoped>
    .container-movie {
        img {
            width: 200px;
        }
    }
</style>