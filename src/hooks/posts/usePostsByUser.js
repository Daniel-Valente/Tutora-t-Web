import { useQuery } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";
import { store } from "../../store";
import { hideGlobalLoader, showGlobalLoader } from "../../actions/layout";

const getPostsByUser = async ({ queryKey }) => {
    const [ , uid_user ] = queryKey;
    //store.dispatch( showGlobalLoader() );
    const { data } = await httpClient.get(`/posts/${ uid_user }`);
    
    //store.dispatch( hideGlobalLoader() );
    return data;
}

export const usePostsByUser = (uid_user) => {
    const query = useQuery(
        ['posts', uid_user],
        getPostsByUser, {
            refetchOnWindowFocus: false,
            retry: false
        }
    );

    return query;
}