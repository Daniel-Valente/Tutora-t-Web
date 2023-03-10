import { useMutation, useQueryClient } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const follower = async (follower) => {
    const { uid_user, uid_follower, action, type, active } = follower;
    const notification = {
        action,
        uid_creator: uid_user,
        type
    };

    !active && httpClient.post(`/users/notification/${ uid_follower }`, notification);
    return await httpClient.put(`/users/interaction/${ uid_user }/follow/${ uid_follower }`);
}

export const useFollower = ( uid_user ) => {
    const queryClient = useQueryClient();
    
    return useMutation(follower, {
        onSuccess: () => {
            queryClient.invalidateQueries(['users', uid_user, 'followers']);
        }
    });
}