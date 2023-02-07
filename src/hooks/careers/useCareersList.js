import { useQuery } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const getCareersList = async () => {
    const { data = [] } = await httpClient.get('/json/careers');

    return data;
}

export const useCareersList = () => {
    const query = useQuery(
        ['careers'],
        getCareersList, {
            refetchOnWindowFocus: false,
            retry: false
        }
    );

    return query;
}