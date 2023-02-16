import { useMutation, useQueryClient } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const deleteComment = async (comments) => {
    const { uid_user, id_Post, id_comment } = comments;

    return httpClient.delete(`/comments/${ uid_user }/${ id_Post }/of/${ id_comment }`);
}

export const useDeleteComment = ( id_Post ) => {
    const queryClient = useQueryClient();

    return useMutation(deleteComment, {
        onSuccess: () => {
            queryClient.invalidateQueries(['post', id_Post, 'comments']);
        }

    });
}