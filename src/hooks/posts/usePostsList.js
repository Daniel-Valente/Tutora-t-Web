import { useQuery } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";
import { store } from "../../store";
import { hideGlobalLoader, showGlobalLoader } from "../../actions/layout";

const getPostsList = async () => {
    //store.dispatch( showGlobalLoader() );
    const { data } = await httpClient.get('/posts');

    //store.dispatch( hideGlobalLoader() );
    return data;
}

export const usePostsList = () => {
    const query = useQuery(
        ['posts'],
        getPostsList, {
            refetchOnWindowFocus: false,
            retry: false,
            refetchInterval: 30000
        }
    );

    return query;
}