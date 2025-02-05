import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMyDetails } from "../api/user-api";
import { removeTokens } from "@/utils/remove-tokens";

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

  const getAccessToken = () => localStorage.getItem("accessToken");

  // ✅ 유저 정보 가져오기 (React Query 활용)
  const {
    data: user,
    isFetching,
    refetch,
    isError,
    error,
  } = useQuery<User | null>({
    queryKey: ["user"],
    queryFn: async () => {
      const token = getAccessToken();
      if (!token) return null; // ✅ 기존 코드처럼 토큰 없으면 `null` 반환
      return fetchMyDetails();
    },
    staleTime: 1000 * 60 * 5, // ✅ 5분 동안 캐싱 유지
    retry: false, // ✅ 에러 발생 시 재시도하지 않음
  });

  const login = () => {
    refetch();
  };

  // ✅ 로그아웃 (토큰 삭제 & React Query 캐시 무효화)
  const logout = () => {
    console.log("🔴 로그아웃 실행");
    removeTokens();

    queryClient.removeQueries({ queryKey: ["user"] }); // ✅ 캐시 제거

    // ✅ 메인 페이지 이동 (기존 코드 유지)
    window.location.href = "/";
  };

  if (isError) {
    console.error("❌ 유저 정보 불러오기 실패, 로그아웃", error);
    logout();
  }

  return {
    user,
    isAuthenticated: !!user,
    isFetching,
    login,
    logout,
  };
};
