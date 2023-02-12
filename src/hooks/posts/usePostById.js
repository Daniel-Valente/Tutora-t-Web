import { useQuery } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const getPostById = async ({ queryKey }) => {
    const [ , id_Post ] = queryKey;
    const { data } = await httpClient.get(`/posts/${ id_Post }`);

    return data;
}

export const usePostById = (id_Post) => {
    const query = useQuery(
        ['posts', id_Post],
        getPostById, {
            refetchOnWindowFocus: false,
            retry: false
        }
    );

    return query;
}