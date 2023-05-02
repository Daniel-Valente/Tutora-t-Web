import { useQuery } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";
import { store } from "../../store";
import { hideGlobalLoader, showGlobalLoader } from "../../actions/layout";

const getPostsByUserWithLimit = async ({ queryKey }) => {
    const [ , uid_user, , limit ] = queryKey;
    if(!uid_user) return [];
    //store.dispatch( showGlobalLoader() );
    const { data } = await httpClient.get(`/posts/${ uid_user }/${limit}`);

    //store.dispatch( hideGlobalLoader() );
    return data;
}

export const usePostsByUserWithLimit = (uid_user, limit) => {
    const query = useQuery(
        uid_user ? ['posts', uid_user, 'limit', limit] : [],
        getPostsByUserWithLimit, {
            refetchOnWindowFocus: false,
            retry: false
        }
    );

    return query;
}