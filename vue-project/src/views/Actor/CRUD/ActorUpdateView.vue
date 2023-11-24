<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue'
import axios from 'axios';
import { useRoute } from 'vue-router';

const actor = ref()

const $route = useRoute();
const id = $route.params.id;

const token = localStorage.getItem('token');

const details = ref({
    firstName: '',
    lastName: ''
})

onBeforeMount(() => {
    if (!token) {
        location.href = '/login'
    }
})

onMounted(async () => {
    const response = await axios.get(`https://127.0.0.1:8000/api/actors/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    actor.value = response.data;

    details.value = {
        firstName: actor.value.firstName,
        lastName: actor.value.lastName
    }
})

const saveUpdate = () => {
    try {
        axios.put(`https://127.0.0.1:8000/api/actors/${id}`, details.value, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log('Actor updated', details.value)
    } catch (error) {
        console.error(error)
    } finally {
        location.href = `/actor/${id}`
    }
}
</script>

<template>
    <div>
        <h1>Fiche de l'acteur</h1>
        <div v-if="actor">
            <label for="fname"></label>
            <input type="text" id="fname" name="fname" v-model="details.firstName"><br>
            <label for="lname"></label>
            <input type="text" id="lname" name="lname" v-model="details.lastName">
        </div>
        <button @click="saveUpdate">Sauvegarder</button>
    </div>
</template>