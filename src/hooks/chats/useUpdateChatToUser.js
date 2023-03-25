import { useMutation, useQueryClient } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const updateChatToUser = async (messages) => {
    const { uid_user, uid_userChat } = messages;

    return await httpClient.patch(`/chats/${ uid_user }/to/${ uid_userChat }`);
}

export const useUpdateChatToUser = ( uid_user, uid_userChat ) => {
    const queryClient = useQueryClient();

    return useMutation(updateChatToUser, {
        onSuccess: () => {
            queryClient.invalidateQueries(['chats', uid_user]);
            queryClient.invalidateQueries(['chats', uid_user, 'limit', '5']);
            queryClient.invalidateQueries(['chats', uid_user, 'to user', uid_userChat]);
            queryClient.invalidateQueries(['chats', uid_userChat , 'to user', uid_user]);
        }

    });
}