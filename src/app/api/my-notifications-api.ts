import { instance } from "./base-api";
import { NotificationDto } from "../types/notification-schemas";

// 내 알림 리스트 조회
export const fetchNotifications = async (
  cursorId?: number | null,
  size = 10
) => {
  const response = await instance.get<{
    cursorId: number;
    notifications: NotificationDto[];
    totalCount: number;
  }>(`/my-notifications`, { params: { cursorId, size } });
  return response.data;
};

// 내 알림 삭제
export const deleteNotification = async (notificationId: number) => {
  await instance.delete(`/my-notifications/${notificationId}`);
};
