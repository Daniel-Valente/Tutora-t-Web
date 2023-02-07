import { useQuery } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const getCareerList = async () => {
    const { data = [] } = await httpClient.get('/json/careers');

    const node = data.map(( element, index ) => ({
        value: element.clave,
        label: element.name
    }));

    return node;
}

export const useCareerList = () => {
    const query = useQuery(
        ['careers'],
        getCareerList, {
            refetchOnWindowFocus: false,
            retry: false
        }
    );

    return query;
}