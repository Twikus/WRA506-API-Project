import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';

axios.interceptors.request.use(request => {
    const token = localStorage.getItem('token');

    if (token) {
        const tokenExpiration = JSON.parse(atob(token.split('.')[1])).exp;
        if (tokenExpiration < Date.now() / 1000) {
            localStorage.removeItem('token');
        } else {
            request.headers['Authorization'] = 'Bearer ' + token;
        }
    }

    return request;
}, error => {
    return Promise.reject(error);
});

const app = createApp(App)

app.use(router)

app.mount('#app')
