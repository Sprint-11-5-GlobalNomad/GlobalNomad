import { useMutation } from "@tanstack/react-query";
import { login, signUpWithOauth, signInWithOauth } from "../api/auth-api";
import {
  SignUpWithOauthRequestBody,
  SignInWithOauthRequestBody,
} from "../types/oauth-schemas";

// 로그인 반환 타입
interface AuthResponse {
  user: {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string;
    createdAt: string;
    updatedAt: string;
  };
  refreshToken: string;
  accessToken: string;
}

// 로그인
export const useLogin = () =>
  useMutation<
    AuthResponse, // 반환 타입
    unknown, // 에러 타입
    { email: string; password: string } // 입력 변수 타입
  >({
    mutationFn: (credentials) => login(credentials),
    onError: (error: unknown) => {
      console.error("Login failed:", error);
    },
  });

// 간편 회원가입
export const useSignUpWithOauth = (provider: "google" | "kakao") =>
  useMutation<
    AuthResponse, // 반환 타입
    unknown, // 에러 타입
    SignUpWithOauthRequestBody // 입력 변수 타입
  >({
    mutationFn: (signUpData) => signUpWithOauth(provider, signUpData),
    onError: (error: unknown) => {
      console.error("Sign up with OAuth failed:", error);
    },
  });

// 간편 로그인
export const useSignInWithOauth = (provider: "google" | "kakao") =>
  useMutation<
    AuthResponse, // 반환 타입
    unknown, // 에러 타입
    SignInWithOauthRequestBody // 입력 변수 타입
  >({
    mutationFn: (signInData) => signInWithOauth(provider, signInData),
    onError: (error: unknown) => {
      console.error("Sign in with OAuth failed:", error);
    },
  });
