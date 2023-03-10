import { useMutation, useQueryClient } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const addComment = async (comments) => {
    const { uid_user, id_Post, action, uid_creator, type } = comments;
    const notification = { 
        id_action: id_Post,
        action,
        uid_creator,
        type
    };
    httpClient.post(`/users/notification/${ uid_user }`, notification);
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
