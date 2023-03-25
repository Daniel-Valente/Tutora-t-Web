import { useQuery } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const getPostsList = async () => {
    const { data } = await httpClient.get('/posts');

    return data;
}

export const usePostsList = () => {
    const query = useQuery(
        ['posts'],
        getPostsList, {
            refetchOnWindowFocus: false,
            retry: false,
            refetchInterval: 30000
        }
    );

    return query;
}