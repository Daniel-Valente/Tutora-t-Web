import { useQuery } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const getLikesList = async ({ queryKey }) => {
    const [ , id_Post ] = queryKey;
    const { data = [] } = await httpClient.get(`/likes/${ id_Post }`);

    return data;
}

export const useLikesList = ( id_Post ) => {
    const query = useQuery(
        ['likes', id_Post],
        getLikesList, {
            refetchOnWindowFocus: false,
            retry: false
        }
    );

    return query;
}