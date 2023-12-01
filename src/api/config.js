import { userLocalStorage } from "./localServices";
import axios from "axios";
//https://movienew.cybersoft.edu.vn/swagger/index.html
export const BASE_URL = "https://movienew.cybersoft.edu.vn/api";

export const TOKEN_CYBER = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAwOCIsIkhldEhhblN0cmluZyI6IjIxLzAzLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcxMDk3OTIwMDAwMCIsIm5iZiI6MTY4NzE5NDAwMCwiZXhwIjoxNzExMTI2ODAwfQ.I9iDnvUJNQaG_RBPSODU3vvlNF0JJ7lRamr221wclIQ';
export let TOKEN_ACCESS = "Bearer " + userLocalStorage.get()?.accessToken;
export const configHeaders = () => {
    return {
        TokenCybersoft: TOKEN_CYBER,
    };
};

export const configHeaders2 = () => {
    return {
        Authorization: TOKEN_ACCESS,
        TokenCybersoft: TOKEN_CYBER,
    };
};
export const https = axios.create({
    baseURL: BASE_URL,
    headers: {
        TokenCybersoft: TOKEN_CYBER,
        Authorization: TOKEN_ACCESS,
    },
});