import { useQuery } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";
import { store } from "../../store";
import { showGlobalLoader } from "../../actions/layout";

const getCoursesByUserWithLimit = async ({ queryKey }) => {
    const [ , uid_user, limit ] = queryKey;
    store.dispatch( showGlobalLoader() );
    const { data } = await httpClient.get(`/courses/${ uid_user }/${ limit }`);

    return data;
}

export const useCoursesByUserWithLimit = ( uid_user, limit ) => {
    const query = useQuery(
        ['courses', uid_user, 'limit', limit],
        getCoursesByUserWithLimit, {
            refetchOnWindowFocus: false,
            retry: false,
            refetchInterval: 300000
        }
    );

    return query;
}