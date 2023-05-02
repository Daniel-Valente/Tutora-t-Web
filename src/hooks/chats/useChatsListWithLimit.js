import { useQuery } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";
import { store } from "../../store";
import { hideGlobalLoader, showGlobalLoader } from "../../actions/layout";

const getChatsListWithLimit = async ({ queryKey }) => {
    const [ , uid_user, , limit ] = queryKey;

    if (!uid_user) return [];
    //store.dispatch( showGlobalLoader() );
    
    const { data } = await httpClient.get(`/chats/${ uid_user }/${limit}`);

    //store.dispatch( hideGlobalLoader() );
    return data;
}

export const useChatsListWithLimit = (uid_user, limit) => {
    const query = useQuery(
        uid_user ? ['chats', uid_user, 'limit', limit] : [],
        getChatsListWithLimit, {
            refetchOnWindowFocus: false,
            retry: false,
            refetchInterval: 30000
        }
    );

    return query;
}