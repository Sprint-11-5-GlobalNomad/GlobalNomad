import axios from "axios";

// Axios 인스턴스 생성
export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 공통 응답 처리
export const handleResponse = async <T>(request: Promise<{ data: T }>) => {
  const { data } = await request;
  return data;
};
