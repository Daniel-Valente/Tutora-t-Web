import { useQuery } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const getUserByUsername = async ({ queryKey }) => {
    const [ , username ] = queryKey;
    
    if( !username ) return [];
    
    const { data = [] } = await httpClient.get(`/users/${ username }`);

    return data;
}

export const useUserByUsername = (username) => {
    const query = useQuery(
        username !== null ? ['users', username] : [],
        getUserByUsername, {
            refetchOnWindowFocus: false,
            enabled: username !== null,
            retry: false
        }
    );

    return query;
}