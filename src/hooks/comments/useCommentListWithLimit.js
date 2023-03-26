import { useQuery } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const getCommentListWithLimit = async ({ queryKey }) => {
    const [ , id_Post, , limit ] = queryKey;

    if(!id_Post) return [];

    const { data } = await httpClient.get(`/comments/${ id_Post }/${limit}`);

    return data;
}

export const useCommentListWithLimit = (id_Post, limit) => {
    const query = useQuery(
        id_Post ? ['post', id_Post, 'comments', 'limit', limit] : [],
        getCommentListWithLimit, {
            refetchOnWindowFocus: false,
            retry: false
        }
    );

    return query;
}