import { useMutation, useQueryClient } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const hidePost = async ({ uid_user, id_Post }) => 
    await httpClient.patch(`/users/interaction/${ uid_user }/hide/${ id_Post }`);

export const useHidePost = ( uid_user ) => {
    const queryClient = useQueryClient();
    
    return useMutation(hidePost, {
        onSuccess: () => {
            queryClient.invalidateQueries(['users', uid_user, 'interaction-hide']);
        }
    });
}