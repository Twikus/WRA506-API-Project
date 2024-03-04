<script setup lang="ts">
import { RouterLink } from 'vue-router';

const props = defineProps({
    movie: {
        type: Object,
        required: true,
    },
});

const appUrl = import.meta.env.VITE_APP_URL;

function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('fr-FR', options);
}
</script>

<template>
    <div>
        <p>{{ props.movie.title }}</p>
        <img :src="`${appUrl + props.movie.mediaObjects[0].contentUrl.replace('/public', '')}`" :alt="props.movie.title" v-if="props.movie.mediaObjects?.length">
        <img src="https://via.placeholder.com/300x300.png?text=No+image" :alt="props.movie.title" v-else>
        <p>{{ props.movie.description }}</p>
        <p>{{ formatDate(props.movie.releaseDate) }}</p>
        <p>{{ props.movie.duration }} minutes</p>
        <RouterLink :to="{ name: 'movie-file', params: { id: props.movie.id } }">Fiche complète</RouterLink>
    </div>
</template>

<style lang="scss">
    .container-list-movies {
        text-align: center;
        .container-movies {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
        }

        .movie {
            width: 300px;
            min-height: 300px;
            border: 1px solid rgb(35, 35, 35);
            background-color: rgb(35, 35, 35);
            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.35);
            border-radius: 5px;
            margin: 10px;
            padding: 10px;

            img {
                height: 100px;
            }
        }
    }
</style>