import { useQuery } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const getCoursesList = async () => {
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