import { useMutation } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const addCourse = async (course) => {
    const { uid_user } = course;

    return httpClient.post(`/courses/${ uid_user }`, course);
}

export const useAddCourse = ( ) => useMutation(addCourse);