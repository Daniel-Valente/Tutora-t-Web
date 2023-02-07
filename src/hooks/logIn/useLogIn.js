import { useMutation } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const logIn = async (logIn) => {

    return httpClient.post(`/users/LogIn`, logIn);
}

export const useLogIn = ( ) => useMutation(logIn);