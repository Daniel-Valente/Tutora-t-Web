import { useQuery } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";
import { store } from "../../store";
import { hideGlobalLoader, showGlobalLoader } from "../../actions/layout";

const getCommentsTotal = async ({ queryKey }) => {
    const [ , id_Post ] = queryKey;

    if(!id_Post) return [];
    //store.dispatch( showGlobalLoader() );

    const { data } = await httpClient.get(`/comments/total_comments/${ id_Post }`);
    
    //store.dispatch( hideGlobalLoader() );
    return data;
}

export const useCommentsTotal = (id_Post ) => {
    const query = useQuery(
        id_Post ? ['post', id_Post, 'comments-total'] : [],
        getCommentsTotal, {
            refetchOnWindowFocus: false,
            retry: false,
            refetchInterval: 50000
        }
    );

    return query;
}