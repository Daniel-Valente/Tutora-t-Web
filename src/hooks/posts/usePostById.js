import { useQuery } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";
import { store } from "../../store";
import { hideGlobalLoader, showGlobalLoader } from "../../actions/layout";

const getPostById = async ({ queryKey }) => {
    const [ , id_Post ] = queryKey;

    if( !id_Post ) return [];
    //store.dispatch( showGlobalLoader() );
    const { data } = await httpClient.get(`/posts/${ id_Post }`);

    if( data.length === 1 ) {
        const [ result ] = data;
        return result;
    }
    //store.dispatch( hideGlobalLoader() );
    return data;
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