import { useMutation } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const addChatToUser = async (messages) => {
    const { uid_user, uid_userChat, message } = messages;

    return httpClient.post(`/chats/${ uid_user }/to/${ uid_userChat }`, message);
}

export const useAddChatToUser = ( ) => useMutation(addChatToUser);