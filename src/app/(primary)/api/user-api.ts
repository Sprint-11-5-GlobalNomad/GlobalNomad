import { instance } from "./base-api";
import {
  UserServiceResponseDto,
  CreateUserBodyDto,
  UpdateUserBodyDto,
} from "../../types/user-schemas";

// 회원가입
export const createUser = async (userData: CreateUserBodyDto) => {
  const response = await instance.post<UserServiceResponseDto>(
    `/users`,
    userData
  );
  return response.data;
};

// 내 정보 조회
export const fetchMyDetails = async () => {
  const response = await instance.get<UserServiceResponseDto>(`/users/me`);
  return response.data;
};

// 내 정보 수정
export const updateMyDetails = async (updateData: UpdateUserBodyDto) => {
  const response = await instance.patch<UserServiceResponseDto>(
    `/users/me`,
    updateData
  );
  return response.data;
};

// 프로필 이미지 URL 생성
export const uploadProfileImage = async (imageFile: File) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await instance.post<{ profileImageUrl: string }>(
    `/users/me/image`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return response.data;
};
