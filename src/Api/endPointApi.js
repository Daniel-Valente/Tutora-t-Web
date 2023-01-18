import axios from 'axios';

export const endPointApi = axios.create({
    baseURL: 'https://tutora-t-rest-api.vercel.app',
});