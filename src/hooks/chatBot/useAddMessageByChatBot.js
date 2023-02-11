import { useMutation } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const addMessageByChatBot = async (message) => 
    httpClient.post(`/chats/bot`, message);

export const useAddMessageByChatBot = ( ) => 
    useMutation(addMessageByChatBot);