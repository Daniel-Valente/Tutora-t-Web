import { useMutation, useQueryClient } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const newPassword = async (user) =>
    await httpClient.patch(`/users/password-reset`, user, {
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