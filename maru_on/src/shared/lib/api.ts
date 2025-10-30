// src/shared/lib/api.ts
import axios from "axios";

const isDev = import.meta.env.DEV;

// dev: 프록시를 쓰므로 baseURL 비움(상대경로로 전송 → Vite가 포워딩)
// prod: env의 절대 주소 사용
const baseURL = isDev
    ? ""
    : (import.meta.env.VITE_API_BASE?.replace(/\/$/, "") ?? "");

export const api = axios.create({
    baseURL,
    withCredentials: true,
    headers: { Accept: "application/json" },
});

api.interceptors.response.use(
    (r) => r,
    (err) => {
        if (err?.response?.status === 401) {
            console.warn("[API] 401 unauthorized");
        }
        return Promise.reject(err);
    }
);
