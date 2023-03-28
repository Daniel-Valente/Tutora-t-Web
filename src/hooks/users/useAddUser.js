import { useMutation, useQueryClient } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const addUser = async (user) => {
    const { data } = await httpClient.post(`/users`, user, {
        'Content-Type': 'application/json'
    });

    const node = data.map(( user ) => {
        return {
            uid_user: user._id,
            ...user
        }
    });

    return node;
}

export const useAddUser = ( ) => {
    const queryClient = useQueryClient();
    
    return useMutation(addUser, {
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
        }
    });
}