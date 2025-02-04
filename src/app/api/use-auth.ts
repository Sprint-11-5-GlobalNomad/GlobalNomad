import { useEffect, useState, useCallback } from "react";
import { fetchMyDetails } from "../api/user-api";

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
  const [loading, setLoading] = useState<boolean>(true);

  const getAccessToken = () => localStorage.getItem("accessToken");

  // ✅ 로그아웃 (토큰 삭제 후 리디렉션)
  const logout = useCallback(() => {
    console.log("🔴 로그아웃 실행");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    window.location.href = "/"; // ✅ 메인 페이지로 이동
  }, []);

  // ✅ 로그인 상태 확인 & 유저 정보 가져오기
  const checkAuthStatus = useCallback(async () => {
    setLoading(true);
    const token = getAccessToken();

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const userData = await fetchMyDetails();
      setUser(userData);
    } catch (e) {
      console.error("❌ 유저 정보 불러오기 실패, 로그아웃", e);
      logout();
    } finally {
      setLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return {
    user,
    isAuthenticated: !!user,
    loading,
    logout,
  };
};
