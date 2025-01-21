import { create } from "zustand";
import { NotificationDto } from "../app/types/notification-schemas";

interface NotificationState {
  notifications: NotificationDto[]; // 알림 목록
  unreadNotificationCount: number; // 읽지 않은 알림 개수
  setNotifications: (notifications: NotificationDto[]) => void; // 알림 목록 업데이트
  incrementUnreadCount: () => void; // 읽지 않은 알림 개수 증가
  resetUnreadCount: () => void; // 읽지 않은 알림 개수 초기화
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadNotificationCount: 0,

  // 서버에서 알림 데이터를 가져온 후 호출하여 알림 목록 상태를 업데이트합니다.
  setNotifications: (notifications) => set({ notifications }),

  // 새로운 알림이 도착했을 때 호출하여 읽지 않은 알림 개수를 증가시킵니다.
  incrementUnreadCount: () =>
    set((state) => ({
      unreadNotificationCount: state.unreadNotificationCount + 1,
    })),

  // 알림을 모두 읽었을 때 호출하여 읽지 않은 알림 개수를 0으로 초기화합니다.
  resetUnreadCount: () => set({ unreadNotificationCount: 0 }),
}));
