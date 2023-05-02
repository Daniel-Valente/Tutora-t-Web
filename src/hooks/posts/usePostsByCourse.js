import { useQuery } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";
import { store } from "../../store";
import { hideGlobalLoader, showGlobalLoader } from "../../actions/layout";

const getPostsByCourse = async ({ queryKey }) => {
    const [ , , id_Course ] = queryKey;
    //store.dispatch( showGlobalLoader() );
    const { data } = await httpClient.get(`/posts/${ id_Course }`);

    //store.dispatch( hideGlobalLoader() );
    return data;
}

export const usePostsByCourse = (id_Course) => {
    const query = useQuery(
        ['posts', 'course', id_Course],
        getPostsByCourse, {
            refetchOnWindowFocus: false,
            retry: false,
            refetchInterval: 30000
        }
    );

    return query;
}