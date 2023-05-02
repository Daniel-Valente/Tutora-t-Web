import { useQuery } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";
import { store } from "../../store";
import { hideGlobalLoader, showGlobalLoader } from "../../actions/layout";

const getCommentListWithLimit = async ({ queryKey }) => {
    const [ , id_Post, , limit ] = queryKey;

    if(!id_Post) return [];
    //store.dispatch( showGlobalLoader() );

    const { data } = await httpClient.get(`/comments/${ id_Post }/${limit}`);
    
    //store.dispatch( hideGlobalLoader() );
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