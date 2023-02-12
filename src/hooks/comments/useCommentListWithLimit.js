import { useQuery } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const getCommentListWithLimit = async ({ queryKey }) => {
    const [ , id_Post ] = queryKey;

    if(!id_Post) return [];

    const { data } = await httpClient.get(`/comments/${ id_Post }/5`);

    return data;
}

export const useCommentListWithLimit = (id_Post) => {
    const query = useQuery(
        id_Post ? ['post', id_Post, 'comments', 'limit', '5'] : [],
        getCommentListWithLimit, {
            refetchOnWindowFocus: false,
            retry: false
        }
    );

    return query;
}