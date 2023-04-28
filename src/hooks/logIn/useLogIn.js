import { useMutation } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";

const logIn = async (logIn) => {
    const { data } = await httpClient.post(`/users/LogIn`, logIn);

    const node = { user_uid: data._id, ...data };
    
    return node;
}

export const useLogIn = ( ) => useMutation(logIn);