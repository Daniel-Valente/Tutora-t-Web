import { useQuery } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";
import { store } from "../../store";
import { showGlobalLoader } from "../../actions/layout";

const getCareerList = async () => {
    store.dispatch( showGlobalLoader() );
    
    const { data = [] } = await httpClient.get('/json/careers');

    const career = data.filter( element => element.clave !== 'Todos' );

    const node = career.map(( element, index ) => ({
        value: element.clave,
        label: element.name
    }));

    return node;
}

export const useCareerList = () => {
    const query = useQuery(
        ['careers-list'],
        getCareerList, {
            refetchOnWindowFocus: false,
            retry: false
        }
    );

    return query;
}