import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  createUser,
  fetchMyDetails,
  updateMyDetails,
  uploadProfileImage,
} from "../(primary)/api/user-api";
import {
  CreateUserBodyDto,
  UpdateUserBodyDto,
  UserServiceResponseDto,
} from "../types/user-schemas";

// 회원가입
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<UserServiceResponseDto, AxiosError, CreateUserBodyDto>({
    mutationFn: async (userData: CreateUserBodyDto) => createUser(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myDetails"] });
    },
    onError: (error) => {
      if (error.response) {
        const errorMessage =
          (error.response.data as { message: string })?.message ||
          "알림 삭제 중 알 수 없는 오류가 발생했습니다.";

        switch (error.response.status) {
          case 400:
            console.error(error.message);
            alert(errorMessage);
            break;
          case 409:
            console.error("중복된 이메일입니다.");
            alert(errorMessage);
            break;
          default:
            console.error("회원가입 중 알 수 없는 오류가 발생했습니다.");
            alert(errorMessage);
        }
      } else {
        console.error("회원가입 요청 실패:", error.message);
        alert("회원가입 요청 실패");
      }
    },
  });
};

// 내 정보 조회
export const useMyDetails = () =>
  useQuery<UserServiceResponseDto, AxiosError>({
    queryKey: ["myDetails"],
    queryFn: async () => {
      try {
        return await fetchMyDetails();
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorMessage =
            typeof error.response?.data === "object" &&
            error.response?.data?.message
              ? error.response.data.message
              : "알림 삭제 중 알 수 없는 오류가 발생했습니다.";

          switch (error.response?.status) {
            case 401:
              console.error(
                "인증되지 않은 요청입니다. 로그인 후 다시 시도하세요."
              );
              alert(errorMessage);
              break;
            case 404:
              console.error("존재하지 않는 유저입니다.");
              alert(errorMessage);
              break;
            default:
              console.error("내 정보 조회 중 알 수 없는 오류가 발생했습니다.");
              alert(errorMessage);
          }
        }
        throw error;
      }
    },
  });

// 내 정보 수정
export const useUpdateMyDetails = () => {
  const queryClient = useQueryClient();
  return useMutation<UserServiceResponseDto, AxiosError, UpdateUserBodyDto>({
    mutationFn: async (updateData: UpdateUserBodyDto) =>
      updateMyDetails(updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myDetails"] });
    },
    onError: (error) => {
      if (error.response) {
        const errorMessage =
          (error.response.data as { message: string })?.message ||
          "알림 삭제 중 알 수 없는 오류가 발생했습니다.";

        switch (error.response.status) {
          case 400:
            console.error(error.message);
            alert(errorMessage);
            break;
          case 401:
            console.error(
              "인증되지 않은 요청입니다. 로그인 후 다시 시도하세요."
            );
            alert(errorMessage);
            break;
          default:
            console.error("내 정보 수정 중 알 수 없는 오류가 발생했습니다.");
            alert(errorMessage);
        }
      } else {
        console.error("내 정보 수정 요청 실패:", error.message);
        alert("내 정보 수정 요청 실패");
      }
    },
  });
};

// 프로필 이미지 업로드
export const useUploadProfileImage = () => {
  const queryClient = useQueryClient();
  return useMutation<{ profileImageUrl: string }, AxiosError, File>({
    mutationFn: async (imageFile: File) => uploadProfileImage(imageFile),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myDetails"] });
    },
    onError: (error) => {
      if (error.response) {
        const errorMessage =
          (error.response.data as { message: string })?.message ||
          "알림 삭제 중 알 수 없는 오류가 발생했습니다.";

        switch (error.response.status) {
          case 401:
            console.error(
              "인증되지 않은 요청입니다. 로그인 후 다시 시도하세요."
            );
            alert(errorMessage);
            break;
          default:
            console.error(
              "프로필 이미지 업로드 중 알 수 없는 오류가 발생했습니다."
            );
            alert(errorMessage);
        }
      } else {
        console.error("프로필 이미지 업로드 요청 실패:", error.message);
        alert("프로필 이미지 업로드 요청 실패");
      }
    },
  });
};
