import { instance } from "./base-api";
import {
  UserServiceResponseDto,
  CreateUserBodyDto,
  UpdateUserBodyDto,
} from "../types/user-schemas";

// 회원가입
export const createUser = async (
  teamId: string,
  userData: CreateUserBodyDto
) => {
  const response = await instance.post<UserServiceResponseDto>(
    `/${teamId}/users`,
    userData
  );
  return response.data;
};

// 내 정보 조회
export const fetchMyDetails = async (teamId: string) => {
  const response = await instance.get<UserServiceResponseDto>(
    `/${teamId}/users/me`
  );
  return response.data;
};

// 내 정보 수정
export const updateMyDetails = async (
  teamId: string,
  updateData: UpdateUserBodyDto
) => {
  const response = await instance.patch<UserServiceResponseDto>(
    `/${teamId}/users/me`,
    updateData
  );
  return response.data;
};

// 프로필 이미지 URL 생성
export const uploadProfileImage = async (teamId: string, imageFile: File) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await instance.post<{ profileImageUrl: string }>(
    `/${teamId}/users/me/image`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return response.data;
};
