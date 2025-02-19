import Button from "@/components/common/ui/button";
import UseOutsideClick from "@/hooks/use-outside-click";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface BookingModalProps {
  onClose: () => void;
  onConfirm: (value: number) => void;
}

export default function HeadcountSelectModal({
  onClose,
  onConfirm,
}: BookingModalProps) {
  const outsideClickRef = UseOutsideClick(onClose);

  const [headCount, setHeadCount] = useState(1);

  const handleIncrease = () => setHeadCount((prev) => prev + 1);
  const handleDecrease = () => setHeadCount((prev) => Math.max(prev - 1, 1));

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return createPortal(
    <div
      ref={outsideClickRef}
      className="w-[48rem] bg-white rounded-[2.4rem] z-[999] tablet:absolute
      top-[62.4rem] left-[35vw] px-[2.4rem] pt-[2.8rem] pb-[3.2rem]
      flex flex-col desktop:hidden mobile:w-full mobile:h-full
      mobile:fixed mobile:top-0 mobile:left-0"
    >
      {/* 날짜 선택 */}
      <div className="flex-between">
        <h2 className="text-2xl font-bold">인원</h2>
        <button onClick={onClose}>
          <Image
            src="/image/btn_X.svg"
            alt="인원 선택 모달 닫기"
            width={40}
            height={40}
          />
        </button>
      </div>

      <p className="text-xl mt-[3.2rem] mb-[2.4rem]">
        예약할 인원을 선택해주세요.
      </p>

      <div
        className="border border-solid border-gray-500 rounded-[0.6rem]
                  w-[12rem] flex-between shadow-stepperInset"
      >
        <button
          onClick={(e) => {
            e.preventDefault();
            handleDecrease();
          }}
          className="p-[1rem] rounded-tl-[0.6rem] rounded-bl-[0.6rem]"
        >
          <Image
            src="/image/Subtract.svg"
            alt="참여 인원 수 빼기"
            width={20}
            height={20}
          />
        </button>
        <input
          value={headCount}
          onChange={(e) => setHeadCount(Number(e.target.value) || 1)}
          className="w-[4rem] p-[0.6rem] text-md text-gray-900
                    font-regular text-center focus:outline-none"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            handleIncrease();
          }}
          className="p-[1rem] rounded-tr-[0.6rem] rounded-br-[0.6rem]"
        >
          <Image
            src="/image/Add.svg"
            alt="참여 인원 수 빼기"
            width={20}
            height={20}
          />
        </button>
      </div>

      <Button
        ButtonType="dateReservation"
        type="button"
        label="확인"
        onClick={(e) => {
          e.preventDefault();
          onConfirm(headCount);
        }}
        className="mobile:fixed mobile:bottom-[4rem]"
      />
    </div>,
    document.body
  );
}
