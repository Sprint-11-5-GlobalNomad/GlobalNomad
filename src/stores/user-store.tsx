import { create } from "zustand";
import { UserServiceResponseDto } from "../app/types/user-schemas";

interface UserState {
  currentUser: UserServiceResponseDto | null; // 현재 로그인된 사용자 정보
  isAuthenticated: boolean; // 사용자가 인증 상태인지 여부
  login: (user: UserServiceResponseDto) => void; // 로그인 시 사용자 정보를 저장
  logout: () => void; // 로그아웃 시 상태 초기화
}

export const useUserStore = create<UserState>((set) => ({
  currentUser: null,
  isAuthenticated: false,

  // 로그인 시 호출. 사용자 정보를 상태에 저장하고 인증 상태를 true로 설정합니다.
  login: (user) => set({ currentUser: user, isAuthenticated: true }),

  // 로그아웃 시 호출. 사용자 정보를 초기화하고 인증 상태를 false로 설정합니다.
  logout: () => set({ currentUser: null, isAuthenticated: false }),
}));
