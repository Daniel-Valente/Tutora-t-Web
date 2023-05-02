import { useMutation, useQueryClient } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";

const updateLike = async (likes) => {
    const { uid_user, id_Post, uid_creator, action, type, starActive, career } = likes;
    const notification = { 
        id_action: id_Post,
        action,
        uid_creator,
        type
    };
    
    !starActive && uid_user !== uid_creator && await httpClient.post(`/users/notification/${ uid_user }`, notification);
    !starActive && await httpClient.patch(`/users/arbol/${ uid_user }/like`, { career });
    return await httpClient.patch(`/likes/${uid_user}/${ id_Post }`);
}

export const useUpdateLike = ( id_Post ) => {
    const queryClient = useQueryClient(); 
    
    return useMutation(updateLike, {
        onSuccess: () => {
            queryClient.invalidateQueries(['likes', id_Post]);
        }

    });
}