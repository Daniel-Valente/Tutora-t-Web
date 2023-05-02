import { useQuery } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";
import { store } from "../../store";
import { hideGlobalLoader, showGlobalLoader } from "../../actions/layout";

const getUsersList = async () => {
    //store.dispatch( showGlobalLoader() );
    const { data } = await httpClient.get(`/users`);

    const node = data.map(( data ) => {
        if(data.name) return {
            uid_user: data._id,
            ...data
        }
    });

    //store.dispatch( hideGlobalLoader() );
    return node;
}

export const useUsersList = () => {
    const query = useQuery(
        ['users'],
        getUsersList, {
            refetchOnWindowFocus: false,
            retry: false
        }
    );

    return query;
}