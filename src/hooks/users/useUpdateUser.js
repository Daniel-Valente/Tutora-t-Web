import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import httpClient from "../../https/httpClient";

const updateUser = async (user) => {
    const { uid_user, imgName, imgPortadaName, nombre, telefono, password, username, carrera } = user;
    const formData = new FormData();

    formData.append('imgName',imgName);
    formData.append('imgPortadaName',imgPortadaName);
    formData.append('nombre',nombre);
    formData.append('telefono',telefono);
    formData.append('password',password);
    formData.append('username',username);
    formData.append('carrera',carrera);

    return httpClient.put(`/users/${ uid_user }`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
}

export const useUpdateUser = () => useMutation(updateUser);