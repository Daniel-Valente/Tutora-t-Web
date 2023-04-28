import { useQuery } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";
import { store } from "../../store";
import { showGlobalLoader } from "../../actions/layout";

const getUsersList = async () => {
    store.dispatch( showGlobalLoader() );
    const { data } = await httpClient.get(`/users`);

    const node = data.map(( user ) => {
        return {
            uid_user: user._id,
            ...user
        }
    });

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