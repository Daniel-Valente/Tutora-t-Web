import { useMutation, useQueryClient } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const addPost = async (post) => {
    const { uid_user, title, description, id_Course, imgPost } = post;
    const formData = new FormData();

    formData.append('title', title);
    formData.append('description', description);
    formData.append('id_Course', id_Course);
    formData.append('imgName', imgPost);

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