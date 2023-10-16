<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios';
import CategoryCard from '../components/CategoryCard.vue';

const categories = ref([]);

onMounted(async () => {
    const response = await axios.get('https://localhost:8000/api/categories?page=1');
    categories.value = response.data['hydra:member'];
});
</script>

<template>
    <div class="container-list-categories">
        <h1>Liste des Catégories</h1>
        <div class="container-categories">
            <div v-if="!categories">Chargement en cours...</div>
            <CategoryCard v-else v-for="category in categories" :key="category.id" :category="category" class="category"/>
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