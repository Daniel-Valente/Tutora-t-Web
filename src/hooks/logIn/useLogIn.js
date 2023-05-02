import { useMutation } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";
import { hideGlobalLoader, showGlobalLoader } from "../../actions/layout";
import { store } from "../../store";

const logIn = async (logIn) => {
    //store.dispatch( showGlobalLoader() );

    const { data } = await httpClient.post(`/users/LogIn`, logIn);
    const node = { user_uid: data._id, ...data };
    
    //store.dispatch( hideGlobalLoader() );
    return node;
}

export const useLogIn = ( ) => useMutation(logIn);