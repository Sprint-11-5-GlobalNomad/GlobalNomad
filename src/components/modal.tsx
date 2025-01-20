import React from "react";

//로그인 모달
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function renderModal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-[54rem] h-[25rem] rounded-[0.8rem] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

//예약취소 모달
interface reservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
}

export function reservationModal({
  isOpen,
  onClose,
  onConfirm,
  children,
}: reservationModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-[29rem] h-[18rem] rounded-[1.2rem] flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center items-center text-center">
          {children}
          <div className="flex justify-between gap-8">
            <button
              className="w-[5rem] h-[2.3rem] px-[1.25rem] py-[0.625rem] border border-black text-black rounded-[0.375rem]"
              onClick={onClose}
            >
              아니요
            </button>
            <button
              className="w-[5rem] h-[2.3rem] px-[1.25rem] py-[0.625rem] border bg-nomad-black text-white rounded-[0.375rem]"
              onClick={onConfirm}
            >
              취소하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
