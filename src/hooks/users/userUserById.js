import { useQuery } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const getUserById = async ({ queryKey }) => {
    const [ , uid_user ] = queryKey;

    if(!uid_user) return [];

    const { data } = await httpClient.get(`/users/userId/${ uid_user }`);
    
    const node = data.map(( user ) => {
        return {
            uid_user: user._id,
            ...user
        }
    });

    return node;
}

export const useUserById = (uid_user) => {
    const query = useQuery(
        uid_user ? ['users', uid_user] : [],
        getUserById, {
            refetchOnWindowFocus: false,
            retry: false
        }
    );

    return query;
}