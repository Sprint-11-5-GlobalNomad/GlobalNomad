"use client";

import Button from "@/components/button";
import { ReservationResponseDto } from "@/stores/types/reservation-schemas";
import { useState } from "react";
import Image from "next/image";

type ReviewModalProps = Pick<
  ReservationResponseDto,
  "activity" | "totalPrice" | "date" | "startTime" | "endTime" | "headCount"
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

  function onSubmitReview() {
    // 제출 로직
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
