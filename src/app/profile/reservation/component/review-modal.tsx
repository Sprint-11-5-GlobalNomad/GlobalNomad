"use client";

import Button from "@/components/button";
import { ReservationResponseDto } from "@/stores/types/reservation-schemas";
import { useState } from "react";
import Image from "next/image";
import { instance } from "@/app/api/api";
import { AxiosError } from "axios";

type ReviewModalProps = Pick<
  ReservationResponseDto,
  | "id"
  | "activity"
  | "totalPrice"
  | "date"
  | "startTime"
  | "endTime"
  | "headCount"
> & { onClose: () => void };

type ReviewState = {
  rating: number;
  content: string;
};

export function ReviewModal(Props: ReviewModalProps) {
  const [review, setReview] = useState<ReviewState>({
    rating: 0,
    content: "",
  });

  function onChangeContent(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setReview((prev) => ({ ...prev, content: e.target.value }));
  }

  function onStarClick(index: number) {
    setReview((prev) => ({ ...prev, rating: index + 1 }));
  }

  async function onSubmitReview() {
    try {
      const response = await instance.post(
        `my-reservation/${Props.id}/reviews`,
        {
          rating: review.rating,
          content: review.content,
        }
      );
      console.log("Review submitted successfully:", response.data);

      Props.onClose();
      alert("리뷰가 성공적으로 작성되었습니다!");
    } catch (e: unknown) {
      if (e instanceof AxiosError && e.response) {
        const { status, data } = e.response;
        switch (status) {
          case 400:
            alert(data.message || "잘못된 요청입니다. 내용을 확인해주세요.");
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
        console.error("Unexpected error:", e);
        alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  }

  return (
    <div className="flex-column justify-center fixed inset-0 bg-black bg-opacity-50 z-50">
      <div
        className="bg-white flex flex-col tablet:rounded-[2.4rem] desktop:rounded-[2.4rem] w-[48rem] h-[75rem] tablet:w-[48rem] tablet:h-[75rem] mobile:w-[375px] mobile:h-[777px] gap-[2.4rem] desktop:p-[2.4rem] tablet:p-[2.4rem] mobile:p-[1.2rem]"
        style={{
          fontFamily: "Pretendard",
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-[2.4rem] font-bold leading-[3.2rem] mobile:text-[28px] mobile:leading-[26px]">
            후기 작성
          </h1>
          <button onClick={Props.onClose}>
            <Image src="/image/btn_X.svg" alt="닫기" width={40} height={40} />
          </button>
        </div>
        <div className="flex gap-4 mb-6">
          <Image
            src={Props.activity.bannerImageUrl}
            alt={Props.activity.title}
            width={126}
            height={126}
            className="rounded-[1.2rem] mobile:w-[100px] mobile:h-[100px]"
          />
          <div>
            <h2 className="text-[2rem] font-bold leading-[3.2rem] mobile:text-[16px] mobile:leading-[26px]">
              {Props.activity.title}
            </h2>
            <p className="text-[1.8rem] font-normal leading-[2.6rem] mobile:text-[14px] mobile:leading-[24px]">
              {Props.date}ㆍ{Props.startTime}-{Props.endTime}ㆍ{Props.headCount}
              명
            </p>
            <hr className="mb-6" />
            <div className="text-left text-[3.2rem] font-bold leading-[4.2rem] mb-6 mobile:text-[20px] mobile:leading-[23.87px]">
              ₩{Props.totalPrice}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2 mb-6 w-[432px] h-[100px] mobile:w-[351px] mobile:h-[100px] items-center">
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
          className="w-[432px] h-[240px] p-2 border rounded-md resize-none mb-6 mobile:w-[351px] mobile:h-[346px] mobile:rounded-[4px]"
          placeholder="후기를 작성해주세요"
          onChange={onChangeContent}
          style={{
            fontFamily: "Pretendard",
            fontSize: "16px",
          }}
        />
        <Button type="reviewSubmit" label="작성하기" onClick={onSubmitReview} />
      </div>
    </div>
  );
}
