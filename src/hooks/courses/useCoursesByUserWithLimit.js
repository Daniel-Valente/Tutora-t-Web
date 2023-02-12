import { useQuery } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const getCoursesByUserWithLimit = async ({ queryKey }) => {
    const [ , uid_user, limit ] = queryKey;
    const { data } = await httpClient.get(`/courses/${ uid_user }/${ limit }`);

    return data;
}

export const useCoursesByUserWithLimit = ( uid_user, limit ) => {
    const query = useQuery(
        ['courses', uid_user, 'limit', limit],
        getCoursesByUserWithLimit, {
            refetchOnWindowFocus: false,
            retry: false
        }
    );

    return query;
}