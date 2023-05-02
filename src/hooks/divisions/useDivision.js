import { useQuery } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";
import { store } from "../../store";
import { hideGlobalLoader, showGlobalLoader } from "../../actions/layout";

const getDivision = async () => {
    //store.dispatch( showGlobalLoader() );
    const { data = [] } = await httpClient.get('/json/divisions');
    //store.dispatch( hideGlobalLoader() );
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