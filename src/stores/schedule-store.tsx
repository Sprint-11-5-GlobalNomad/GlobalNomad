import { create } from "zustand";
import { ScheduleResponseDto } from "../app/types/schedule-schemas";

interface ScheduleState {
  availableSchedules: ScheduleResponseDto[]; // 예약 가능한 일정 목록
  setAvailableSchedules: (schedules: ScheduleResponseDto[]) => void; // 예약 가능한 일정 상태 업데이트
}

export const useScheduleStore = create<ScheduleState>((set) => ({
  availableSchedules: [],

  // 서버에서 예약 가능한 일정 데이터를 가져온 후 호출하여 상태를 업데이트합니다.
  setAvailableSchedules: (schedules) => set({ availableSchedules: schedules }),
}));
