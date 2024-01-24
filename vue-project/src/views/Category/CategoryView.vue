<script setup lang="ts">
import { onMounted, onBeforeMount, ref } from 'vue'
import axios from 'axios';
import CategoryCard from '../../components/CategoryCard.vue';

const categories = ref([]);
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
    await fetchCategories(currentPage.value);
})

const fetchCategories = async (page: number) => {
    try {
        const response = await axios.get(`https://localhost:8000/api/categories?page=${page}&name=${search.value}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        categories.value = response.data['hydra:member'];

        // Extract total pages information from hydra:view
        const hydraView = response.data['hydra:view'];
        if (hydraView) {
            totalPages.value = extractTotalPages(hydraView);
        }
    } catch (error) {
        console.error('Error fetching categories:', error);
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
    fetchCategories(currentPage.value);
}

const previousPage = () => {
    currentPage.value--;
    fetchCategories(currentPage.value);
}

const searchCategories = () => {
    console.log('Recherche de catégories avec le terme :', search.value);
    currentPage.value = 1;
    fetchCategories(currentPage.value);
}
</script>

<template>
    <div class="container-list-categories">
        <h1>Liste des Catégories</h1>
        <input type="text" class="searchbar" v-model="search" placeholder="Rechercher par titre">
        <button @click="searchCategories">Rechercher</button>
        <div class="container-categories">
            <div v-if="!categories">Chargement en cours...</div>
            <CategoryCard v-else v-for="category in categories" :key="category.id" :category="category" class="category"/>
        </div>
        <div class="pagination">
            <button @click="previousPage" :disabled="currentPage <= 1">Précédent</button>
            <span>{{ currentPage }} / {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage >= totalPages">Suivant</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container-list-categories {
    text-align: center;

    .container-categories {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .category {
        width: 300px;
        height: max-content;
        border: 1px solid rgb(35, 35, 35);
        background-color: rgb(35, 35, 35);
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.35);
        border-radius: 5px;
        margin: 10px;
        padding: 10px;
    }
}
</style>