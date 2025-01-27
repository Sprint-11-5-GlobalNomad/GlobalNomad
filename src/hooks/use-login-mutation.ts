import { useMutation } from "@tanstack/react-query";
import { login } from "../app/api/auth-api";
import { useState } from "react";

export interface LoginResponse {
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

export function useLoginMutation() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return {
    ...useMutation<LoginResponse, Error, { email: string; password: string }>(
      login,
      {
        onSuccess: (data) => {
          console.log("로그인 성공:", data);
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
        },
        onError: (error: any) => {
          const message =
            error.response?.data?.message || "로그인에 실패했습니다.";
          setErrorMessage(message);
        },
      }
    ),
    errorMessage, // 에러 메시지를 반환
  };
}
