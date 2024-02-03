import axios from 'axios';

async function getMe(token) {
    try {
        const response = await axios.get('https://127.0.0.1:8000/api/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        localStorage.setItem('user', JSON.stringify(response.data));

        return response.data;
    } catch (error) {
        console.error(`Erreur lors de la récupération des informations de l'utilisateur : ${error}`);
    }
}

export default getMe;