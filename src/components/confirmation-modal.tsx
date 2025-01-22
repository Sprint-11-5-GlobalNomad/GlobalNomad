import Image from "next/image";
import React from "react";

// 예약취소 모달 인터페이스
interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  message,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-[18.625rem] h-[11.5rem] rounded-[0.75rem] flex flex-col items-center justify-between p-[1rem] shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center items-center mb-[0.75rem]">
          <Image
            src="/image/check.svg"
            alt="체크 아이콘"
            className="h-[1.5rem] w-[1.5rem]"
          />
        </div>
        <p className="text-center text-[0.9rem] font-medium mb-[1.25rem]">
          {message}
        </p>
        <div className="flex justify-center gap-[1rem] w-full">
          <button
            className="w-[5rem] h-[2.25rem] border border-black text-black rounded-[0.375rem] text-[0.875rem]"
            onClick={onClose}
          >
            아니요
          </button>
          <button
            className="w-[5rem] h-[2.25rem] bg-nomad-black text-white rounded-[0.375rem] text-[0.875rem]"
            onClick={onConfirm}
          >
            취소하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
