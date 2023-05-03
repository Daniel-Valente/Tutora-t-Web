import { useQuery } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";
import { store } from "../../store";
import { hideGlobalLoader, showGlobalLoader } from "../../actions/layout";

const getCommentList = async ( id_Post ) => {
    const { data } = await httpClient.get(`/comments/${ id_Post }`);
    return data;
}

export const useCommentList = (id_Post) => {
    const query = useQuery(
        ['post', id_Post, 'comments'],
        getCommentList(id_Post), {
            refetchOnWindowFocus: false,
            retry: false,
            refetchInterval: 30000
        }
    );

    return query;
}