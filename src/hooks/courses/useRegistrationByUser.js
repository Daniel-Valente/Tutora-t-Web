import { useQuery } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";
import { store } from "../../store";
import { showGlobalLoader } from "../../actions/layout";

const getRegistrationByUser = async ({ queryKey }) => {
    const [ , id_Course, , uid_user ] = queryKey;
    store.dispatch( showGlobalLoader() );
    const { data } = await httpClient.get(`/courses/${ id_Course }/registration/${ uid_user }`);

    return data;
}

export const useRegistrationByUser = ( id_Course, uid_user ) => {
    const query = useQuery(
        ['courses', id_Course, 'user', uid_user],
        getRegistrationByUser, {
            refetchOnWindowFocus: false,
            retry: false,
            refetchInterval: 20000
        }
    );

    return query;
}