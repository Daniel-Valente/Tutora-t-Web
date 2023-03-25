import { useQuery } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const getNotificationsWithLimit = async ({ queryKey }) => {
    const [ , uid_user, , limit ] = queryKey;

    if (!uid_user) return [];

    const { data } = await httpClient.get(`/users/notification/${ uid_user }/${limit}`);

    return data;
}

export const useNotificationsWithLimit = (uid_user, limit) => {
    const query = useQuery(
        uid_user ? ['notifications', uid_user, 'limit', limit] : [],
        getNotificationsWithLimit, {
            refetchOnWindowFocus: false,
            retry: false,
            refetchInterval: 30000
        }
    );

    return query;
}