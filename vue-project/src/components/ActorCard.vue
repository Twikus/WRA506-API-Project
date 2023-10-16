<script setup>
import { RouterLink } from 'vue-router';

defineProps(['actor']);
</script>

<template>
    <div>
        <p>{{ actor.firstName }}</p>
        <p>{{ actor.lastName }}</p>
        <RouterLink :to="{ name: 'actor-file', params: { id: actor.id } }">Fiche complète</RouterLink>
    </div>
</template>