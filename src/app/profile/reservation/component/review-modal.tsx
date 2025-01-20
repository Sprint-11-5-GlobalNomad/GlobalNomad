import Button from "@/components/button";
import { ReservationResponseDto } from "@/stores/types/reservation-schemas";

type ReviewModalProps = Pick<
  ReservationResponseDto,
  "activity" | "totalPrice" | "date" | "startTime" | "endTime" | "headCount"
>;
export function ReviewModal(Props: ReviewModalProps) {
  return (
    <div>
      <div>
        <div>후기 작성</div>
        <button>X</button>
      </div>
      <div>
        <div>{Props.activity.bannerImageUrl}</div>
        <div>
          <div>{Props.activity.title}</div>
          <div>
            {Props.date}ㆍ{Props.startTime}-{Props.endTime}ㆍ{Props.headCount}
          </div>
          <hr />
          <div>{Props.totalPrice}</div>
        </div>
      </div>
      <div>
        <div>별점</div>
        <textarea placeholder="후기를 작성해주세요"></textarea>
        <Button type="reviewSubmit" label="작성하기" />
      </div>
    </div>
  );
}
