import { useQuery } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";
import { store } from "../../store";
import { hideGlobalLoader, showGlobalLoader } from "../../actions/layout";

const getCareersList = async () => {
    //store.dispatch( showGlobalLoader() );
    
    const { data = [] } = await httpClient.get('/json/careers');

    //store.dispatch( hideGlobalLoader() );
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