import { useEffect, useState, useCallback } from "react";
import { fetchMyDetails } from "../api/user-api";
import { refreshToken as refreshTokenAPI } from "../api/auth-api";
import { isAxiosError } from "axios";

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
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ 토큰 가져오기
  const getAccessToken = () => localStorage.getItem("accessToken");

  // ✅ 로그아웃 (토큰 삭제)
  const logout = useCallback(() => {
    console.log("🔴 로그아웃 실행");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  // ✅ 토큰 갱신 (accessToken이 만료된 경우)
  const handleTokenRefresh = useCallback(async () => {
    try {
      console.log("🔄 토큰 갱신 시도...");
      const { accessToken } = await refreshTokenAPI();
      localStorage.setItem("accessToken", accessToken);
      console.log("✅ 토큰 갱신 성공");

      // 🔹 다시 유저 정보 가져오기
      await fetchMyDetails()
        .then((userData) => {
          setUser(userData);
          setIsAuthenticated(true);
        })
        .catch((e) => {
          console.error("❌ 유저 정보 다시 가져오기 실패, 로그아웃", e);
          logout();
        });
    } catch (e: unknown) {
      console.error("❌ 토큰 갱신 실패, 로그아웃", e);
      logout();
    }
  }, [logout]); // ✅ logout을 의존성 배열에 포함

  // ✅ 로그인 상태 확인 & 유저 정보 가져오기
  const checkAuthStatus = useCallback(async () => {
    setLoading(true);
    const token = getAccessToken();

    if (token) {
      try {
        const userData = await fetchMyDetails();
        setUser(userData);
        setIsAuthenticated(true);
      } catch (e: unknown) {
        if (isAxiosError(e) && e.response?.status === 401) {
          await handleTokenRefresh(); // ✅ 여기서 handleTokenRefresh를 호출
        } else {
          console.error("유저 정보 불러오기 실패", e);
          logout();
        }
      }
    } else {
      logout();
    }
    setLoading(false);
  }, [handleTokenRefresh, logout]); // ✅ handleTokenRefresh을 추가하여 의존성 문제 해결

  // ✅ 앱 실행 시 로그인 상태 확인
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]); // ✅ 의존성 배열 추가하여 eslint 경고 해결

  return {
    user,
    isAuthenticated,
    loading,
    logout,
  };
};
