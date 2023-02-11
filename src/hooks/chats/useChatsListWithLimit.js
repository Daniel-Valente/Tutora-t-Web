import { useQuery } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const getChatsListWithLimit = async ({ queryKey }) => {
    const [ , uid_user, limit ] = queryKey;

    if(!limit || !uid_user) return []

    const { data = [] } = await httpClient.get(`/chats/${ uid_user }/${ limit }`);

    return data;
}

export const useChatsListWithLimit = (uid_user, limit) => {
    const query = useQuery(
        !limit || !uid_user ? ['chats', uid_user, 'limit', limit] : [],
        getChatsListWithLimit, {
            refetchOnWindowFocus: false,
            retry: false
        }
    );

    return query;
}