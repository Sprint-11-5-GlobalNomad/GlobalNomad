import {
  OauthApp,
  SignInWithOauthRequestBody,
  SignUpWithOauthRequestBody,
} from "../types/oauth-schemas";
import { instance } from "./base-api";

// 로그인
export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await instance.post<{
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
  }>(`/auth/login`, credentials);
  return response.data;
};

// 토큰 재발급
export const refreshToken = async () => {
  const response = await instance.post<{
    refreshToken: string;
    accessToken: string;
  }>(`/auth/tokens`);
  return response.data;
};

// Oauth App 등록/수정
export const registerOauthApp = async (appData: {
  appKey: string;
  provider: "google" | "kakao";
}) => {
  const response = await instance.post<OauthApp>(`/oauth/apps`, appData);
  return response.data;
};

// 간편 회원가입
export const signUpWithOauth = async (
  provider: "google" | "kakao",
  signUpData: SignUpWithOauthRequestBody
) => {
  const response = await instance.post<{
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
  }>(`/oauth/sign-up/${provider}`, signUpData);
  return response.data;
};

// 간편 로그인
export const signInWithOauth = async (
  provider: "google" | "kakao",
  signInData: SignInWithOauthRequestBody
) => {
  const response = await instance.post<{
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
  }>(`/oauth/sign-in/${provider}`, signInData);
  return response.data;
};
