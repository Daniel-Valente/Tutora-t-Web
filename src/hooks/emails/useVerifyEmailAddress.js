import { useMutation, useQueryClient } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";

const verifyEmailAddress = async (user) =>
    await httpClient.put(`/users/verify-email`, user, {
        'Content-Type': 'application/json'
    });

export const useVerifyEmailAddress = ( ) => {
    const queryClient = useQueryClient();
    
    return useMutation(verifyEmailAddress, {
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
        }
    });
}