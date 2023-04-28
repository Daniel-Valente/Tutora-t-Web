import axios from 'axios';
import { PendingRequestInterceptor } from './interceptors/PendingRequestInterceptor';

const httpClient = axios.create({
    baseURL: 'https://tutora-t-rest-api.vercel.app'
});

PendingRequestInterceptor( httpClient );

export default httpClient;