import { useQuery } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const getPostsByUserWithLimit = async ({ queryKey }) => {
    const [ , uid_user, limit ] = queryKey;
    const { data = [] } = await httpClient.get(`/posts/${ uid_user }/${limit}`);

    return data;
}

export const usePostsByUserWithLimit = (uid_user, limit) => {
    const query = useQuery(
        ['posts', uid_user, 'limit', limit],
        getPostsByUserWithLimit, {
            refetchOnWindowFocus: false,
            retry: false
        }
    );

    return query;
}