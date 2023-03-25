import { useMutation, useQueryClient } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const resetPassword = async (user) =>
    await httpClient.post(`/users/password-reset`, user, {
        'Content-Type': 'application/json'
    });

export const useResetPassword = ( ) => {
    const queryClient = useQueryClient();
    
    return useMutation(resetPassword, {
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
        }
    });
}