import { useQuery } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const getUsersList = async () => {
    const { data } = await httpClient.get(`/users`);

    const node = data.filter( data => {
        if(data.name) return data;
    } );
    
    return node;
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