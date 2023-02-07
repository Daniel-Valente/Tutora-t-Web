import { useMutation } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const logOut = async () => {

    return httpClient.post(`/users/LogOut`);
}

export const useLogOut = ( ) => useMutation(logOut);