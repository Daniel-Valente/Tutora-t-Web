import { useQuery } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";
import { store } from "../../store";
import { hideGlobalLoader, showGlobalLoader } from "../../actions/layout";

const getHidePostList = async ({ queryKey }) => {
    const [ , uid_user ] = queryKey;

    if(!uid_user) return [];
    //store.dispatch( showGlobalLoader() );
    const { data } = await httpClient.get(`/users/interaction/hide/${ uid_user }`);

    //store.dispatch( hideGlobalLoader() );
    return data;
}

export const useHidePostList = (uid_user) => {
    const query = useQuery(
        uid_user ? ['users', uid_user, 'interaction-hide'] : [],
        getHidePostList, {
            refetchOnWindowFocus: false,
            retry: false
        }
    );

    return query;
}