import { useMutation } from "@tanstack/react-query";

import httpClient from "../../http/httpClient";

const addMessageByChatBot = async (message) => 
    await httpClient.post(`/chats/bot`, message);

export const useAddMessageByChatBot = ( ) => 
    useMutation(addMessageByChatBot);