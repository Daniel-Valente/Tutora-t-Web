import { useMutation, useQueryClient } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const updateComment = async (comments) => {
    const { uid_user, id_Post, id_comment } = comments;

    return await httpClient.put(`/comments/${ uid_user }/${ id_Post }/of/${ id_comment }`, comments);
}

export const useUpdateComment = ( id_Post ) => {
    const queryClient = useQueryClient();

    return useMutation(updateComment, {
        onSuccess: () => {
            queryClient.invalidateQueries(['post', id_Post, 'comments']);
        }
    });
}