import { useQuery } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";
import { store } from "../../store";
import { showGlobalLoader } from "../../actions/layout";

const getDivision = async () => {
    store.dispatch( showGlobalLoader() );
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