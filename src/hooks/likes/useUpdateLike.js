import { useMutation, useQueryClient } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const updateLike = async (likes) => {
    const { uid_user, id_Post } = likes;

    return httpClient.put(`/likes/${uid_user}/${ id_Post }`);
}

export const useUpdateLike = ( ) => {
    const queryClient = useQueryClient(); 
    
    return useMutation(updateLike, {
        onSuccess: () => {
            queryClient.invalidateQueries(['likes']);
        }

    });
}