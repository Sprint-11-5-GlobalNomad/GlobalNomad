import { login, signUpWithOauth, signInWithOauth } from "../api/auth-api";
import { useCustomMutation } from "./react-query-util";
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
  useCustomMutation<
    AuthResponse, // 반환 타입 수정
    unknown, // 에러 타입
    { email: string; password: string } // 입력 변수 타입
  >((credentials) => login(credentials));

// 간편 회원가입
export const useSignUpWithOauth = (provider: "google" | "kakao") =>
  useCustomMutation<
    AuthResponse, // 반환 타입 수정
    unknown, // 에러 타입
    SignUpWithOauthRequestBody // 입력 변수 타입
  >((signUpData) => signUpWithOauth(provider, signUpData));

// 간편 로그인
export const useSignInWithOauth = (provider: "google" | "kakao") =>
  useCustomMutation<
    AuthResponse, // 반환 타입 수정
    unknown, // 에러 타입
    SignInWithOauthRequestBody // 입력 변수 타입
  >((signInData) => signInWithOauth(provider, signInData));
