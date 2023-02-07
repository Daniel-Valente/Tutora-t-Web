import { useQuery } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const getPostsByUser = async ({ queryKey }) => {
    const [ , uid_user ] = queryKey;
    const { data = [] } = await httpClient.get(`/posts/${ uid_user }`);

    return data;
}

export const usePostsByUser = (uid_user) => {
    const query = useQuery(
        ['posts', uid_user],
        getPostsByUser, {
            refetchOnWindowFocus: false,
            retry: false
        }
    );

    return query;
}