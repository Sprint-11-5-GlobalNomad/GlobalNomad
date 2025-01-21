import { instance } from "./base-api";
import { NotificationDto } from "../types/notification-schemas";

// 내 알림 리스트 조회
export const fetchNotifications = async (
  teamId: string,
  cursorId?: number,
  size = 10
) => {
  const response = await instance.get<{
    cursorId: number;
    notifications: NotificationDto[];
    totalCount: number;
  }>(`/${teamId}/my-notifications`, { params: { cursorId, size } });
  return response.data;
};

// 내 알림 삭제
export const deleteNotification = async (
  teamId: string,
  notificationId: number
) => {
  await instance.delete(`/${teamId}/my-notifications/${notificationId}`);
};
