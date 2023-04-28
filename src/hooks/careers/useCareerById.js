import { useQuery } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";
import { store } from "../../store";
import { showGlobalLoader } from "../../actions/layout";

const getCareerById = async ({ queryKey }) => {
    const [ , id ] = queryKey;
    if( !id ) return [];
    store.dispatch( showGlobalLoader() );

    const { data } = await httpClient.get(`/json/careers/${ id }`);

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