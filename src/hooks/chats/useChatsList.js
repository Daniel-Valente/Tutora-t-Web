import { useQuery } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";
import { store } from "../../store";
import { showGlobalLoader } from "../../actions/layout";

const getChatsList = async ({ queryKey }) => {
    const [ , uid_user ] = queryKey;
    store.dispatch( showGlobalLoader() );

    const { data } = await httpClient.get(`/chats/${ uid_user }`);
    return data;
}

export const useChatsList = (uid_user) => {
    const query = useQuery(
        ['chats', uid_user],
        getChatsList, {
            refetchOnWindowFocus: false,
            retry: false,
            refetchInterval: 30000
        }
    );

    return query;
}