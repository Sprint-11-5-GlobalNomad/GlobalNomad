// Activity DTOs
export interface ActivityBasicDto {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: "문화 · 예술" | "식음료" | "스포츠" | "투어" | "관광" | "웰빙";
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface FindActivitiesQueryDto {
  method: "offset" | "cursor";
  cursorId?: number | null;
  category?: "문화 · 예술" | "식음료" | "스포츠" | "투어" | "관광" | "웰빙";
  keyword?: string;
  sort?: "most_reviewed" | "price_asc" | "price_desc" | "latest";
  page?: number;
  size?: number;
}

export interface ActivityWithSubImagesAndSchedulesDto {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  subImages: { id: number; imageUrl: string }[];
  schedules: { id: number; date: string; startTime: string; endTime: string }[];
}

export interface CreateActivityBodyDto {
  title: string;
  category: string;
  description: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImageUrls?: string[];
  schedules?: { date: string; startTime: string; endTime: string }[];
}

export interface UpdateMyActivityBodyDto {
  title?: string;
  category?: string;
  description?: string;
  price?: number;
  address?: string;
  bannerImageUrl?: string;
  subImageIdsToRemove?: number[];
  subImageUrlsToAdd?: string[];
  scheduleIdsToRemove?: number[];
  schedulesToAdd?: { date: string; startTime: string; endTime: string }[];
}
