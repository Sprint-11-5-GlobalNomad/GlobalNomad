import { ReactNode } from "react";

//체험 리스트조회
export interface ActivityList {
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
}

export interface ActivityListResponse {
  cursorId: number;
  totalCount: number;
  activities: ActivityList[];
}

//체험 상세조회
export interface Schedule {
  date: string;
  id: number;
  startTime: ReactNode;
  endTime: ReactNode;
}

export interface SubImage {
  id: number;
  imageUrl: string;
}

export interface DataType {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  createdAt: string;
  updatedAt: string;
  rating: number;
  reviewCount: number;
  schedules: Schedule[];
  subImages: SubImage[];
}

//체험 리뷰조회
export interface User {
  profileImageUrl: string;
  nickname: string;
  id: number;
}

export interface Review {
  id: number;
  user: User;
  activityId: number;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewData {
  averageRating: number;
  totalCount: number;
  reviews: Review[];
}

//체험예약 가능일
export interface AvailableSchedule {
  date: string;
  times: {
    id: number;
    startTime: string;
    endTime: string;
  }[];
}
