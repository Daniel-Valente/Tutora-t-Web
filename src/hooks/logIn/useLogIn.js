import { useMutation } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const logIn = async (logIn) => {
    const { data } = await httpClient.post(`/users/LogIn`, logIn);
    
    const node = data.map( user => {
        return {
            uid_user: user._id,
            ...user
        }
    });

    return node;
}

export const useLogIn = ( ) => useMutation(logIn);