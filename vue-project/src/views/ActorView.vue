<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import axios from 'axios';
import ActorCard from '../components/ActorCard.vue';

const actors = ref([]);
const search = ref('');

const currentPage = ref(1);
const totalPages = ref(0);
const itemsPerPage = 30;

onMounted(async () => {
    await fetchActors(currentPage.value);
})

const fetchActors = async (page) => {
    const response = await axios.get(`https://localhost:8000/api/actors?page=${page}`);
    actors.value = response.data['hydra:member'];

    // Pagination
    const totalCount = response.data['hydra:totalItems'];
    totalPages.value = Math.ceil(totalCount / itemsPerPage);
    currentPage.value = page;
}

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        fetchActors(currentPage.value);
    }
}

const previousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
        fetchActors(currentPage.value);
    }
}

const actorsFiltered = computed(() => {
    return actors.value.filter((actor) => {
        return actor.firstName.toLowerCase().includes(search.value.toLowerCase()) || actor.lastName.toLowerCase().includes(search.value.toLowerCase());
    });
})
</script>

<template>
    <div class="container-list-actors">
        <h1>Liste des Acteurs</h1>
        <input type="text" class="searchbar" v-model="search">
        <div class="pagination">
            <button @click="previousPage" :disabled="currentPage <= 1">Précédent</button>
            <span>{{ currentPage }} / {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage >= totalPages">Suivant</button>
        </div>
        <div class="container-actors">
            <div v-if="!actors">Chargement en cours...</div>
            <ActorCard v-else v-for="actor in actorsFiltered" :key="actor.id" :actor="actor" class="actor" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.container-list-actors {
    text-align: center;
}
</style>