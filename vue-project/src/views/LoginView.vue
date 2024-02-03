<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios';
import getMe from '../script/me';

const email = ref('')
const password = ref('')
const me = ref({})

const login = async () => {
    try {
        const response = await axios.post('https://127.0.0.1:8000/login', {
            headers: {
                'Content-Type': 'application/json'
            },
            email: email.value,
            password: password.value
        })

        const token = response.data.token
        me.value = await getMe(token)

        localStorage.setItem('token', token)
        location.href = '/'
    } catch (error) {
        console.error(error)
    }
}

</script>

<template>
    <div>
        <h1>Se connecter</h1>
        <!-- Formulaire de connexion -->
        <form @submit.prevent="login">
            <div>
                <label for="email">Email</label>
                <input type="email" id="email" v-model="email" />
            </div>
            <div>
                <label for="password">Mot de passe</label>
                <input type="password" id="password" v-model="password" />
            </div>
            <button type="submit">Se connecter</button>
        </form>
    </div>
</template>