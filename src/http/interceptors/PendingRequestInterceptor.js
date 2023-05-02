import { store } from "../../store";
import { decPendingRequest, hideGlobalLoader, incPendingRequest } from "../../actions/layout";

export const PendingRequestInterceptor = ( axiosInstance ) => {
    axiosInstance.interceptors.request.use(( config ) => {
        store.dispatch( incPendingRequest() );
        return config;
    }, ( error ) => {
        store.dispatch( decPendingRequest() );
        //store.dispatch( hideGlobalLoader() );
    });
    
    axiosInstance.interceptors.response.use(( config ) => {
        store.dispatch( decPendingRequest() );
        //store.dispatch( hideGlobalLoader() );
        
        return config;
    }, ( error ) => {
        store.dispatch( decPendingRequest() );
        //store.dispatch( hideGlobalLoader() );
    });
}
