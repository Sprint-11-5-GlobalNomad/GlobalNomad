// Review DTOs
export interface ReviewServiceResponseDto {
  id: number;
  user: {
    id: number;
    profileImageUrl?: string;
    nickname: string;
  };
  activityId: number;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewPostDto {
  deletedAt: string;
  updatedAt: string;
  createdAt: string;
  content: string;
  rating: number;
  userId: number;
  activityId: number;
  teamId: string;
  id: number;
}

export interface FindReviewsQueryDto {
  page?: number;
  size?: number;
}

export interface CreateReviewBodyDto {
  rating: number;
  content: string;
}
