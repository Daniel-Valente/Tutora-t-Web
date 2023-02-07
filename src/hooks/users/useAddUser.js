import { useMutation } from "@tanstack/react-query";

import httpClient from "../../https/httpClient";

const addUser = async (user) =>
    httpClient.post(`/users`, user);

export const useAddUser = ( ) => 
    useMutation(addUser);