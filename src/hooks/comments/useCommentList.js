import { useQuery } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";
import { store } from "../../store";
import { hideGlobalLoader, showGlobalLoader } from "../../actions/layout";

const getCommentList = async ({ queryKey }) => {
    const [ , id_Post ] = queryKey;
    //store.dispatch( showGlobalLoader() );

    const { data } = await httpClient.get(`/comments/${ id_Post }`);
    const { result } = data;

    //store.dispatch( hideGlobalLoader() );
    return result;
}

export const useCommentList = (id_Post) => {
    const query = useQuery(
        ['post', id_Post, 'comments'],
        getCommentList, {
            refetchOnWindowFocus: false,
            retry: false,
            refetchInterval: 30000
        }
    );

    return query;
}