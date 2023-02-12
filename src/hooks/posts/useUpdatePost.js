import { useMutation, useQueryClient } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const updatePost = async (post) => {
    const { uid_user, id_Post } = post;

    return httpClient.put(`/posts/${ uid_user }/${ id_Post }`, post);
}

export const useUpdatePost = ( ) => {
    const queryClient = useQueryClient();

    return useMutation(updatePost, {
        onSuccess: () => {
            queryClient.invalidateQueries(['posts']);
        }
    });
}