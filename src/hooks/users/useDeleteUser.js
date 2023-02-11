import { useMutation, useQueryClient } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const deleteUser = async (user) => {
    const { uid_user } = user;

    return httpClient.delete(`/users/${ uid_user }`);
}

export const useDeleteUser = ( ) => {
    const queryClient = useQueryClient();
    
    return useMutation(deleteUser, {
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
        }
    });
}