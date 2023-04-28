import { useQuery } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";
import { store } from "../../store";
import { showGlobalLoader } from "../../actions/layout";

const getPostsByCourse = async ({ queryKey }) => {
    const [ , , id_Course ] = queryKey;
    store.dispatch( showGlobalLoader() );
    const { data } = await httpClient.get(`/posts/${ id_Course }`);

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