import { useMutation, useQueryClient } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const updateLike = async (likes) => {
    const { uid_user, id_Post, uid_creator, message, referencia } = likes;
    const notification = {
        uid_user,
        uid_creator,
        message,
        id_post: referencia
    };

    return httpClient.put(`/likes/${uid_user}/${ id_Post }`, notification);
}

export const useUpdateLike = ( id_Post ) => {
    const queryClient = useQueryClient(); 
    
    return useMutation(updateLike, {
        onSuccess: () => {
            queryClient.invalidateQueries(['likes', id_Post]);
        }

    });
}