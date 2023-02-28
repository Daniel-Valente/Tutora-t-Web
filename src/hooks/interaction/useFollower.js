import { useMutation, useQueryClient } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const follower = async ({ uid_user, uid_follower }) =>
    httpClient.put(`/users/interaction/${ uid_user }/follow/${ uid_follower }`);

export const useFollower = ( uid_user ) => {
    const queryClient = useQueryClient();
    
    return useMutation(follower, {
        onSuccess: () => {
            queryClient.invalidateQueries(['users', uid_user, 'followers']);
        }
    });
}