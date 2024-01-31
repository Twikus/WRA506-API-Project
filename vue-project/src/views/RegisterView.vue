<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const email = ref('');
const password = ref('');
const register = async () => {
    try {
        const response = await axios.post('https://127.0.0.1:8000/register', {  // Correction de l'URL
            email: email.value,
            password: password.value
        });

        const token = response.data.token;
        localStorage.setItem('token', token)
        location.href = '/'
    } catch (error) {
        console.error('Erreur lors de la soumission du formulaire :', error);
    }
}
</script>

<template>
    <div>
        <h1>S'inscrire</h1>
        <!-- Formulaire de connexion -->
        <form @submit.prevent="register">
            <div>
                <label for="email">Email</label>
                <input type="email" id="email" v-model="email" />
            </div>
            <div>
                <label for="password">Mot de passe</label>
                <input type="password" id="password" v-model="password" />
            </div>
            <button type="submit">S'enregistrer</button>
        </form>
    </div>
</template>
