<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue'
import axios from 'axios';
import { useRoute } from 'vue-router';

const actor = ref()

const $route = useRoute();
const id = $route.params.id;

const token = localStorage.getItem('token');

onBeforeMount(() => {
    if (!token) {
        location.href = '/login'
    }
})

onMounted(async () => {
    fetchActor(id)
})

async function fetchActor(id: number) {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/actors/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    actor.value = response.data;
}

const openUpdate = () => {
    location.href = `/actor/${id}/update`
}

const deleteActor = async () => {
    try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/actors/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        fetchActor(id);
    } catch (error) {
        console.error(error);
    }
}
</script>

<template>
    <div>
        <h1>Fiche de l'acteur</h1>
        <div v-if="actor">
            <p>Prénom: {{ actor.firstName }}</p>
            <p>Nom: {{ actor.lastName }}</p>
            <p>Nationalité: {{ actor.nationality.title }}</p>
            <p>Films: <ul>
                <li v-for="movie in actor.movies" :key="movie.id">
                    <RouterLink :to="{ name: 'movie-file', params: { id: movie.id } }">{{ movie.title }}</RouterLink>
                </li>
            </ul></p>
        </div>
        <button @click="openUpdate">Modifier</button><br>
        <button @click="deleteActor">Supprimer</button><br><br>
    </div>
</template>