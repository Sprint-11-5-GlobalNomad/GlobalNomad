import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMyDetails } from "./user-api";
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

// ✅ useAuth 훅
export const useAuth = () => {
  const queryClient = useQueryClient();

  const getAccessToken = () => localStorage.getItem("accessToken");

  // ✅ 유저 정보 가져오기
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
      if (!token) return null;
      return fetchMyDetails();
    },
    staleTime: 1000 * 60 * 15,
    retry: false,
  });

  const login = () => {
    refetch();
  };

  const logout = () => {
    removeTokens();

    queryClient.removeQueries({ queryKey: ["user"] });

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
