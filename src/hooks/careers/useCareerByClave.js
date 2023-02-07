import { useQuery } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const getCareerByClave = async ({ queryKey }) => {
    const [ , clave ] = queryKey;
    const { data = [] } = await httpClient.get(`/json/careers/${ clave }`);

    return data;
}

export const useCareerByClave = ( clave ) => {
    const query = useQuery(
        ['careers', clave],
        getCareerByClave, {
            refetchOnWindowFocus: false,
            retry: false
        }
    );

    return query;
}