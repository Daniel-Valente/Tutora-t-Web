import { useQuery } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const getSavePostList = async ({ queryKey }) => {
    const [ , uid_user ] = queryKey;

    if(!uid_user) return [];

    const { data } = await httpClient.get(`/users/interaction/save/${ uid_user }`);

    return data;
}

export const useSavePostList = (uid_user) => {
    const query = useQuery(
        uid_user ? ['users', uid_user, 'interaction-save'] : [],
        getSavePostList, {
            refetchOnWindowFocus: false,
            retry: false
        }
    );

    return query;
}