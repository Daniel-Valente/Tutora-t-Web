import { useMutation, useQueryClient } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const validationUser = async (user) =>
    await httpClient.post(`/users/validation`, user, {
        'Content-Type': 'application/json'
    });

export const useSendEmailValidation = ( ) => {
    const queryClient = useQueryClient();
    
    return useMutation(validationUser, {
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
        }
    });
}