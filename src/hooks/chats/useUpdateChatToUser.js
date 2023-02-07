import { useMutation } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const updateChatToUser = async (messages) => {
    const { uid_user, uid_userChat } = messages;

    return httpClient.put(`/chats/${ uid_user }/to/${ uid_userChat }`);
}

export const useUpdateChatToUser = ( ) => useMutation(updateChatToUser);