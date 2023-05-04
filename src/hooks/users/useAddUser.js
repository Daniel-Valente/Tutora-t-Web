import { useMutation, useQueryClient } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";

const addUser = async (user) => {
    const { data } = await httpClient.post(`/users`, user, {
        'Content-Type': 'application/json'
    });

    const { newUser } = data;
    const node = { uid_user: newUser._id, ...newUser };

    return node;
}

export const useAddUser = ( ) => {
    const queryClient = useQueryClient();
    
    return useMutation(addUser, {
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
        }
    });
}