import { useQuery } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";
import { store } from "../../store";
import { hideGlobalLoader, showGlobalLoader } from "../../actions/layout";

const getCommentsList = async ({ queryKey }) => {
    const [ , id_Post ] = queryKey;

    if(!id_Post) return [];
    //store.dispatch( showGlobalLoader() );

    const { data } = await httpClient.get(`/comments/comments/${ id_Post }`);
    //store.dispatch( hideGlobalLoader() );
    return data;
}

export const useCommentsList = (id_Post ) => {
    const query = useQuery(
        id_Post ? ['post', id_Post, 'comments'] : [],
        getCommentsList, {
            refetchOnWindowFocus: false,
            retry: false,
            refetchInterval: 50000
        }
    );

    return query;
}