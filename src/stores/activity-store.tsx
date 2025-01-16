import { create } from "zustand";
import {
  ActivityBasicDto,
  FindActivitiesQueryDto,
} from "./types/activity-schemas";

interface ActivityState {
  activityList: ActivityBasicDto[]; // 활동 목록
  activityDetail: ActivityBasicDto | null; // 선택된 활동의 상세 정보
  filters: Omit<FindActivitiesQueryDto, "method" | "cursorId">; // 활동 필터 상태
  setActivityList: (activities: ActivityBasicDto[]) => void; // 활동 목록 업데이트
  setActivityDetail: (activity: ActivityBasicDto) => void; // 선택된 활동 업데이트
  updateFilters: (newFilters: Partial<ActivityState["filters"]>) => void; // 필터 상태 업데이트
}

export const useActivityStore = create<ActivityState>((set) => ({
  activityList: [],
  activityDetail: null,
  filters: {
    category: undefined,
    keyword: "",
    sort: "latest",
    page: 1,
    size: 20,
  },

  // 서버에서 활동 목록 데이터를 가져온 후 호출하여 상태를 업데이트합니다.
  setActivityList: (activities) => set({ activityList: activities }),

  // 특정 활동의 상세 정보를 선택하거나 표시할 때 호출합니다.
  setActivityDetail: (activity) => set({ activityDetail: activity }),

  // 필터 값(예: 카테고리, 정렬, 페이지 등)이 변경될 때 호출하여 상태를 업데이트합니다.
  updateFilters: (newFilters) =>
    set((state) => ({ filters: { ...state.filters, ...newFilters } })),
}));
