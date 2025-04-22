import { userLocalStorage } from "./localServices";
import axios from "axios";
//https://movienew.cybersoft.edu.vn/swagger/index.html
export const BASE_URL = "https://movienew.cybersoft.edu.vn/api";

export const TOKEN_CYBER = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAwOCIsIkhldEhhblN0cmluZyI6IjMwLzExLzIwNTUiLCJIZXRIYW5UaW1lIjoiMTcxMDk3OTIwMDAwMCIsIm5iZiI6MjY4NzE5NDAwMCwiZXhwIjoyNzExMTI2ODAwfQ.YIjZXTSjr17jhX_UabDc01YwLmr9um_SkbDMrCppVG4';
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
