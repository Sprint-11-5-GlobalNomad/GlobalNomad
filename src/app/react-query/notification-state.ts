import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  fetchNotifications,
  deleteNotification,
} from "../api/my-notifications-api";

// fetchNotifications의 반환 타입 자동 추출
type FetchNotificationsReturnType = Awaited<
  ReturnType<typeof fetchNotifications>
>;

// 내 알림 리스트 조회
export const useNotifications = (cursorId?: number) =>
  useQuery<FetchNotificationsReturnType, Error>({
    queryKey: ["notifications", cursorId],
    queryFn: () => fetchNotifications(cursorId),
  });

// 알림 삭제
export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError, number>({
    mutationFn: (notificationId: number) => deleteNotification(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error: AxiosError) => {
      console.error("Failed to delete notification:", error);
    },
  });
};
