// Notification DTOs
export interface NotificationDto {
  id: number;
  teamId: string;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface FindMyNotificationsQueryDto {
  cursorId?: number;
  size?: number;
}
