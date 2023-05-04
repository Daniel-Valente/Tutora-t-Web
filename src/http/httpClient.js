import axios from 'axios';
import { ErrorInterceptor } from './interceptors/ErrorInterceptor';
import { PendingRequestInterceptor } from './interceptors/PendingRequestInterceptor';

const httpClient = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT
});

ErrorInterceptor( httpClient );
PendingRequestInterceptor( httpClient );

export default httpClient;