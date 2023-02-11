import { useMutation } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const deleteLike = async (like) => {
    const { uid_user, id_Post, id_Like } = like;

    return httpClient.delete(`/likes/${ uid_user }/${ id_Post }/of/${ id_Like }`);
}

export const useDeleteLike = ( ) => useMutation(deleteLike);