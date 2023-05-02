export const ErrorInterceptor = ( axiosInstance ) => {
    axiosInstance.interceptors.request.use(( config ) => config, ( error ) => {
        console.log(`Intercepted request error: ${ error }`);
    });

    axiosInstance.interceptors.response.use(( config ) => config, ( error ) => {
        console.log(`Intercepted response error: ${ error }`);
    });
};