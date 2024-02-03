<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue'
import axios from 'axios';
import { useRoute } from 'vue-router';

const movie = ref()
const categories = ref({})

const $route = useRoute();
const id = $route.params.id;

const token = localStorage.getItem('token');

const details = ref({
    title: '',
    description: '',
    budget: 0,
    category: '',
    director: '',
    duration: 0,
    entries: 0,
    releaseDate: '',
    note: 0,
    website: ''
})

const convertDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0 en JavaScript
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

onBeforeMount(() => {
    if (!token) {
        location.href = '/login'
    }
})

onMounted(async () => {
    const response = await axios.get(`https://127.0.0.1:8000/api/movies/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    movie.value = response.data;

    details.value.title = movie.value.title;
    details.value.description = movie.value.description;
    details.value.budget = movie.value.budget;
    details.value.category = movie.value.category['@id'];
    details.value.director = movie.value.director;
    details.value.duration = movie.value.duration;
    details.value.entries = movie.value.entries;
    details.value.releaseDate = convertDate(movie.value.releaseDate);
    details.value.note = movie.value.note;
    details.value.website = movie.value.website;

    try {
        const categoriesResponse = await axios.get(`https://127.0.0.1:8000/api/categories`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        categories.value = categoriesResponse.data['hydra:member'];
    } catch (error) {
        console.error(error)
    }
})

const saveUpdate = async () => {
    try {
        const response = await axios.put(`https://127.0.0.1:8000/api/movies/${id}`, details.value, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        location.href = `/movie/${id}`
    } catch (error) {
        console.error(error)
    }
}



const uploadImage = () => {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = fileInput.files ? fileInput.files[0] : null;
    
    if (!file) {
      console.log("Veuillez sélectionner une image");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    // ajout de l'id du film dans le formData
    formData.append("movie", JSON.stringify({ "@id": `/api/movies/${id}` }));

    // Appel de la fonction pour envoyer le media à l'API
    uploadToApi(formData);
}

const uploadToApi = async (formData) => {
      try {
        // Récupérer le JWT depuis le local storage
        const token = localStorage.getItem("token");

        // Utilisation d'Axios pour envoyer l'image à l'API avec le JWT
        const response = await axios.post("https://127.0.0.1:8000/api/media_objects", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        
      } catch (error) {
        console.error("Erreur lors de l'envoi de l'image :", error);
      }
    }
</script>

<template>
    <div>
        <h1>Fiche du film</h1>
        <div v-if="movie">
            <label for="name">Titre</label>
            <input type="text" id="name" name="name" v-model="details.title"><br>
            <label for="description">Description</label>
            <textarea id="description" v-model="details.description"></textarea><br>
            <label for="budget">Budget</label>
            <input type="number" id="budget" name="budget" v-model="details.budget"><br>
            <div>
                <label for="nationality">Catégorie</label>
                <select id="nationality" v-model="details.category">
                    <option v-for="category in categories" :value="category['@id']">
                        {{ category.name }}
                    </option>
                </select>
            </div>
            <label for="director">Producteur</label>
            <input type="text" id="director" name="director" v-model="details.director"><br>
            <label for="entries">Nombre d'entrées</label>
            <input type="number" id="entries" name="entries" v-model="details.entries"><br>
            <label for="note">Note</label>
            <input type="number" id="note" name="note" min="0" max="10" v-model="details.note">/10<br>
            <label for="date">Date de sortie</label>
            <input type="date" name="date" id="date" v-model="details.releaseDate"><br>
            <label for="website">Site web</label>
            <input type="text" id="website" name="website" v-model="details.website"><br>
            <form @submit.prevent="uploadImage">
              <input type="file" ref="fileInput" />
              <button type="submit">Envoyer</button>
            </form>
        </div>
        <button @click="saveUpdate">Sauvegarder</button>
    </div>
</template>