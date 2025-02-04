import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMyDetails } from "../api/user-api";
import { useCallback, useEffect, useState } from "react";

// ✅ 유저 타입 정의
interface User {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// ✅ useAuth 훅 (React Query 적용)
export const useAuth = () => {
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState<boolean>(true); // ✅ 기존처럼 `loading` 상태 유지
  const [user, setUser] = useState<User | null>(null); // ✅ `useState` 기반의 상태 관리 유지

  const getAccessToken = () => localStorage.getItem("accessToken");

  // ✅ 로그아웃 (토큰 삭제 & React Query 캐시 무효화)
  const logout = useCallback(() => {
    console.log("🔴 로그아웃 실행");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    setUser(null); // ✅ 기존 코드처럼 `setUser(null)` 유지
    queryClient.removeQueries({ queryKey: ["user"] }); // ✅ 캐시 제거

    // ✅ 메인 페이지 이동 (기존 코드 유지)
    window.location.href = "/";
  }, [queryClient]);

  // ✅ 유저 정보 가져오기 (React Query 활용)
  const { data, isFetching, error } = useQuery<User | null>({
    queryKey: ["user"],
    queryFn: async () => {
      const token = getAccessToken();
      if (!token) return null; // ✅ 기존 코드처럼 토큰 없으면 `null` 반환
      return fetchMyDetails();
    },
    staleTime: 1000 * 60 * 5, // ✅ 5분 동안 캐싱 유지
    retry: false, // ✅ 에러 발생 시 재시도하지 않음
  });

  // ✅ `useEffect`를 사용하여 기존 `checkAuthStatus` 흐름 유지
  useEffect(() => {
    setLoading(isFetching); // ✅ `loading` 상태 업데이트
    if (error) {
      console.error("❌ 유저 정보 불러오기 실패, 로그아웃", error);
      logout();
    } else if (data !== undefined) {
      setUser(data); // ✅ 기존처럼 `setUser`로 상태 업데이트
    }
  }, [data, isFetching, error, logout]);

  return {
    user,
    isAuthenticated: !!user,
    loading,
    logout,
  };
};
