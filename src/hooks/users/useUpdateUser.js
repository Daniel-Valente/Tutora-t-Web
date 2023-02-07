import { useMutation } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const updateUser = async (user) => {
    const { uid_user } = user;

    return httpClient.put(`/users/${ uid_user }`, user);
}

export const useUpdateUser = ( ) => 
    useMutation(updateUser);