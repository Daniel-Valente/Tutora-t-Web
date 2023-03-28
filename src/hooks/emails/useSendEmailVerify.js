import { useMutation } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const sendEmailVerify = async (user) =>
    await httpClient.patch(`/users/emails/verify-email`, user, {
        'Content-Type': 'application/json'
    });

export const useSendEmailVerify = ( ) => useMutation(sendEmailVerify);