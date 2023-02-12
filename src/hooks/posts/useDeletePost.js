import { useMutation, useQueryClient } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const deletePost = async (post) => {
    const { uid_user, id_Post } = post;

    return httpClient.delete(`/posts/${ uid_user }/${ id_Post }`);
}

export const useDeletePost = ( ) => {
    const queryClient = useQueryClient();

    return useMutation(deletePost, {
        onSuccess: () => {
            queryClient.invalidateQueries(['posts']);
        }
    });
}