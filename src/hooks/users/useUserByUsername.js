import { useQuery } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const getUserByUsername = async ({ queryKey }) => {
    const [ , username ] = queryKey;
    const { data = [] } = await httpClient.get(`/users/${ username }`);

    return data;
}

export const useUserByUsername = (username) => {
    const query = useQuery(
        ['users', username],
        getUserByUsername, {
            refetchOnWindowFocus: false,
            retry: false
        }
    );

    return query;
}