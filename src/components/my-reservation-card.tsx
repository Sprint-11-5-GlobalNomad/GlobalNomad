import Image from "next/image";
import { ReservationResponseDto } from "@/stores/types/reservation-schemas";

type ReservationCardProps = Pick<
  ReservationResponseDto,
  | "activity"
  | "status"
  | "date"
  | "startTime"
  | "endTime"
  | "headCount"
  | "totalPrice"
>;

export function myReservationCard(ReservationProps: ReservationCardProps) {
  return (
    <div>
      <Image
        src={ReservationProps.activity.bannerImageUrl}
        alt={"체험 이미지"}
      />
      <div>
        <div>{ReservationProps.status}</div>
        <div>{ReservationProps.activity.title}</div>
        <div>
          {ReservationProps.date} · {ReservationProps.startTime} ~{" "}
          {ReservationProps.endTime} · {ReservationProps.headCount}
        </div>
      </div>
      <div>
        <div>{ReservationProps.totalPrice}</div>
        {/*예약내역이고 예약상태가 confirmed일 때 <div>예약 취소</div> 나중에 버튼 태그로 바꿔야함 */}
        {/*예약내역이고 예약상태가 completed일 때 <div>후기 작성</div> 나중에 버튼 태그로 바꿔야 함*/}
      </div>
    </div>
  );
}
