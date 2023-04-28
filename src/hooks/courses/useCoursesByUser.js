import { useQuery } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";
import { store } from "../../store";
import { showGlobalLoader } from "../../actions/layout";

const getCoursesByUser = async ({ queryKey }) => {
    const [ , uid_user ] = queryKey;

    store.dispatch( showGlobalLoader() );
    const { data } = await httpClient.get(`/courses/${ uid_user }`);

    return data;
}

export const useCoursesByUser = ( uid_user ) => {
    const query = useQuery(
        ['courses', uid_user],
        getCoursesByUser, {
            refetchOnWindowFocus: false,
            retry: false,
            refetchInterval: 300000
        }
    );

    return query;
}