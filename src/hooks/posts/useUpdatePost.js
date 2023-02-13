import { useMutation, useQueryClient } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const updatePost = async (post) => {
    const { uid_user, id_Post, title, description, id_Course, imgPost } = post;
    const formData = new FormData();
    
    formData.append('title', title);
    formData.append('description', description);
    formData.append('id_Course', id_Course);
    formData.append('imgPost', imgPost);

    return httpClient.put(`/posts/${ uid_user }/${ id_Post }`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
}

export const useUpdatePost = ( ) => {
    const queryClient = useQueryClient();

    return useMutation(updatePost, {
        onSuccess: () => {
            queryClient.invalidateQueries(['posts']);
        }
    });
}