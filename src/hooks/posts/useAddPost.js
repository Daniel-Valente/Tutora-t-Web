import { useMutation, useQueryClient } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const addPost = async (post) => {
    const { uid_user } = post;

    return httpClient.post(`/posts/${ uid_user }`, post);
}

export const useAddPost = ( ) => {
    const queryClient = useQueryClient();
    
    return useMutation(addPost, {
        onSuccess: () => {
            queryClient.invalidateQueries(['posts']);
        }

    });
}