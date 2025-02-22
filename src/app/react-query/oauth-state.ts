import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  login,
  signUpWithOauth,
  signInWithOauth,
  refreshToken,
} from "../(primary)/api/auth-api";
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
      if (axios.isAxiosError(error)) {
        const errorMessage =
          typeof error.response?.data === "object" &&
          error.response?.data?.message
            ? error.response.data.message
            : "알 수 없는 오류가 발생했습니다.";

        switch (error.response?.status) {
          case 400:
            console.error(error.message);
            break;
          case 404:
            console.error(
              "존재하지 않는 유저입니다. 올바른 이메일을 입력했는지 확인하세요."
            );
            alert(errorMessage);
            break;
          default:
            console.error("로그인 중 알 수 없는 오류가 발생했습니다.", error);
            alert(errorMessage);
        }
      }
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
      if (axios.isAxiosError(error)) {
        const errorMessage =
          typeof error.response?.data === "object" &&
          error.response?.data?.message
            ? error.response.data.message
            : "알 수 없는 오류가 발생했습니다.";

        console.error("OAuth 회원가입 중 오류가 발생했습니다.", error);
        alert(errorMessage);
      }
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
      if (axios.isAxiosError(error)) {
        const errorMessage =
          typeof error.response?.data === "object" &&
          error.response?.data?.message
            ? error.response.data.message
            : "알 수 없는 오류가 발생했습니다.";

        console.error("OAuth 로그인 중 오류가 발생했습니다.", error);
        alert(errorMessage);
      }
    },
  });

// 토큰 갱신
export const useRefreshToken = () =>
  useMutation<
    { refreshToken: string; accessToken: string }, // 반환 타입
    unknown, // 에러 타입
    void // 입력 변수 없음
  >({
    mutationFn: () => refreshToken(),
    onSuccess: (data) => {
      console.log("토큰 갱신 성공:", data);
      // 예: 새로운 토큰을 저장하는 로직 추가 가능
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          typeof error.response?.data === "object" &&
          error.response?.data?.message
            ? error.response.data.message
            : "알 수 없는 오류가 발생했습니다.";

        switch (error.response?.status) {
          case 400:
            console.error(error.message);
            alert(errorMessage);
            break;
          case 401:
            console.error("인증되지 않은 요청입니다. 다시 로그인하세요.");
            alert(errorMessage);
            break;
          default:
            console.error(
              "토큰 갱신 중 알 수 없는 오류가 발생했습니다.",
              error
            );
            alert(errorMessage);
        }
      }
    },
  });
