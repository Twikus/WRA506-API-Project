<script setup lang="ts">
import { onMounted, onBeforeMount, ref, computed } from 'vue'
import axios from 'axios';
import CategoryCard from '../../components/CategoryCard.vue';

const categories = ref([]);
const search = ref('');

const currentPage = ref(1);
const totalPages = ref(0);
const itemsPerPage = 30;

const token = localStorage.getItem('token');

onBeforeMount(() => {
    if (!token) {
        location.href = '/login'
    }
})

onMounted(async () => {
    await fetchCategories(currentPage.value);
})

const fetchCategories = async (page) => {
    const response = await axios.get(`https://localhost:8000/api/categories?page=${page}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    categories.value = response.data['hydra:member'];

    // Pagination
    const totalCount = response.data['hydra:totalItems'];
    totalPages.value = Math.ceil(totalCount / itemsPerPage);
    currentPage.value = page;
}

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        fetchCategories(currentPage.value);
    }
}

const previousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
        fetchCategories(currentPage.value);
    }
}

const categoriesFiltered = computed(() => {
    return categories.value.filter((categories) => {
        return categories.name.toLowerCase().includes(search.value.toLowerCase());
    });
})
</script>

<template>
    <div class="container-list-categories">
        <h1>Liste des Catégories</h1>
        <input type="text" class="searchbar" v-model="search">
        <div class="pagination">
            <button @click="previousPage" :disabled="currentPage <= 1">Précédent</button>
            <span>{{ currentPage }} / {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage >= totalPages">Suivant</button>
        </div>
        <div class="container-categories">
            <div v-if="!categories">Chargement en cours...</div>
            <CategoryCard v-else v-for="category in categoriesFiltered" :key="category.id" :category="category" class="category"/>
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