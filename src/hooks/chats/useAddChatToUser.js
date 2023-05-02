import { useMutation, useQueryClient } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";

const addChatToUser = async (messages) => {
    const { uid_user, uid_userChat, message } = messages;

    return await httpClient.post(`/chats/${ uid_user }/to/${ uid_userChat }`, {message});
}

export const useAddChatToUser = ( uid_user, uid_userChat ) => {
    const queryClient = useQueryClient();
    
    return useMutation(addChatToUser, {
        onSuccess: () => {
            queryClient.invalidateQueries(['chats', uid_user]);
            queryClient.invalidateQueries(['chats', uid_user, 'limit', '5']);
            queryClient.invalidateQueries(['chats', uid_user, 'to user', uid_userChat]);
            queryClient.invalidateQueries(['chats', uid_userChat , 'to user', uid_user]);
        }

    });
}