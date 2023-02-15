import { useMutation, useQueryClient } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const addCourse = async (course) => {
    const { uid_user, title, description, career, dates, hours, site, imgCourse } = course;
    const formData = new FormData();

    formData.append('title', title);
    formData.append('description', description);
    formData.append('career', career);
    formData.append('dates', dates);
    formData.append('hours', hours);
    formData.append('site', site);
    formData.append('imgCourse', imgCourse);

    return httpClient.post(`/courses/${ uid_user }`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
}

export const useAddCourse = ( ) => {
    const queryClient = useQueryClient();

    return useMutation(addCourse, {
        onSuccess: () => {
            queryClient.invalidateQueries(['courses']);
        }
    });
}