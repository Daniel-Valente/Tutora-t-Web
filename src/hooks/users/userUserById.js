import { useQuery } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const getUserById = async ({ queryKey }) => {
    const [ , uid_user ] = queryKey;
    const { data = [] } = await httpClient.get(`/users/userId/${ uid_user }`);

    return data;
}

export const useUserById = (uid_user) => {
    const query = useQuery(
        uid_user !== null ? ['users', uid_user] : [],
        getUserById, {
            refetchOnWindowFocus: false,
            retry: false
        }
    );

    return query;
}