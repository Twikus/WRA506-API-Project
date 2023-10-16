<script setup>
import { RouterLink } from 'vue-router';

defineProps(['actor']);
</script>

<template>
    <div>
        <p>{{ actor.firstName }} {{ actor.lastName }}</p>
        <RouterLink :to="{ name: 'actor-file', params: { id: actor.id } }">Fiche complète</RouterLink>
    </div>
</template>

<style lang="scss">
.container-actors {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.actor {
    width: 300px;
    height: max-content;
    border: 1px solid rgb(35, 35, 35);
    background-color: rgb(35, 35, 35);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.35);
    border-radius: 5px;
    margin: 10px;
    padding: 10px;
}
</style>