import { useMutation } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";
import { hideGlobalLoader, showGlobalLoader } from "../../actions/layout";
import { store } from "../../store";

const logIn = async (logIn) => {
    const { data } = await httpClient.post(`/auth/LogIn`, logIn);

    const node = { uid_user: data._id, ...data };
    
    return node;
}

export const useLogIn = ( ) => useMutation(logIn);