import {
  fetchNotifications,
  deleteNotification,
} from "../api/my-notifications-api";
import { useCustomQuery, useCustomMutation } from "./react-query-util";

// 내 알림 리스트 조회
export const useNotifications = (cursorId?: number) =>
  useCustomQuery(["notifications", cursorId], () =>
    fetchNotifications(cursorId)
  );

// 알림 삭제
export const useDeleteNotification = () =>
  useCustomMutation(
    (notificationId: number) => deleteNotification(notificationId),
    [["notifications"]]
  );
