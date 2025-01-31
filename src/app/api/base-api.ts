import axios from "axios";
import { refreshToken as refreshTokenAPI } from "./auth-api";

// Axios 인스턴스 생성
export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ 요청 인터셉터: 모든 요청에 accessToken 자동 포함
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ 응답 인터셉터: 401 발생 시 refreshToken으로 accessToken 갱신
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        console.log("🔄 토큰 만료됨, refreshToken으로 재발급 시도");

        // refreshToken API 호출
        const { accessToken } = await refreshTokenAPI();
        localStorage.setItem("accessToken", accessToken);

        // 실패했던 요청을 새로운 accessToken으로 재시도
        error.config.headers.Authorization = `Bearer ${accessToken}`;
        return instance.request(error.config);
      } catch (refreshError) {
        console.error("❌ 토큰 갱신 실패, 로그아웃 처리 필요");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return Promise.reject(refreshError);
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
