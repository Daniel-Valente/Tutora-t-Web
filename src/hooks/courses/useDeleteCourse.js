import { useMutation, useQueryClient } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const deleteCourse = async (course) => {
    const { uid_user, id_Course } = course;

    return httpClient.delete(`/courses/${ uid_user }/${ id_Course }`);
}

export const useDeleteCourse = ( ) => {
    const queryClient = useQueryClient();

    return useMutation(deleteCourse, {
        onSuccess: () => {
            queryClient.invalidateQueries(['courses']);
        }
    });
}