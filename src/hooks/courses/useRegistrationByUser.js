import { useQuery } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const getRegistrationByUser = async ({ queryKey }) => {
    const [ , id_Course, , uid_user ] = queryKey;

    const { data } = await httpClient.get(`/courses/${ id_Course }/registration/${ uid_user }`);

    return data;
}

export const useRegistrationByUser = ( id_Course, uid_user ) => {
    const query = useQuery(
        ['courses', id_Course, 'user', uid_user],
        getRegistrationByUser, {
            refetchOnWindowFocus: false,
            retry: false
        }
    );

    return query;
}