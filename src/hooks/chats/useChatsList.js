import { useQuery } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const getChatsList = async ({ queryKey }) => {
    const [ , uid_user ] = queryKey;

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