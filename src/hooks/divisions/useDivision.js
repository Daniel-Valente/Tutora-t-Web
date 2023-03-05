import { useQuery } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const getDivision = async () => {
    const { data = [] } = await httpClient.get('/json/divisions');

    return data;
}

export const useDivision = () => {
    const query = useQuery(
        ['divisions'],
        getDivision, {
            refetchOnWindowFocus: false,
            retry: false
        }
    );

    return query;
}