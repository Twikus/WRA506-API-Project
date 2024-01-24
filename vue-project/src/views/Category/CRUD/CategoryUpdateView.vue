<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue'
import axios from 'axios';
import { useRoute } from 'vue-router';

const categorie = ref()

const $route = useRoute();
const id = $route.params.id;

const token = localStorage.getItem('token');

const details = ref({
    name: ''
})

onBeforeMount(() => {
    if (!token) {
        location.href = '/login'
    }
})

onMounted(async () => {
    const response = await axios.get(`https://127.0.0.1:8000/api/categories/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    categorie.value = response.data;

    details.value = {
        name: categorie.value.name
    }
})

const saveUpdate = () => {
    try {
        axios.put(`https://127.0.0.1:8000/api/categories/${id}`, details.value, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log('categorie updated', details.value)

        location.href = `/category/${id}`
    } catch (error) {
        console.error(error)
    }
}
</script>

<template>
    <div>
        <h1>Fiche de la categorie</h1>
        <div v-if="categorie">
            <label for="name">Nom</label>
            <input type="text" id="name" name="name" v-model="details.name"><br>
        </div>
        <button @click="saveUpdate">Sauvegarder</button>
    </div>
</template>