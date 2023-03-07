import { useQuery } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const getFollowersList = async ({ queryKey }) => {
    const [ , uid_user ] = queryKey;

    if(!uid_user) return [];

    const { data } = await httpClient.get(`/users/interaction/follow/${ uid_user }`);

    return data;
}

export const useFollowersList = (uid_user) => {
    const query = useQuery(
        uid_user ? ['users', uid_user, 'followers'] : [],
        getFollowersList, {
            refetchOnWindowFocus: false,
            retry: false,
            refetchInterval: 30000
        }
    );

    return query;
}