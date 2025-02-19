import Button from "@/components/common/ui/button";
import UseOutsideClick from "@/hooks/use-outside-click";
import Image from "next/image";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface BookingModalProps {
  onClose: () => void;
}

export default function HeadcountSelectModal({ onClose }: BookingModalProps) {
  const outsideClickRef = UseOutsideClick(onClose);

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

      <p>예약할 인원을 선택해주세요.</p>

      <Button
        ButtonType="dateReservation"
        type="button"
        label="확인"
        onClick={(e) => {
          e.preventDefault();
          onClose();
        }}
        className="mobile:fixed mobile:bottom-[4rem]"
      />
    </div>,
    document.body
  );
}
