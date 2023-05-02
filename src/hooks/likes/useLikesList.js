import { useQuery } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";
import { store } from "../../store";
import { hideGlobalLoader, showGlobalLoader } from "../../actions/layout";

const getLikesList = async ({ queryKey }) => {
    const [ , id_Post ] = queryKey;

    if(!id_Post) return [];
    //store.dispatch( showGlobalLoader() );
    const { data } = await httpClient.get(`/likes/${ id_Post }`);
    //store.dispatch( hideGlobalLoader() );
    return data;
}

export const useLikesList = ( id_Post ) => {
    const query = useQuery(
        id_Post ? ['likes', id_Post] : [],
        getLikesList, {
            refetchOnWindowFocus: false,
            retry: false,
            refetchInterval: 50000
        }
    );

    return query;
}