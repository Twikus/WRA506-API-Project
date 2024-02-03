<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import getMe from '../script/me';

const firstname = ref('');
const lastname = ref('');
const email = ref('');
const password = ref('');
const role = ref('ROLE_USER');
const register = async () => {
    try {
        const response = await axios.post('https://localhost:8000/register', { 
            firstname: firstname.value,
            lastname: lastname.value,
            email: email.value,
            password: password.value,
            role: role.value,
        });

        const token = response.data.token;
        const me = await getMe(token);
        
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
                <label for="firstname">Prénom :</label><br>
                <input type="text" id="firstname" v-model="firstname" />
            </div>
            <div>
                <label for="lastname">Nom :</label><br>
                <input type="text" id="lastname" v-model="lastname" />
            </div>
            <div>
                <label for="email">Email :</label><br>
                <input type="email" id="email" v-model="email" />
            </div>
            <div>
                <label for="password">Mot de passe :</label><br>
                <input type="password" id="password" v-model="password" />
            </div>
            <div>
                <!-- choose role select -->
                <label for="role">Rôle :</label><br>
                <select id="role" v-model="role">
                    <option value="ROLE_USER">Utilisateur</option>
                    <option value="ROLE_ADMIN">Administrateur</option>
                </select>
            </div>
            <button type="submit">S'enregistrer</button>
        </form>
    </div>
</template>
