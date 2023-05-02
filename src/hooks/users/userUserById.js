import { useQuery } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";
import { store } from "../../store";
import { hideGlobalLoader, showGlobalLoader } from "../../actions/layout";

const getUserById = async ({ queryKey }) => {
    const [ , uid_user ] = queryKey;

    if(!uid_user) return [];
    //store.dispatch( showGlobalLoader() );
    const { data } = await httpClient.get(`/users/userId/${ uid_user }`);
    
    const node = { user_uid: data._id, ...data };

    //store.dispatch( hideGlobalLoader() );
    return node;
}

export const useUserById = (uid_user) => {
    const query = useQuery(
        uid_user ? ['users', uid_user] : [],
        getUserById, {
            refetchOnWindowFocus: false,
            retry: false
        }
    );

    return query;
}