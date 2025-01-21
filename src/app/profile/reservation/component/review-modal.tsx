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
    <div className="">
      <div>
        <div>후기 작성</div>
        <button onClick={Props.onClose}>X</button>
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
        <div className="flex gap-[0.5rem]">
          {[...Array(5)].map((_, index) => (
            <Image
              key={index}
              src={
                index < review.rating
                  ? "/image/rating-star.svg"
                  : "/image/rating-empty-star.svg"
              }
              alt={index < review.rating ? "선택된 별점" : "빈 별점"}
              width={24}
              height={24}
              onClick={() => onStarClick(index)}
              style={{ cursor: "pointer" }}
            />
          ))}
        </div>
        <textarea
          placeholder="후기를 작성해주세요"
          onChange={onChangeContent}
        ></textarea>
        <Button type="reviewSubmit" label="작성하기" onClick={onSubmitReview} />
      </div>
    </div>
  );
}
