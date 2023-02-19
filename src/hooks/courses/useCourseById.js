import { useQuery } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const getCourseById = async ({ queryKey }) => {
    const [ , id_Course ] = queryKey;
    const { data } = await httpClient.get(`/courses/${ id_Course }`);
    const [ result ] = data;

    return result;
}

export const useCourseById = ( id_Course ) => {
    const query = useQuery(
        ['courses', id_Course],
        getCourseById, {
            refetchOnWindowFocus: false,
            retry: false
        }
    );

    return query;
}