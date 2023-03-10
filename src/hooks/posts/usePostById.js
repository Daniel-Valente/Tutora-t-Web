import { useQuery } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const getPostById = async ({ queryKey }) => {
    const [ , id_Post ] = queryKey;

    if(!id_Post) return [];

    const { data } = await httpClient.get(`/posts/${ id_Post }`);
    const [ node ] = data;

    return node;
}

export const usePostById = (id_Post) => {
    const query = useQuery(
        id_Post ? ['posts', id_Post ] : [],
        getPostById, {
            refetchOnWindowFocus: false,
            retry: false
        }
    );

    return query;
}