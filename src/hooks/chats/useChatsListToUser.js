import { useQuery } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const getChatsListToUser = async ({ queryKey }) => {
    const [ , uid_user, uid_userChat ] = queryKey;

    const { data } = await httpClient.get(`/chats/${ uid_user }/to/${ uid_userChat }`);

    return data;
}

export const useChatsListToUser = (uid_user, uid_userChat) => {
    const query = useQuery(
        ['chats', uid_user, 'to user', uid_userChat],
        getChatsListToUser, {
            refetchOnWindowFocus: false,
            retry: false
        }
    );

    return query;
}