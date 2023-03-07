import { useQuery } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const getChatsListWithLimit = async ({ queryKey }) => {
    const [ , uid_user, , limit ] = queryKey;

    if (!uid_user) return [];

    const { data } = await httpClient.get(`/chats/${ uid_user }/${limit}`);

    return data;
}

export const useChatsListWithLimit = (uid_user, limit, open = false) => {
    const query = useQuery(
        uid_user ? ['chats', uid_user, 'limit', limit] : [],
        getChatsListWithLimit, {
            refetchOnWindowFocus: false,
            retry: false,
            enabled: open,
            refetchInterval: open ? 30000 : false
        }
    );

    return query;
}