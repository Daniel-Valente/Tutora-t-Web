import { useQuery } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const getCoursesByUser = async ({ queryKey }) => {
    const [ , uid_user ] = queryKey;
    const { data } = await httpClient.get(`/courses/${ uid_user }`);

    return data;
}

export const useCoursesByUser = ( uid_user ) => {
    const query = useQuery(
        ['courses', uid_user],
        getCoursesByUser, {
            refetchOnWindowFocus: false,
            retry: false
        }
    );

    return query;
}