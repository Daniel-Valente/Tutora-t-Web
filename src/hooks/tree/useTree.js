import { useQuery } from "@tanstack/react-query";
import { tree } from "../../helpers/utils";

import httpClient from "../../http/httpClient";
import { store } from "../../store";
import { hideGlobalLoader, showGlobalLoader } from "../../actions/layout";

const getTree = async ({ queryKey }) => {
    const [ , uid_user, career ] = queryKey;

    if(!uid_user) return [];
    //store.dispatch( showGlobalLoader() );
    
    const { data: likes = [] } = await httpClient.get(`/users/arbol/${ uid_user }/like`);
    const { data: posts = [] } = await httpClient.get(`/users/arbol/${ uid_user }/post`);
    const { data: followed = [] } = await httpClient.get(`/users/arbol/${ uid_user }/follow`);
    const { data: comments = [] } = await httpClient.get(`/users/arbol/${ uid_user }/comment`);
    const { data: saves = [] } = await httpClient.get(`/users/arbol/${ uid_user }/save`);
    const { data: courses = [] } = await httpClient.get(`/users/arbol/${ uid_user }/course`);
    const { data: inscriptions = [] } = await httpClient.get(`/users/arbol/${ uid_user }/course/inscripto`);

    //store.dispatch( hideGlobalLoader() );
    return tree(career, likes, posts, followed, comments, saves, courses, inscriptions);
}

export const useTree = (uid_user, career) => {
    const query = useQuery(
        uid_user ? ['tree', uid_user, career] : [],
        getTree, {
            refetchOnWindowFocus: false,
            retry: false,
            refetchInterval: 20000
        }
    );

    return query;
}