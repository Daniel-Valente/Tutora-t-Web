import { useMutation } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const addLike = async (like) => {
    const { uid_user, id_Post } = like;

    return httpClient.post(`/likes/${ uid_user }/${ id_Post }`, like);
}

export const useAddLike = ( ) => useMutation(addLike);