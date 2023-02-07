import { useQuery } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const getChatsListWithLimit = async ({ queryKey }) => {
    const [ , uid_user, limit ] = queryKey;

    const { data = [] } = await httpClient.get(`/chats/${ uid_user }/${ limit }`);

    return data;
}

export const useChatsListWithLimit = (uid_user, limit) => {
    const query = useQuery(
        ['chats', uid_user, 'limit', limit],
        getChatsListWithLimit, {
            refetchOnWindowFocus: false,
            retry: false
        }
    );

    return query;
}