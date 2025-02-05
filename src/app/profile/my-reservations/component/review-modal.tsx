"use client";

import Button from "@/components/common/ui/button";
import { ReservationResponseDto } from "@/app/types/reservation-schemas";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AxiosError } from "axios";
import { useSubmitReservationReview } from "@/app/react-query/reservation-state";

type ReviewModalProps = Pick<
  ReservationResponseDto,
  | "id"
  | "activity"
  | "totalPrice"
  | "date"
  | "startTime"
  | "endTime"
  | "headCount"
> & {
  isOpen: boolean;
};

type ReviewState = {
  rating: number;
  content: string;
};

export function ReviewModal({ isOpen, ...props }: ReviewModalProps) {
  const [modalOpen, setModalOpen] = useState(isOpen);
  const [review, setReview] = useState<ReviewState>({
    rating: 0,
    content: "",
  });

  const submitReviewMutation = useSubmitReservationReview();

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  function onClose() {
    setModalOpen(false);
  }

  function onChangeContent(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setReview((prev) => ({ ...prev, content: e.target.value }));
  }

  function onStarClick(index: number) {
    setReview((prev) => ({ ...prev, rating: index + 1 }));
  }

  async function onSubmitReview() {
    if (review.rating === 0 || review.content.trim() === "") {
      alert("별점과 후기를 모두 입력해주세요.");
      return;
    }

    submitReviewMutation.mutate(
      {
        reservationId: props.id,
        reviewData: {
          rating: review.rating,
          content: review.content,
        },
      },
      {
        onSuccess: () => {
          alert("리뷰가 성공적으로 작성되었습니다!");
          onClose();
        },
        onError: (error) => {
          if (error instanceof AxiosError && error.response) {
            const { status, data } = error.response;
            switch (status) {
              case 400:
                alert(
                  data.message || "잘못된 요청입니다. 내용을 확인해주세요."
                );
                break;
              case 401:
                alert("인증에 실패했습니다. 다시 로그인해주세요.");
                break;
              case 403:
                alert(data.message || "리뷰 작성 권한이 없습니다.");
                break;
              case 404:
                alert(data.message || "예약 정보를 찾을 수 없습니다.");
                break;
              case 409:
                alert(data.message || "이미 리뷰를 작성한 예약입니다.");
                break;
              default:
                alert("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
                break;
            }
          } else {
            console.error("Unexpected error:", error);
            alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
          }
        },
      }
    );
  }

  if (!modalOpen) return null;

  return (
    <div
      className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white flex flex-col tablet:rounded-[2.4rem] font-pretendard desktop:rounded-[2.4rem] w-[48rem] h-[75rem] tablet:w-[48rem] tablet:h-[75rem] mobile:w-[375px] mobile:h-[777px] desktop:p-[2.4rem] tablet:p-[2.4rem] mobile:p-[1.2rem]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-[4.1rem]">
          <h1 className="text-[2.4rem] font-bold leading-[3.2rem] mobile:text-[28px] mobile:leading-[26px]">
            후기 작성
          </h1>
          <button onClick={onClose}>
            <Image src="/image/btn_X.svg" alt="닫기" width={40} height={40} />
          </button>
        </div>
        <div className="flex flex-col gap-[2.4rem] mobile:gap-[1.2rem]">
          <div className="flex gap-[2.4rem]">
            <Image
              src={props.activity.bannerImageUrl}
              alt={props.activity.title}
              width={126}
              height={126}
              className="rounded-[1.2rem] mobile:w-[100px] mobile:h-[100px]"
            />
            <div className="flex flex-col gap-[1.2rem]">
              <h2 className="text-[2rem] font-bol mobile:text-[16px]">
                {props.activity.title}
              </h2>
              <p className="text-[1.8rem] font-normalmobile:text-[14px]">
                {props.date}ㆍ{props.startTime}-{props.endTime}ㆍ
                {props.headCount}명
              </p>
              <hr className="mb-[0.4rem]" />
              <div className="text-left text-[3.2rem] font-bold mb-6 mobile:text-[20px]">
                ₩{props.totalPrice}
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2 w-[432px] h-[100px] mobile:w-[351px] mobile:h-[100px] items-center">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="w-[54px] h-[50px]">
                <Image
                  src={
                    index < review.rating
                      ? "/image/rating-star.svg"
                      : "/image/rating-empty-star.svg"
                  }
                  alt={index < review.rating ? "선택된 별점" : "빈 별점"}
                  width={54}
                  height={50}
                  onClick={() => onStarClick(index)}
                  className="cursor-pointer"
                />
              </div>
            ))}
          </div>
          <textarea
            className="font-pretendard text-4xl w-[432px] h-[240px] p-2 border rounded-md resize-none mobile:w-[351px] mobile:h-[346px] mobile:rounded-[4px]"
            placeholder="후기를 작성해주세요"
            onChange={onChangeContent}
          />
          <Button
            ButtonType="reviewSubmit"
            label="작성하기"
            onClick={onSubmitReview}
          />
        </div>
      </div>
    </div>
  );
}
