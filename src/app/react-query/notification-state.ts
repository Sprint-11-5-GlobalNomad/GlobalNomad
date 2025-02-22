import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  fetchNotifications,
  deleteNotification,
} from "../(primary)/api/my-notifications-api";

// fetchNotifications의 반환 타입 자동 추출
type FetchNotificationsReturnType = Awaited<
  ReturnType<typeof fetchNotifications>
>;

// 내 알림 리스트 조회
export const useNotifications = (cursorId?: number) =>
  useQuery<FetchNotificationsReturnType, AxiosError>({
    queryKey: ["notifications", cursorId],
    queryFn: async () => {
      try {
        return await fetchNotifications(cursorId);
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorMessage =
            typeof error.response?.data === "object" &&
            error.response?.data?.message
              ? error.response.data.message
              : "알 수 없는 오류가 발생했습니다.";
          switch (error.response?.status) {
            case 400:
              console.error(error.message);
              break;
            case 401:
              console.error(
                "인증되지 않은 요청입니다. 로그인 후 다시 시도하세요."
              );
              alert(errorMessage);
              break;
            default:
              console.error(
                "알림 목록을 가져오는 중 알 수 없는 오류가 발생했습니다.",
                error
              );
              alert(errorMessage);
          }
        }
        throw error;
      }
    },
  });

// 알림 삭제
export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError, number>({
    mutationFn: (notificationId: number) => deleteNotification(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      alert("알림이 삭제되었습니다.");
    },
    onError: (error: AxiosError) => {
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
          case 403:
            console.error("본인의 알림만 삭제할 수 있습니다.");
            alert(errorMessage);
            break;
          case 404:
            console.error("존재하지 않는 알림입니다.");
            alert(errorMessage);
            break;
          default:
            console.error(
              "알림 삭제 중 알 수 없는 오류가 발생했습니다.",
              error
            );
            alert(errorMessage);
        }
      }
    },
  });
};
