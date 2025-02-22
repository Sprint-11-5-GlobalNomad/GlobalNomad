import axios from "axios";
import { refreshToken as refreshTokenAPI } from "./auth-api";
import { removeTokens } from "@/utils/remove-tokens";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false; // 🔄 리프레시 토큰 요청 중인지 확인
let refreshSubscribers: ((token: string) => void)[] = []; // 🔄 토큰 갱신 후 대기 중인 요청 처리

// ✅ 요청 인터셉터: 모든 요청에 accessToken 자동 포함
instance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ 응답 인터셉터: 401 발생 시 refreshToken으로 accessToken 갱신
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // ✅ 이미 리프레시 토큰 요청 중이면 새로운 요청을 대기
        return new Promise((resolve) => {
          refreshSubscribers.push((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(instance.request(originalRequest));
          });
        });
      }

      originalRequest._retry = true; // 🔄 중복 요청 방지
      isRefreshing = true;

      try {
        console.log("🔄 토큰 만료됨, refreshToken으로 재발급 시도");

        // ✅ 리프레시 토큰으로 새 accessToken 발급
        const { accessToken, refreshToken } = await refreshTokenAPI();
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        // ✅ 대기 중이던 요청들 처리
        refreshSubscribers.forEach((callback) => callback(accessToken));
        refreshSubscribers = [];

        // ✅ 새로운 accessToken으로 원래 요청 다시 시도
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return instance.request(originalRequest);
      } catch (refreshError) {
        console.error("❌ 토큰 갱신 실패, 로그아웃 처리");
        removeTokens();

        // ✅ 강제 로그아웃 실행 (useAuth에 logout 함수 추가 필요)
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// 공통 응답 처리 함수
export const handleResponse = async <T>(request: Promise<{ data: T }>) => {
  const { data } = await request;
  return data;
};
