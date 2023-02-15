import { useMutation } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const updateComment = async (comments) => {
    const { uid_user, id_Post, id_comment } = comments;

    return httpClient.put(`/comments/${ uid_user }/${ id_Post }/of/${ id_comment }`, comments);
}

export const useUpdateComment = ( ) => useMutation(updateComment);