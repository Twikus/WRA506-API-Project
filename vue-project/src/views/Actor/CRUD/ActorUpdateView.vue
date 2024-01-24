<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue'
import axios from 'axios';
import { useRoute } from 'vue-router';

const ACTORS_API = 'https://127.0.0.1:8000/api/actors';
const NATIONALITIES_API = 'https://127.0.0.1:8000/api/nationalities';

const actor = ref()
const actorDetails = ref({
    firstName: '',
    lastName: '',
    nationality: ''
})
const nationalities = ref([])

const $route = useRoute();
const id = $route.params.id;
const token = localStorage.getItem('token');

onBeforeMount(() => {
    if (!token) {
        location.href = '/login'
    }
})

const getActorDetails = async () => {
    try {
        const response = await axios.get(`${ACTORS_API}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        actor.value = response.data;
        actorDetails.value = {
            firstName: actor.value.firstName,
            lastName: actor.value.lastName,
            nationality: actor.value.nationality['@id']
        }
    } catch (error) {
        console.error('Failed to fetch actor details:', error)
    }
}

const getNationalities = async () => {
    try {
        const response = await axios.get(NATIONALITIES_API, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        nationalities.value = response.data['hydra:member'];
    } catch (error) {
        console.error('Failed to fetch nationalities:', error)
    }
}

onMounted(async () => {
    await getActorDetails();
    await getNationalities();
})

const saveUpdate = async () => {
    try {
        await axios.put(`${ACTORS_API}/${id}`, actorDetails.value, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log('Actor updated', actorDetails.value)

        location.href = `/actor/${id}`
    } catch (error) {
        console.error('Failed to update actor:', error)
    }
}
</script>

<template>
    <div>
        <h1>Fiche de l'acteur</h1>
        <div v-if="actor">
            <label for="fname">Prénom</label>
            <input type="text" id="fname" name="fname" v-model="actorDetails.firstName"><br>
            <label for="lname">Nom</label>
            <input type="text" id="lname" name="lname" v-model="actorDetails.lastName"><br>
            <div>
                <label for="nationality">Nationalité</label>
                <select id="nationality" v-model="actorDetails.nationality">
                    <option v-for="nationality in nationalities" :value="nationality['@id']">
                        {{ nationality.title }}
                    </option>
                </select>
            </div>
        </div>
        <button @click="saveUpdate">Sauvegarder</button>
    </div>
</template>