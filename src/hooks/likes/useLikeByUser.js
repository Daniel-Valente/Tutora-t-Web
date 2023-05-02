import { useQuery } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";
import { store } from "../../store";
import { hideGlobalLoader, showGlobalLoader } from "../../actions/layout";

const getLikeByUser = async ({ queryKey }) => {
    const [ , id_Post, , uid_user ] = queryKey;
    
    if(!id_Post || !uid_user) return [];
    //store.dispatch( showGlobalLoader() );
    const { data } = await httpClient.get(`/likes/${uid_user}/${ id_Post }`);

    //store.dispatch( hideGlobalLoader() );
    return data;
}

export const useLikeByUser = ( id_Post, uid_user ) => {
    const query = useQuery(
        id_Post && uid_user ? ['likes', id_Post, 'user', uid_user] : [],
        getLikeByUser, {
            refetchOnWindowFocus: false,
            retry: false,
            refetchInterval: 50000
        }
    );

    return query;
}