<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios';
import ActorCard from '../components/ActorCard.vue';

const actors = ref([]);

onMounted(async () => {
    const response = await axios.get('https://localhost:8000/api/actors?page=1');
    actors.value = response.data['hydra:member'];
})
    ;
</script>

<template>
    <div class="container-list-actors">
        <h1>Liste des Acteurs</h1>
        <div class="container-actors">
            <div v-if="!actors">Chargement en cours...</div>
            <ActorCard v-else v-for="actor in actors" :key="actor.id" :actor="actor" class="actor" />
        </div>
    </div>
</template>

<style scoped>
.container-list-actors {
    text-align: center;

    .container-actors {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .actor {
        width: 300px;
        height: 300px;
        border: 1px solid rgb(35, 35, 35);
        background-color: rgb(35, 35, 35);
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.35);
        border-radius: 5px;
        margin: 10px;
        padding: 10px;
    }
}
</style>