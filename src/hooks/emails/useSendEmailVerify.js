import { useMutation } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";

const sendEmailVerify = async (user) =>
    await httpClient.post(`/users/emails/verify-email`, user, {
        'Content-Type': 'application/json'
    });

export const useSendEmailVerify = ( ) => useMutation(sendEmailVerify);