import { useMutation, useQueryClient } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";

const updateCourse = async (course) => {
    const { uid_user, id_Course, title, description, dates, hours, site, visible, imgCourse } = course;
    const formData = new FormData();

    formData.append('title', title);
    formData.append('description', description);
    formData.append('dates', dates);
    formData.append('hours', hours);
    formData.append('site', site);
    formData.append('visible', visible);
    formData.append('imgCourse', imgCourse);

    return await httpClient.put(`/courses/${ uid_user }/${ id_Course }`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
}

export const useUpdateCourse = ( ) => {
    const queryClient = useQueryClient();

    return useMutation(updateCourse, {
        onSuccess: () => {
            queryClient.invalidateQueries(['courses']);
        }
    });
}