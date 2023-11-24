<script setup lang="ts">
import { onMounted, onBeforeMount, ref, computed } from 'vue'
import axios from 'axios';
import ActorCard from '../../components/ActorCard.vue';

const actors = ref([]);
const search = ref('');

const currentPage = ref(1);
const totalPages = ref(1);

const token = localStorage.getItem('token');

onBeforeMount(() => {
    if (!token) {
        location.href = '/login'
    }
})

onMounted(async () => {
    await fetchActors(currentPage.value);
})

const fetchActors = async (page: number) => {
    try {
        const response = await axios.get(`https://localhost:8000/api/actors?page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        actors.value = response.data['hydra:member'];

        // Extract total pages information from hydra:view
        const hydraView = response.data['hydra:view'];
        if (hydraView) {
            totalPages.value = extractTotalPages(hydraView);
        }
    } catch (error) {
        console.error('Error fetching actors:', error);
    }
}

const extractTotalPages = (hydraView) => {
    const lastPageUrl = hydraView['hydra:last'];
    if (!lastPageUrl) {
        return 1;
    }

    // Extract the page number from the last page URL
    const match = lastPageUrl.match(/page=(\d+)$/);
    return match ? parseInt(match[1]) : 1;
}

const nextPage = () => {
    currentPage.value++;
    fetchActors(currentPage.value);
}

const previousPage = () => {
    currentPage.value--;
    fetchActors(currentPage.value);
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
