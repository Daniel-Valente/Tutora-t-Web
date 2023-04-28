import { useMutation, useQueryClient } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";

const addUser = async (user) => {
    const { data } = await httpClient.post(`/users`, user, {
        'Content-Type': 'application/json'
    });

    const node = { user_uid: data._id, ...data };

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