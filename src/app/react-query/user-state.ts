import {
  createUser,
  fetchMyDetails,
  updateMyDetails,
  uploadProfileImage,
} from "../api/user-api";
import { useCustomMutation, useCustomQuery } from "./react-query-util";
import {
  CreateUserBodyDto,
  UpdateUserBodyDto,
  UserServiceResponseDto,
} from "../types/user-schemas";

// 회원가입
export const useCreateUser = (teamId: string) =>
  useCustomMutation<
    UserServiceResponseDto, // TData: 반환 타입
    unknown, // TError: 에러 타입
    CreateUserBodyDto // TVariables: 입력 변수 타입
  >(
    (userData: CreateUserBodyDto) => createUser(teamId, userData),
    [["myDetails", teamId]]
  );

// 내 정보 조회
export const useMyDetails = (teamId: string) =>
  useCustomQuery<UserServiceResponseDto, unknown>(["myDetails", teamId], () =>
    // 반환 타입과 에러 타입 명시
    fetchMyDetails(teamId)
  );

// 내 정보 수정
export const useUpdateMyDetails = (teamId: string) =>
  useCustomMutation<
    UserServiceResponseDto, // TData: 반환 타입
    unknown, // TError: 에러 타입
    UpdateUserBodyDto // TVariables: 입력 변수 타입
  >(
    (updateData: UpdateUserBodyDto) => updateMyDetails(teamId, updateData),
    [["myDetails", teamId]]
  );

// 프로필 이미지 업로드
export const useUploadProfileImage = (teamId: string) =>
  useCustomMutation<
    { profileImageUrl: string }, // TData: 반환 타입
    unknown, // TError: 에러 타입
    File // TVariables: 입력 변수 타입
  >(
    (imageFile: File) => uploadProfileImage(teamId, imageFile),
    [["myDetails", teamId]]
  );
