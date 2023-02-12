import { useQuery } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const getChatsListWithLimit = async ({ queryKey }) => {
    const [ , uid_user ] = queryKey;

    if (!uid_user) return [];

    const { data } = await httpClient.get(`/chats/${ uid_user }/5`);

    return data;
}

export const useChatsListWithLimit = (uid_user) => {
    const query = useQuery(
        uid_user ? ['chats', uid_user, 'limit', '5'] : [],
        getChatsListWithLimit, {
            refetchOnWindowFocus: false,
            retry: false
        }
    );

    return query;
}