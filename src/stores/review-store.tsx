import { create } from "zustand";
import { ReviewServiceResponseDto } from "../app/types/review-schemas";

interface ReviewState {
  reviews: ReviewServiceResponseDto[]; // 특정 활동에 대한 리뷰 목록
  reviewPagination: {
    page: number; // 현재 페이지
    size: number; // 한 페이지에 표시할 리뷰 수
  };
  setReviews: (reviews: ReviewServiceResponseDto[]) => void; // 리뷰 목록 업데이트
  updateReviewPagination: (pagination: { page: number; size: number }) => void; // 페이지네이션 정보 업데이트
}

export const useReviewStore = create<ReviewState>((set) => ({
  reviews: [],
  reviewPagination: {
    page: 1,
    size: 3,
  },

  // 서버에서 리뷰 데이터를 가져온 후 호출하여 리뷰 상태를 업데이트합니다.
  setReviews: (reviews) => set({ reviews }),

  // 페이지 또는 한 페이지의 리뷰 수가 변경될 때 호출하여 페이지네이션 상태를 업데이트합니다.
  updateReviewPagination: (newPagination) =>
    set((state) => ({
      reviewPagination: { ...state.reviewPagination, ...newPagination },
    })),
}));
