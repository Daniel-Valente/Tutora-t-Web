import { useMutation } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const logOut = async () => {

    return await httpClient.post(`/users/LogOut`);
}

export const useLogOut = ( ) => useMutation(logOut);