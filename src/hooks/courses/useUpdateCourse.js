import { useMutation, useQueryClient } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const updateCourse = async (course) => {
    const { uid_user, id_Course } = course;

    return httpClient.put(`/courses/${ uid_user }/${ id_Course }`, course);
}

export const useUpdateCourse = ( ) => {
    const queryClient = useQueryClient();

    return useMutation(updateCourse, {
        onSuccess: () => {
            queryClient.invalidateQueries(['courses']);
        }
    });
}