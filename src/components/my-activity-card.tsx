import Image from "next/image";
import { ActivityBasicDto } from "@/stores/types/activity-schemas";
import { ReservationResponseDto } from "@/stores/types/reservation-schemas";

export function myActivityCard(
  ActivityProps: ActivityBasicDto,
  ReservationProps: ReservationResponseDto
) {
  return (
    <div>
      <Image src={ActivityProps.bannerImageUrl} alt={"체험 이미지"} />
      <div>
        <div>
          {ReservationProps.headCount}
          {/*내 체험 관리일 때 <div>{ActivityProps.rating} ({ActivityProps.reviewCount})</div> */}
          {/* 예약 내역일 때 <div>{ReservationProps.status}</div> */}
          <div>{ActivityProps.title}</div>
          {/*예약 내역일 때 <div>{ReservationProps.date} · {ReservationProps.startTime} ~ {ReservationProps.endTime} · {ReservationProps.headCount}</div> */}
        </div>
        <div>
          <div>{ActivityProps.price}</div>
          {/* 내 체험 관리일 때
          <div>
            <button>···</button>
            <ul>
              <li>수정하기</li>
              <li>삭제하기</li>
            </ul>
          </div> */}
          {/*예약내역이고 예약상태가 완료일 때 <div>예약 취소</div> 나중에 버튼 태그로 바꿔야함 */}
          {/*예약내역이고 예약상태가 체험완료일 때 <div>후기 작성</div> 나중에 버튼 태그로 바꿔야 함*/}
        </div>
      </div>
    </div>
  );
}
