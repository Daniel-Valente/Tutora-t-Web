import { useMutation, useQueryClient } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const addPost = async (post) => {
    const { uid_user, title, description, career, id_Course, imgPost, action, type } = post;
    const formData = new FormData();

    const notification = { 
        id_action: id_Course,
        action,
        uid_creator: '',
        type
    };

    formData.append('title', title);
    formData.append('description', description);
    formData.append('id_Course', id_Course);
    formData.append('imgPost', imgPost);
    formData.append('career', career);

    id_Course && httpClient.post(`/users/notification/${ uid_user }`, notification);
    return httpClient.post(`/posts/${ uid_user }`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
}

export const useAddPost = ( ) => {
    const queryClient = useQueryClient();
    
    return useMutation(addPost, {
        onSuccess: () => {
            queryClient.invalidateQueries(['posts']);
        }

    });
}