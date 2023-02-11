import { useMutation } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const registrationUser = async (course) => {
    const { uid_user, id_Course } = course;

    return httpClient.put(`/${ id_Course }/registration/${ uid_user }`);
}

export const useRegistrationUser = ( ) => useMutation(registrationUser);