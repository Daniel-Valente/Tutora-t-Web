import { useQuery } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const getCareerById = async ({ queryKey }) => {
    const [ , id ] = queryKey;
    const { data = [] } = await httpClient.get(`/json/careers/${ id }`);

    return data;
}

export const useCareerById = ( id ) => {
    const query = useQuery(
        ['careers', id],
        getCareerById, {
            refetchOnWindowFocus: false,
            retry: false
        }
    );

    return query;
}