import { useMutation, useQueryClient } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";

const deletePost = async (post) => {
    const { uid_user, id_Post } = post;

    return await httpClient.delete(`/posts/${ uid_user }/${ id_Post }`);
}

export const useDeletePost = ( id_Post ) => {
    const queryClient = useQueryClient();

    return useMutation(deletePost, {
        onSuccess: () => {
            queryClient.invalidateQueries(["posts"]);
            queryClient.removeQueries(['likes', id_Post]);
            queryClient.removeQueries(['post', id_Post, 'comments']);
        }
    });
}