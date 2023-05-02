import axios from 'axios';
import { PendingRequestInterceptor } from './interceptors/PendingRequestInterceptor';
import { ErrorInterceptor } from './interceptors/ErrorInterceptor';

const httpClient = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT
});

ErrorInterceptor( httpClient );
PendingRequestInterceptor( httpClient );

export default httpClient;