import { useQuery } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";
import { store } from "../../store";
import { hideGlobalLoader, showGlobalLoader } from "../../actions/layout";

const getChatsListToUser = async ({ queryKey }) => {
    const [ , uid_user, , uid_userChat ] = queryKey;
    //store.dispatch( showGlobalLoader() );
    
    const { data } = await httpClient.get(`/chats/${uid_user}/to/${ uid_userChat }`);

    //store.dispatch( hideGlobalLoader() );
    return data;
}

export const useChatsListToUser = (uid_user, uid_userChat) => {
    const query = useQuery(
        ['chats', uid_user, 'to user', uid_userChat],
        getChatsListToUser, {
            refetchOnWindowFocus: false,
            retry: false,
            refetchInterval: 10000
        }
    );

    return query;
}