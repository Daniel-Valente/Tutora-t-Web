import axios from 'axios';

const httpClient = axios.create({
    baseURL: "https://tutora-t-rest-api.vercel.app"
});

export default httpClient;