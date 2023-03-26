import { useMutation, useQueryClient } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const newPassword = async (user) =>
    await httpClient.post(`/users/password-reset`, user, {
        'Content-Type': 'application/json'
    });

export const useNewPassword = ( ) => {
    const queryClient = useQueryClient();
    
    return useMutation(newPassword, {
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
        }
    });
}