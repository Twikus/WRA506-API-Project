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

<style scoped lang="scss">
.container-list-actors {
    text-align: center;
}
</style>