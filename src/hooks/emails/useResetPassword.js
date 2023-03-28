import { useMutation } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const resetPassword = async (user) =>
    await httpClient.post(`/users/emails/password-reset`, user, {
        'Content-Type': 'application/json'
    });

export const useResetPassword = ( ) => useMutation(resetPassword)