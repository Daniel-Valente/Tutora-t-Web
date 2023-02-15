import { useMutation, useQueryClient } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const addComment = async (comments) => {
    const { uid_user, id_Post } = comments;

    return httpClient.post(`/comments/${uid_user}/${id_Post}`, comments);
}

export const useAddComment = (id_Post) => {
    const queryClient = useQueryClient();

    return useMutation(addComment, {
        onSuccess: () => {
            queryClient.invalidateQueries(['post', id_Post, 'comments']);
        }

    });
}
