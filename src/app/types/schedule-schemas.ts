// Schedule DTOs
export interface ScheduleResponseDto {
  date: string;
  times: { id: number; startTime: string; endTime: string }[];
}

export interface FindAvailableScheduleQueryDto {
  year: string;
  month: string;
}

export interface CreateScheduleBody {
  date: string;
  startTime: string;
  endTime: string;
}
