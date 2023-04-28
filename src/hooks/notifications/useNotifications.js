import { useQuery } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";
import { store } from "../../store";
import { showGlobalLoader } from "../../actions/layout";

const getNotifications = async ({ queryKey }) => {
    const [ , uid_user ] = queryKey;

    if (!uid_user) return [];
    store.dispatch( showGlobalLoader() );
    const { data } = await httpClient.get(`/users/notification/${ uid_user }`);

    return data;
}

export const useNotifications = (uid_user) => {
    const query = useQuery(
        uid_user ? ['notifications', uid_user] : [],
        getNotifications, {
            refetchOnWindowFocus: false,
            retry: false,
            refetchInterval: 30000
        }
    );

    return query;
}