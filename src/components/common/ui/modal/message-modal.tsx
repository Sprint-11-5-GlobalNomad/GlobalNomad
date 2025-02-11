import UseOutsideClick from "@/hooks/use-outside-click";
import React from "react";

// 로그인 모달 인터페이스
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export function MessageModal({ isOpen, onClose, message }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-[33.75rem] h-[15.625rem] rounded-[0.75rem] flex flex-col p-[1.5rem] shadow-lg"
        onClick={(e) => e.stopPropagation()}
        ref={UseOutsideClick(onClose)}
      >
        <div className="flex-grow flex items-center justify-center">
          <p className="text-center text-[1.125rem] font-medium">{message}</p>
        </div>
        <div className="flex justify-end">
          <button
            className="w-[7.5rem] h-[3rem] bg-nomad-black text-white rounded-lg text-[1rem]"
            onClick={onClose}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageModal;
