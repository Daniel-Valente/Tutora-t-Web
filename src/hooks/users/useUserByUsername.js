import { useQuery } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const getUserByUsername = async ({ queryKey }) => {
    const [ , username ] = queryKey;
    
    if( !username ) return [];
    
    const { data } = await httpClient.get(`/users/${ username }`);

    const node = data.map(( user ) => {
        return {
            uid_user: user._id,
            ...user
        }
    });

    return node;
}

export const useUserByUsername = (username) => {
    const query = useQuery(
        username ? ['users', username] : [],
        getUserByUsername, {
            refetchOnWindowFocus: false,
            enabled: username !== null,
            retry: false
        }
    );

    return query;
}