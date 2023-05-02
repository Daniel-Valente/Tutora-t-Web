import { useQuery } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";
import { store } from "../../store";
import { hideGlobalLoader, showGlobalLoader } from "../../actions/layout";

const getPostsWithLimit = async ({ queryKey }) => {
    const [ , id_undefined, , limit ] = queryKey;
    if(!id_undefined || !limit) return [];

    //store.dispatch( showGlobalLoader() );
    const { data } = await httpClient.get(`/posts/${ id_undefined }/${limit}`);
    const [ node = [] ] = data;

    //store.dispatch( hideGlobalLoader() );
    return node;
}

export const usePostsWithLimit = (id_undefined, limit) => {
    const query = useQuery(
        id_undefined ? ['posts', id_undefined, 'limit', limit] : [],
        getPostsWithLimit, {
            refetchOnWindowFocus: false,
            retry: false,
            refetchInterval: 30000
        }
    );

    return query;
}