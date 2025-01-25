import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createUser,
  fetchMyDetails,
  updateMyDetails,
  uploadProfileImage,
} from "../api/user-api";
import {
  CreateUserBodyDto,
  UpdateUserBodyDto,
  UserServiceResponseDto,
} from "../types/user-schemas";

// 회원가입
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<UserServiceResponseDto, unknown, CreateUserBodyDto>({
    mutationFn: (userData: CreateUserBodyDto) => createUser(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myDetails"] });
    },
    onError: (error: unknown) => {
      console.error("Failed to create user:", error);
    },
  });
};

// 내 정보 조회
export const useMyDetails = () =>
  useQuery<UserServiceResponseDto, unknown>({
    queryKey: ["myDetails"],
    queryFn: () => fetchMyDetails(),
  });

// 내 정보 수정
export const useUpdateMyDetails = () => {
  const queryClient = useQueryClient();
  return useMutation<UserServiceResponseDto, unknown, UpdateUserBodyDto>({
    mutationFn: (updateData: UpdateUserBodyDto) => updateMyDetails(updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myDetails"] });
    },
    onError: (error: unknown) => {
      console.error("Failed to update user details:", error);
    },
  });
};

// 프로필 이미지 업로드
export const useUploadProfileImage = () => {
  const queryClient = useQueryClient();
  return useMutation<{ profileImageUrl: string }, unknown, File>({
    mutationFn: (imageFile: File) => uploadProfileImage(imageFile),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myDetails"] });
    },
    onError: (error: unknown) => {
      console.error("Failed to upload profile image:", error);
    },
  });
};
