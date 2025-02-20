import axios from "axios";
import {
  OauthApp,
  SignInWithOauthRequestBody,
  SignUpWithOauthRequestBody,
} from "../../types/oauth-schemas";

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

  const { accessToken, refreshToken } = response.data;
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);

  return response.data;
};

// 토큰 재발급
export const refreshToken = async () => {
  const token = localStorage.getItem("refreshToken");
  if (!token) alert("Refresh token이 없습니다.");

  const response = await axios.post<{
    refreshToken: string;
    accessToken: string;
  }>(
    `https://sp-globalnomad-api.vercel.app/11-5/auth/tokens`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

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
