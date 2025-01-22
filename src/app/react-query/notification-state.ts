import {
  fetchNotifications,
  deleteNotification,
} from "../api/notification-api";
import { useCustomQuery, useCustomMutation } from "./react-query-util";

// 내 알림 리스트 조회
export const useNotifications = (teamId: string, cursorId?: number) =>
  useCustomQuery(["notifications", teamId, cursorId], () =>
    fetchNotifications(teamId, cursorId)
  );

// 알림 삭제
export const useDeleteNotification = (teamId: string) =>
  useCustomMutation(
    (notificationId: number) => deleteNotification(teamId, notificationId),
    [["notifications", teamId]]
  );
