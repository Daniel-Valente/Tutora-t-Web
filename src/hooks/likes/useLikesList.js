import { useQuery } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const getLikesList = async ({ queryKey }) => {
    const [ , id_Post ] = queryKey;

    if(!id_Post) return [];
    
    const { data } = await httpClient.get(`/likes/${ id_Post }`);

    return data;
}

export const useLikesList = ( id_Post ) => {
    const query = useQuery(
        id_Post ? ['likes', id_Post] : [],
        getLikesList, {
            refetchOnWindowFocus: false,
            retry: false,
            refetchInterval: 50000
        }
    );

    return query;
}