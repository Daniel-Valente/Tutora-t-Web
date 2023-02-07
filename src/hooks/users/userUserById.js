import { useQuery } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const getUserById = async ({ queryKey }) => {
    const [ , uid_user ] = queryKey;
    const { data = [] } = await httpClient.get(`/users/${ uid_user }`);

    return data;
}

export const useUserById = (uid_user) => {
    const query = useQuery(
        ['users', uid_user],
        getUserById, {
            refetchOnWindowFocus: false,
            retry: false
        }
    );

    return query;
}