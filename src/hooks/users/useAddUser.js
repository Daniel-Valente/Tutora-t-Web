import { useMutation, useQueryClient } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const addUser = async (user) =>
    httpClient.post(`/users`, user, {
        'Content-Type': 'application/json'
    });

export const useAddUser = ( ) => {
    const queryClient = useQueryClient();
    
    return useMutation(addUser, {
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
        }
    });
}