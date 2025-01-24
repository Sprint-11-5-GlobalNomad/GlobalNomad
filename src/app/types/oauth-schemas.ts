// OAuth DTOs
export interface OauthApp {
  id: number;
  teamId: string;
  appKey: string;
  provider: "google" | "kakao";
  createdAt: string;
  updatedAt: string;
}

export interface SignInWithOauthRequestBody {
  token: string;
  redirectUri: string;
}

export interface SignUpWithOauthRequestBody {
  nickname: string;
  token: string;
  redirectUri: string;
}
