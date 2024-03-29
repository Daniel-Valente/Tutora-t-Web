import { useMutation, useQueryClient } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";

const updateComment = async (comments) => {
    const { uid_user, id_Post, id_comment } = comments;

    return await httpClient.patch(`/comments/${ uid_user }/${ id_Post }/of/${ id_comment }`, comments);
}

export const useUpdateComment = ( id_Post ) => {
    const queryClient = useQueryClient();

    return useMutation(updateComment, {
        onSuccess: () => {
            queryClient.invalidateQueries(['post', id_Post, 'comments']);
        }
    });
}