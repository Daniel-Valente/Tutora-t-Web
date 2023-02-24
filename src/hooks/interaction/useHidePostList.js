import { useQuery } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const getHidePostList = async ({ queryKey }) => {
    const [ , uid_user ] = queryKey;

    if(!uid_user) return [];

    const { data } = await httpClient.get(`/users/interaction/hide/${ uid_user }`);

    return data;
}

export const useHidePostList = (uid_user) => {
    const query = useQuery(
        uid_user ? ['users', uid_user, 'interaction-hide'] : [],
        getHidePostList, {
            refetchOnWindowFocus: false,
            retry: false
        }
    );

    return query;
}