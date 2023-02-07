import { useQuery } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const getUsersList = async () => {
    const { data = [] } = await httpClient.get(`/users`);

    return data;
}

export const useUsersList = () => {
    const query = useQuery(
        ['users'],
        getUsersList, {
            refetchOnWindowFocus: false,
            retry: false
        }
    );

    return query;
}