import { useQuery } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";
import { store } from "../../store";
import { hideGlobalLoader, showGlobalLoader } from "../../actions/layout";

const getCourseById = async ({ queryKey }) => {
    const [ , id_Course ] = queryKey;
    
    if(!id_Course) return [];
    //store.dispatch( showGlobalLoader() );

    const { data } = await httpClient.get(`/courses/${ id_Course }`);
    const [ result ] = data;

    //store.dispatch( hideGlobalLoader() );
    return result;
}

export const useCourseById = ( id_Course ) => {
    const query = useQuery(
        id_Course ? ['courses', id_Course] : [],
        getCourseById, {
            refetchOnWindowFocus: false,
            retry: false,
            refetchInterval: 30000
        }
    );

    return query;
}