import { useQuery } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";
import { store } from "../../store";
import { showGlobalLoader } from "../../actions/layout";

const getCoursesList = async () => {
    store.dispatch( showGlobalLoader() );
    const { data } = await httpClient.get('/courses');

    return data;
}

export const useCoursesList = () => {
    const query = useQuery(
        ['courses'],
        getCoursesList, {
            refetchOnWindowFocus: false,
            retry: false,
            refetchInterval: 30000
        }
    );

    return query;
}