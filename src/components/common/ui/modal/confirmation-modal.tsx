import Image from "next/image";
import React from "react";

// 예약취소 모달 인터페이스
interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  buttonMessage: string;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  message,
  buttonMessage,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-[29.8rem] h-[18.4rem] rounded-[0.75rem] flex flex-col items-center justify-between p-[1rem] shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center items-center mb-[0.75rem]">
          <Image
            src="/image/check.svg"
            alt="체크 아이콘"
            width={24}
            height={24}
            className="h-[2.4rem] w-[2.4rem]"
          />
        </div>
        <p className="text-center text-[1.6rem] font-medium mb-[1.25rem]">
          {message}
        </p>
        <div className="flex justify-center gap-[1rem] w-full">
          <button
            className="w-[8rem] h-[3.8rem] border border-black text-black rounded-[0.375rem] text-[1.4rem]"
            onClick={onClose}
          >
            아니요
          </button>
          <button
            className="w-[8rem] h-[3.8rem] bg-nomad-black text-white rounded-[0.375rem] text-[1.4rem]"
            onClick={onConfirm}
          >
            {buttonMessage}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
