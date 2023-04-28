import { useQuery } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";
import { store } from "../../store";
import { showGlobalLoader } from "../../actions/layout";

const getFollowersList = async ({ queryKey }) => {
    const [ , uid_user ] = queryKey;

    if(!uid_user) return [];
    store.dispatch( showGlobalLoader() );
    const { data } = await httpClient.get(`/users/interaction/follow/${ uid_user }`);

    return data;
}

export const useFollowersList = (uid_user) => {
    const query = useQuery(
        uid_user ? ['users', uid_user, 'followers'] : [],
        getFollowersList, {
            refetchOnWindowFocus: false,
            retry: false,
            refetchInterval: 30000
        }
    );

    return query;
}