import { useMutation, useQueryClient } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const savePost = async ({ uid_user, id_Post, career }) => {
    await httpClient.put(`/users/arbol/${ uid_user }/save`, { career });
    
    return await httpClient.put(`/users/interaction/${ uid_user }/save/${ id_Post }`);
}

export const useSavePost = ( uid_user ) => {
    const queryClient = useQueryClient();
    
    return useMutation(savePost, {
        onSuccess: () => {
            queryClient.invalidateQueries(['users', uid_user, 'interaction-save']);
        }
    });
}