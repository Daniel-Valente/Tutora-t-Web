import { useQuery } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";
import { store } from "../../store";
import { hideGlobalLoader, showGlobalLoader } from "../../actions/layout";

const getSavePostList = async ({ queryKey }) => {
    const [ , uid_user ] = queryKey;

    if(!uid_user) return [];
    //store.dispatch( showGlobalLoader() );
    const { data } = await httpClient.get(`/users/interaction/save/${ uid_user }`);

    //store.dispatch( hideGlobalLoader() );
    return data;
}

export const useSavePostList = (uid_user) => {
    const query = useQuery(
        uid_user ? ['users', uid_user, 'interaction-save'] : [],
        getSavePostList, {
            refetchOnWindowFocus: false,
            retry: false
        }
    );

    return query;
}