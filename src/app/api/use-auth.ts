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

  // ✅ 토큰 가져오기
  const getAccessToken = () => localStorage.getItem("accessToken");

  // ✅ 로그아웃
  const logout = useCallback(() => {
    console.log("🔴 로그아웃 실행");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);

    // 🔄 로그인 상태였을 때만 새로고침 실행
    if (user !== null) {
      window.location.reload();
    }
  }, []);

  // ✅ 로그인 상태 확인 & 유저 정보 가져오기
  const checkAuthStatus = useCallback(async () => {
    const token = getAccessToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true); // ✅ API 호출 전 로딩 상태 시작
      const userData = await fetchMyDetails();
      setUser(userData);
    } catch (e) {
      console.error("❌ 유저 정보 불러오기 실패, 로그아웃", e);
      logout();
    } finally {
      setLoading(false); // ✅ API 호출이 끝난 후 로딩 상태 종료
    }
  }, [logout]); // ✅ logout을 의존성으로 유지

  // ✅ 앱 실행 시 로그인 상태 확인
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return {
    user,
    isAuthenticated: !!user, // ✅ user 유무로 인증 여부 판단
    loading,
    logout,
  };
};
