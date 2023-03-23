import { useMutation, useQueryClient } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const registrationUser = async (course) => {
    const { uid_user, id_Course, uid_creator, action, type, dataUserRegister, career } = course;
    const notification = { 
        id_action: id_Course,
        action,
        uid_creator,
        type
    };

    await httpClient.put(`/users/arbol/${ uid_user }/course/inscripto`, { career });
    !dataUserRegister && await httpClient.post(`/users/notification/${ uid_user }`, notification);
    return await httpClient.put(`/courses/${ id_Course }/registration/${ uid_user }`);
}

export const useRegistrationUser = (id_Course, uid_user) => {
    const queryClient = useQueryClient();

    return useMutation(registrationUser, {
        onSuccess: () => {
            queryClient.invalidateQueries(['courses']);
            queryClient.invalidateQueries(['courses', id_Course, 'user', uid_user]);
        }
    });
}