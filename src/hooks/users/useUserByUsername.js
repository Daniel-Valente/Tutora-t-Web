import { useQuery } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";
import { store } from "../../store";
import { showGlobalLoader } from "../../actions/layout";

const getUserByUsername = async ({ queryKey }) => {
    const [ , username ] = queryKey;
    
    if( !username ) return [];
    //store.dispatch( showGlobalLoader() );
    const { data } = await httpClient.get(`/users/${ username }`);

    const node = { uid_user: data._id, ...data };

    return node;
}

export const useUserByUsername = (username) => {
    const query = useQuery(
        username ? ['users', username] : [],
        getUserByUsername, {
            refetchOnWindowFocus: false,
            enabled: username !== null,
            retry: false
        }
    );

    return query;
}