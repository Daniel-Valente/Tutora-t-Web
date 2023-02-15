import { useQuery } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const getCommentList = async ({ queryKey }) => {
    const [ , id_Post ] = queryKey;

    const { data } = await httpClient.get(`/comments/${ id_Post }`);
    const { result } = data;

    return result;
}

export const useCommentList = (id_Post) => {
    const query = useQuery(
        ['post', id_Post, 'comments'],
        getCommentList, {
            refetchOnWindowFocus: false,
            retry: false
        }
    );

    return query;
}