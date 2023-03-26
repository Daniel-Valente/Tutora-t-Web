import { useQuery } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const getPostsByCourse = async ({ queryKey }) => {
    const [ , , id_Course ] = queryKey;
    const { data } = await httpClient.get(`/posts/${ id_Course }`);

    return data;
}

export const usePostsByCourse = (id_Course) => {
    const query = useQuery(
        ['posts', 'course', id_Course],
        getPostsByCourse, {
            refetchOnWindowFocus: false,
            retry: false,
            refetchInterval: 30000
        }
    );

    return query;
}